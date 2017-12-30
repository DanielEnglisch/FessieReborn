<?php

  $db = new PDO('mysql:host=localhost;dbname=fessie;charset=utf8', 'root', '');
	
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
</head>

<body>

  <div id="navigation">
    <a href="../">Game</a>
    <a href="../info/">Info</a>
    <a href="../editor/">Level Editor</a>
    <a href="#">Level Selection</a>
  </div>
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