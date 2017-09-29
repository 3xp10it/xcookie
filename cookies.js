function showCookiesForTab(tabs) {
  //get the first tab object in the array
  tab = tabs.pop();

  //get all cookies in the domain
  var gettingAllCookies = browser.cookies.getAll({url: tab.url});
  gettingAllCookies.then((cookies) => {
    if (cookies.length > 0) {
      var returnCookie="";
      for (cookie of cookies) {
        var content = cookie.name + "="+ cookie.value+";";
        returnCookie=returnCookie+content;
      }
      returnCookie=returnCookie.substr(0,returnCookie.length-1);
       //alert(returnCookie);
        document.getElementById("output").innerHTML=returnCookie;
        var copyText=document.querySelector('#output');
        copyText.select();

        function copy1(){
        document.getElementById("output").innerHTML=returnCookie;
        var copyText=document.querySelector('#output');
        copyText.select();
        //console.log(copyText.value);
        var res=document.execCommand("copy");
        //console.log(res);
        //alert("copyed to clipboard");
        }        

        function copy2(){
        document.getElementById("output").innerHTML="--cookie='"+returnCookie+"'";
        var copyText=document.querySelector('#output');
        copyText.select();
        //console.log(copyText.value);
        var res=document.execCommand("copy");
        //console.log(res);
        //alert("copyed to clipboard");
        }        

        document.querySelector("#pureCookie").addEventListener("click",copy1);
        document.querySelector("#sqlmapCookie").addEventListener("click",copy2);
    } else {
      var p = document.createElement("p");
      var content = document.createTextNode("No cookies in this tab.");
      var parent = cookieList.parentNode;

      p.appendChild(content);
      parent.appendChild(p);
    }
  });
};

//get active tab to run an callback function.
//it sends to our callback an array of tab objects
function getActiveTab() {
  return browser.tabs.query({currentWindow: true, active: true});
}
getActiveTab().then(showCookiesForTab);
