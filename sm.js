// @ts-check
/**
 * Try running install for all the samples
 */
const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const { samples, lspSamples } = require('./samples');

async function tryRunCommand(
	/** @type {string} */ command,
	/** @type {import('./samples').Sample} */ sample,
) {
	const packageJsonPath = path.join(sample.path, 'package.json');
	if (fs.existsSync(packageJsonPath)) {
		try {
			const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString());
			if (packageJson['devDependencies'] || packageJson['dependencies']) {
				console.log(`=== Running ${command} on ${path.basename(sample.path)} ===`);
				child_process.execSync(command, {
					cwd: sample.path,
					stdio: 'inherit'
				});
			}
		} catch (e) {
			console.error(e);
		}
	}
}

const command = process.argv.slice(2).join(' ');
for (const sample of [...samples, ...lspSamples]) {
	tryRunCommand(command, sample);
}
