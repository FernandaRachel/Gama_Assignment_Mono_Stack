var getAPI = function() {
    var http = new XMLHttpRequest();

    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(http.response);
            httpResponse = response;
            // Typical action to be performed when the document is ready:
            doTable(response);
            // document.getElementById("demo").innerHTML = http.responseText;
        }
    }
    http.open("GET", "https://api.coinmarketcap.com/v1/ticker/?convert=brl&limit=10", true);
    http.send();
}

var doTable = function(response) {
    var tableContent = "";
    response.forEach(function(obj) {
        tableContent += "<tr><td>" + obj.rank + "</td>" +
            "<td>" + obj.name + "</td>" +
            "<td>" + obj.symbol + "</td>" +
            "<td>" + obj.price_brl + "</td>" +
            "<td>" + obj.price_usd + "</td></tr>";

    });

    var table = document.getElementById("table-content");
    table.innerHTML = tableContent;
}

getAPI();

var searchCoin = function() {
    var http2 = new XMLHttpRequest();
    var value = document.getElementById("selected-element").value;

    http2.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(http2.response);
            response = parseFloat(response[0].price_brl);
            conversor(response);
        }
    }
    http2.open("GET", "https://api.coinmarketcap.com/v1/ticker/" + value + "/?convert=brl", true);
    http2.send();
}
var conversor = function(value) {
    var valueConverted = 0.0;
    var valueToDivide = document.getElementById("input-value").value;
    var valueSelected = document.getElementById("selected-element").value;

    valueConverted = value / parseFloat(valueToDivide);

    document.getElementById("result").textContent = valueConverted.toFixed(4) + " " + valueSelected;

}