<?php
// Odbierz dane z AJAX
$data = json_decode(file_get_contents('php://input'), true);
$loadTime = $data['loadTime'];

// Odczytaj istniejące dane
if(file_exists('loadTimes.json')) {
    $json = file_get_contents('loadTimes.json');
    $loadTimes = json_decode($json, true);
} else {
    $loadTimes = [];
}

// Dodaj nowy czas ładowania
$loadTimes[] = $loadTime;

// Zapisz zaktualizowane dane
file_put_contents('loadTimes.json', json_encode($loadTimes));

echo json_encode(['status' => 'success']);
?>