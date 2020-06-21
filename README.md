# WebDriverIO-with-CucumberJS
Boilerplate framework for the WebDriverIO with CucumberJS

## Pre-requisite Steps
1. Perform `npm i` to install all the dependencies present in the package.json file.
2. Ensure to provide the feature file to be run, tagExpression, platform name, device name, baseURL(if required), Report Name, CustomData value in the `wdio.config.js` file.
3. In the `package.json` file, change the script name if required.

### How to run
In the terminal, perform `npm run scriptRun` to start the script execution

### Folder structure
- config - This folder contains `wdio.config.js`.
- features - This folder contains all `.feature` files.
- stepDefinitions - This folder contains the required implementation files in the form of `given.js`, `when.js`, and `then.js`.
- support - This folder is present under `stepDefinitions` file and it contains the required support for `given.js`, `when.js`, and `then.js` files
- reports - This folder contains `index.html` for the generated reports.

### Reports used
`multiple-cucumber-html-reporter`

### After run
Post run, it will create a folder `.tmp` which will contain the required JSON file to be used in generation of the report. Go to `reports` folder and open `index.html` to view the reports. This also contains the screenshots attached to each step.

### Others
Added `eslint` to ensure standard coding structure is in place. At the time of this boilerplate, chosen `standard` as the eslint structure to use. if you wish to change, please see `.eslintrc.js` file to add/append any new things or if you wish to do it from scratch, please perform `npx eslint --init` and follow the instructions.

