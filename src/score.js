/*
 * Score: Handles locally stored scoreboard
 */

var setScore = function (lvl, score) {
  if (typeof (Storage) !== "undefined") {

    var scoreboard = JSON.parse(localStorage.getItem("fessie_scoreboard"));
    if (scoreboard == null) {
      console.log("Created new array!");
      scoreboard = new Array();
    }

    scoreboard.forEach(function (item, index, object) {
      if (item.lvl === lvl)
        scoreboard.splice(index, 1);
    });

    scoreboard.push(new Score(lvl, score));
    scoreboard.sort(compare);
    localStorage.setItem("fessie_scoreboard", JSON.stringify(scoreboard));
  }
}

function compare(a, b) {
  if (a.lvl < b.lvl)
    return -1;
  if (a.lvl > b.lvl)
    return 1;
  return 0;
}

var printScoreTable = function (id) {
  if (typeof (Storage) !== "undefined") {

    var scoreboard = JSON.parse(localStorage.getItem("fessie_scoreboard"));
    if (scoreboard == null) {
      scoreboard = new Array();
      localStorage.setItem("fessie_scoreboard", JSON.stringify(scoreboard));
    }
    var table = "<table><tr><th>Level</th><th>Score</th></tr>"
    scoreboard.forEach(function (e) {
      table += "<tr><td>" + e.lvl + "</td><td>" + e.value + "</td>";
    });
    table += "</table>";

  }

  document.getElementById(id).innerHTML = table;

}

function Score(lvl, value) {
  this.lvl = lvl;
  this.value = value;
}