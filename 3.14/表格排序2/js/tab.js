/**
 * Created by Peter on 2016/3/14.
 */
var tab = document.getElementById("tab");
var thead = tab.tHead;
var ths = thead.rows[0].cells;
var tbody = tab.tBodies;

//console.log(thead,tbody);

function changeColor(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (i % 2 == 1) {
            arr[i].style.backgroundColor = "red";
        }
    }
}
function element(tagName) {
    return document.createElement(tagName);
}
function beFrg(arr) {
    var frg = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
        var tr = element("tr");
        var cur = arr[i];
        for (var key in cur) {
            var td = element("td");
            td.innerHTML = key == "sex" ? (cur[key] == 1 ? "男" : "女") : cur[key];
            tr.appendChild(td);
        }
        frg.appendChild(tr);
    }
    return frg;
}

var data = null;
var xhr = new XMLHttpRequest();
xhr.open("get", "json/data.txt", false);
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && /^2\d\d$/.test(xhr.status)) {
        data = utils.jsonParse(xhr.responseText)
    }
};
xhr.send(null);
//console.log(data);
tbody[0].appendChild(beFrg(data));
changeColor(tbody[0].rows);

for (var i = 0; i < ths.length; i++) {
    ths[i].onclick = (function (i) {
        return function () {
            mySort(i);
        }
    })(i);
}
var n = 1;
function mySort(i) {
    n *= -1;
    var arr = utils.beArr(tbody[0].rows);
    arr.sort(function(a,b){
        var qian = parseFloat(a.cells[i].innerHTML);
        var hou = parseFloat(b.cells[i].innerHTML);
        if(isNaN(qian)){
            return (a.cells[i].innerHTML.localeCompare(b.cells[i].innerHTML))*n;
        }
        return (qian-hou)*n;
    });
    tbody[0].innerHTML = "";
    console.log(arr);
    var frg = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
        var tr = element("tr");
        var cur = arr[i];
        for (var j = 0;j<cur.cells.length;j++) {
            var td = element("td");
            td.innerHTML = cur.cells[j].innerHTML;
            tr.appendChild(td);
        }
        frg.appendChild(tr);
    }
    tbody[0].appendChild(frg);
    changeColor(tbody[0].rows);
}
