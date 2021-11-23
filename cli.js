#!/usr/bin/env node
import process from 'node:process';
import fs from 'node:fs';
import meow from 'meow';
import prettyBytes from 'pretty-bytes';
import {gzipSizeSync} from 'gzip-size';
import chalk from 'chalk';
import getStdin from 'get-stdin';

const cli = meow(`
	Usage
	  $ gzip-size <file>
	  $ cat <file> | gzip-size

	Options
	  --level             Compression level [0-9] (Default: 9)
	  --raw               Display value in bytes
	  --include-original  Include original size

	Examples
	  $ gzip-size unicorn.png
	  192 kB
	  $ gzip-size unicorn.png --raw
	  192256
	  $ gzip-size unicorn.png --include-original
	  392 kB → 192 kB
`, {
	importMeta: import.meta,
	flags: {
		level: {
			type: 'number',
		},
		raw: {
			type: 'boolean',
		},
		includeOriginal: {
			type: 'boolean',
		},
	},
});

const [input] = cli.input;

if (!input && process.stdin.isTTY) {
	console.error('Specify a file path');
	process.exit(1);
}

const options = {};
if (cli.flags.level) {
	options.level = cli.flags.level;
}

function output(data) {
	const originalSize = data.length;
	const gzippedSize = gzipSizeSync(data);

	let output = cli.flags.raw ? gzippedSize : prettyBytes(gzippedSize);
	if (cli.flags.includeOriginal) {
		output = (cli.flags.raw ? originalSize : prettyBytes(originalSize)) + chalk.dim(' → ') + output;
	}

	console.log(output);
}

(async () => {
	if (input) {
		output(fs.readFileSync(input));
	} else {
		output(await getStdin.buffer());
	}
})();
