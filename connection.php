<?php

/* Enter database information here */
$conf['host'] = 'localhost';
$conf['database'] = 'fessie';
$conf['user'] = 'root';
$conf['passwd'] = '';

/* Creates PDO Database object */
$db = new PDO('mysql:host=' . $conf['host'] . ';dbname=' . $conf['database'] . ';charset=utf8', $conf['user'], $conf['passwd']);
