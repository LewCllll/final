Parse.initialize("$B3rWaehmMfGulevJwCfAIBEaSANdb29e0YZs0OU4", "$wMLWm7nzcaQKpgIvzSpvGUe0MfmMNmFStfoNSGYT");
 window.fbAsyncInit = function() {
 Parse.FacebookUtils.init({ // this line replaces FB.init({
 appId : '836005236481666', // Facebook App ID
 status : true, // check Facebook Login status
 cookie : true, // enable cookies to allow Parse to access the session
 xfbml : true, // initialize Facebook social plugins on the page
 version : 'v2.3' // point to the latest Facebook Graph API version
 });
 // Run code after the Facebook SDK is loaded.
 };
 (function(d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = "//connect.facebook.net/en_US/sdk.js";
 fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));


 function fblogin(){
	 Parse.FacebookUtils.logIn(null, {
	 success: function(user) {
	 if (!user.existed()) {
	 alert("User signed up and logged in through Facebook!");
	 } else {
	 alert("User logged in through Facebook!");
	 }
	 //等等要在這邊加程式碼 FB.getLoginStatus
	 },
	 error: function(user, error) {
	 alert("User cancelled the Facebook login or did not fully authorize.");
	 }
	});
 }