<?php

  $db = new PDO('mysql:host=localhost;dbname=fessie;charset=utf8', 'root', '');
	
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
  <title>Fessie reborn</title>
  <link rel="stylesheet" type="text/css" href="css/game.css">
</head>

<body>

  <div id="navigation">
    <a href="index.php">Game <?php if($levelTesting == false) echo "-LVL".$lvl."-";?> </a>
    <a href="info/">Info</a>
    <?php echo '<a href="./editor?data=' . $levelString . '">Level Editor</a>'; ?>
    <a href="select/">Level Selection</a>
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
  <script type="text/javascript" src="js/textureLoader.js"></script>
  <script type="text/javascript" src="js/audioLoader.js"></script>
  
  <script type="text/javascript" src="js/utils.js"></script>
  <script type="text/javascript" src="js/getters.js"></script>

  <script type="text/javascript" src="js/generals.js"></script>
  <script type="text/javascript" src="js/player.js"></script>
  <script type="text/javascript" src="js/silvermonster.js"></script>
  <script type="text/javascript" src="js/trashmonster.js"></script>
  <script type="text/javascript" src="js/slimemonster.js"></script>

  <script type="text/javascript" src="js/objects.js"></script>

  <script type="text/javascript" src="js/enums.js"></script>
  <script type="text/javascript" src="js/globals.js"></script>
  
  <script type="text/javascript" src="js/worldLoader.js"></script>
  <script type="text/javascript" src="js/main.js"></script>
</body>

</html>