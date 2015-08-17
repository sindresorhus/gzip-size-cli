#!/usr/bin/env node
'use strict';
var fs = require('fs');
var meow = require('meow');
var fn = require('gzip-size');

var cli = meow({
	help: [
		'Usage',
		'  $ gzip-size <file>',
		'  $ cat <file> | gzip-size',
		'',
		'Example',
		'  $ gzip-size index.js',
		'  211'
	]
});

var input = cli.input[0];

if (!input && process.stdin.isTTY) {
	console.error('Specify a filename');
	process.exit(1);
}

var source = input ? fs.createReadStream(input) : process.stdin;

source.pipe(fn.stream()).on('gzip-size', console.log);
