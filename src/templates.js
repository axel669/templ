import os from "node:os"
import path from "node:path"

import exitCode from "./exit-code.js"
import { readyaml } from "./returnable.js"

const template = readyaml(
    path.resolve(
        os.homedir(),
        ".axel669",
        "templates.yml"
    )
)
if (template.ok === false) {
    if (template.meta.step === "file") {
        console.log("Unable to load templates file")
        process.exit(exitCode.templateLoad)
    }
    console.log("Error reading templates file")
    console.error(templateInfo.error)
    process.exit(exitCode.invalidTemplate)
}
export default template.value
