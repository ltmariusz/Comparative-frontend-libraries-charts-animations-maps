<?php
// plik: save_data.php

// Sprawdzanie, czy żądanie jest żądaniem POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = file_get_contents('php://input');
    $jsonArray = json_decode($data, true);

    // Sprawdzanie, czy dane są już przechowywane i dekodowanie
    if (!file_exists('d3js_p_10.json')) {
        $existingData = [];
    } else {
        $existingData = json_decode(file_get_contents('d3js_p_10.json'), true);
    }

    // Dodawanie nowych danych do istniejących
    $existingData[] = $jsonArray;

    // Zapisywanie danych z powrotem do pliku JSON
    file_put_contents('d3js_p_10.json', json_encode($existingData));

    echo 'Dane zostały zapisane.';
} else {
    echo 'Nieprawidłowe żądanie';
}
?>