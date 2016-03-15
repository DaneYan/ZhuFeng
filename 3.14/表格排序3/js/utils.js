/**
 * Created by Peter on 2016/3/14.
 */
var utils = {
    beArr:function(likeArr){
        try {
            return [].slice.call(likeArr,0);
            //likeArr.slice()
        }catch (e){
            var arr = [];
            for(var i = 0;i<likeArr.length;i++){
                arr[arr.length] = likeArr[i];
            }
            return arr;
        }
    },
    jsonParse:function(str){
        return "JSON" in window?JSON.parse(str):eval("("+str+")");
    }
};