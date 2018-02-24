function LoginController(){

  var meetup;
  var users;
  function loadUsers(receivedUsers){
    users = receivedUsers;
  }

  function setMeetup(inMeetup) {
      meetup = inMeetup;
  }

  function isValidUserId(user) {
      if (meetup) {
          return meetup.isValidUserId(user);
      }
  }

  function isValidUserId(user) {
    return users.indexOf(user) >= 0;
  }

  function isValidUserIdAsync(user, callback){
  setTimeout(function(){callback(users.indexOf(user) >= 0)}, 1);
  }

  function isAuthorizedPromise(user){
    return new Promise(function(resolve){
        setTimeout(function(){resolve(users.indexOf(user) >= 0)}, 10);
    });
  }

  function getUserNameOld(req, res) {
    res.render('userName');
  }

  function getUserName(req, res) {
    try {
        if (req.meetup.isValidUserId('admin')) {
            return res.render('userName');
        }
        res.render('notAuth');
    } catch (e) {
        res.render('error');
    }
  }

  return {
    isValidUserId,
    isValidUserIdAsync,
    loadUsers,
    isAuthorizedPromise,
    getUserName,
    getUserNameOld
  }
}

module.exports = LoginController();
