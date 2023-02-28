const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const emailValidator = require("email-validator");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

const team = [];

inquirer
  .prompt([
    {
      type: "input",
      message: "What is your team manager's name?",
      name: "name",
      validate(input) {
        if (input === "") {
          return "Please add the manager's name!";
        }
        return true;
      },
    },
    {
      type: "input",
      message: "What is your team manager's id?",
      name: "id",
      validate(input) {
        if (input === "") {
          return "Please add the manager's ID!";
        }
        return true;
      },
    },
    {
      type: "input",
      message: "What is your team manager's email?",
      name: "email",
      validate: (input) => {
        return emailValidator.validate(input)
          ? true
          : "Please enter a valid email address";
      },
    },
    {
      type: "input",
      message: "What is your team manager's office number?",
      name: "officeNumber",
      validate(input) {
        if (input === "") {
          return "Please add the manager's office number";
        }
        return true;
      },
    },
  ])
  .then((res) => {
    const manager = new Manager(res.name, res.id, res.email, res.officeNumber);
    team.push(manager);
    nextEmployeePrompt();
  });

const nextEmployeePrompt = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which type of team member would you like to add?",
        name: "nextEmployee",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team members.",
        ],
      },
    ])
    .then((res) => {
      if (res.nextEmployee === "Engineer") {
        promptForEngineer();
      } else if (res.nextEmployee === "Intern") {
        promptForIntern();
      } else {
        buildPage();
      }
    });
};

const promptForEngineer = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your engineer's name?",
        name: "name",
        validate(input) {
            if (input === "") {
              return "Please add the engineer's name!";
            }
            return true;
          },
      },
      {
        type: "input",
        message: "What is your engineer's id?",
        name: "id",
        validate(input) {
            if (input === "") {
              return "Please add the engineer's ID!";
            }
            return true;
          },
      },
      {
        type: "input",
        message: "What is your engineer's email?",
        name: "email",
        validate: (input) => {
          return emailValidator.validate(input)
            ? true
            : "Please enter a valid email address";
        },
      },
      {
        type: "input",
        message: "What is your engineer's GitHub username?",
        name: "github",
        validate(input) {
            if (input === "") {
              return "Please add the engineer's GitHub username!";
            }
            return true;
          },
      },
    ])
    .then((res) => {
      const engineer = new Engineer(res.name, res.id, res.email, res.github);
      team.push(engineer);
      nextEmployeePrompt();
    });
};

const promptForIntern = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your intern's name?",
        name: "name",
        validate(input) {
            if (input === "") {
              return "Please add the intern's name!";
            }
            return true;
          },
      },
      {
        type: "input",
        message: "What is your intern's id?",
        name: "id",
        validate(input) {
            if (input === "") {
              return "Please add the intern's ID!";
            }
            return true;
          },
      },
      {
        type: "input",
        message: "What is your intern's email?",
        name: "email",
        validate: (input) => {
          return emailValidator.validate(input)
            ? true
            : "Please enter a valid email address";
        },
      },
      {
        type: "input",
        message: "What is your intern's school?",
        name: "school",
        validate(input) {
            if (input === "") {
              return "Please add the intern's school name!";
            }
            return true;
          },
      },
    ])
    .then((res) => {
      const intern = new Intern(res.name, res.id, res.email, res.school);
      team.push(intern);
      nextEmployeePrompt();
    });
};

const buildPage = () => {
  fs.writeFileSync(outputPath, render(team));
  console.log("Your team profile html page has been created successfully!");
};
