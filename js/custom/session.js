function register() {
    register = true;
    inputUser = getUserInputs();

    if(inputUser.firstName == "" || inputUser.lastName == "" || inputUser.email == "" || inputUser.password == "") {
        register = false;
    }

    if(!isValidEmail(inputUser.email)) {
        register = false;
    }

    if(inputUser.password != inputUser.confirmPassword) {
        register = false;
    }

    if(!isValidPassword(inputUser.password)) {
        register = false;
    }

    if(register) {
        let error = saveUser(inputUser);
        if(error) {
            Swal.fire({
                icon: "error",
                title: "Usuario existente",
                text: "El usuairo ya se encuentra registrado",
                footer: '<a href="login.html">Login</a>'
            });
        } else {
            document.getElementById("register").click();
        }
    } else {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Los datos ingresados no son validos, por favor reviselos y vuelva a intentarlo."
        });
    }
}

function saveUser(userInputs) {
    debugger;
    let newUser = {
        firstName: userInputs.firstName,
        lastName: userInputs.lastName,
        email: userInputs.email,
        password: userInputs.password
    };

    let users = getUsers();
    if(users) {
        if(alreadyExists(newUser, users)) {
            return "¡El usuario ya se encuentra registrado!";
        } else {
            users.push(newUser);
        }
    } else {
        users = []
        users.push(newUser);
    }

    localStorage.setItem("users", JSON.stringify(users))
    return null;
}

function alreadyExists(newUser, users) {
    let exists = function(user) {
        return newUser.email == user.email;
    };

    return users.some(exists);
}

function getUserInputs() {
    return {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("inputEmail").value,
        password: document.getElementById("inputPassword").value,
        confirmPassword: document.getElementById("confirmPassword").value
    }
}

function isValidPassword(password) {
    let re = /^(\w|\d){8,}$/;
    return re.test(String(password));
}

function isValidEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function logout() {
    sessionStorage.setItem("session", false);
    document.getElementById("logout").click();
}

function login() {
    login = false;
    let inputEmail = document.getElementById("inputEmail").value;
    let inputPassword = document.getElementById("inputPassword").value;

    let currentUser = {
      email: inputEmail,
      password: inputPassword
    }

    let users = getUsers();
    /*[{"email": "damian.lisas@gmail.com", "password": "password123"}, {"email": "admin@gmail.com", "password": "admin123"}]*/

    if(users) {
      users.forEach(element => {
        debugger;
        if(element.email == currentUser.email) {
            if(element.password == currentUser.password) {
                login = true;
                sessionStorage.setItem("session", "activa");
                document.getElementById("login").click();
            }
        }
      });
    }
    
    if(!login) {
        Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "Contraseña y/o usuario incorrectos"
        });
    }
}

function getUsers() {
    return JSON.parse(localStorage.getItem("users"));
}

function validSession() {
    session = sessionStorage.getItem("session");
    return session == "activa";
}

function validateSession() {
    if(!validSession()) {
        document.getElementById("logout").click();
    } else {
        Swal.fire({
        icon: "success",
        title: "¡Bienvenido!"
        });
    }
}