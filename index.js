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

// Code to gather information about the development team members, and render the HTML file.

const team = [];

// Questions to get the manager's info
inquirer
  .prompt([
    {
      type: "input",
      message: "What is your team manager's name?",
      name: "name",
      validate(input) {
        // If the user's input is empty it prompts the user to add a name.
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
        // If the user's input is empty it prompts the user to add a ID.
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
        // It returns true if it's a valid input, otherwise it prompts the user to enter a valid email address.
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
        // If the user's input is empty it prompts the user to add an office number.
        if (input === "") {
          return "Please add the manager's office number";
        }
        return true;
      },
    },
  ])
  .then((res) => {
    // Using manager class and info the user enters to create a manager object.
    const manager = new Manager(res.name, res.id, res.email, res.officeNumber);
    // Add the manager object to the team array.
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
      // Conditional if to choose which prompt will be called depending on the choice the user makes.
      if (res.nextEmployee === "Engineer") {
        promptForEngineer();
      } else if (res.nextEmployee === "Intern") {
        promptForIntern();
      } else {
        // Calls function to generate html and write on team.html
        buildPage();
      }
    });
};

const promptForEngineer = () => {
  // Questions to get the engineer's info
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your engineer's name?",
        name: "name",
        validate(input) {
            // If the user's input is empty it prompts the user to add a name.
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
            // If the user's input is empty it prompts the user to add a ID.
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
          // It returns true if it's a valid input, otherwise it prompts the user to enter a valid email address.
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
            // If the user's input is empty it prompts the user to add a Github username.
            if (input === "") {
              return "Please add the engineer's GitHub username!";
            }
            return true;
          },
      },
    ])
    .then((res) => {
      // Using engineer class and info the user enters to create an engineer object.
      const engineer = new Engineer(res.name, res.id, res.email, res.github);
      // Add the engineer object to team array.
      team.push(engineer);
      nextEmployeePrompt();
    });
};

const promptForIntern = () => {
  // Questions to get the intern's info
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your intern's name?",
        name: "name",
        validate(input) {
            // If the user's input's is empty it prompts the user to add a name.
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
            // If the user's input's is empty it prompts the user to add a ID.
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
          // It returns true if it's a valid input, otherwise it prompts the user to enter a valid email address.
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
            // If the user's input's is empty it prompts the user to add a school name.
            if (input === "") {
              return "Please add the intern's school name!";
            }
            return true;
          },
      },
    ])
    .then((res) => {
      // Using intern class and info the user enters to create an intern object.
      const intern = new Intern(res.name, res.id, res.email, res.school);
      // Add intern object to team array.
      team.push(intern);
      nextEmployeePrompt();
    });
};

// Function to render hmtl in team.html file.
const buildPage = () => {
  fs.writeFileSync(outputPath, render(team));
  console.log("Your team profile html page has been created successfully!");
};
