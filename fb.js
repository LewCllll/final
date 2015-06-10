  // This is called with the results from from FB.getLoginStatus().
  
  function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
  if (response.status === 'connected') {
      // Logged into your app and Facebook.
      var IfLoggedIn=document.getElementById("LogIn");
      IfLoggedIn.style.display="none";
      var IfNotLoggedIn=document.getElementById("LogOut");
      IfNotLoggedIn.style.display="inline-block";
      var Manage=document.getElementById("manage");
      Manage.style.display="inline-block";

      var user_info = document.getElementById("profile_img");
      user_info.style.display="block";
      testAPI();
      
    } else if (response.status === 'not_authorized') {
     var IfLoggedIn=document.getElementById("LogIn");
     IfLoggedIn.style.display="inline-block";
     var IfNotLoggedIn=document.getElementById("LogOut");
     IfNotLoggedIn.style.display="none";
     
     // The person is logged into Facebook, but not your app.
     // document.getElementById('status').innerHTML = 'Please log ' +
     //  'into this app.';
   } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      //document.getElementById('status').innerHTML = 'Please log ' +
      //'into Facebook.';
      var IfLoggedIn=document.getElementById("LogIn");
      IfLoggedIn.style.display="inline-block";
      var IfNotLoggedIn=document.getElementById("LogOut");
      IfNotLoggedIn.style.display="none";
    }
  }


  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }


  window.fbAsyncInit = function() {

/*
  Parse.initialize("$B3rWaehmMfGulevJwCfAIBEaSANdb29e0YZs0OU4", "$wMLWm7nzcaQKpgIvzSpvGUe0MfmMNmFStfoNSGYT");
  
  Parse.FacebookUtils.init({ // this line replaces FB.init({
   appId : '836005236481666', // Facebook App ID
   status : true, // check Facebook Login status
   cookie : true, // enable cookies to allow Parse to access the session
   xfbml : true, // initialize Facebook social plugins on the page
   version : 'v2.3' // point to the latest Facebook Graph API version
 });
*/
  
  FB.init({
    appId      : '836005236481666',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.2' // use version 2.2
  });
  


  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.


  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });


  FB.Event.subscribe('auth.login', function(response) {

        if (response.status=="connected"){ // if logged in
            var IfLoggedInDiv=document.getElementById("LogOut");
            IfLoggedInDiv.style.display="inline-block";
            var IfNotLoggedInDiv=document.getElementById("LogIn");
            IfNotLoggedInDiv.style.display="none";

            // get access token
            ACCESS_TOKEN=response.authResponse.accessToken;
            //console.log('ACCESS_TOKEN: '+ACCESS_TOKEN);

            // get user id
            userid=response.authResponse.userID;
            console.log('userid: '+userid);
        }
  });
            
  FB.Event.subscribe('auth.logout', function(response) {
        if (response.status!="connected"){ // if logged out
            var IfLoggedInDiv=document.getElementById("LogOut");
            IfLoggedInDiv.style.display="none";
            var IfNotLoggedInDiv=document.getElementById("LogIn");
            IfNotLoggedInDiv.style.display="inline-block";
            FB.logout(function(response){
                location.reload();  // refresh
            });
    }
  });

  $("#LogIn").click(function(){   
       // alert("click on login-btn"); 
        
        FB.login(function(response) {
            //console.log(response);
            if (response.status == "connected") {

              var IfLoggedIn=document.getElementById("LogIn");
              IfLoggedIn.style.display="none";
              var IfNotLoggedIn=document.getElementById("LogOut");
              IfNotLoggedIn.style.display="inline-block";

            } else {
              var IfLoggedIn=document.getElementById("LogIn");
              IfLoggedIn.style.display="inline-block";
              var IfNotLoggedIn=document.getElementById("LogOut");
              IfNotLoggedIn.style.display="none";
              console.log('User cancelled login or did not fully authorize.');
            }
            testAPI();
          });
    });

  $("#LogOut").click(function(){
      //  alert('You are logging out. Bye!');
        var IfLoggedIn=document.getElementById("LogIn");
        IfLoggedIn.style.display="inline-block";
        var IfNotLoggedIn=document.getElementById("LogOut");
        IfNotLoggedIn.style.display="none";
        FB.logout(function(response){
            location.reload();  // refresh
          });
      });
  
  };
  


  // Load the SDK asynchronously


  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name+response.id);
      //document.getElementById('status').innerHTML =
      //'Welcome, ' + response.name + '!';
    var Manage=document.getElementById("manage");
      //Manage.style.display="none";
      Manage.innerHTML='<img class="img-rounded" src="http://graph.facebook.com/'+response.id+'/picture"/>';
    
    var user_info = document.getElementById("profile_img");
      user_info.innerHTML = '<img class="img-rounded" src="http://graph.facebook.com/'+response.id+'/picture"/>';

      console.log( 'url is' + user_info);

    });
  }

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));



/*
  function getUserInfo() {
        FB.api('/me', function(response) {
 
      var str="<b>Name</b> : "+response.name+"<br>";
          str +="<b>Link: </b>"+response.link+"<br>";
          str +="<b>Username:</b> "+response.username+"<br>";
          str +="<b>id: </b>"+response.id+"<br>";
          str +="<b>Email:</b> "+response.email+"<br>";
          str +="<input type='button' value='Get Photo' onclick='getPhoto();'/>";
          str +="<input type='button' value='Logout' onclick='Logout();'/>";
          document.getElementById("status").innerHTML=str;
 
    });
  }

    function getPhoto()
    {
      FB.api('/me/picture?type=normal', function(response) {
 
          var str="<br/><b>Pic</b> : <img src='"+response.data.url+"'/>";
          document.getElementById("status").innerHTML+=str;
 
    });
 
    }
    */