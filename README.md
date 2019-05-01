## GTA Snapmatic image converter to JPEG

### Description

It will scan for Snapmatic images in the source directory, and then it will convert them into JPEG format and will locate them into the destination source.

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

Also you can use as an exportable module:

```
const Converter = require('snapmatic-converter')
const snapToJpg = new Converter('srcdir','dstdir')
snapToJpg.process()
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