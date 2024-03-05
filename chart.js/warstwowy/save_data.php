<?php
// plik: save_data.php

// Sprawdzanie, czy żądanie jest żądaniem POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = file_get_contents('php://input');
    $jsonArray = json_decode($data, true);

    // Sprawdzanie, czy dane są już przechowywane i dekodowanie
    if (!file_exists('chartjsWars100000.json')) {
        $existingData = [];
    } else {
        $existingData = json_decode(file_get_contents('chartjsWars100000.json'), true);
    }

    // Dodawanie nowych danych do istniejących
    $existingData[] = $jsonArray;

    // Zapisywanie danych z powrotem do pliku JSON
    file_put_contents('chartjsWars100000.json', json_encode($existingData));

    echo 'Dane zostały zapisane.';
} else {
    echo 'Nieprawidłowe żądanie';
}
?>