// TODO: Include packages needed for this application

const inquirer = require('inquirer');
const fs = require('fs');
//import * as markdown from './generateMarkdown.js'
// TODO: Create an array of questions for user input

const questions = [
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of the project?',
    },
    {
      type: 'input',
      name: 'tableOfContents',
      message: 'List the section names for the Table of Contents (comma-separated):'
    },
    {
      type: 'input',
      name: 'installation',
      message: 'How can people install and use this project?',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Write a brief description about your project:',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'How would people use this project?'
    },
    {
      type: 'input',
      name: 'technology',
      message: 'What technologies or languages did you use to build this project?',
    },
    {
      type: 'input',
      name: 'contributing',
      message: 'List any contributors for this project:'
    },
    {
      type: 'input',
      name: 'contact',
      message: 'How can people contact you? (gitub username, email, etc.)'
    },
    {
      type: 'list',
      name: 'badgeUrl',
      message: 'If you chose a license, what is the badge url for the chosen license?',
      choices:['Apache','BSD', 'Eclipse', 'IBM', 'MIT', 'Mozilla', 'none']
    },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFileSync(fileName, data);
    console.log(`README.md file crated successfully as ${fileName}`);
}

function renderLicenseBadge(license, colour) {
    if (license) {
      return `[![License](https://img.shields.io/badge/License-${license}}.svg)](https://opensource.org/licenses/${license})`
    } else {
      return ''
    }
  }

function renderLicenseLink(license) {
    if (license) {
      return `[License](https://opensource.org/licenses/${license})`;
    } else {
      return '';
    }
  }

function renderLicenseSection(license) {
    if (license) {
      return `## License
      
    Licensed under the ${license} License. Click [here](${renderLicenseLink(license)})
    for more details.
    `;
    } else {
      return '';
    }
  }

function generateMarkdown(data) {
    return `# ${data.title}
    ${renderLicenseBadge(data.badgeUrl)}
  
    ## Description
  
    ${data.description}
  
    ${renderLicenseSection(data.badgeUrl)}
  `;
  }
  

// TODO: Create a function to initialize app
function init() {

  inquirer
    .prompt(questions)
    .then((answers) => {
      const sectionNames = answers.tableOfContents.split(',').map(section => section.trim());
      const tableOfContents = sectionNames.map(section => `[${capitalize(section)}](#${section.toLowerCase().replace(/\s+/g, '-')})`).join('\n\n');
      console.log('answers -> ', answers);
      
      // generate README based on user input
      const readmeContent = `
# ${answers.title}

## Table Of Contents:
${tableOfContents}

## Installation:
${answers.installation}

## Description:
${answers.description}

## Usage:
${answers.usage}

## Technologies:
${answers.technology}

## Contributors:
${answers.contributing}

## Contact Me:
${answers.contact}

## License:
${renderLicenseBadge(answers.badgeUrl)}
        `;

        // write content to file
        writeToFile('README.md', readmeContent);
    })
    .catch((error) => {
        console.error('There was an error writing file:', error);
    })
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function call to initialize app
init();
