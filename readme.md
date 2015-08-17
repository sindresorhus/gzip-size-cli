# gzip-size-cli [![Build Status](https://travis-ci.org/sindresorhus/gzip-size-cli.svg?branch=master)](https://travis-ci.org/sindresorhus/gzip-size-cli)

> Get the gzipped size of a file or stdin


## Install

```
$ npm install --global gzip-size-cli
```


## Usage

```
$ gzip-size --help

  Usage
    $ gzip-size <file>
    $ cat <file> | gzip-size

  Example
    $ gzip-size index.js
    211
```


## Tip

Combine it with [`pretty-bytes`](https://github.com/sindresorhus/pretty-bytes) to get a human readable output:

```
$ gzip-size jquery.min.js | pretty-bytes
29.34 kB
```


## Related

- [gzip-size](https://github.com/sindresorhus/gzip-size) - API for this module


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
