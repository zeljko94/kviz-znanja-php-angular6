<?php

class PitanjeWrapper{
    public $pitanje = null;
    public $odgovori = [];
}


class KvizWrapper{
    public $kviz = null;
    public $pitanja = [];
}

class Kviz{

    public static function Get($id){
        $db = new DB();
        $db->Query("SELECT * FROM kviz WHERE ID=?", [$id]);

        if($db->getResult()){
            echo json_encode($db->getResult()[0], JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
            return;
        }

        echo json_encode(null);
        return;
    }
    public static function GetAll(){
        $sql = "SELECT * FROM kviz";

        $db = new DB();
        $db->Query($sql, []);

        if($db->getResult()){
            echo json_encode($db->getResult(), JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
            return;
        }

        echo json_encode([]);
        return;
    }
    public static function Delete($id){
        $db = new DB();
        $db->Query("DELETE FROM kviz WHERE ID=?", [$id]);

        if($db->getRows()){
            echo json_encode(1);
            return;
        }

        echo json_encode(-1);
        return;
    }
    public static function Update($o){
        $db = new DB();
        $db->Query("UPDATE kviz SET Naziv=? WHERE ID=?", [$o->Naziv, $o->ID]);

        if($db->getRows()){
            echo json_encode(1);
            return;
        }

        echo json_encode(-1);
        return;
    }
    public static function Insert($o){
        $db = new DB();
        $db->Query("INSERT INTO kviz(Naziv) VALUES(?)", [$o->Naziv]);

        if($db->getRows()){
            $id = $db->getConn()->lastInsertId();
            $o->ID = $id;
            echo json_encode($o);
            return;
        }

        echo json_encode(-1);
        return;
    }






    public static function Details($id){
        $db = new DB();
        $kvizWrapper = new KvizWrapper();

        $db->Query("SELECT * FROM kviz WHERE ID=?", [$id]);
        if($db->getResult()){
            $kviz = $db->getResult()[0];
            $kvizWrapper->kviz = $kviz;



            // pitanja za kviz
            $db->Query("SELECT * FROM pitanje WHERE ID IN (SELECT PitanjeID FROM kvizpitanje WHERE KvizID=?)", [$kvizWrapper->kviz["ID"]]);
            if($db->getResult()){
                $pitanja = $db->getResult();
                $pitanjaWrappers = [];



                // za svako pitanje dohvati odgovore
                for($i=0; $i<count($pitanja); $i++){
                    $pitanjeWrapper = new PitanjeWrapper();
                    $pitanjeWrapper->pitanje = $pitanja[$i];

                    $db->Query("SELECT * FROM odgovor WHERE PitanjeID=?", [$pitanja[$i]["ID"]]);
                    if($db->getResult()){
                        $pitanjeWrapper->odgovori = $db->getResult();
                    }

                    array_push($pitanjaWrappers, $pitanjeWrapper);
                }
                $kvizWrapper->pitanja = $pitanjaWrappers;
            }
        }
        echo json_encode($kvizWrapper);
    }
}


$app->get("/kviz", function(){
    Kviz::GetAll();
});

$app->get("/kviz/:id", function($id){
    Kviz::Get($id);
});

$app->get("/kviz/delete/:id", function($id){
    Kviz::Delete($id);
});

$app->post("/kviz/update", function(){
    $data = json_decode(file_get_contents("php://input"));
    Kviz::Update($data);
});

$app->post("/kviz/insert", function(){
    $data = json_decode(file_get_contents("php://input"));
    Kviz::Insert($data);
});

$app->get("/kviz/details/:id", function($id){
    Kviz::Details($id);
});

