'use strict';
const fs = require('fs');
const execa = require('execa');
const test = require('ava');
const gzipSize = require('gzip-size');

const fixture = fs.readFileSync('test.js', 'utf8');

test('main', async t => {
	const {stdout} = await execa('./cli.js', ['test.js']);
	t.regex(stdout, /^\d+ B$/);
});

test('file', async t => {
	const {stdout} = await execa('./cli.js', ['test.js', '--raw']);
	t.is(Number.parseInt(stdout, 10), gzipSize.sync(fixture));
});

test('stdin', async t => {
	const {stdout} = await execa('./cli.js', ['test.js', '--raw'], {
		input: fs.createReadStream('test.js')
	});
	t.is(Number.parseInt(stdout, 10), gzipSize.sync(fixture));
});
