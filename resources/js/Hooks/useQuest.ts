import { useEffect, useState, useRef } from 'react'
import { router } from '@inertiajs/react'
import localForage from 'localforage'

export interface QuestParams {
  [hash: string]: any
}

export interface QuestResponse {
  data: any
}

export default (data?: any) => {

  const [questStore, setQuestStore] = useState<LocalForage>()

  useEffect(() => {

    setQuestStore(
      localForage.createInstance({ name: 'quest-store' })
    )

  }, [])

  return new Quest({ data, store: questStore! })
}

class Quest {

  store: LocalForage

  routerOptions: any = {
    errorBag: 'default',
    preserveScroll: true,
    preserveState: true,
  }

  processing: boolean = false

  resolve?: (resp: QuestResponse) => void

  promise: Promise<QuestResponse>

  data?: any

  constructor({ data, store }: { data?: any, store: LocalForage }) {
    this.data = data
    this.store = store
    this.promise = new Promise((res: (resp: QuestResponse) => void) => (
      this.resolve = res
    ))
  }

  cacheKey(url: string, params: QuestParams = {}): string {

    const orderedParams = (
      Object
        .keys(params)
        .sort()
        .reduce((obj: QuestParams, key) => {
          obj[key] = params[key]
          return obj
        }, {})
    )

    return JSON.stringify({url, orderedParams})
  }

  get(url: string, params: QuestParams = {}): void {

    const cacheKey = this.cacheKey(url, params),
          embark = () => {
            router.get(url, params, {
              ...this.routerOptions,
              onFinish: (data, ...args) => {
                this.processing = false
                console.log('server responded with:', data, args)
                this.resolve!({ data })
              }
            })
          }

    this.store.getItem(cacheKey)
      .then((data: any) => {
        console.log('found localforage:', data)
        // Return cached response
        this.resolve!({ data: data })

        // Quitely get the latest data from the server for next quest
        embark()
      })
      .catch((err: any) => {
        console.log('did not find localforage:', err, 'querying...')

        // Get the latest data from the server
        embark()
      })

  }

  post(url: string, params: QuestParams = {}): void {

    console.log('Embarking on quest:', url, params)

    let resolve: (resp: QuestResponse) => void

    this.processing = false

    const promise = new Promise((res: (resp: QuestResponse) => void) => resolve = res)

    router.post(url, params, {
      ...this.routerOptions,
      onProgress: (event: any) => {
        this.processing = event.detail.progress.percentage < 100
        console.log('Quest progress:', event.detail.progress.percentage)
      },
      onFinish: (data, ...args) => {
        console.log('Quest finished:', data, args)
        resolve({ data })
      }
    })
  }

  put(url: string, params: QuestParams = {}) {
    return this.post(url, {...params, _method: 'PUT'})
  }

  delete(url: string, params: QuestParams = {}) {
    return this.post(url, {...params, _method: 'DELETE'})
  }
}
