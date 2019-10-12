<?php

  require "connection.php";
	
  $levelString = "";
  $nextLevel = 0;
  $lvl = 1;
  $levelTesting = false;

  if(!empty($_GET['lvl'])){
    $lvl = $_GET['lvl'];
  }
  // If there is no data arg load from db
  if(empty($_GET['data'])){
    $stmt = $db->prepare("SELECT data FROM levels WHERE id = ?");
    $stmt->execute(array($lvl));
    if(!$stmt){
      print_r( $db->errorInfo());
      die;
    }
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
    $levelString = $row['data'];
    $nextLevel = $lvl +1;
  }else{
    $levelString = $_GET['data'];
    $levelTesting = true;
  }
    
?>
<!doctype html>
<html>

<head>
  <meta charset="utf8">
  <title>FessieReborn</title>
  <link rel="stylesheet" type="text/css" href="css/game.css">
</head>

<body>

  <div id="navigation">
    <a href="index.php">Spiel <?php if($levelTesting == false) echo "-LVL".$lvl."-";?> </a>
    <a href="info/">Anleitung</a>
    <?php echo '<a href="./editor?data=' . $levelString . '">Level Editor</a>'; ?>
    <a href="select/">Levelauswahl</a>
    <a href="score/">Scoreboard</a>

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
    if($levelTesting)
      echo 'var levelTesting = true;';
    else
      echo 'var levelTesting = false;';
  ?>
  </script>
  <script type="text/javascript" src="dist/bundle.min.js"></script>
</body>

</html>