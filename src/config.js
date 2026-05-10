import args from "./args.js"
import exitCode from "./exit-code.js"
import templates from "./templates.js"

const config = {
    ...(templates[args.positionals[0]] ?? {}),
    ...args.values,
}

if (config.repo === undefined) {
    console.log("Missing repo")
    process.exit(exitCode.missingRepo)
}
if (config.tag === undefined) {
    console.log("Missing tag")
    process.exit(exitCode.missingTag)
}
if (config.project === undefined) {
    console.log("Missing project")
    process.exit(exitCode.missingProject)
}

export default config
