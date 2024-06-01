#!/usr/bin/env node

import os from 'os';
import child_process from "child_process";

import { program } from 'commander';

import WindowsAlias from '..';

if (os.platform() !== "win32") {
	console.error(`This command is for Windows only`);
	process.exit(1);
}

program.name("windows-alias")
	.version('1.1.1', '-v --version')
	.description(`Command aliases on Windows`);

program
	.command("dir")
	.description("open directory")
	.action(() => {
		console.log(`Opening config directory: ${WindowsAlias.getConfigDir()}`);
		WindowsAlias.openConfigDirectory();
	});
program
	.command("addPath")
	.description("add dir to path")
	.action(() => {
		if (WindowsAlias.isAddedToPath()) {
			console.log(`Directory is already added to path!`);
		} else {
			console.log(`Please manually add this path to your environment variable 'PATH': \x1b[4m${WindowsAlias.getConfigDir()}\x1b[24m`);
			child_process.exec("%windir%\\System32\\sysdm.cpl");
		}
	});
program
	.command("testPath")
	.description("Test if dir is added to path")
	.action(() => {
		if (WindowsAlias.isAddedToPath()) {
			console.log(`Directory is already added to path!`);
		} else[
			console.log(`Directory is not added to path yet.\nIf you have already add it just now, please restart the terminal and try again.`)
		];
	});
program
	.command("ls [search]")
	.description("list alias")
	.action((search: string) => {
		WindowsAlias.printAliases(search);
		if (!WindowsAlias.isAddedToPath())
			console.warn("It seems you have not added dir to your PATH. Alias is unavaliable.");
	});
program
	.command("set <name> <command>")
	.option('-n --nosuffix', "Do not add suffix: %*")
	.description("set alias")
	.action((name, command, options) => {
		if (!options.nosuffix) {
			command += ' %*';
		}
		WindowsAlias.setAlias(name, command);
		if (!WindowsAlias.isAddedToPath())
			console.warn("It seems you have not added dir to your PATH. Alias is unavaliable.");
	});
program
	.command("rm <name>")
	.description("remove alias")
	.action((name) => {
		WindowsAlias.remove(name);
	});

program.parse();
