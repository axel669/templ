#!/usr/bin/env node

import os from "node:os"
import path from "node:path"
import fs from "fs-jetpack"
import * as ff from "fflate"
import pico from "picomatch"
import { Ok, Err } from "@axel669/result"
import { createInterface } from "node:readline/promises"
import http from "@axel669/http"

import config from "./config.js"
import templates from "./templates.js"
import { parseYaml, readyaml } from "./returnable.js"
import exit from "./exit.js"

const cli = createInterface({
    input: process.stdin,
    output: process.stdout,
})

const thenable = (func, ...args) => new Promise(
    (resolve) => func(...args, (err, data) => resolve(data))
)
console.log("Downloading templates...")
const download = await http.get({
    url: `https://github.com/${config.repo}/archive/refs/tags/${config.tag}.zip`,
    parse: http.res.arrayBuffer,
})
if (download.ok === false) {
    console.error(download.error)
    exit.failedDownload(download.error)
}
const buf = Buffer.from(download.value)

// remove trailing slash on folder name if its given
const normalizedFolder = config.folder.replace(/\/$/, "")
// folder regex skips all the of the generated folder name github shoves into
// the download of the zip
const folderRegex = new RegExp(`^[^\\/]+\\/${normalizedFolder}\\/`)
const filter = (file) => {
    if (file.name.endsWith("/") === true) {
        return false
    }
    if (folderRegex.test(file.name) === false) {
        return false
    }
    return true
}
const sourceFiles = await thenable(ff.unzip, buf, { filter })
const files = Object.fromEntries(
    Object.entries(sourceFiles).map(
        (pair) => [
            pair[0].replace(folderRegex, ""),
            Buffer.from(pair[1])
        ]
    )
)

const loadManifest = (source) => {
    if (source === undefined) {
        return Ok({
            varExclude: []
        })
    }
    return parseYaml(
        source.toString("utf8")
    )
}
const manifest = loadManifest(files["manifest.yml"])
if (manifest.ok === false) {
    exit.invalidManifest("Invalid manifest")
}
const exclude = pico(manifest.value.varExclude)
const variables = readyaml(".templ-vars.yml")

const fileCount = Object.keys(files).length
const response = await cli.question(
    `Extract ${fileCount} files into ${config.dest}? type y to cotinue> `
)
if (response !== "y") {
    console.log("Extraction cancelled")
    process.exit(0)
}
cli.close()

const target = fs.cwd(config.dest)
const writeFile = (name, bytes) => {
    if (exclude(name) === true) {
        target.write(name, bytes)
        return
    }
    const content = bytes.toString("utf8")
    const modified = content.replace(
        /\{\{var:([^\}]+)\}\}/g,
        (match, name) => {
            if (variables.ok === false) {
                exit.noVars("Unable to load .templ-vars.yml")
            }
            return variables.value[name] ?? match
        }
    )
    target.write(name, modified)
}
for (const [name, bytes] of Object.entries(files)) {
    console.log(`extracting: ${name}`)
    writeFile(name, bytes)
}
