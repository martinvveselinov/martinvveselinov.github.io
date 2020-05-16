function validate(){
	var email = document.forms["login-form"]["email"].value;
	var pass = document.forms["login-form"]["pass"].value;
	function clear(str) {
		document.getElementById(str).value = "";
		document.getElementById(str).style.color = currColor;
	};
	if(email === "admin@admin.bg" && pass === "admin"){
		location.href='infopage.html';
	}	
	else if(email !== "user@user.bg" && email !== "admin@admin.bg"){
		var currColor = document.getElementById('email').style.color;
		document.getElementById('email').style.color = "red";
		document.getElementById('email').value = "That email address is not registered!";
		document.getElementById('email').onclick=function() {clear('email')};
		return false;		
	}
	else if(pass !== "pass"){
		var currColor = document.getElementById('pass').style.color;
		document.getElementById('pass').style.color = "red";
		document.getElementById('pass').onclick=function() {clear('pass')};
		return false;
	}
	else if(email === "user@user.bg" && pass === "pass"){
		location.href='home.html';
	}
}