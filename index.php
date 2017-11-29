<!doctype html>
<html>

<head>
  <meta charset="utf8">
  <title>Fessie reborn</title>
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      background-color: #000000;
      padding: 0;
    }

    #navigation {
      min-height: 30px;
      min-width: 100%;
      background: #000000;
      box-shadow: 5px 55px 50px -20px #b6b6b6;
      display: flex;
      align-content: center;
      vertical-align: middle;
    }

    #navigation>a {
      padding-top: 7px;
      background: #1a1a1a;
      font-family: "Lucida Console";
      color: white;
      text-decoration: none;
      text-align: center;
      vertical-align: middle;
      width: 33%;
    }

    #navigation>a:hover {

      color: rgb(248, 132, 0);
    }

    canvas {
      margin: 0;
      padding: 0;
    }
    
  </style>
</head>

<body onload="main();">

  <div id="navigation">
    <a href="#" id="gamelink">Game</a>
    <a href="#">Info</a>
    <?php 
    if(!empty($_GET['lvl'])){
      echo '<a href="./editor/?lvl=' . $_GET['lvl'] . '">Level Editor</a>';
    }else{
     echo '<a href="./editor">Level Editor</a>';
    }
  
  ?>
    <a href="#">Login</a>
  </div>

  <div id="wrapper">
    <canvas id="screen">
      Not found
    </canvas>
  </div>


  <script type="text/javascript">
  <?php 
    if(!empty($_GET['lvl'])){
      echo 'var levelString = "' . $_GET['lvl'] .'";';
    }else{
     echo ' var levelString = "1111111111X1355544441X1365544441X1552544441X1555544441X1331711171X1555555551X1331117111X1455555551X1111111111X";';
    }
  
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