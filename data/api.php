<?php

function makeConn() {
    include_once "auth.php";
    try {
        $conn = new PDO(...Auth());
        $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
        return $conn;
    } catch (PDOException $e) {
        die('{"error":"'.$e->getMessage().'"}');
    }
}


function fetchAll($result) {
    $a = [];
    while($row = $result->fetch(\PDO::FETCH_OBJ)) $a[] = $row;
    return $a;
}


function makeQuery($conn,$prep,$params,$makeResults=true) {
    try {
        if (count($params)) {
            $stmt = $conn->prepare($prep);
            $stmt->execute($params);
        } else {
            $stmt = $conn->query($prep);
        }

        $result = $makeResults ? fetchAll($stmt) : [];

        return [
            "result"=>$result
        ];
    } catch (PDOException $e) {
        return ["error"=>"Query Failed: ".$e->getMessage()];
    }
}

function makeStatement($data) {
    $conn = makeConn();
    $type = @$data->type;
    $params = @$data->params;

    switch($type) {
        // case "users_all":
        //     return makeQuery($conn, "SELECT * FROM `track_202290_users`", $params);
        // case "trees_all":
        //     return makeQuery($conn, "SELECT * FROM `track_202290_trees`", $params);
        // case "locations_all":
        //     return makeQuery($conn, "SELECT * FROM `track_202290_locations`", $params);

        
        case "user_by_id":
            return makeQuery($conn, "SELECT id,name,email,username,img,date_create FROM `track_202290_users` WHERE `id`=?", $params);
        case "tree_by_id":
            return makeQuery($conn, "SELECT * FROM `track_202290_trees` WHERE `id`=?", $params);
        case "location_by_id":
            return makeQuery($conn, "SELECT * FROM `track_202290_locations` WHERE `id`=?", $params);
            
        
        case "trees_by_user_id":
            return makeQuery($conn, "SELECT * FROM `track_202290_trees` WHERE `user_id`=?", $params);
        case "locations_by_tree_id":
            return makeQuery($conn, "SELECT * FROM `track_202290_locations` WHERE `tree_id`=?", $params);



        case "tree_locations_by_user_id":
            return makeQuery($conn, "SELECT *
            FROM `track_202290_trees` a
            JOIN (
                SELECT * FROM `track_202290_locations`
            ) l
            ON a.id = l.tree_id
            WHERE `user_id`=?
            ", $params);
    
        case "recent_tree_locations":
            return makeQuery($conn, "SELECT *
            FROM `track_202290_trees` a
            JOIN (
                SELECT lg.*
                FROM `track_202290_locations` lg
                WHERE lg.id = (
                    SELECT lt.id
                    FROM `track_202290_locations` lt
                    WHERE lt.tree_id = lg.tree_id
                    ORDER BY lt.date_create DESC
                    LIMIT 1
                )
            ) l
            ON a.id = l.tree_id
            WHERE `user_id`=?
            ORDER BY l.tree_id, l.date_create DESC
            ", $params);



        case "check_signin":
            return makeQuery($conn, "SELECT `id` FROM `track_202290_users` WHERE `username`=? AND `password` = md5(?)", $params);


        default:
            return ["error"=>"No Matched Type"];
    }
}

$data = json_decode(file_get_Contents("php://input"));

die(
    json_encode(
        makeStatement($data),
        JSON_NUMERIC_CHECK
    )
);