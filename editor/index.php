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
      background: black;
      float: left;
      
    }
    
    #palett{
    float:left;
    min-width: 32px;
    height: calc(100% - 30px);
    background: red;
    display: flex;
    flex-flow: wrap;
    align-content: flex-start;
   }
  </style>
</head>

<body onload="main();">

  <div id="navigation">
    <a href="../">Game</a>
    <a href="#">Info</a>
    <a href="#">Level Editor</a>
    <a href="#">Login</a>
  </div>

  <script type="text/javascript">
    <?php 
      if(!empty($_GET['lvl'])){
        echo 'var levelString = "' . $_GET['lvl'] .'";';
      }else{
       echo ' var levelString = "1111111111X1255555551X1555555551X1555555551X1555555551X1555555551X1555555551X1555555551X1555555556X1111111111X";';
      }
    
    ?>
      
    </script>
    
  <div id="palett">
    <img src="../img/air.png" width="32px" height="32px" id="0">      
    <img src="../img/wall.png" width="32px" height="32px" id="1">
    <img src="../img/p.png" width="32px" height="32px" id="2">          
    <img src="../img/dumpster1.png" width="32px" height="32px" id="3">
    <img src="../img/trash13.png" width="32px" height="32px" id="4">
    <img src="../img/dirt.png" width="32px" height="32px" id="5">
    <img src="../img/exit_open.png" width="32px" height="32px" id="6">          
    <img src="../img/steel_wall.png" width="32px" height="32px" id="7">
  </div>
  <div id="wrapper">
    <canvas id="screen">
      Not found
    </canvas>
  </div>
  <script type="text/javascript" src="../js/textureLoader.js"></script>  
  <script type="text/javascript" src="editor.js"></script>
  
  <script
  src="https://code.jquery.com/jquery-3.2.1.min.js"
  integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
  crossorigin="anonymous"></script>
  
</body>

</html>