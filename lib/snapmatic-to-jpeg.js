/**
 * GTA Snapmatic to JPEG converter
 * Author: manuasir
 */

'use strict';

const fs = require('fs');
const { debug, baseDir } = require('../config.json');
class SnapConverter {
  /**
   * Class constructor
   * @param {String} srcPath The path where Snapmatic files are located.
   * @param {String} dstPath The path where output files are located.
   */
  constructor(srcPath = `${baseDir}/source`, dstPath = `${baseDir}/converted`) {
    this._srcPath = srcPath;
    this._dstPath = dstPath;
  }

  /**
   * Getter for srcPath property
   */
  get srcPath() {
    return this._srcPath;
  }

  /**
   * Setter for srcPath property
   */
  set srcPath(path) {
    this._srcPath = path;
  }

  /**
   * Getter for dstPath property
   */
  get dstPath() {
    return this._dstPath;
  }

  /**
   * Setter for dstPath property
   */
  set dstPath(path) {
    this._dstPath = path;
  }

  /**
   * Converts one single Snapmatic image to JPEG.
   * @param {String} fileName The name of the file.
   */
  convertSingleFile(fileName) {
    try {
      if (!fileName || typeof fileName !== 'string') {
        throw new Error('Invalid file name.');
      }
      debug && console.log('Analyzing Snapmatic file in folder.');
      const file = this.getFile(fileName);
      if (!file || !Array.isArray(file) || file.length != 1) {
        debug && console.log('No Snapmatic picture found matching that name.');
        return;
      }
      debug && console.log('Creating destination folder if does not exist.');
      this.createDstDir(this.dstPath);
      debug && console.log('Converting Snapmatic file to JPEG. ', file);
      const convertedImg = this.convert(
        this.fileToBuffer(`${this.srcPath}${file}`)
      );
      this.writeFile(`${this.dstPath}/${file}`, convertedImg);
      debug &&
        console.log(
          `Successfully converted the ${this.srcPath}/${file} image in ${
            this.dstPath
          }/${file}.jpg.`
        );

      debug && console.log('Done.');
    } catch (error) {
      const msg = error.message || error;
      console.error(`Error processing file: ${msg}`);
    }
  }

  /**
   * Starts the transformation process iteratively over all Snapmatic files.
   */
  convertAllFiles() {
    try {
      debug && console.log('Analyzing Snapmatic files in folder.');
      const files = this.getAllFiles();
      if (!files || !Array.isArray(files) || files.length === 0) {
        debug && console.log('No Snapmatic pictures found.');
        return;
      }
      debug && console.log('Creating destination folder if does not exist.');
      this.createDstDir(this.dstPath);
      debug && console.log('Converting Snapmatic files to JPEG. ', files);
      for (const file of files) {
        const convertedImg = this.convert(
          this.fileToBuffer(`${this.srcPath}${file}`)
        );
        this.writeFile(`${this.dstPath}/${file}`, convertedImg);
        debug &&
          console.log(
            `Successfully converted the ${this.srcPath}/${file} image in ${
              this.dstPath
            }/${file}.jpg.`
          );
      }
      debug && console.log('Done.');
    } catch (error) {
      const msg = error.message || error;
      console.error(`Error processing files: ${msg}`);
    }
  }

  /**
   * Starts the transformation process iteratively over some Snapmatic files.
   */
  convertSomeFiles(files) {
    try {
      if (!files || !Array.isArray(files) || !files.length) {
        throw new Error('Missing array of files.');
      }
      debug && console.log('Analyzing Snapmatic files in folder.');
      const bufferFiles = this.getSomeFiles(files);
      if (
        !bufferFiles ||
        !Array.isArray(bufferFiles) ||
        bufferFiles.length === 0
      ) {
        debug && console.log('No Snapmatic pictures found.');
        return;
      }
      debug && console.log('Creating destination folder if does not exist.');
      this.createDstDir(this.dstPath);
      debug && console.log('Converting Snapmatic files to JPEG. ', files);
      for (const file of files) {
        const convertedImg = this.convert(
          this.fileToBuffer(`${this.srcPath}${file}`)
        );
        this.writeFile(`${this.dstPath}/${file}`, convertedImg);
        debug &&
          console.log(
            `Successfully converted the ${this.srcPath}/${file} image in ${
              this.dstPath
            }/${file}.jpg.`
          );
      }
      debug && console.log('Done.');
    } catch (error) {
      const msg = error.message || error;
      console.error(`Error processing some files: ${msg}`);
    }
  }

