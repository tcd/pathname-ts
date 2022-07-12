import { join } from "path";
import { readFileSync } from "fs";
// var inquirer = require("inquirer");
import inquirer from "inquirer";
import shell from "shelljs"
// import packageJson from "../package.json";
// const packageJson = require("../package.json")


const main = () => {
    const output = shell.exec('git commit -am "Auto-commit"')
    if (shell.exec('git commit -am "Auto-commit"').code !== 0) {
        shell.echo('Error: Git commit failed');
        shell.exit(1);
    }

    // const packageJsonPath = join(process.cwd(), "package.json")
    // const packageJson     = JSON.parse(readFileSync(packageJsonPath).toString())
    // const version         = packageJson.version

    // inquirer
    //     .prompt([
    //         {
    //             name: "confirmation",
    //             type: "confirm",
    //             message: `add tag 'v${version}'? `,
    //         },
    //         {
    //             name: "message",
    //             type: "input",
    //             message: "tag message: ",
    //         },
    //     ])
    //     .then((answers) => {
    //         if (answers.confirmation !== true) {
    //             console.log(`please update version in ${packageJsonPath}`)
    //             process.exit(0)
    //         } else {

    //         }
    //         console.log(answers)
    //     })
    //     .catch((error) => {
    //         if (error.isTtyError) {
    //             // Prompt couldn't be rendered in the current environment
    //         } else {
    //             // Something else went wrong
    //         }
    //     });
}

main()
