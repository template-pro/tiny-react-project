import { Plugin, build as vite } from 'vite'
import path from 'path'
import fs from 'fs-extra'
import colors from 'colors'
import vm from 'vm'

const resolveCwd = (...arg) => path.resolve(process.cwd(), ...arg)

const PLUGIN_NAME = `integration`
const WATCH_DIR = resolveCwd('./src/shared/intl/messages')
const ENTRY = resolveCwd(WATCH_DIR, 'index.ts')
const OUTPUT_DIR = resolveCwd('./src/locale')
const GLOBALLY_UNIQUE_NAME = '_xxxxxx'
const DEFAULT_LANGUAGES = 'zh-CN'

const FILES = [DEFAULT_LANGUAGES, 'en-US'];

const build = async () => {
  const res = await vite({
    configFile: false,
    logLevel: 'silent',
    build: {
      write: false,
      lib: {
        entry: ENTRY,
        name: GLOBALLY_UNIQUE_NAME,
        formats: ['iife'],
      },
    },
  })
  return res?.[0]?.output?.[0]?.code;
}

const transform = async (code) => {
  let sandbox = { [GLOBALLY_UNIQUE_NAME]: null }
  const script = new vm.Script(code);
  script.runInNewContext(sandbox)

  return Object
    .entries<any>(sandbox[GLOBALLY_UNIQUE_NAME])
    .reduce(
      (obj, [key, value]) => (
        obj[key] = value?.defaultMessage, obj
      ),
      {}
    )
}

const integrationServer = async () => {
  try {
    !fs.existsSync(OUTPUT_DIR) && await fs.mkdirSync(OUTPUT_DIR);
    const code = await build();
    const content = await transform(code);
    await Promise.all(
      FILES.map(async (fileName) =>
        await fs.writeJSON(
          `${OUTPUT_DIR}/${fileName}.json`,
          { ...content, _: fileName },
          { spaces: 2 }
        )
      )
    )
    console.log(colors.green(`[${PLUGIN_NAME}]: Successfully`));
  } catch (error) {
    console.log(colors.red(`[${PLUGIN_NAME}]: failed`));
    console.log(error);
    process.exit(1)
  }
}

function vitePluginIntegrationIntlMessage (): Plugin {
  return {
    name: PLUGIN_NAME,
    handleHotUpdate ({ file }) {
      if (file.startsWith(WATCH_DIR) && file.endsWith('.ts')) {
        integrationServer()
      }
    },
    configResolved () {
      integrationServer()
    }
  }
}

export default vitePluginIntegrationIntlMessage