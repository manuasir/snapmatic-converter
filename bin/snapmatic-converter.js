#!/usr/bin/env node
const snapmaticToJpeg = require('../lib/snapmatic-to-jpeg');
const { debug } = require('../package.json');
// start process if correct number of arguments was passed
if (process.argv.length != 4) {
  console.log(
    'Usage:  snapmatic-converter <source folder> <destination folder>'
  );
  process.exit(-1);
}
const src = process.argv[2];
const dst = process.argv[3];
debug && console.log('src ', src);
debug && console.log('dst ', dst);
const converter = new snapmaticToJpeg(src, dst);
converter.convertAllFiles();
