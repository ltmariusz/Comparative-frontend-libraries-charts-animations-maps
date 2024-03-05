<?php
// plik: save_data.php

// Sprawdzanie, czy żądanie jest żądaniem POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = file_get_contents('php://input');
    $jsonArray = json_decode($data, true);

    // Pobieranie liczby zmiennych i czasu renderowania
    $count = $jsonArray['count'];
    $timee = $jsonArray['timee'];

    // Tworzenie nazwy pliku na podstawie liczby zmiennych
    $fileName = 'canvasjsB' . $count . '.json';

    // Sprawdzanie, czy plik już istnieje
    if (!file_exists($fileName)) {
        $existingData = [];
    } else {
        $existingData = json_decode(file_get_contents($fileName), true);
    }

    // Dodawanie nowego czasu renderowania do istniejących danych
    $existingData[] = $timee;

    // Zapisywanie danych z powrotem do pliku JSON
    file_put_contents($fileName, json_encode($existingData));

    echo 'Dane zostały zapisane.';
} else {
    echo 'Nieprawidłowe żądanie';
}
?>