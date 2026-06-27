const codes = [
    "good",
    "templateLoad",
    "missingRepo",
    "missingTag",
    "missingProject",
    "invalidTemplate",
    "invalidManifest",
    "failedDownload",
    "templateExists",
    "noVars",
]

export default codes.reduce(
    (funcs, name, code) => {
        funcs[name] = (msg) => {
            console.log(msg)
            process.exit(code)
        }
        return funcs
    },
    {}
)
