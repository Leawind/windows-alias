| English | [简体中文](README.zh.md) |
| ------- | -------------------------- |

# windows-alias

Define command alias on Windows. A little bit similar to Linux command `alias`.

## Installation

Install globally

```bat
npm i -g windows-alias
```

Set your first alias

```bat
windows-alias set alias windows-alias
```

Before using the alias, you need to add a directory path to the `PATH` environment variable.

Run the command below and it will tell you what directory needs to be added.

```bat
windows-alias addPath
```

Now you can use `alias` to run `windows-alias`.

<details>

<summary><code>alias -h</code></summary>

```
Usage: windows-alias [options] [command]

Command aliases on Windows

Options:
  -v --version                    output the version number
  -h, --help                      display help for command

Commands:
  dir                             open directory
  addPath                         add dir to path
  testPath                        Test if dir is added to path
  ls [search]                     list alias
  set [options] <name> <command>  set alias
  rm <name>                       remove alias
  help [command]                  display help for command
```

</details>

## Usage

### Add alias

```bat
alias set clear cls
```

### Add alias includes spaces

```bat
alias set nig "npm i -g"
```

### Show all defined aliases

List all

```bat
alias ls
```

```
clear   ==> cls %*
nig     ==> npm i -g %*
pwd     ==> echo %cd% %*
unalias ==> alias rm %*
```

Search by name

```bat
alias ls gradle
```

```
gradle75  ==> D:\gradle\gradle-7.5\bin\gradle.bat %*
gradle802 ==> D:\gradle\gradle-8.0.2\bin\gradle.bat %*
gradle811 ==> D:\gradle\gradle-8.1.1\bin\gradle.bat %*
gradle83  ==> D:\gradle\gradle-8.3\bin\gradle.bat %*
gradle84  ==> D:\gradle\gradle-8.4\bin\gradle.bat %*
```

### Remove alias

```bat
alias rm gradle84
```

### Open aliases directiory

Open the directory that contains all defined aliases. (Usually at `%USERPROFILE%\.alias.d`)

```bat
alias dir
```
