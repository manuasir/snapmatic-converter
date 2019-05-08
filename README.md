## GTA Snapmatic image converter to JPEG
![](https://travis-ci.org/manuasir/snapmatic-converter.svg?branch=master)

### Description

Scan for Snapmatic images in a source directory, convert them into JPEG format and place them into the destination source.

### Installation

You can install it as a global NPM module, so you can use all over your system:
```
npm install -g snapmatic-converter
```

Or you can install it locally to a project:

```
npm install snapmatic-converter
```

### Usage

```
$ snapmatic-converter <source-dir> <destination-dir>
```

Also you can use as an usual module:

```
const Converter = require('snapmatic-converter')
const snapToJpg = new Converter('srcdir','dstdir')
snapToJpg.convertAllFiles()
snapToJpg.processSingleFile('PGTA51876361281')
snapToJpg.convertSomeFiles(['PGTA52078400596','PGTA51370982198','PGTA5916100621'])
```

A binary file of the file is already compiled for Linux x86_64, MacOS and Windows operating systems.

```
$ ./bin/snapmatic-converter-linux <source-dir> <destination-dir>
```

### Tests

If you're using this software from NPM, it's already tested. You can pass the tests with `mocha`:

```
npm install
mocha test/snaptest.js
```

## Contribute

If you want to contribute to this project please don't hesitate to send a pull request. You can also open new issues to ask questions and participate in discussions.

## Software and libraries used

- https://nodejs.org
- https://npmjs.com

## Copyright & License


This program is free software; you can redistribute it and/or modify it under the terms of the MIT license.
Find more information about this on the [LICENSE](LICENSE) file.
