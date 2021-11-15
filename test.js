import fs from 'node:fs';
import execa from 'execa';
import test from 'ava';
import gzipSize from 'gzip-size';

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
		input: fs.createReadStream('test.js'),
	});
	t.is(Number.parseInt(stdout, 10), gzipSize.sync(fixture));
});

test('include original', async t => {
	const {stdout} = await execa('./cli.js', ['test.js', '--raw', '--include-original']);
	const {size} = fs.statSync('test.js');
	t.is(Number.parseInt(stdout, 10), size);
});

test('include original - stdin', async t => {
	const {stdout} = await execa('./cli.js', ['--raw', '--include-original'], {
		input: fs.createReadStream('test.js'),
	});
	const {size} = fs.statSync('test.js');
	t.is(Number.parseInt(stdout, 10), size);
});
