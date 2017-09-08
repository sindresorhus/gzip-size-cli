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

  Options
    --level  Compression level [0-9] (Default: 9)
    --raw    Display value in bytes

  Examples
    $ gzip-size unicorn.png
    192 kB
    $ gzip-size unicorn.png --raw
    192256
```


## Related

- [gzip-size](https://github.com/sindresorhus/gzip-size) - API for this module


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
