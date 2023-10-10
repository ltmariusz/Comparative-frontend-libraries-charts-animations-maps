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
// 10danych
var dateFile = './../../dane/date-chart-line.json'
//100danych
var dataFile100 = "./../../dane/date-chart-line100.json"
var dataFile1000 = "./../../dane/date-chart-line1000.json"
var exampleData1
let tableX = [];
let tableY = [];
var maxX
var maxY
var stepSizeX
var stepSizeY
var chartLine 
// downloadAndCreate(dateFile)
function downloadAndCreate(file) {

    downloadDateFromFile(file)
        .then(function (dane) {
            tableX=[]
            tableY=[]
            exampleData1 = dane['example-date']
            console.log('Pobrane dane:', exampleData1);
            // ** Edycja danych do wykresu na dwie tablice**
            exampleData1.forEach((element) => {
                tableX.push(element.x);
                tableY.push(element.y);
            });
            console.log(tableX)
            console.log(tableY)
            // Oblicz maksymalne wartości na osi X i Y
            maxX = Math.max(...tableX);
            maxY = Math.max(...tableY);

            // Zaokrąglij wartości maksymalne do najbliższej górnej dziesiątki
            maxX = Math.ceil(maxX / 10) * 10;
            maxY = Math.ceil(maxY / 10) * 10;
            console.log(maxX)
            console.log(maxY)
            stepSizeX = maxX/10
            stepSizeY = maxY/10
            createChart()
        }).catch(function (error) {
            console.error('Błąd', error)
        })
}


// **************** Edycja Wykresu ***************
// Pobieramy referencję do elementu canvas, gdzie będzie rysowany wykres

daneX = [1, 2, 3, 4, 5]; // lub [10, 20, 30, 40, 50]
daneY = [10, 15, 7, 20, 5]

function createChart() {

    var ctx = document.getElementById('chartLine').getContext('2d');

    // Tworzymy dane wykresu (możesz dostosować je do własnych potrzeb)
    var data = {
        labels: tableX,
        datasets: [{
            label: "tytuł1",
            data: tableY,
            borderWidth: 3,
            borderColor: 'blue',
            fill: false
        }]
    };

    // Konfigurujemy opcje wykresu
    var options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: {
                type: 'linear',
                position: 'bottom',
                ticks: {
                    stepSize: stepSizeX, // Krok na osi X
                    max: maxX // Maksymalna wartość na osi X
                }
            },
            yAxes: {
                beginAtZero: true,
                ticks: {
                    stepSize: stepSizeY, // Krok na osi Y
                    max: maxY // Maksymalna wartość na osi Y
                }
            }
        }
    };


    // Tworzymy nowy wykres kołowy
    chartLine = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });


}


function click10() {
    downloadAndCreate(dateFile)
}
function click100() {
    downloadAndCreate(dataFile100)
}
function click1000() {
    downloadAndCreate(dataFile1000)
}
function click10000() {
    downloadAndCreate(dataFile1000)
}