/**
 * Created by Peter on 2016/3/14.
 */
var div1 = document.getElementById("div1");
var tab = document.getElementById("tab");
var thead = tab.tHead;
var thead_trs = thead.rows;
var th_cells = thead_trs[0].cells;
//console.dir(th_cells);
var tbody = tab.tBodies[0];
//var tbody_trs = tbody.rows;
//var td_cells = tbody_trs[0].cells;


//取得后台的数据 append进tbody
var xhr = new XMLHttpRequest();
//console.dir(xhr);
xhr.open("get", "json/data.txt", false);

var data = "";
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && /^2\d\d$/.test(xhr.status)) {
        data = utils.myjsonParse(xhr.responseText);

    }
};

xhr.send(null);

console.log(data);


function element(tagName) {
    return document.createElement(tagName);
}


function bind() {
    var frg = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
        var tr = element("tr");
        for (var key in data[i]) {
            var cur = data[i];
            var td = element("td");
            td.innerHTML = key == "sex" ? (cur[key] == 1 ? "女" : "男") : cur[key];
            tr.appendChild(td);
        }
        frg.appendChild(tr);
    }
    tbody.appendChild(frg);
    frg = null;
}

bind();

function beFrg(arr) {
    var frg = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
        var tr = element("tr");
        for (var j = 0; j < arr[i].cells.length; j++) {
            var cur = arr[i].cells[j];
            var td = element("td");
            td.innerHTML = cur.innerHTML;
            tr.appendChild(td);
        }
        frg.appendChild(tr);
    }
    return frg;
}


//绑定每一个 th_cells的 onclick
for (var i = 0; i < th_cells.length; i++) {
    th_cells[i].onclick = (function (i) {
        //i是列数
        return function () {
            sortTr(i);
        }
    })(i);
}

var num = 1;
function sortTr(n) {
    num *= -1;
    //a是传进来的列数
    //获得每一行beArr

    var tbody_trs = tbody.rows;
    //第一行的第n个空
    var td_cells = tbody_trs[0].cells[n];
    var arr = utils.beArray(tbody_trs);
    //console.log(arr[0].cells[0].innerHTML);
    arr.sort(function (a, b) {
        var qian = parseFloat(a.cells[n].innerHTML);
        var hou = parseFloat(b.cells[n].innerHTML);
        if (isNaN(qian)) {
            return (a.cells[n].innerHTML.localeCompare(b.cells[n].innerHTML)) * num;
        }
        return (qian - hou) * num;
    });
    //console.dir(arr);

    tbody.innerHTML = null;
    tbody.appendChild(beFrg(arr));
    changeColor(tbody.rows);
}

function changeColor(arr){
    for(var i = 0;i<arr.length;i++){
        if(i%2==1){
            arr[i].style.backgroundColor = "red";
        }
    }
}
changeColor(tbody.rows);