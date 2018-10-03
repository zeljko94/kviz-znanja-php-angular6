<?php

class Odgovor{
    public static function GetAll(){
        $db = new DB();

        $db->Query("SELECT * FROM odgovor", []);

        if($db->getResult()){
            echo json_encode($db->getResult(), JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
            return;
        }

        echo json_encode([]);
        return;
    }


    public static function GetForPitanje($pitanjeID){
        $db = new DB();

        $db->Query("SELECT * FROM odgovor WHERE PitanjeID=?", [$pitanjeID]);

        if($db->getResult()){
            echo json_encode($db->getResult(), JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
            return;
        }

        echo json_encode([]);
        return;
    }



    public static function Get($id){
        $db = new DB();

        $db->Query("SELECT * FROM odgovor WHERE ID=?", [$id]);

        if($db->getResult()){
            echo json_encode($db->getResult()[0], JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
            return;
        }

        echo json_encode(null);
        return;
    }
    public static function Delete($id){
        $db = new DB();
        $db->Query("DELETE FROM odgovor WHERE ID=?", [$id]);

        if($db->getRows()){
            echo json_encode(1);
            return;
        }

        echo json_encode(-1);
        return;
    }
    public static function Update($o){
        $db = new DB();
        $db->Query("UPDATE odgovor SET Text=?, IsTocan=?, PitanjeID=? WHERE ID=?", [$o->Text, $o->IsTocan, $o->ID, $o->PitanjeID]);

        if($db->getRows()){
            echo json_encode(1);
            return;
        }

        echo json_encode(-1);
        return;
    }
    public static function Insert($o){
        $db = new DB();
        $db->Query("INSERT INTO Odgovor(Text, IsTocan, PitanjeID) VALUES(?,?,?)", [$o->Text, $o->IsTocan, $o->PitanjeID]);

        if($db->getRows()){
            echo json_encode(1);
            return;
        }

        echo json_encode(-1);
        return;
    }
}

$app->get("/odgovor", function(){
    Odgovor::GetAll();
});


$app->get("/odgovor/:id", function($id){
    Odgovor::Get($id);
});

$app->get("/odgovor/getforpitanje/:id", function($id){
    Odgovor::GetForPitanje($id);
});


$app->get("/odgovor/delete/:id", function($id){
    Odgovor::Delete($id);
});

$app->post("/odgovor/update", function(){
    $data = json_decode(file_get_contents("php://input"));
    Odgovor::Update($data);
});

$app->post("/odgovor/insert", function(){
    $data = json_decode(file_get_contents("php://input"));
    Odgovor::Insert($data);
});