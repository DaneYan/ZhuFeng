/**
 * Created by Peter on 2016/3/12.
 */
var utils = {
    beArray: function (likeAry) {
        try {
            var ary = [].slice.call(likeAry, 0);
            //return ary;
        } catch (e) {
            var ary = [];
            for (var i in likeAry) {
                ary[ary.length] = likeAry[i];
                //return ary;
            }
        }
        return ary;
    },
    jsonParse:function(str){
        return "JSON" in window?JSON.parse(str):eval("("+str+")");
    }
};