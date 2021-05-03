#!/usr/bin/env node
import fs from 'node:fs';
import meow from 'meow';
import prettyBytes from 'pretty-bytes';
import gzipSize from 'gzip-size';
import chalk from 'chalk';

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
	flags: {
		level: {
			type: 'number'
		},
		raw: {
			type: 'boolean'
		},
		includeOriginal: {
			type: 'boolean'
		}
	}
});

const [input] = cli.input;

if (!input && process.stdin.isTTY) {
	console.error('Specify a file path');
	process.exit(1);
}

const source = input ? fs.createReadStream(input) : process.stdin;

const options = {};
if (cli.flags.level) {
	options.level = cli.flags.level;
}

source.pipe(gzipSize.stream(options)).on('gzip-size', size => {
	let output = cli.flags.raw ? size : prettyBytes(size);
	if (cli.flags.includeOriginal) {
		const {size: originalSize} = fs.statSync(input);
		output = (cli.flags.raw ? originalSize : prettyBytes(originalSize)) + chalk.dim(' → ') + output;
	}

	console.log(output);
});
