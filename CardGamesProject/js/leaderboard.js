//import attempts from memory.js

var count = 0;
var newrow = 0;

function myFunction() {
    var table = document.getElementById("myTable");
    var row = table.insertRow(++newrow);
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    cell0.innerHTML = ++count;
    cell1.innerHTML = "Alex"
    cell2.innerHTML = "30";
}
