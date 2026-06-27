# templ

## Commands

### templ.setup
This command downloads and extracts a template, applying variable substituions
as found in the config (if any). Any of the required arguments can be skipped
if their value is present in a shortcut being used.

`[shortcut]` _optional_
The first positional argument can be a shortcut name that will check the
shortcuts file for values to supply to any of the required arguments. You can
use the init command to generate a template file that has an example of how to
configure shortcuts.

`--dest [target]` _optional_

The directory to unzip the template into, defaults to the current directory.

`--repo <github repo>` _required_

The name of the repo on github (`user/repo`).

`--tag <tag name>` _required_

The tag to download from the repo. If the repo does not have tags, you cannot
download a template from it.

`--folder <source folder>` _required_

The folder inside the repo that contains the template files.

### templ.init
Initializes the templates shortcut file with some example data if it doesn't
exist aready. If the file does exist, this command will report that and do
nothing with the existing file.

## Template Variables
Inside template files, `{{var:<variable name>}}` can be used to insert variables
that are specified at setup time.

To set values for the variables when using the setup command, make a file called
`.templ-vars.yml` in the directory where the command is being run. The file
should have key value pairs for any variables that you want to substitute. Any
variables that do not have a value will be left alone.

> The variable file is optional. The automatic variables in the next section
> are available even if the file is not specified. The file is only required if
> you want to add your own variables+values.

```yml
# .templ-vars.yml
var1: some value
var2: another value
```

### Automatic Variables
templ will give a couple of variables for free without requiring the template
variable file (and the file can override these).
- `cwd` _Full path of the directory the command is run in_
- `dirname` _basename() of the cwd_
- `timestamp` _Unix millisecond timestamp for when the command is run_
- `isodate` _ISO Date string for the timestamp, in local timezone (ex 2026-06-25)_
