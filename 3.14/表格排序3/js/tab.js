/**
 * Created by Peter on 2016/3/14.
 */
var tab = document.getElementById("tab");
var thead = tab.tHead;
var thead_tr = thead.rows;
var ths = thead_tr[0].cells;
//console.dir(ths);
var tbodies = tab.tBodies;

var data = "";
var xhr = new XMLHttpRequest();
xhr.open("get", "json/data.txt", false);
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && /^2\d\d$/.test(xhr.status)) {
        data = utils.jsonParse(xhr.responseText);
    }
};
xhr.send(null);

console.log(data);


var frg = document.createDocumentFragment();
for (var i = 0; i < data.length; i++) {
    var tr = document.createElement("tr");
    for (var key in data[i]) {
        var td = document.createElement("td");
        td.innerHTML = key == "sex" ? (data[i][key] == 1 ? "男" : "女") : data[i][key];
        tr.appendChild(td);
    }
    frg.appendChild(tr);
}

tbodies[0].appendChild(frg);
frg = null;
changeColor(tbodies[0].rows);

//var index = 1;
function sort(i) {
    var a = i;
    ths[i].index *= -1;
    var rows = utils.beArr(tbodies[0].rows);

    [].sort.call(rows, function (a, b) {
        var qian = parseFloat(a.cells[i].innerHTML);
        var hou = parseFloat(b.cells[i].innerHTML);
        if (isNaN(qian)) {
            return (a.cells[i].innerHTML.localeCompare(b.cells[i].innerHTML)) * ths[i].index;
        }
        return (qian - hou) * ths[i].index;
    });


    var frg = document.createDocumentFragment();
    for (var i = 0; i < rows.length; i++) {
        var tr = document.createElement("tr");
        for (var j = 0; j < rows[i].cells.length; j++) {
            var td = document.createElement("td");
            td.innerHTML = rows[i].cells[j].innerHTML;
            tr.appendChild(td);
        }
        frg.appendChild(tr);
    }
    tbodies[0].innerHTML = "";
    tbodies[0].appendChild(frg);
    frg = null;
    changeColor(tbodies[0].rows);

    for (var i = 0;i<ths.length;i++){
        if(i !=a){
            ths[i].index = -1;
        }
    }
}
for (var i = 0; i < ths.length; i++) {
    ths[i].index = -1;
    ths[i].onclick = (function (i) {
        return function () {
            sort(i);
        }
    })(i);
}

function changeColor(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (i % 2 == 1) {
            arr[i].style.backgroundColor = "red";
        }
    }
}