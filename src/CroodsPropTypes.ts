import PropTypes from 'prop-types'

const URL_REGEX = /^(https?):\/\/[^\s/$.?#].[^\s]*$/
const PATH_REGEX = /^\/\S*/
const NAME_REGEX = /^([a-zA-Z0-9]+\.)*[a-zA-Z0-9]*[^.]$/

const throwInvalid = (value: string, propName: string, componentName: string) =>
  new Error(
    `Invalid value: "${value}" of prop:"${propName}" supplied to ${componentName} component.`,
  )

const isOkValue = (value: string | undefined, regex: RegExp) =>
  value !== undefined && regex.test(value)

const regexValidator =
  (regex: RegExp, required?: boolean) =>
  (props: Record<string, string>, propName: string, componentName: string) => {
    const value = props[propName]
    const error = throwInvalid(value, propName, componentName)

    if (value === undefined && !required) {
      return null
    }

    return isOkValue(value, regex) ? null : error
  }

const name = regexValidator(NAME_REGEX)
// @ts-ignore: Unreachable code error
name.isRequired = regexValidator(NAME_REGEX, true)

const path = regexValidator(PATH_REGEX)
// @ts-ignore: Unreachable code error
path.isRequired = regexValidator(PATH_REGEX, true)

const url = regexValidator(URL_REGEX)
// @ts-ignore: Unreachable code error
url.isRequired = regexValidator(URL_REGEX, true)

const id = PropTypes.oneOfType([PropTypes.string, PropTypes.number])

export default { id, name, path, url }
