#!/usr/bin/env node

var snapmaticToJpeg = require('../lib/snapmatic-to-jpeg')

// start process if correct number of arguments was passed
if (process.argv.length <= 3) {
  console.log(`Usage:  snapmatic-converter <directory>`)
  process.exit(-1)
}
const src = process.argv[2]
const dst = process.argv[3]
console.log('src ',src)
console.log('dst ',dst)
const converter = new snapmaticToJpeg(src,dst)
converter.process()