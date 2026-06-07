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

export default args
