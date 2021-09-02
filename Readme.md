[![CircleCI](https://circleci.com/gh/kenware/backend-coding-test/tree/master.svg?style=svg)](https://circleci.com/gh/kenware/backend-coding-test/tree/master)
# Xendit Coding Exercise

The goal of these exercises are to assess your proficiency in software engineering that is related to the daily work that we do at Xendit. Please follow the instructions below to complete the assessment.

## Setup

1. Create a new repository in your own github profile named `backend-coding-test` and commit the contents of this folder
2. Ensure `node (>12.19)` and `npm` are installed
3. Run `npm install`
4. Run `npm test`
5. Run `npm start`
6. Hit the server to test health `curl localhost:8010/health` and expect a `200` response 
### Documentation
#### Local Server
Follow these steps to bring up swagger documentation of this project in a web format in the browser.
*  clone this project.
* install packages.
  ```
  npm install
  ```
* Start dev server
  ```
  npm start
  ```
* Navigate to http://localhost:8010/swagger-api-docs on your browser the view the documentation

#### Remote server
* Deploy this project in the cloud eg AWS, Google cloud or Digital ocean
* Navigate to `https://<cloud_server_url>/`swagger-api-docs on your browser the view the documentation