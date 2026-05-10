import { parseArgs } from "node:util"

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
        project: {
            type: "string",
            short: "p",
        },
        dir: {
            type: "string",
            short: "d",
            default: "."
        }
    },
    allowPositionals: true
})

export default args
