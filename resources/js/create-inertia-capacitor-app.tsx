import '@/bootstrap'
import '@/../css/app.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import useRoute, { RouteContext } from '@inertia-ui/Hooks/useRoute'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'

const appName: string = document.getElementsByTagName('title')[0]?.innerText || 'Laravel',
      appEl = document.getElementById('app')!,
      defaultPage = {component: 'Dashboard', url: '/', props: {jetstream: {}, auth: {user: {current_team_id: 1}, ziggy: {url: 'http://127.0.0.1:8001', port: 8001, location: 'http://127.0.0.1:8001'}}}}

// Allow capacitorjs to start without server-side rendering
if (appEl.dataset.page === undefined) {
  ;(window as any).route = useRoute
  appEl.dataset.page = JSON.stringify(defaultPage)
}

createInertiaApp({
  title: title => `${title} - ${appName}`,
  progress: {color: '#B61818'},
  resolve: name => resolvePageComponent(
    `./Pages/${name}.tsx`,
    import.meta.glob('./Pages/**/*.tsx')
  ),
  setup({ el, App, props }) {
    return createRoot(el).render(
      <RouteContext.Provider value={(window as any).route}>
        <App {...props} />
      </RouteContext.Provider>,
    )
  }
})
