const { defineConfig } = require("cypress");
const fs = require('fs-extra')
const path = require('path')
const nodemailer = require('nodemailer');
const { execSync } = require('child_process')
const dotenv = require('dotenv');
dotenv.config();

module.exports = defineConfig({
  execTimeout: 10000,
  defaultCommandTimeout: 6000,
  requestTimeout: 10000,
  pageLoadTimeout: 60000,
  responseTimeout: 20000,
  viewportWidth: 1920,
  viewportHeight: 1080,
  videoUploadOnPasses: true,
  retries: {
    runMode: 0,
    openMode: 0
  },
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        log(message){
          console.log(message)
          return null
        },
        sendEmail(specName) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASS,
                },
            });

            const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
            const lastCommit = execSync(`git log --merges --author="$(git show -s --format="%ae" $(git rev-list -1 ${branch}))" --format="%H" --max-count=1`).toString().trim();
            const lastCommitter = execSync(`git show -s --format="%an" ${lastCommit}`).toString().trim();
            const lastCommitterEmail = execSync(`git show -s --format="%ae" ${lastCommit}`).toString().trim();

            const mailOptions = {
                from: process.env.EMAIL,
                to: lastCommitterEmail,
                subject: 'Test Failure Notification',
                text: `Hello ${lastCommitter},\n\nA test has failed in Cypress.\n\nSpec File: ${specName}\n\nPlease check and take appropriate action.\n\nRegards,\nYour Cypress Tests`,
            };

            return new Promise((resolve, reject) => {
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(info);
                    }
                });
            });
          }
      });
      function getConfigurationByFile(file) {
        const pathToConfigFile = path.resolve("cypress/config", `${file}.json`);
        return fs.readJson(pathToConfigFile)
      }
      const file = config.env.configFile || 'demoqa'
      return getConfigurationByFile(file)
    },
    testIsolation: true,
  },
});