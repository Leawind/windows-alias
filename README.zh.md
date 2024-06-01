| [English](./README.md) | 简体中文 |
| ---------------------- | -------- |

# windows-alias

在 Windows 上定义命令的别名。有点类似于 Linux 的 `alias` 命令。

## 安装

全局安装

```bat
npm i -g windows-alias
```

设置一个别名

```bat
windows-alias set alias windows-alias
```

在使用别名前，需要将一个目录的路径添加到 `PATH` 环境变量中。

运行以下命令，它会告诉你需要添加哪个目录。

```bat
windows-alias addPath
```

现在你可以使用 `alias` 来运行 `windows-alias` 了。

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

## 用法

### 添加别名

```bat
alias set clear cls
```

### 添加包含空格的别名

```bat
alias set nig "npm i -g"
```

### 显示所有已定义的别名

列出所有

```bat
alias ls
```

```
clear   ==> cls %*
nig     ==> npm i -g %*
pwd     ==> echo %cd% %*
unalias ==> alias rm %*
```

按名称搜索

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

### 删除别名

```bat
alias rm gradle84
```

### 打开别名目录

打开包含所有已定义别名的目录。（通常在 `%USERPROFILE%\.alias.d`）

```bat
alias dir
```
