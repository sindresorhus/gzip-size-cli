'use strict';
var path = require('path');
var fs = require('fs');
var childProcess = require('child_process');
var test = require('ava');
var gzipSize = require('gzip-size');
var a = fs.readFileSync('test.js', 'utf8');

test('file', function (t) {
	t.plan(3);

	var ps = childProcess.spawn(process.execPath, [path.join(__dirname, 'cli.js'), 'test.js']);

	var out = '';
	var err = '';

	ps.stdout.on('data', function (buf) {
		out += buf;
	});

	ps.stderr.on('data', function (buf) {
		err += buf;
	});

	ps.on('exit', function (code) {
		t.assert(!err, err);
		t.assert(code === 0);
		t.assert(parseInt(out, 10) === gzipSize.sync(a));
	});
});

test('stdin', function (t) {
	t.plan(3);

	var ps = childProcess.spawn(process.execPath, [path.join(__dirname, 'cli.js')]);

	fs.createReadStream('test.js').pipe(ps.stdin);

	var out = '';
	var err = '';

	ps.stdout.on('data', function (buf) {
		out += buf;
	});

	ps.stderr.on('data', function (buf) {
		err += buf;
	});

	ps.on('exit', function (code) {
		t.assert(!err, err);
		t.assert(code === 0);
		t.assert(parseInt(out, 10) === gzipSize.sync(a));
	});
});
