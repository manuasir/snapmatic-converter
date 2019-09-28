import fs from 'fs';
import path from 'path';
import { DEBUG, BASE_DIR } from '../config';
class SnapConverter {
  private _srcPath: string;
  private _dstPath: string;

  /**
   * Class constructor
   * @param srcPath The path where Snapmatic files are located.
   * @param dstPath The path where output files are located.
   */
  constructor(
    srcPath: string = `${BASE_DIR}/source`,
    dstPath: string = `${BASE_DIR}/converted`
  ) {
    this._srcPath = path.normalize(srcPath);
    this._dstPath = path.normalize(dstPath);
  }

  // Getter for srcPath property
  get srcPath(): string {
    return this._srcPath;
  }

  // Setter for srcPath property
  set srcPath(path: string) {
    this._srcPath = path;
  }

  // Getter for dstPath property
  get dstPath(): string {
    return this._dstPath;
  }

  // Setter for dstPath property
  set dstPath(path: string) {
    this._dstPath = path;
  }

  /**
   * Converts one single Snapmatic image to JPEG.
   * @param fileName The name of the file.
   */
  convertSingleFile(fileName: string | boolean = false): void {
    if (typeof fileName !== 'string') {
      throw new Error('Invalid file name.');
    }
    DEBUG && console.log('Analyzing Snapmatic file in folder.');
    const file = this.getFile(fileName);
    if (!file) {
      DEBUG && console.log('No Snapmatic picture found matching that name.');
      return;
    }
    DEBUG && console.log('Creating destination folder if does not exist.');
    this.createDstDir(this.dstPath);
    DEBUG && console.log('Converting Snapmatic file to JPEG. ', file);
    const mergedPath = path.join(this.srcPath, file);
    const convertedImg = this.convert(this.fileToBuffer(mergedPath));
    this.writeFile(path.join(this.dstPath, file), convertedImg);
    DEBUG &&
      console.log(
        `Successfully converted the ${this.srcPath}/${file} image in ${this.dstPath}/${file}.jpg.`
      );

    DEBUG && console.log('Done.');
  }

  // Starts the transformation process iteratively over all Snapmatic files.
  convertAllFiles(): void {
    DEBUG && console.log('Analyzing Snapmatic files in folder.');
    const files = this.getAllFiles();
    if (!files || !Array.isArray(files) || !files.length) {
      DEBUG && console.log('No Snapmatic pictures found.');
      return;
    }
    DEBUG && console.log('Creating destination folder if does not exist.');
    this.createDstDir(this.dstPath);
    DEBUG && console.log('Converting Snapmatic files to JPEG. ', files);
    for (const file of files) {
      const convertedImg = this.convert(
        this.fileToBuffer(path.join(this.srcPath, file))
      );
      this.writeFile(path.join(this.srcPath, file), convertedImg);
      DEBUG &&
        console.log(
          `Successfully converted the ${this.srcPath}/${file} image in ${this.dstPath}/${file}.jpg.`
        );
    }
    DEBUG && console.log('Done.');
  }

  // Starts the transformation process iteratively over some Snapmatic files.
  convertSomeFiles(files: string[]): void {
    DEBUG && console.log('Analyzing Snapmatic files in folder.');
    DEBUG && console.log('Creating destination folder if does not exist.');
    this.createDstDir(this.dstPath);
    DEBUG && console.log('Converting Snapmatic files to JPEG. ', files);
    for (const file of files) {
      const pathJoin = path.join(this.srcPath, file);
      const convertedImg = this.convert(this.fileToBuffer(pathJoin));
      this.writeFile(pathJoin, convertedImg);
      DEBUG &&
        console.log(
          `Successfully converted the ${this.srcPath}/${file} image in ${this.dstPath}/${file}.jpg.`
        );
    }
    DEBUG && console.log('Done.');
  }

  // Writes the converted image into the destination path.
  writeFile(filePath: string, data: any) {
    fs.writeFileSync(`${filePath}.jpg`, data);
  }

  // Gets the file buffer.
  fileToBuffer(filePath: string): Buffer {
    const tempBuffer = fs.readFileSync(filePath);
    return tempBuffer;
  }

  // Creates a new directory for storing the converted images.
  createDstDir(dir: string): void {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  }

  // Gets all the Snapmatic files
  getAllFiles(): string[] {
    const srcPathExists = fs.existsSync(this.srcPath);

    if (!srcPathExists) {
      throw new Error('Source directory does not exist.');
    }

    const result = fs
      .readdirSync(this.srcPath)
      .filter(file => file.startsWith('PGTA'));

    return result;
  }

  // Gets some of the Snapmatic files
  getSomeFiles(files: string[]): string[] {
    const result = this.getAllFiles().filter(file => files.includes(file));
    return result;
  }

  // Get one single Snapmatic file
  getFile(fileName: string): string {
    const result = this.getAllFiles().find(file => file === fileName);
    return result;
  }

  // Creates a new directory for storing the converted images.
  deleteDstDir(dir: string): void {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      return;
    }
    throw new Error('The directory already exists.');
  }

  // Converts a file from a Buffer
  convert(file: Buffer): Buffer {
    // Since the use of new Buffer() is deprecated, Buffer.from() should be used instead:
    // https://nodejs.org/en/docs/guides/buffer-constructor-deprecation/
    const converted = file.slice(
      file.indexOf(Buffer.from([0xff, 0xd8])),
      file.length
    );
    return converted;
  }
}

export { SnapConverter };
