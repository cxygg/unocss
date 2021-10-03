import { Variant } from '../../types'
import { isAttributifySelector } from '../../utils'
import { AttributifyOptions } from './types'

const variantsRE = /^(.+\:\!?)?(.*?)$/

export const variantAttributify = (options: AttributifyOptions = {}): Variant => {
  const prefix = options.prefix ?? 'mw-'

  return {
    match(input) {
      const match = isAttributifySelector(input)
      if (!match)
        return

      let name = match[1]
      if (name.startsWith(prefix))
        name = name.slice(prefix.length)
      else if (options.prefixedOnly)
        return

      const content = match[2]
      const [, variants = '', body = content] = content.match(variantsRE) || []
      if (body === '~')
        return `${variants}${name}`
      else
        return `${variants}${name}-${body}`
    },
  }
}