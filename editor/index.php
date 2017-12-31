<?php

  $levelString = "";

  if(!empty($_GET['data'])){
    $levelString = $_GET['data'];
  }
    
 
?>
<!doctype html>
<html>

<head>
  <meta charset="utf8">
  <title>Fessie reborn</title>
  <link rel="stylesheet" type="text/css" href="../css/editor.css">
</head>

<body onload="main();">

  <div id="navigation">
  <a href="../">Game</a>
  <a href="../info/">Info</a>
  <a href="#">Level Editor</a>
  <a href="../select/">Level Selection</a>
  </div>
  
  <script type="text/javascript">
  <?php 
     echo 'var levelString = "' . $levelString .'";';
  ?>
  </script>
    
  <div id="palett">
    <img src="../img/air.png" width="32px" height="32px" id="0" style="border:3px solid rgb(248, 132, 0);">      
    <img src="../img/wall.png" width="32px" height="32px" id="1">
    <img src="../img/fessie_neutral.png" width="32px" height="32px" id="2">          
    <img src="../img/dumpster/0.png" width="32px" height="32px" id="3">
    <img src="../img/trash/6.png" width="32px" height="32px" id="4">
    <img src="../img/toxic_trash/3.png" width="32px" height="32px" id="H">

    <img src="../img/force_field/0.png" width="32px" height="32px" id="F">
    <img src="../img/fire_orb/0.png" width="32px" height="32px" id="G">

    <img src="../img/dirt.png" width="32px" height="32px" id="5">
    <img src="../img/exit_open.png" width="32px" height="32px" id="6">          
    <img src="../img/steel_wall.png" width="32px" height="32px" id="7">

    <img src="../img/silver_monster/0.png" width="32px" height="32px" id="8">
    <img src="../img/trash_monster_center/0.png" width="32px" height="32px" id="D">
    <img src="../img/slime_monster_center/0.png" width="32px" height="32px" id="E">

    <img src="../img/bomb.png" width="32px" height="32px" id="9">
    <img src="../img/sewer.png" width="32px" height="32px" id="A">
    <img src="../img/bluewall.png" width="32px" height="32px" id="B">
    <img src="../img/wall_organic.png" width="32px" height="32px" id="C">


    <img src="../img/10x10.png" width="32px" height="32px" id="10x10">
    <img src="../img/20x20.png" width="32px" height="32px" id="20x20">
    <img src="../img/test.png" width="32px" height="32px" id="test">
    <img src="../img/export.png" width="32px" height="32px" id="export">

  </div>
  <div id="wrapper">
    <canvas id="screen">
      Not found
    </canvas>
  </div>
  <script type="text/javascript" src="../js/enums.js"></script>  
  <script type="text/javascript" src="../js/utils.js"></script>  
  <script type="text/javascript" src="../js/textureLoader.js"></script>  
  <script type="text/javascript" src="editor.js"></script>
  
  <script
  src="https://code.jquery.com/jquery-3.2.1.min.js"
  integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
  crossorigin="anonymous"></script>
  
</body>

</html>