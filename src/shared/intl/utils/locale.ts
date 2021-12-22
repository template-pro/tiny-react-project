import { getURLParameters, objectToQueryString } from '@wuxh/utils'
import type { IntlShape } from 'react-intl'
import languages, { CN, US } from '@/shared/const/languages'
import type { Languages } from '@/shared/const/languages'

// @ts-ignore
import zhLocal from '@/locale/zh-CN.json'
// @ts-ignore
import enLocal from '@/locale/en-US.json'

class Locale {
  intl: IntlShape | undefined
  currentLocale: Languages | undefined
  formatList: IntlShape['formatList'] | undefined
  formatMessage: IntlShape['formatMessage'] | undefined
  formatPlural: IntlShape['formatPlural'] | undefined

  initialize() {
    const { locale } = getURLParameters()
    if (locale) {
      this.setLocale(locale)
      return
    }

    const storageLocaleValue = localStorage.getItem('locale') as Languages
    const isStorageLocale = languages[storageLocaleValue]

    if (isStorageLocale) {
      this.setLocale(storageLocaleValue)
      return
    }

    this.setLocale(CN)
  }

  setIntlObject(intl: IntlShape) {
    this.intl = intl
    ;(['formatList', 'formatMessage', 'formatPlural'] as const)
      .forEach((methodName) => {
        Object.defineProperty(this, methodName, {
          value: intl[methodName],
          writable: false,
        })
      })
  }

  setLocale(locale: Languages) {
    this.currentLocale = locale
    localStorage.setItem('locale', locale)
  }

  updateLocale(newLocale: Languages, isReload = false) {
    if (this.currentLocale !== newLocale) {
      this.setLocale(newLocale)
      const nowQueryObject = getURLParameters()
      nowQueryObject.locale = newLocale

      if (isReload) {
        const { location: { origin, pathname } } = window
        const newUrl = `${origin}${pathname}${objectToQueryString(nowQueryObject)}`
        window.location.href = newUrl
      }
    }
  }

  getMessages() {
    const messages: Record<Languages, any> = {
      [US]: enLocal,
      [CN]: zhLocal,
    }

    return messages[this.currentLocale as Languages]
  }
}

export default new Locale()
