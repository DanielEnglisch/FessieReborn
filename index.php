<?php

  $db = new PDO('mysql:host=localhost;dbname=fessie;charset=utf8', 'root', '');
  $levelString = "";
  $nextLevel = 0;
  $lvl = 1;

  if(!empty($_GET['lvl'])){
    $lvl = $_GET['lvl'];
  }

    $stmt = $db->prepare("SELECT data FROM levels WHERE id = ?");
    $stmt->execute(array($lvl));
    if(!$stmt){
      print_r( $db->errorInfo());
      die;
    }
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
    $levelString = $row['data'];
    $nextLevel = $lvl +1;
 
 
?>


<!doctype html>
<html>

<head>
  <meta charset="utf8">
  <title>Fessie reborn</title>
  <link rel="stylesheet" type="text/css" href="css/game.css">
</head>

<body onload="main();">

  <div id="navigation">
    <a href="#" id="gamelink">Game</a>
    <a href="#">Info</a>
    <a href="./editor">Level Editor</a>
    <a href="#">Login</a>
  </div>

  <div id="wrapper">
    <canvas id="screen">
      Not found
    </canvas>
  </div>


  <script type="text/javascript">
  <?php 
     echo 'var levelString = "' . $levelString .'";';
     echo 'var nextLevel = ' . $nextLevel .';';
  ?>
  </script>

  <script type="text/javascript" src="js/utils.js"></script>
  <script type="text/javascript" src="js/textureLoader.js"></script>
  <script type="text/javascript" src="js/audioLoader.js"></script>
  <script type="text/javascript" src="js/objects.js"></script>
  <script type="text/javascript" src="js/worldLoader.js"></script>
  <script type="text/javascript" src="js/main.js"></script>
</body>

</html>