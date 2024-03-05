<?php
// plik: save_data.php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = file_get_contents('php://input');
    $jsonArray = json_decode($data, true);

    // Pobranie liczby zmiennych z danych
    $variableCount = $jsonArray['count'];

    // Określenie nazwy pliku na podstawie liczby zmiennych
    $fileName = "wyniki${variableCount}.json";

    // Sprawdzenie, czy dane są już przechowywane
    if (!file_exists($fileName)) {
        $existingData = [];
    } else {
        $existingData = json_decode(file_get_contents($fileName), true);
    }

    // Dodawanie nowych danych
    $existingData[] = $jsonArray;

    // Zapisywanie danych do odpowiedniego pliku
    file_put_contents($fileName, json_encode($existingData));

    echo 'Dane zostały zapisane.';
} else {
    echo 'Nieprawidłowe żądanie';
}
?>