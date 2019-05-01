const chai = require('chai')
const assert = require('assert')
const expect = chai.expect
const snapmaticToJpeg = require('../lib/snapmatic-to-jpeg')

describe("Snapmatic tests using ASSERT interface from CHAI module: ", () => {

  describe("Check addTested Function: ", () => {
    describe('Load', () => {
      it('The module is loaded correctly.', () => {
        assert(snapmaticToJpeg)
      })
    })
    //-------------------------------------//
    describe('Create', () => {
      it('An object is created correctly.', () => {
        assert(new snapmaticToJpeg('/test'))
      })
    })
    //-------------------------------------//
    describe('Getters', () => {
      it('Get source path.', () => {
        const temp = new snapmaticToJpeg('src', 'dst')
        expect(temp.getSrcPath()).to.be.a('string')
        expect(temp.getSrcPath()).to.equal('src')
      })
      it('Get destination path.', () => {
        const temp = new snapmaticToJpeg('src', 'dst')
        expect(temp.getDstPath()).to.be.a('string')
        expect(temp.getDstPath()).to.equal('dst')
      })
      it('Get default source path.', () => {
        const temp = new snapmaticToJpeg()
        expect(temp.getSrcPath()).to.be.a('string')
        expect(temp.getSrcPath()).to.equal('/tmp/source')
      })
      it('Get default destination path.', () => {
        const temp = new snapmaticToJpeg()
        expect(temp.getDstPath()).to.be.a('string')
        expect(temp.getDstPath()).to.equal('/tmp/converted')
      })
    })
    //-------------------------------------//
    describe('Create', () => {
      it('Create new directory that does not exist.', () => {
        const temp = new snapmaticToJpeg()
        temp.createDstDir('/tmp/test')
      })

    })
  })
})



