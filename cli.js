#!/usr/bin/env node
'use strict';
const fs = require('fs');
const meow = require('meow');
const prettyBytes = require('pretty-bytes');
const gzipSize = require('gzip-size');

const cli = meow(`
	Usage
	  $ gzip-size <file>
	  $ cat <file> | gzip-size

	Options
	  --level  Compression level [0-9] (Default: 9)
	  --raw    Display value in bytes

	Examples
	  $ gzip-size unicorn.png
	  192 kB
	  $ gzip-size unicorn.png --raw
	  192256
`, {
	flags: {
		level: {
			type: 'string'
		},
		raw: {
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
	options.level = Number(cli.flags.level);
}

source.pipe(gzipSize.stream(options)).on('gzip-size', size => {
	console.log(cli.flags.raw ? size : prettyBytes(size));
});
