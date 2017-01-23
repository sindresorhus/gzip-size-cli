'use strict';
const fs = require('fs');
const execa = require('execa');
const test = require('ava');
const gzipSize = require('gzip-size');
const prettyBytes = require('pretty-bytes');

const a = fs.readFileSync('test.js', 'utf8');

test('file', async t => {
	const {stdout} = await execa('./cli.js', ['test.js']);
	t.is(parseInt(stdout, 10), gzipSize.sync(a));
});

test('pretty format', async t => {
	const {stdout} = await execa('./cli.js', ['test.js', '--pretty']);
	t.is(stdout, prettyBytes(gzipSize.sync(a)));
});

test('stdin', async t => {
	const {stdout} = await execa('./cli.js', ['test.js'], {
		input: fs.createReadStream('test.js')
	});
	t.is(parseInt(stdout, 10), gzipSize.sync(a));
});
