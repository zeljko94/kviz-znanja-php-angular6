<?php


class Rezultat{
	public static function Insert($o){
        $db = new DB();
        $db->Query("INSERT INTO rezultat(OstvarenihBodova, MaxBodova, Datum, Postotak, UserID, KvizID) VALUES(?,?,?,?,?,?)", [
        	$o->OstvarenihBodova, $o->MaxBodova, $o->Datum, $o->Postotak, $o->UserID, $o->KvizID
        ]);

        if($db->getRows()){
        	$id = $db->getConn()->lastInsertId();
        	$o->ID = $id;
            echo json_encode($o);
            return;
        }

        echo json_encode(null);
        return;
	}


    public static function Delete($id){
        $db = new DB();
        $db->Query("DELETE FROM rezultat WHERE ID=?", [$id]);

        if($db->getRows()){
            echo json_encode(1);
            return;
        }

        echo json_encode(-1);
        return;
    }



	public static function GetAll(){
        $db = new DB();
        $db->Query("SELECT
	r.ID, r.OstvarenihBodova, r.MaxBodova, r.Datum, r.Postotak, r.UserID, r.KvizID, u.Ime as KorisnikIme, k.Naziv as NazivKviza  
FROM 
	user u, rezultat r, kviz k
WHERE 
	r.KvizID=k.ID AND
    r.UserID=u.ID
ORDER BY r.OstvarenihBodova DESC", []);

        if($db->getResult()){
            echo json_encode($db->getResult(), JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
            return;
        }

        echo json_encode([]);
        return;
	}
}

$app->post("/rezultat/insert", function(){
    $data = json_decode(file_get_contents("php://input"));
    Rezultat::Insert($data);
});

$app->get("/rezultat", function(){
    Rezultat::GetAll();
});

$app->get("/rezultat/delete/:id", function($id){
    Rezultat::Delete($id);
});