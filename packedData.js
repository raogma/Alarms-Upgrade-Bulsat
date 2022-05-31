import { mainJSON } from "./JSONData.js";
import { mainXML } from "./XMLData.js";
import { render } from './node_modules/lit-html/lit-html.js';



(async function main(){
    showClock()
    var packedTempArr = [];
    packedTempArr.push(await mainXML());
    packedTempArr.push(await mainJSON());
    render(packedTempArr, document.querySelector('body'));
    packedTempArr = [];


    function showClock() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        document.getElementById('clock').innerHTML = h + ":" + m + ":" + s;
        var t = setTimeout(showClock, 500);
    };
    
    function checkTime(i) { if ( i < 10 ) { i = "0" + i }; return i; };

    setTimeout(()=>main(), 30000);
})()