<?php

  require "../connection.php";

	$sth = $db->prepare("SELECT * FROM levels");
  $sth->execute();
  $result = $sth -> fetchAll();
?>
<!doctype html>
<html>

<head>
  <meta charset="utf8">
  <title>Fessie reborn</title>
  <link rel="stylesheet" type="text/css" href="../css/game.css">
	<style>
		table {
      margin: 0 auto;
      margin-top: 50px;
   }
   td, th{
    padding-top: 7px;
     background: #1a1a1a;
     font-family: "Lucida Console";
     color: white;
     text-decoration: none;
     text-align: center;
     vertical-align: middle;
     width: 33%;
   }
   a:hover{
    color: rgb(248, 132, 0);
    
  }
	h1{
		text-align: center;
	}
	</style>
	</head>

<body>

  <div id="navigation">
    <a href="../">Game</a>
    <a href="../info/">Info</a>
    <a href="../editor/">Level Editor</a>
    <a href="#">Level Selection</a>
    <a href="../score/">My Scoreboard</a>

  </div>
	
	<h1> Level selection </h1>
<table>
<tr>
    <th>Levels</th>
</tr>
<?php foreach($result as $index => $row){
	     echo '<tr><td><a href="../?lvl=' .$row['id'] . '">Level ' . $row['id'] . '</a></td></tr>';
}
?>
</table>

</body>

</html>