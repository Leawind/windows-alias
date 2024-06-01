import fs from "fs";
import path from "path";
import child_process from "child_process";
import os from "os";

namespace WindowsAlias {
	const EXTENSION_BAT = '.bat';

	/**
	 * Converts a script to a command
	 * 
	 * @param script the script to convert
	 */
	export function toCommand(script: string): string {
		return script.replace(/(^\s*@ECHO off\s*SETLOCAL\s*)|(\s*ENDLOCAL\s*$)/g, '').trim();
	}

	/**
	 * Checks if a script is a regular bat script
	 * 
	 * @param script the script to check
	 */
	export function isRegularBatScript(script: string): boolean {
		return /^\s*@ECHO off\s+SETLOCAL\s+(.|\n)\s+ENDLOCAL\s*$/.test(script);
	}
	/**
	 * Converts a command to a script
	 */
	export function toBatScript(cmd: string): string {
		if (isRegularBatScript(cmd))
			return cmd;
		else
			return `
@ECHO off
SETLOCAL

${cmd}

ENDLOCAL
`.trim();
	}

	/**
	 * Gets the path to the config directory
	 * 
	 * @returns the path to the config directory
	 */
	export function getConfigDir(): string {
		return path.join(os.homedir(), ".alias.d");
	}
	/**
	 * Checks if the config directory exists and creates it if it doesn't
	 */
	export function checkConfigDir(): void {
		const configDir = getConfigDir();
		if (!fs.existsSync(configDir)) {
			fs.mkdirSync(configDir, { recursive: true });
		} else if (!fs.statSync(configDir).isDirectory()) {
			throw new Error(`Expected a directory at ${configDir}`);
		}
	}

	/**
	 * Prints the aliases in the config directory
	 * 
	 * @param search the name to search for
	 */
	export function printAliases(search: string = ''): void {
		const configDir = getConfigDir();
		let fileNames = fs.readdirSync(configDir).filter(n => path.parse(n).ext == EXTENSION_BAT);
		const names = fileNames
			.map(n => path.parse(n).name)
			.filter(n => n.includes(search));
		const maxLen = names.reduce((len, n) => Math.max(len, n.length), 0);
		for (const name of names) {
			console.log(`${name.padEnd(maxLen)} ==> ${getCommand(name)!.replace(/\n/g, '\\n')}`);
		}
	}

	/**
	 * Gets the command in config directory for a given name
	 */
	export function getCommand(name: string): string | null {
		const fpath = getFilePath(name);
		if (fs.existsSync(fpath)) {
			const script = fs.readFileSync(fpath, 'utf8');
			return toCommand(script);
		} else {
			return null;
		}
	}
	/**
	 * Removes an alias from the config directory
	 */
	export function remove(name: any): void {
		const fpath = getFilePath(name);
		if (fs.existsSync(fpath)) {
			fs.unlinkSync(fpath);
		} else {
			console.error(`Alias '${name}' does not exist`);
		}
	}
	/**
	 * Gets the file path for a given name
	 */
	export function getFilePath(name: string): string {
		return path.join(getConfigDir(), name + EXTENSION_BAT);
	}
	/**
	 * Set an alias in the config directory
	 */
	export function setAlias(name: string, command: string): void {
		checkConfigDir();
		fs.writeFileSync(getFilePath(name), toBatScript(command), 'utf-8');
	}
	/**
	 * Opens the config directory in the file explorer
	 */
	export function openConfigDirectory(): void {
		child_process.exec(`start ${getConfigDir()}`);
	}
	/**
	 * Checks if the config directory has been added to the PATH environment variable
	 */
	export function isAddedToPath(): boolean {
		const configDir = getConfigDir();
		for (const p of process.env.path!.split(';'))
			if (path.resolve(p) == path.resolve(configDir))
				return true;
		return false;
	}
}

export default WindowsAlias;
