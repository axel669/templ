import args from "./args.js"
import exit from "./exit.js"
import templates from "./templates.js"

const config = {
    ...(templates[args.positionals[0]] ?? {}),
    ...args.values,
}

if (config.repo === undefined) {
    exit.missingRepo("Missing repo")
}
if (config.tag === undefined) {
    exit.missingTag("Missing tag")
}
if (config.folder === undefined) {
    exit.missingfolder("Missing folder")
}

export default config