  /**
   * Writes the converted image into the destination path.
   * @param {String} filePath The file's path and name.
   * @param {Buffer} data The HEX data to dump into the new file.
   */
  writeFile(filePath, data) {
    try {
      fs.writeFileSync(`${filePath}.jpg`, data);
    } catch (error) {
      const msg = error.message || error;
      throw Error(`Error writing file: ${msg}`);
    }
  }

  /**
   * Gets the file buffer.
   * @param {String} filePath
   * @returns {Buffer} The file's buffer
   */
  fileToBuffer(filePath) {
    try {
      const tempBuffer = fs.readFileSync(filePath);
      debug && console.log(typeof tempBuffer);
      return tempBuffer;
    } catch (error) {
      const msg = error.message || error;
      throw Error(`Error generating file buffer: ${msg}`);
    }
  }

  /**
   * Creates a new directory for storing the converted images.
   * @param {String} dir The destination directory
   */
  createDstDir(dir) {
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
    } catch (error) {
      const msg = error.message || error;
      throw Error(`Error creating directory: ${msg}`);
    }
  }

  /**
   * Gets all the Snapmatic files
   * @returns {Array.<Buffer>} The array of files
   */
  getAllFiles() {
    try {
      const matchingFiles = [];
      if (!fs.existsSync(this.srcPath)) {
        throw new Error('Source directory does not exist.');
      }

      const files = fs.readdirSync(this.srcPath);
      for (let file of files) {
        if (file.startsWith('PGTA')) {
          matchingFiles.push(file);
        }
      }
      return matchingFiles;
    } catch (error) {
      const msg = error.message || error;
      throw Error(`Error getting Snapmatic files: ${msg}`);
    }
  }

  /**
   * Gets the Snapmatic files
   * @param {Array.<String>} files the array of files to convert
   * @returns {Array.<Buffer>} The array of converted files
   */
  getSomeFiles(files) {
    try {
      if (!fs.existsSync(this.srcPath)) {
        throw new Error('Source directory does not exist.');
      }
      const matchingFiles = [];
      const bufferFiles = fs
        .readdirSync(this.srcPath)
        .filter(item => files.includes(item));
      for (let file of bufferFiles) {
        if (file.startsWith('PGTA')) {
          matchingFiles.push(file);
        }
      }
      return matchingFiles;
    } catch (error) {
      const msg = error.message || error;
      throw Error(`Error getting Snapmatic files: ${msg}`);
    }
  }

  /**
   * Get one single Snapmatic file
   * @param {String} fileName The file name.
   * @returns {Array.<Buffer>} The array of files
   */
  getFile(fileName) {
    try {
      const matchingFile = [];
      if (!fs.existsSync(this.srcPath)) {
        throw new Error('Source directory does not exist.');
      }
      const files = fs
        .readdirSync(this.srcPath)
        .filter(item => item === fileName);
      if (!files || files.length != 1) {
        throw new Error('Cannot find Snapmatic file.');
      }
      const file = files[0];
      if (file.startsWith('PGTA')) {
        matchingFile.push(file);
      }
      return matchingFile;
    } catch (error) {
      const msg = error.message || error;
      throw Error(`Error getting Snapmatic file: ${msg}`);
    }
  }

  /**
   * Creates a new directory for storing the converted images.
   * @param {String} dir The destination directory
   */
  deleteDstDir(dir) {
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      } else {
        throw Error('The directory already exists.');
      }
    } catch (error) {
      const msg = error.message || error;
      throw Error(`Error creating directory: ${msg}`);
    }
  }

  /**
   *
   * @param {Buffer} file The Snapmatic file.
   * @returns {Buffer} The JPEG image file.
   */
  convert(file) {
    try {
      // Since the use of new Buffer() is deprecated, Buffer.from() should be used instead:
      // https://nodejs.org/en/docs/guides/buffer-constructor-deprecation/
      return file.slice(file.indexOf(Buffer.from([0xff, 0xd8])), file.length);
    } catch (error) {
      const msg = error.message || error;
      throw Error(`Error converting file: ${msg}`);
    }
  }
}

module.exports = SnapConverter;
