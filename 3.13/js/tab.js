/**
 * Created by Peter on 2016/3/13.
 */
var oTable = document.getElementById("table1");
//ar oTbody = document.getElementById("div1").getElementsByTagName("tbody")[0];
//console.dir(oTable);
var tHead = oTable.tHead;
var th = tHead.rows[0].children;
var tBody = oTable.tBodies[0];
//console.log(tHead,tBody);
var tr = tBody.rows;
var ary = utils.beArray(tr);
//console.log(ary);
//1new xhr2、open 3、xhr.事件onreadstatechange = function (){} 监听状态码为4且/^2\d{2}$/4、发送请求暂时不用此方法send null

/*
function bind(){
    //利用两次循环先处理每行内的td然后处理tr，放进frg ，放进tbody，清空frg；
    var frg = document.createDocumentFragment();
    for(var i = 0;i<;i++){
        var cur = arr[i];
        var oTr = document.createElement("tr");
        for(var j in cur){

        }
    }
}*/
function changeColor(){
    for(var i = 0;i<ary.length;i++){
        ary[i].className = (i%2==1?"bg":null);
    }
}
changeColor();

function sortTable(i){
    //ary[i].index *=-1;
    ary.sort(function(a,b){
        var qian = a.children[i].innerHTML;
        var hou = b.children[i].innerHTML;
        if(isNaN(qian)) {
            return qian.localeCompare(hou);
        }
        return (qian- hou);
    });
    for(var m in ary ){
        tBody.appendChild(ary[m]);//如果页面上已经存在了,就不会再添加,而是移动
    }
}
//console.log(ary);
console.dir(th);

for(var i = 0;i<th.length;i++){
    th[i].onclick = (function(i){
        return function (){
            sortTable(i)
        }
    })(i);
}



