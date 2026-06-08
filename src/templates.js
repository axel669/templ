import os from "node:os"
import path from "node:path"

import exit from "./exit.js"
import { readyaml } from "./returnable.js"

const template = readyaml(
    path.resolve(
        os.homedir(),
        ".axel669",
        "templ-shortcuts.yml"
    )
)
if (template.ok === false) {
    if (template.meta.step === "file") {
        console.log("Unable to load template shortcuts file.")
        console.log("If you have made one, check that it is accessible.")
        console.log("If you have not made one, run tmpl.init to create one.")
        exit.templateLoad()
    }
    console.log("Error reading templates file")
    exit.invalidTemplate(templateInfo.error)
}
export default template.value
