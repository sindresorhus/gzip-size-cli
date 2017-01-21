'use strict';
const fs = require('fs');
const execa = require('execa');
const test = require('ava');
const gzipSize = require('gzip-size');

const a = fs.readFileSync('test.js', 'utf8');

test('file', async t => {
	const {stdout} = await execa('./cli.js', ['test.js']);
	t.is(parseInt(stdout, 10), gzipSize.sync(a));
});

test('file', async t => {
	const {stdout} = await execa('./cli.js', ['test.js', '-b']);
	t.is(parseInt(stdout, 10), gzipSize.sync(a));
});

test('stdin', async t => {
	const {stdout} = await execa('./cli.js', ['test.js'], {
		input: fs.createReadStream('test.js')
	});
	t.is(parseInt(stdout, 10), gzipSize.sync(a));
});
