import { SnapConverter } from '../lib';
const src = `${__dirname}/src/`;
const dst = `${__dirname}/dst/`;
console.log(src);
describe('Snapmatic', () => {
  describe('Check addTested Function: ', () => {
    describe('Load', () => {
      it('The module is loaded correctly.', () => {
        expect(SnapConverter).not.toBeUndefined();
      });
    });
    //-------------------------------------//
    describe('Create', () => {
      it('An object is created correctly.', () => {
        expect(new SnapConverter('/test')).not.toBeUndefined();
      });
    });
    //-------------------------------------//
    describe('Getters', () => {
      it('Get source path.', () => {
        const temp = new SnapConverter(src, dst);
        expect(typeof temp.srcPath).toBe('string');
        expect(temp.srcPath).toEqual(src);
      });
      it('Get destination path.', () => {
        const temp = new SnapConverter(src, dst);
        expect(typeof temp.dstPath).toBe('string');
        expect(temp.dstPath).toEqual(dst);
      });
      it('Get default source path.', () => {
        const temp = new SnapConverter();
        expect(typeof temp.srcPath).toBe('string');
        expect(temp.srcPath).toEqual('/tmp/source');
      });
      it('Get default destination path.', () => {
        const temp = new SnapConverter();
        expect(typeof temp.dstPath).toBe('string');
        expect(temp.dstPath).toEqual('/tmp/converted');
      });
    });
    //-------------------------------------//
    describe('Create', () => {
      it('Create new directory that does not exist.', () => {
        const temp = new SnapConverter();
        expect(() =>
          temp.createDstDir.bind(temp.createDstDir, '/tmp/test')
        ).not.toThrowError();
      });
    });
    //-------------------------------------//
    describe('Convert', () => {
      it('Convert all files in directory.', () => {
        const temp = new SnapConverter(src, dst);
        expect(() => temp.convertAllFiles()).not.toThrowError();
      });
      it('Convert one file in directory.', () => {
        const temp = new SnapConverter(src, dst);
        expect(() =>
          temp.convertSingleFile('PGTA5702817641')
        ).not.toThrowError();
      });
      it('Convert a set of files in directory.', () => {
        const temp = new SnapConverter(src, dst);
        expect(() =>
          temp.convertSomeFiles([
            'PGTA5702817641',
            'PGTA51370982198',
            'PGTA5304958339'
          ])
        ).not.toThrowError();
      });
    });
  });
});
