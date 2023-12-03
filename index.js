// TODO: Include packages needed for this application

const inquirer = require('inquirer');
const fs = require('fs');

// TODO: Create an array of questions for user input

const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of the project?',
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
        name: 'documentation',
        message: 'Is there any further documentation you could provide to help users better understand your project?'
    },
    {
        type: 'input',
        name: 'sources',
        message: 'List any notable sources you used to help you through the project:',
    },
    {
        type: 'input',
        name: 'badgeUrl',
        message: 'If you chose a license, what is the badge url for the chosen license?',

    }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFileSync(fileName, data);
    console.log(`README.md file crated successfully as ${fileName}`);
}

// TODO: Create a function to initialize app
function init() {
    inquirer
        .prompt(questions)
        .then((answers) => {
            // generate README based on user input
            const readmeContent = `
            # ${answers.title}
            
            # Description:
            ${answers.description}
            
            # Usage:
            ${answers.usage}
            
            # Technologies:
            ${answers.technology}
            
            # Documentation:
            ${answers.documentation}
            
            # Sources
            ${answers.sources}
            
            # Screenshot:

            # Link:

            `;

            // write content to file
            writeToFile('README.md', readmeContent);
        })
        .catch((error) => {
            console.error('There was an error writing file:', error);
        })
}

// Function call to initialize app
init();
