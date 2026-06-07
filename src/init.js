#!/usr/bin/env node

import os from "node:os"
import path from "node:path"
import fs from "fs-jetpack"

import exit from "./exit.js"

console.log("Creating template file...")
const templatePath = path.resolve(
    os.homedir(),
    ".axel669",
    "templ-shortcuts.yml"
)

if (fs.exists(templatePath) !== false) {
    console.log("Template shortcuts file already exists at:")
    console.log(templatePath)
    console.log("Delete the existing file to create a new one.")
    exit.templateExists()
}

const exampleFile = `
# command: templ.setup zephyr
# template name
# zephyr:
#   # git repo
#   repo: axel669/templ
#   # tag required for download targetting
#   tag: latest
#   # the folder inside the repo to extract
#   folder: example/template
`

fs.write(
    templatePath,
    exampleFile
)

console.log(`Template shortcuts file created at:\n${templatePath}`)
