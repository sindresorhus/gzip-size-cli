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
	  --raw  Display value in bytes

	Examples
	  $ gzip-size unicorn.png
	  192 kB
	  $ gzip-size unicorn.png --raw
	  192256
`, {
	boolean: [
		'raw'
	]
});

const input = cli.input[0];

if (!input && process.stdin.isTTY) {
	console.error('Specify a filename');
	process.exit(1);
}

const source = input ? fs.createReadStream(input) : process.stdin;

source.pipe(gzipSize.stream()).on('gzip-size', size => {
	console.log(cli.flags.raw ? size : prettyBytes(size));
});
