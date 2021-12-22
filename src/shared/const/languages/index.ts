
export const CN = 'zh-CN'
export const US = 'en-US'
export const ALL = null

const languages = {
  [CN]: CN,
  [US]: US,
} as const

export default languages

export type Languages = keyof typeof languages
