/**
 * Created by Peter on 2016/3/14.
 */
var utils = {
    beArray: function (likeArr) {
        try {
            return [].slice.call(likeArr, 0);
        } catch (e) {
            var arr = [];
            for (var i = 0; i < likeArr.length; i++) {
                arr[arr.length] = likeArr[i];
            }
            return arr;
        }
    },
    myjsonParse: function (str) {
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
    },
    element: function (tagName) {
        return document.createElement(tagName);
    },
    changeColor: function (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (i % 2 == 1) {
                arr[i].style.backgroundColor = "red";
            }
        }
    },
    beFrg:function (arr) {
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

};