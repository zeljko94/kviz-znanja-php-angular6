<?php

class OdgovorVM{
    public $ID;
    public $Text;
    public $IsTocan;
    public $PitanjeID;
}

class PitanjeVM{
    public $ID;
    public $Text;
    public $odgovori = [];
}

class Pitanje{
    public static function GetAll(){
        $db = new DB();

        $db->Query("SELECT * FROM pitanje", []);

        if($db->getResult()){
            echo json_encode($db->getResult(), JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
            return;
        }

        echo json_encode([]);
        return;
    }


    public static function GetPitanjaIOdgovoreForKviz($kvizID){
        $db = new DB();

        $pitanjaVM = [];
        $db->Query("SELECT * FROM pitanje WHERE ID IN (SELECT PitanjeID FROM kvizpitanje WHERE KvizID=?)", [$kvizID]);

        $pitanja = $db->getResult();
        for($i=0; $i<count($pitanja); $i++){
            $pitanjeVM = new PitanjeVM();
            $pitanjeVM->ID = $pitanja[$i]["ID"];
            $pitanjeVM->Text = $pitanja[$i]["Text"];

            array_push($pitanjaVM, $pitanjeVM);

            $db->Query("SELECT * FROM odgovor WHERE PitanjeID=?", [$pitanjeVM->ID]);
            $odgovori = $db->getResult();
            for($j=0; $j<count($odgovori); $j++){
                $odgovorVM = new OdgovorVM();
                $odgovorVM->ID = $odgovori[$j]["ID"];
                $odgovorVM->Text = $odgovori[$j]["Text"];
                $odgovorVM->IsTocan = $odgovori[$j]["IsTocan"];
                $odgovorVM->PitanjeID = $odgovori[$j]["PitanjeID"];

                array_push($pitanjeVM->odgovori, $odgovorVM);
            }
        }

        echo json_encode($pitanjaVM);

    }

    public static function GetForKviz($kvizID){
        $db = new DB();

        $db->Query("SELECT * FROM pitanje WHERE ID IN (SELECT PitanjeID FROM kvizpitanje WHERE KvizID=?)", [$kvizID]);

        if($db->getResult()){
            echo json_encode($db->getResult(), JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
            return;
        }

        echo json_encode([]);
        return;
    }


    public static function Get($id){
        $db = new DB();

        $db->Query("SELECT * FROM pitanje WHERE ID=?", [$id]);

        if($db->getResult()){
            echo json_encode($db->getResult()[0], JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
            return;
        }

        echo json_encode(null);
        return;
    }
    public static function Delete($id){
        $db = new DB();
        $db->Query("DELETE FROM pitanje WHERE ID=?", [$id]);

        if($db->getRows()){
            echo json_encode(1);
            return;
        }

        echo json_encode(-1);
        return;
    }
    public static function Update($o){
        $db = new DB();
        $db->Query("UPDATE pitanje SET Text=? WHERE ID=?", [$o->Text, $o->ID]);

        if($db->getRows()){
            echo json_encode(1);
            return;
        }

        echo json_encode(-1);
        return;
    }
    public static function Insert($o){
        $db = new DB();
        $db->Query("INSERT INTO Pitanje(Text) VALUES(?)", [$o->Text]);

        if($db->getRows()){
            echo json_encode($db->getConn()->lastInsertId(), JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
            return;
        }

        echo json_encode(-1);
        return;
    }
}

$app->get("/pitanje", function(){
    Pitanje::GetAll();
});


$app->get("/pitanje/:id", function($id){
    Pitanje::Get($id);
});

$app->get("/pitanje/GetPitanjaIOdgovoreForKviz/:id", function($id){
    Pitanje::GetPitanjaIOdgovoreForKviz($id);
});


$app->get("/pitanje/getforkviz/:id", function($id){
    Pitanje::GetForKviz($id);
});


$app->get("/pitanje/delete/:id", function($id){
    Pitanje::Delete($id);
});

$app->post("/pitanje/update", function(){
    $data = json_decode(file_get_contents("php://input"));
    Pitanje::Update($data);
});

$app->post("/pitanje/insert", function(){
    $data = json_decode(file_get_contents("php://input"));
    Pitanje::Insert($data);
});