#!/usr/bin/env node
const { SnapConverter } = require('../lib');
const { debug } = require('../package.json');
// start process if correct number of arguments was passed
if (process.argv.length != 4) {
  console.log(
    'Usage:  snapmatic-converter <source folder> <destination folder>'
  );
  process.exit(-1);
}
const [interpreter, filename, src, dst] = process.argv;

if (debug) {
  console.log(`src: ${src}, dst: ${dst}`);
}

const converter = new SnapConverter(src, dst);
converter.convertAllFiles();
