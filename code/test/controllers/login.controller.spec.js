var assert = require('assert');
var loginController =  require('../../controllers/login.controller');

var expect = require('chai').expect;
var should = require('chai').should();

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();

var sinon =  require('sinon');

beforeEach(function(){
  console.log('beforeEach');
  loginController.loadUsers(['abc123','xyz321']);
});

describe('LoginController', function(){

  describe('isValidUserId', function(){
    it('should return true if valid user id', function(){
      var isValid = loginController.isValidUserId('abc123')
      expect(isValid).to.be.true;
      //assert.equal(isValid, true);
    });
    it('should return false if invalid user id', function(){
      var isValid = loginController.isValidUserId('abc1234')
      expect(isValid).to.equal(false);
      // assert.equal(isValid, false);
    });

    it('should return false if user id blank');
  });

  describe('isValidUserIdAsync', function(){
    it('should return true if valid user id', function(done){
      this.timeout(5000);
      loginController.isValidUserIdAsync('abc123',
      function(isValid){
          isValid.should.equal(true);
          //assert.equal(isValid, true);
          done();
      });
    });
  });

  describe('isAuthorizedPromise', function(){
    it('should return true if valid user id', function(){
      return loginController.isAuthorizedPromise('abc123').should.eventually.be.true;
    })
  })

  describe('getUserName with spy()', function(){
    it('should return username', function(){
      let req = {};
      let res = {
        render: sinon.spy()
      };
      loginController.getUserNameOld(req, res);
      // console.log(res.render);
      res.render.calledOnce.should.be.true;
      res.render.firstCall.args[0].should.equal('userName');
    })
  });

  describe('getUserName with stub', function(){
    var meetup = {};
    beforeEach(function () {
         meetup = {
            users: ['abc123','xyz321'],
            isValidUserId: function (user) {
               return this.users.indexOf(user) >= 0;
            }
        }
    });
    it('should return username if valid', function(){
      var isValid = sinon.stub(meetup, 'isValidUserId').returns(true);
      let req = {meetup: meetup};
      let res = {
        render: sinon.spy()
      };
      loginController.getUserName(req, res);
      isValid.calledOnce.should.be.true;
      res.render.calledOnce.should.be.true;
      res.render.firstCall.args[0].should.equal('userName');
    })
  });

  describe('getUserName with mock', function(){
      var meetup = {};
      beforeEach(function () {
           meetup = {
              users: ['abc123','xyz321'],
              isValidUserId: function (user) {
                 return this.users.indexOf(user) >= 0;
              }
          }
      });
      it('should return username if valid', function(){
        var isValid = sinon.stub(meetup, 'isValidUserId').returns(true);
        let req = {meetup: meetup};
        let res = {
          render: function(){}
        };
          var mock = sinon.mock(res);
          mock.expects('render').once().withExactArgs('userName');
          loginController.getUserName(req, res);
          isValid.calledOnce.should.be.true;
          mock.verify();
      });
  });

});
