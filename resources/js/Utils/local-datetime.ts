export default (date: string) => (
  (new Date(date + ' UTC')).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  })
)
