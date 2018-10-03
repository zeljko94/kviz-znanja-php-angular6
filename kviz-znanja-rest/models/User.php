<?php


class User{
    public static function Login($email, $password){
        $db = new DB();
        $db->Query("SELECT * FROM user WHERE Email=? AND Password=?", [$email, $password]);

        if($db->getResult()){
            echo json_encode($db->getResult()[0], JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
            return;
        }
        echo json_encode(null);
        return;
    }

    public static function Delete($id){
        $db = new DB();
        $db->Query("DELETE FROM user WHERE ID=?", [$id]);

        if($db->getRows()){
            echo json_encode(1, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
            return;
        }
        echo json_encode(-1);
        return;
    }


    public static function GetAll(){
        $db = new DB();
        $db->Query("SELECT * FROM user", []);

        if($db->getResult()){
            echo json_encode($db->getResult(), JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
            return;
        }
        echo json_encode([]);
        return;
    }


    public static function Insert($o){
        $db = new DB();
        $db->Query("INSERT INTO user(Ime, Prezime, Email, Password, Privilegije) VALUES(?,?,?,?,?)", [
            $o->Ime, $o->Prezime, $o->Email, $o->Password, $o->Privilegije
        ]);

        if($db->getRows()){
            $id = $db->getConn()->lastInsertId();
            $o->ID = $id;
            echo json_encode($o, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
            return;
        }
        echo json_encode(-1);
        return;
    }
}


// ROUTES
$app->post("/user/login", function(){
    $data = json_decode(file_get_contents("php://input"));
    User::login($data->Email, $data->Password);
});

$app->post("/user/insert", function(){
    $data = json_decode(file_get_contents("php://input"));
    User::Insert($data);
});

$app->get("/user", function(){
    User::GetAll();
});

$app->get("/user/delete/:id", function($id){
    User::Delete($id);
});
