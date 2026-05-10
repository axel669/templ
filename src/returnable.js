import { Ok, Err, tryable } from "@axel669/result"
import fs from "fs-jetpack"
import yaml from "js-yaml"

export const readfile = tryable(fs.read)
export const parseYaml = tryable(yaml.load)
export const readyaml = (file) => {
    const content = readfile(file)
    if (content.ok === false) {
        return content.with({ step: "file" })
    }
    const yaml = parseYaml(content.value)
    if (yaml.ok === false) {
        return yaml.with({ step: "parse" })
    }
    return yaml
}
