# CypressBasedFramework
JS framework for web app

TestCases:
https://docs.google.com/spreadsheets/d/1nPqladpToUJYWf2CLAT39Ka_u1yV0bfIPXxvB-0gm40/edit?usp=sharing

## Before first run (Linux)
1. Clone project
2. Install dependencies via `npm install`
3. Create cypress.env.json file with following variables:
    `login` - empty (or set any valid email of registered user)
    `password` - empty (or set any valid email of registered user)
    `loginAPIURL`: /api/global/login

## Run (Linux)
1. Run all tests from console by running `npx cypress run`
2. Run specific tests via `npx cypress run  --spec "cypress/integration/login.feature"`
3. Also to debug from UI is better to use `npx cypress open`

## Generate test report (Linux)
1. Run command node reportGenerator.js
2. Open report file in cypress/cucumber-html folder