<?php
header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: *');

header("Access-Control-Allow-Headers: *");


include 'DB.php';
require 'Slim/Slim.php';



\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();



require_once 'models/User.php';
require_once 'models/Kviz.php';
require_once 'models/Pitanje.php';
require_once 'models/Odgovor.php';
require_once 'models/KvizPitanje.php';
require_once 'models/Rezultat.php';


$app->run();


