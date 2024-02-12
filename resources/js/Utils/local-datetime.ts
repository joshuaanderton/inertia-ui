export default (date: string, options: any = {}) => (
  (new Date(date + ' UTC')).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    ...options
  })
)
