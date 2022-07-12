import { join } from "path";
import { readFileSync } from "fs";
// var inquirer = require("inquirer");
import inquirer from "inquirer";
import shell from "shelljs"
// import packageJson from "../package.json";
// const packageJson = require("../package.json")

const addTag = (version, message) => {
    const output = shell.exec(`git tag -a v${version} -m "${message}"`)
    if (output.code !== 0) {
        shell.echo("Error: failed to add git tag");
        shell.exit(1)
    }
}

const main = () => {
    const packageJsonPath = join(process.cwd(), "package.json")
    const packageJson     = JSON.parse(readFileSync(packageJsonPath).toString())
    const version         = packageJson.version

    inquirer
        .prompt([
            {
                name: "confirmation",
                type: "confirm",
                message: `add tag 'v${version}'? `,
            },
            {
                name: "message",
                type: "input",
                message: "tag message: ",
            },
        ])
        .then((answers) => {
            if (answers.confirmation !== true) {
                console.log(`please update version in ${packageJsonPath}`)
                process.exit(0)
            } else {
                addTag(answers.version, answers.message)
                console.log("git tag added")
                process.exit(0)
            }
        })
        .catch((error) => {
            console.error(error)
            process.exit(1)
        });
}

main()
