const cucumberJSON = require('wdio-cucumberjs-json-reporter')
const multipleCucumberHtmlReporter = require('multiple-cucumber-html-reporter')
const moment = require('moment')
const { removeSync } = require('fs-extra')

exports.config = {
  runner: 'local',
  specs: [
    './features/testScenario.feature' // Provide the feature files, which you are going to test
  ],
  exclude: [
    // Use this, if you want to exclude any files for test
  ],
  sync: true,
  maxInstances: 10,
  capabilities: [{
    maxInstances: 5,
    browserName: '', // Provide browser name on which you are going to test
    'goog:chromeOptions': {
      args: ['--start-maximized']
    },
    'cjson:metadata': {
      browser: {
        name: '', // Provide browser name on which you are going to test
        version: '58'
      },
      device: '', // Provide device name (HP, Dell etc...) on which you are going to test
      platform: {
        name: '', // Provide platform name (windows, osx etc...) on which you are going to test
        version: '10'
      }
    }
  }],
  logLevel: 'silent', // Level of logging verbosity: trace | debug | info | warn | error | silent
  bail: 0,
  baseUrl: 'http://www.example.com', // Change it to whatever you wish like
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ['selenium-standalone'],
  framework: 'cucumber',
  reporters: ['cucumberjs-json'],
  cucumberOpts: {
    require: ['./stepDefinitions/given.js', './stepDefinitions/when.js', './stepDefinitions/then.js'],
    backtrace: true,
    requireModule: [],
    dryRun: false,
    failFast: false,
    format: ['pretty'],
    snippets: true,
    source: true,
    profile: [],
    strict: true,
    tagExpression: '@test', // Provide the tag used in your feature file
    timeout: 60000,
    ignoreUndefinedDefinitions: false

  },

  onPrepare () {
    removeSync('.tmp/')
    console.log('Starting cucumber tests')
  },

  async afterStep () {
    await browser.takeScreenshot().then((val) => {
      cucumberJSON.default.attach(val, 'image/png')
    }).catch((err) => {
      console.log('Error in capturing screenshots', err)
    })
  },

  onComplete () {
    multipleCucumberHtmlReporter.generate({
      openReportInBrowser: true,
      reportName: '', // Provide the report name to put it in the reports.
      screenshotPath: './reports/screenshots/',
      displayDuration: true,
      saveCollectedJSON: false,
      jsonDir: '.tmp/json/',
      reportPath: './reports/',
      customData: {
        title: 'Project Data',
        data: [
          { label: 'Project', value: '' }, // Provide the custom data value for project, for example: Test
          { label: 'Release', value: '1.0' },
          { label: 'Execution Start Date', value: moment().format('dddd, MMMM Do YYYY') }
        ]
      }
    })
  }
}