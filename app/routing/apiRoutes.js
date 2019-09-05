var friendsData = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  app.post("/api/friends", function(req, res) {
    var newArr = [];
    var matchIndex = 0;
    var defaultDifference = 100;
    req.body.scores.forEach(element => {
      newArr.push(parseInt(element));
    });
    var userPoints = newArr.reduce((a, b) => a + b, 0);
    req.body.scores = userPoints;

    for (var i = 0; i < friendsData.length; i++) {
      var difference = Math.abs(userPoints - friendsData[i].scores);
      if (difference < defaultDifference) {
        defaultDifference = difference;
        matchIndex = i;
      }
      console.log(matchIndex);
    }

    friendsData.push(req.body);
    res.json(friendsData[matchIndex]);
  });

  app.post("/api/clear", function(req, res) {
    friendsData.length = 0;
    res.json({ ok: true });
  });
};
