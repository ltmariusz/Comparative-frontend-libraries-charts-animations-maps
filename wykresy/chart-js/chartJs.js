// **************** Pobranie danych z pliku ***************
function downloadDateFromFile(nazwaPliku) {
    return fetch(nazwaPliku)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Nie udało się pobrać pliku.');
            }
            return response.json(); // Pobierz dane jako JSON
        });
}

var dateFile = './../../dane/date-chart-line.json'
var exampleData1
downloadDateFromFile(dateFile)
    .then(function (dane) {
        exampleData1 = dane['example-date']
        console.log('Pobrane dane:', exampleData1);
    }).catch(function (error) {
        console.error('Błąd', error)
    })

// **************** Edycja Wykresu ***************
// Pobieramy referencję do elementu canvas, gdzie będzie rysowany wykres
var ctx = document.getElementById('chartLine').getContext('2d');

// Tworzymy dane wykresu (możesz dostosować je do własnych potrzeb)
var data = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [{
        data: [10, 20, 15],
        backgroundColor: ['red', 'blue', 'yellow']
    }]
};

// Konfigurujemy opcje wykresu
var options = {
    responsive: true,
    maintainAspectRatio: false
};

// Tworzymy nowy wykres kołowy
var chartLine = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: options
});

