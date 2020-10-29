noto
====

Handy CLI to help dealing with Markdown note taking

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/noto.svg)](https://npmjs.org/package/noto)
[![Downloads/week](https://img.shields.io/npm/dw/noto.svg)](https://npmjs.org/package/noto)
[![License](https://img.shields.io/npm/l/noto.svg)](https://github.com/gil/noto/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g noto
$ noto COMMAND
running command...
$ noto (-v|--version|version)
noto/0.0.0 darwin-x64 node-v14.5.0
$ noto --help [COMMAND]
USAGE
  $ noto COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`noto hello [FILE]`](#noto-hello-file)
* [`noto help [COMMAND]`](#noto-help-command)

## `noto hello [FILE]`

describe the command here

```
USAGE
  $ noto hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ noto hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/gil/noto/blob/v0.0.0/src/commands/hello.ts)_

## `noto help [COMMAND]`

display help for noto

```
USAGE
  $ noto help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_
<!-- commandsstop -->
