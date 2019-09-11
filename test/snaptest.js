const chai = require('chai');
const assert = require('assert');
const expect = chai.expect;
const { SnapConverter } = require('../lib');
chai.should();
const src = `${__dirname}/src/`;
const dst = `${__dirname}/dst/`;
describe('Snapmatic tests using ASSERT interface from CHAI module: ', () => {
  describe('Check addTested Function: ', () => {
    describe('Load', () => {
      it('The module is loaded correctly.', () => {
        assert(SnapConverter);
      });
    });
    //-------------------------------------//
    describe('Create', () => {
      it('An object is created correctly.', () => {
        assert(new SnapConverter('/test'));
      });
    });
    //-------------------------------------//
    describe('Getters', () => {
      it('Get source path.', () => {
        const temp = new SnapConverter(src, dst);
        expect(temp.srcPath.should.be.a('string'));
        expect(temp.srcPath.should.equal(src));
      });
      it('Get destination path.', () => {
        const temp = new SnapConverter(src, dst);
        expect(temp.dstPath.should.be.a('string'));
        expect(temp.dstPath.should.equal(dst));
      });
      it('Get default source path.', () => {
        const temp = new SnapConverter();
        expect(temp.srcPath.should.be.a('string'));
        expect(temp.srcPath.should.equal('/tmp/source'));
      });
      it('Get default destination path.', () => {
        const temp = new SnapConverter();
        expect(temp.dstPath.should.be.a('string'));
        expect(temp.dstPath.should.equal('/tmp/converted'));
      });
    });
    //-------------------------------------//
    describe('Create', () => {
      it('Create new directory that does not exist.', () => {
        const temp = new SnapConverter();
        expect(
          temp.createDstDir.bind(temp.createDstDir, '/tmp/test')
        ).to.not.throw(Error);
      });
    });
    //-------------------------------------//
    describe('Convert', () => {
      it('Convert all files in directory.', () => {
        const temp = new SnapConverter(src, dst);
        expect(() => temp.convertAllFiles()).to.not.throw(Error);
      });
      it('Convert one file in directory.', () => {
        const temp = new SnapConverter(src, dst);
        expect(() => temp.convertSingleFile('PGTA5702817641')).to.not.throw(
          Error
        );
      });
      it('Convert a set of files in directory.', () => {
        const temp = new SnapConverter(src, dst);
        expect(() =>
          temp.convertSomeFiles([
            'PGTA5702817641',
            'PGTA51370982198',
            'PGTA5304958339'
          ])
        ).to.not.throw(Error);
      });
    });
  });
});
