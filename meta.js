'use strict'

const { join } = require('path')
const { readFileSync, writeFileSync } = require('fs')
const { get } = require('https')

function getCurrentSHA (author) {
  return new Promise((resolve, reject) => {
    let isBranch = process.argv[2].indexOf('#') > -1

    get({
      host: 'api.github.com',
      path: `/repos/simulatedgreg/electron-vue/commits${isBranch ? '?sha=' + process.argv[2].split('#')[1] : ''}`,
      headers: {
        'User-Agent': author
      }
    }, res => {
      res.setEncoding('utf8')
      let rawData = ''

      res.on('data', chunk => {
        rawData += chunk
      })
      res.on('end', () => {
        try {
          let parsed = JSON.parse(rawData)
          resolve(parsed[0].sha)
        } catch (e) {
          reject(e)
        }
      })
    }).on('error', e => {
      reject(e)
    })
  })
}

function appendSHALink (sha, destDirName) {
  let readmePath = join(destDirName, '/README.md')
  let md = readFileSync(readmePath, 'utf8')
  md = md.replace(
    ' using',
    `@[${sha.substring(0, 7)}](https://github.com/SimulatedGREG/electron-vue/tree/${sha}) using`
  )
  writeFileSync(readmePath, md, 'utf8')
}

module.exports = {
  prompts: {
    name: {
      type: 'string',
      required: true,
      message: 'Application Name'
    },
    description: {
      type: 'string',
      required: false,
      message: 'Project description',
      default: 'An electron-vue project'
    },
    plugins: {
      type: 'checkbox',
      message: 'Select which Vue plugins to install',
      choices: ['axios', 'vue-electron', 'vue-router', 'vuex'],
      default: ['axios', 'vue-electron', 'vue-router', 'vuex']
    },
    eslint: {
      type: 'confirm',
      require: true,
      message: 'Use linting with ESLint?',
      default: true
    },
    eslintConfig: {
      when: 'eslint',
      type: 'list',
      message: 'Which eslint config would you like to use?',
      choices: [
        {
          name: 'Standard (https://github.com/feross/standard)',
          value: 'standard',
          short: 'Standard'
        },
        {
          name: 'AirBNB (https://github.com/airbnb/javascript)',
          value: 'airbnb',
          short: 'AirBNB'
        },
        {
          name: 'none (configure it yourself)',
          value: 'none',
          short: 'none'
        }
      ]
    },    
    storybook: {
      type: 'confirm',
      message: 'Setup Storybook for Vue (https://storybook.js.org/)?',
      required: true
    },
    ui: {
      type: 'checkbox',
      message: 'Setup front-end framework?',
      choices: ['animate.css', 'bootstrap', 'element-ui' ,'font-awesome'],
      default: ['bootstrap','font-awesome']
    },    
    unit: {
      type: 'confirm',
      message: 'Setup unit testing with Karma + Mocha?',
      required: true
    },
    e2e: {
      type: 'confirm',
      message: 'Setup end-to-end testing with Spectron + Mocha?',
      require: true
    },
    builder: {
      type: 'list',
      message: 'What build tool would you like to use?',
      choices: [
        {
          name: 'electron-builder (https://github.com/electron-userland/electron-builder)',
          value: 'builder',
          short: 'builder'
        },
        {
          name: 'electron-packager (https://github.com/electron-userland/electron-packager)',
          value: 'packager',
          short: 'packager'
        }
      ]
    }
  },
  helpers: {
    isEnabled (list, check, opts) {
      if (list[check]) return opts.fn(this)
      else return opts.inverse(this)
    },
    deps (plugins,ui) {
      let output = ''
      let dependencies = {
        'axios': '^0.16.1',
        'vue-electron': '^1.0.6',
        'vue-router': '^2.5.3',
        'vuex': '^2.3.1',
        "animate.css": "^3.6.1",
        "bootstrap": "^4.0.0",
        "element-ui": "^2.2.1",
        "font-awesome": "^4.7.0"
      }
      Object.assign(plugins,ui)

      if (Object.keys(plugins).length > 0) output += ',\n'

      Object.keys(plugins).forEach((p, i) => {
        output += `    "${p}": "${dependencies[p]}"`
        if (i !== Object.keys(plugins).length - 1) output += ',\n'
      })

      return output
    },
    testing (unit, e2e, opts) {
      if (unit || e2e) {
        return opts.fn(this)
      }
    }
  },
  filters: {
    'src/adds/bootstrap/**/*': 'ui[\'bootstrap\']',
    'src/adds/animate.css/**/*': 'ui[\'animate.css\']',
    'src/adds/element-ui/**/*': 'ui[\'element-ui\']',
    'src/adds/font-awesome/**/*': 'ui[\'font-awesome\']',

    'src/adds/bootstrap/stories/**/*': 'storybook',
    'src/adds/animate.css/stories/**/*': 'storybook',
    'src/adds/element-ui/stories/**/*': 'storybook',
    'src/adds/font-awesome/stories/**/*': 'storybook',
    'src/adds/stories-example/**/*': 'storybook', 
    '.storybook/**/*': 'storybook',

    'src/renderer/store/**/*': 'plugins[\'vuex\']',
    'src/renderer/**/*.store.js': 'plugins[\'vuex\']',
    'src/renderer/store.js': 'plugins[\'vuex\']',

    'src/renderer/components/LandingPageView/CurrentPage.vue': 'plugins[\'vue-router\']',
    'src/renderer/routes.js': 'plugins[\'vue-router\']',
    'src/renderer/**/*.routes.js': 'plugins[\'vue-router\']',
    'src/renderer/router.js': 'plugins[\'vue-router\']',
    
    'src/renderer/**/*.spec.js': 'unit',
    'test/unit/**/*': 'unit',

    'test/e2e/**/*': 'e2e',

    '.electron-vue/build.config.js': 'builder === \'packager\'',
    'test/.eslintrc': 'e2e || unit',
    '.eslintignore': 'eslint',
    '.eslintrc.js': 'eslint',
    'appveyor.yml': 'builder === \'builder\'',
    '.travis.yml': 'builder === \'builder\''
  },
  complete (data) {
    getCurrentSHA(data.author).then(sha => {
      let path = !data.inPlace ? data.destDirName : null
      if (path !== null) appendSHALink(sha, path)
      console.log([
        '\n---',
        '',
        'All set. Welcome to your new electron-vue project!',
        '',
        'Make sure to check out the documentation for this boilerplate at',
        '\x1b[33mhttps://simulatedgreg.gitbooks.io/electron-vue/content/\x1b[0m.',
        '',
        `Next Steps:\n${!data.inPlace ? '\n  \x1b[33m$\x1b[0m cd ' + data.destDirName : ''}`,
        '  \x1b[33m$\x1b[0m yarn (or `npm install`)',
        '  \x1b[33m$\x1b[0m yarn run dev (or `npm run dev`)'
      ].join('\n'))
    }, () => {
      console.log('\x1b[33mwarning\x1b[0m Failed to append commit SHA on README.md')
    })
  }
}
