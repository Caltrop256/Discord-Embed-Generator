<?php
    $obj = (object) ["type" => "photo"];

    function addProperty($name) {
        global $obj;
        $val = $_GET[$name];
        if($val) $obj->{$name} = $val;
    }

    foreach(array("title", "author_name", "author_url", "provider_name", "provider_url", "url") as $name) addProperty($name);

    header('Content-type:application/json;charset=utf-8');
    echo json_encode($obj);
?>