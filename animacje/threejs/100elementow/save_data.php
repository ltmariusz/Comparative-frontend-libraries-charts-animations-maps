<?php
$filename = "times2sek.json";
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data["time"])) {
    if (!file_exists($filename)) {
        file_put_contents($filename, json_encode([]));
    }

    $times = json_decode(file_get_contents($filename), true);
    array_push($times, $data["time"]);
    file_put_contents($filename, json_encode($times));

    echo "Data saved successfully";
} else {
    echo "No data to save";
}
?>