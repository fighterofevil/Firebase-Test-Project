var myRef= new Firebase('https://demoapp-984c6.firebaseio.com/products');

var emailAddress, password, passwordConfirm;

$('#registerForm').change(function(){
	password = $('#password').val();
	passwordConfirm = $('#password2').val();

	if (password==passwordConfirm) {
		$('#registerButton').removeProp('disabled');
	} else {
		$('#registerButton').prop('disabled', 'disabled');
	}

});

function onComplete(error, userData) {
	if (error){
		switch (error.code){
			case 'EMAIL_TAKEN':
		}
	}
}

function registerUser(){
	emailAddress = $('#emailAddress').val();
	password = $('#password').val();

	// Firebase call
	myRef.createUser({
		email: emailAddress;
		password: password;
	},
	onComplete);
}