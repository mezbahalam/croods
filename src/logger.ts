import compact from 'lodash/compact'
import toUpper from 'lodash/toUpper'
import { ServerError } from './typeDeclarations'

export const consoleGroup =
  (title: string, color: string) =>
  (...log: any[]) => {
    // eslint-disable-next-line
    console.group(`%c${title}`, `color: ${color};`)
    // eslint-disable-next-line
    log.map(info => console.log(info))
    // eslint-disable-next-line
    console.groupEnd()
  }

export const responseLogger = (
  url: string,
  method: string,
  data: Record<string, unknown> | ServerError,
) => {
  consoleGroup('RESPONSE: ', 'coral')(`${method.toUpperCase()}: ${url}`, data)
}

export const requestLogger = (
  url: string,
  method: string,
  params?: Record<string, unknown>,
) => {
  consoleGroup(
    'REQUEST: ',
    'mediumpurple',
  )(...compact([`${toUpper(method)}: ${url}`, params]))
}
