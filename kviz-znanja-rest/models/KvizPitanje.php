<?php


class KvizPitanje{
    public static function GetForKviz($kvizID){
        $db = new DB();
        $db->Query("SELECT PitanjeID FROM kvizpitanje WHERE KvizID=?", [$kvizID]);

        $ids = [];
        if($db->getResult()){
        	for($i=0; $i<count($db->getResult()); $i++){
        		array_push($ids, $db->getResult()[$i]["PitanjeID"]);
        	}
            echo json_encode($ids, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
            return;
        }

        echo json_encode(null);
        return;
    }


    public static function DeleteForKviz($kvizID){
        $db = new DB();
        $db->Query("DELETE FROM kvizpitanje WHERE KvizID=?", [$kvizID]);

/*
        if($db->getRows()){
            echo json_encode(1, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
            return;
        }
        */

        echo json_encode(1);
        return;
    }



    public static function InsertForKviz($kvizID, $pitanjaIDList){
        $db = new DB();
        KvizPitanje::DeleteForKviz($kvizID);

        for($i=0; $i<count($pitanjaIDList); $i++){
        	$db->Query("INSERT INTO kvizpitanje(KvizID, PitanjeID) VALUES(?,?)", [$kvizID, $pitanjaIDList[$i]]);
        }

        if($db->getRows()){
            echo json_encode(1, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
            return;
        }

        echo json_encode(-1);
        return;
    }
}


$app->get("/kvizpitanje/forkviz/:id", function($kvizID){
    KvizPitanje::GetForKviz($kvizID);
});

$app->get("/kvizpitanje/deleteforkviz/:id", function($kvizID){
    KvizPitanje::DeleteForKviz($kvizID);
});

$app->post("/kvizpitanje/insertforkviz", function(){
    $data = json_decode(file_get_contents("php://input"));
    KvizPitanje::InsertForKviz($data->KvizID, $data->PitanjaIDList);
});
