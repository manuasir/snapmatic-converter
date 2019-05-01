const snapmaticToJpeg = require('../lib/snapmatic-to-jpeg');
const { debug } = require('../package.json');
// start process if correct number of arguments was passed
if (process.argv.length <= 3) {
  throw new Error('Usage:  snapmatic-converter <directory>');
}
const src = process.argv[2];
const dst = process.argv[3];
debug && console.log('src ', src);
debug && console.log('dst ', dst);
const converter = new snapmaticToJpeg(src, dst);
converter.process();
