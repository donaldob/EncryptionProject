function createGuid()

{

return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {

var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);

return v.toString(16);

});

}

function rc4(key, str) {
var s = [], j = 0, x, res = '';
for (var i = 0; i < 256; i++) {
s[i] = i;
}
for (i = 0; i < 256; i++) {
j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
x = s[i];
s[i] = s[j];
s[j] = x;
}
i = 0;
j = 0;
for (var y = 0; y < str.length; y++) {
i = (i + 1) % 256;
j = (j + s[i]) % 256;
x = s[i];
s[i] = s[j];
s[j] = x;
res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
}
return res;
}

// use AJAX to load the NZ Airfields
function GetKey(GuidString)

{
 

if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    var RawResponse =xmlhttp.responseText;
    var DeliveredKey = RawResponse.split("^")[0];

    }
else
{
//alert("err" + xmlhttp.readyState + " " +  xmlhttp.status);

}
  }
xmlhttp.open("GET","http://animaltracker.net23.net/crypt/getkey.php?guid=" + GuidString ,true);
xmlhttp.send();

return DeliveredKey;
}


function base64_encode (data) {
  // From: http://phpjs.org/functions
  // +   original by: Tyler Akins (http://rumkin.com)
  // +   improved by: Bayron Guevara
  // +   improved by: Thunder.m
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Pellentesque Malesuada
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Rafał Kukawski (http://kukawski.pl)
  // *     example 1: base64_encode('Kevin van Zonneveld');
  // *     returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
  // mozilla has this native
  // - but breaks in 2.0.0.12!
  //if (typeof this.window['btoa'] === 'function') {
  //    return btoa(data);
  //}
  var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
    ac = 0,
    enc = "",
    tmp_arr = [];

  if (!data) {
    return data;
  }

  do { // pack three octets into four hexets
    o1 = data.charCodeAt(i++);
    o2 = data.charCodeAt(i++);
    o3 = data.charCodeAt(i++);

    bits = o1 << 16 | o2 << 8 | o3;

    h1 = bits >> 18 & 0x3f;
    h2 = bits >> 12 & 0x3f;
    h3 = bits >> 6 & 0x3f;
    h4 = bits & 0x3f;

    // use hexets to index into b64, and append result to encoded string
    tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
  } while (i < data.length);

  enc = tmp_arr.join('');

  var r = data.length % 3;

  return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);

}
