export default () => {

  const searchParams = new URLSearchParams(document.location.search)

  return {
    get: (key: string) => {
      return searchParams.get(key)
    },
    set: (key: string, value: string) => {
      searchParams.set(key, value)
      return searchParams
    },
    toString: (except: string[]) => {
      let params = searchParams
      except.forEach(key => {
        searchParams.delete(key)
      })
      return searchParams.toString()
    }
  }
}
