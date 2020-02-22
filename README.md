## GTA Snapmatic image converter

[![Build Status](https://travis-ci.org/manuasir/snapmatic-converter.svg?branch=master)](https://travis-ci.org/manuasir/snapmatic-converter)

### Description

Scan for Snapmatic images in a source directory, convert them into JPEG format and place them into the destination source.

### Installation

You can install it as a global NPM package:

```sh
$ sudo npm install -g snapmatic-converter
```

Or you can install it locally to a project:

```sh
$ npm install snapmatic-converter --save
```

### Usage

```
$ snapmatic-converter <source-dir> <destination-dir>
```

Also you can use as an usual module:

```js
import { SnapConverter } from 'snapmatic-converter';
const snapToJpg = new SnapConverter('srcdir','dstdir')
snapToJpg.convertAllFiles()
snapToJpg.processSingleFile('PGTA51876361281')
snapToJpg.convertSomeFiles(['PGTA52078400596','PGTA51370982198','PGTA5916100621'])
```

### Tests

If you're using this software from NPM, it's already tested. You can pass the tests with `mocha`:

```sh
$ sudo npm install -g typescript@latest
$ npm install
$ npm test
```

## Contribute

If you want to contribute to this project please don't hesitate to send a pull request. You can also open new issues to ask questions and participate in discussions.

## Software and libraries used

- https://nodejs.org
- https://npmjs.com

## Copyright & License


This program is free software; you can redistribute it and/or modify it under the terms of the MIT license.
Find more information about this on the [LICENSE](LICENSE) file.

# Upload to NPM

```sh
$ sudo npm install -g typescript@latest
$ npm install
$ npm publish
```

# Authors and contributors

- @manuasir (author)
- @jesusgn90 (contributor)