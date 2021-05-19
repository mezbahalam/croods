import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'

export default (query?: Record<string, unknown>) => {
  if (isEmpty(query)) return null
  const queryString = map(query, (value, key) =>
    isArray(value)
      ? map(value, v => `${key}[]=${v}`).join('&')
      : `${key}=${value}`,
  )
  return queryString.join('&')
}
