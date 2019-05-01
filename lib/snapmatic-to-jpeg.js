/**
 * GTA Snapmatic to JPEG converter
 * Author: manuasir
 */

"use strict"

const fs = require('fs')

class GTAConverter {

  /**
   * Class constructor
   * @param {String} srcPath The path where Snapmatic files are located.
   */
  constructor(srcPath, dstPath) {
    this.srcPath = srcPath || '/tmp/source'
    this.dstPath = dstPath || '/tmp/converted'
  }

  /**
   * Gets the source path
   * @returns {String} The source path
   */
  getSrcPath() {
    return this.srcPath
  }

  /**
   * Gets the destination path
   * @returns {String} The destination path
   */
  getDstPath() {
    return this.dstPath
  }

  /**
   * Starts the transformation process iteratively over Snapmatic files.
   */
  process() {
    try {
      console.log('Creating destination folder if does not exist.')
      this.createDstDir(this.dstPath)
      console.log('Analyzing Snapmatic files in folder.')
      const files = this.getFiles()
      if (!files || !Array.isArray(files) || files.length === 0 ) {
        console.log('No files found.')
        return
      }
      console.log('Converting Snapmatic files to JPEG. ', files)
      for (let file of files) {
        const convertedImg = this.convert(this.fileToBuffer(`${this.srcPath}${file}`))
        this.writeFile(`${this.dstPath}/${file}`,convertedImg)
        console.log(`Successfully converted the ${this.srcPath}/${file}} image in ${this.dstPath}/${file}.jpg.`)
      }
      console.log('Done.')
    } catch (error) {
      const msg = error.message || error
      console.error(`Error processing files: ${msg}`)
    }
  }

  /**
   * Writes the converted image into the destination path.
   * @param {String} filePath The file's path and name.
   * @param {Buffer} data The HEX data to dump into the new file.
   */
  writeFile(filePath, data) {
    try {
      fs.writeFileSync(`${filePath}.jpg`, data)
    } catch (error) {
      const msg = error.message || error
      throw Error(`Error writing file: ${msg}`)
    }
  }

  /**
   * Gets the file buffer.
   * @param {String} filePath 
   * @returns {Buffer} The file's buffer
   */
  fileToBuffer(filePath) {
    try {
      const tempBuffer = fs.readFileSync(filePath)
      console.log(typeof tempBuffer)
      return tempBuffer
    } catch (error) {
      const msg = error.message || error
      throw Error(`Error generating file buffer: ${msg}`)
    }
  }

  /**
   * Creates a new directory for storing the converted images.
   * @param {String} dir The destination directory
   */
  createDstDir(dir) {
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
      }
    } catch (error) {
      const msg = error.message || erro
      throw Error(`Error creating directory: ${msg}`)
    }
  }

  /**
   * Gets the Snapmatic files
   * @returns {Array} The array of files
   */
  getFiles() {
    try {
      const matchingFiles = []
      const files = fs.readdirSync(this.srcPath)
      for (let file of files) {
        if (file.startsWith('PGTA')) {
          matchingFiles.push(file)
        }
      }
      return matchingFiles
    } catch (error) {
      const msg = error.message || error
      throw Error(`Error getting Snapmatic files: ${msg}`)
    }
  }

  /**
   * Creates a new directory for storing the converted images.
   * @param {String} dir The destination directory
   */
  deleteDstDir(dir) {
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
      } else {
        throw Error('The directory already exists.')
      }
    } catch (error) {
      const msg = error.message || erro
      throw Error(`Error creating directory: ${msg}`)
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
      return file.slice(file.indexOf(Buffer.from([0xff, 0xd8])), file.length)
    } catch (error) {
      const msg = error.message || erro
      throw Error(`Error converting file: ${msg}`)
    }
  }

}

module.exports = GTAConverter