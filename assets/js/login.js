// funcion paera registrarse
function register() {
  var email = document.getElementById('email').value;// rescatramos el valor
  var contraseña = document.getElementById('contraseña').value;
	
  // resgistrar nuevos usuarios
  firebase.auth().createUserWithEmailAndPassword(email, contraseña)
    .then(function() {
      verificar();
    })	
    .catch(function(error) {
      // Handle Errors here.
	  	var errorCode = error.code;
	  	var errorMessage = error.message;
	 	// ...
    });
}
// funcion que permite a los usuarios existentes acceder con su dirección de correo electrónico y una contraseña.
function ingresar() {
  var email2 = document.getElementById('email2').value;// rescatramos el valor
  var contraseña2 = document.getElementById('contraseña2').value;
  firebase.auth().signInWithEmailAndPassword(email2, contraseña2)
    .catch(function(error) {
  		// Handle Errors here.
  		var errorCode = error.code;
  		var errorMessage = error.message;
  		/* console.log(errorCode);
  		console.log(errorMessage);*/
  		// ...
 	});
}
//
function observador() {
  firebase.auth().onAuthStateChanged(function(user) {
	  	if (user) {
	  		console.log('Existe usuario activo');
      // User is signed in.
      aparece(user);// ejecuta la funcion aparece
		    var displayName = user.displayName;
		    var email = user.email;

		    console.log('***********');
		    console.log(user.emailVerified);
		    console.log('***********');


		    var emailVerified = user.emailVerified;
		    var photoURL = user.photoURL;
		    var isAnonymous = user.isAnonymous;
		    var uid = user.uid;
		    var providerData = user.providerData;
		    // ...
    } else {
		   	// User is signed out.
      console.log('No existe usuario activo');
      contenido.innerHTML = `
      
      `;
      // ...
    }
  });
}
observador();
// div vacio
function aparece(user) {
  var user = user;
  var contenido = document.getElementById('contenido');
  if (user.emailVerified) {
    contenido.innerHTML	= `
    <div class="container mt-3">
    <div class="alert alert-success" role="alert">
    <h4 class="alert-heading">Bienvenido! ${user.email}</h4>
    <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
    <hr>
    <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
    </div>
    <button onclick="cerrar()" class="btn btn-danger">Cerrar Sesión</button>    
    </div>
    `;
  }// ``:permite hacer plantillas en html es decir escribir codigo de html

}	
// funcion cerrar sesion
function cerrar() {
  firebase.auth().signOut()
    .then(function() {
      console.log('Cerrando sesión...');
    })
    .catch(function(error) {
      console.log(error);
    });
}
// envia correo de verificacion
function verificar() {
  var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function() {
  	// Email sent.
  	console.log('enviando correo...');
  })
    .catch(function(error) {
  	// An error happened.
  	console.log(error);
    });
}