import { parseArgs } from "node:util"
import path from "node:path"
import fs from "fs-jetpack"

const args = parseArgs({
    options: {
        repo: {
            type: "string",
            short: "r",
        },
        tag: {
            type: "string",
            short: "t",
        },
        folder: {
            type: "string",
            short: "f",
        },
        dest: {
            type: "string",
            short: "d",
            default: "."
        }
    },
    allowPositionals: true
})

if (args.positionals[0] === "?") {
    console.log(
        fs.read(
            path.resolve(
                import.meta.dirname,
                "..",
                "readme.md"
            )
        )
    )
    process.exit(0)
}

export default args
