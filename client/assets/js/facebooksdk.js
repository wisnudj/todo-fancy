// Onclick login button
function facebookLogin(){
    FB.login(function(response){
      console.log(response);
      axios.post('http://localhost:3000/api/user/facebook-signin', {
          accessToken: response.authResponse.accessToken,
          userID: response.authResponse.userID
        })
        .then((response) => {
          console.log(response)
          localStorage.setItem("doit_token", response.data.token)          
          window.location.replace("app.html")
        })
        .catch((error) => {
          console.log(error);
        });
    },{scope:"email"});
}



function statusChangeCallback(response){
    if(response.status === "connected"){
        // Jika user sudah mengijinkan web untuk mengakses akun facebook mereka
    }else{
        // Jika user belum melakukan mingijinkan web untuk mengakses akun facebook mereka
    }
}

function checkLoginState(){
    FB.getLoginStatus(function(response){
        statusChangeCallback(response);
    });
}

// First Initialize
window.fbAsyncInit=function(){
    FB.init({
        appId      : 301566467008018,
        cookie     : true,  // enable cookies to allow the server to access
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : "v2.11" // use graph api version 2.8
    });
    FB.getLoginStatus(function(response){
        statusChangeCallback(response);
    });
};

//==> Load SDK
(function(doc,tag,id){
    var js, fjs = doc.getElementsByTagName(tag)[0];
    if (doc.getElementById(id)) return;
    js = doc.createElement(tag); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document,"script","facebook-jssdk"));
