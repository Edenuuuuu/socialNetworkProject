let image = document.getElementById("photo");

function showInscription() {
    const inscription = document.getElementById("inscriptionPage");
    inscription.showModal();
}

function showConnexion() {
    const connexion = document.getElementById("connexionPage");
    connexion.showModal();
}

function hideInscription() {
    const inscription = document.getElementById("inscriptionPage");
    inscription.close();
}

function hideConnexion() {
    const connexion = document.getElementById("connexionPage");
    connexion.close();
}

let users = [];
function chargeUser()
{
    const data = localStorage.getItem("users");

    if (data !== null)
    {
        users = JSON.parse(data);
    }
}

chargeUser();

function saveUser(user)
{
    users.push(user);
    localStorage.setItem("users", 
        JSON.stringify(users)
    )
}


function registerIn(event) {
    event.preventDefault();

    const formInscription = document.getElementById("form-inscription");

    const inputNom = document.getElementById("nom");
    const inputPrenom = document.getElementById("prenom");
    const inputMailInscription = document.getElementById("mailInscription");
    const inputPassWordInscription = document.getElementById("passwordInscription");
    const inputConfirmation = document.getElementById("confirmation");

    const nom = inputNom.value.trim();
    const prenom = inputPrenom.value.trim();
    const mail = inputMailInscription.value.trim();
    const password = inputPassWordInscription.value;
    const confirmation = inputConfirmation.value;

    if (nom === "") {
        inputNom.style.backgroundColor = "#d70e0e74"
        document.getElementsByClassName("error")[0].innerHTML = "";
        document.getElementsByClassName("error")[0].innerHTML += "<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='#821212'><path d='M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z'></path></svg>Le nom est obligatoire !";
        return;
    }
    else {
        inputNom.style.backgroundColor = "";
        document.getElementsByClassName("error")[0].innerText = "";
    }

    if (prenom === "") {
        inputPrenom.style.backgroundColor = "#d70e0e74"
        document.getElementsByClassName("error")[1].innerHTML = "";
        document.getElementsByClassName("error")[1].innerHTML += "<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='#821212'><path d='M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z'></path></svg>Le prénom est obligatoire !";
        return;
    }
    else {
        inputPrenom.style.backgroundColor = "";
        document.getElementsByClassName("error")[1].innerText = "";
    }

    if (mail === "" || (!mail.includes("@") || !(mail.slice(mail.lastIndexOf("@"))).includes("."))) {
        inputMailInscription.style.backgroundColor = "#d70e0e74"
        document.getElementsByClassName("error")[2].innerHTML = "";
        document.getElementsByClassName("error")[2].innerHTML += "<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='#821212'><path d='M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z'></path></svg>L'email est invalide !";
        return;
    }
    else {
        inputMailInscription.style.backgroundColor = "";
        document.getElementsByClassName("error")[2].innerText = "";
    }

    if (password === "") {
        inputPassWordInscription.style.backgroundColor = "#d70e0e74"
        document.getElementsByClassName("error")[3].innerHTML = "";
        document.getElementsByClassName("error")[3].innerHTML += "<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='#821212'><path d='M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z'></path></svg>Le mot de passe est obligatoire.";
        return;
    }
    else {
        inputPassWordInscription.style.backgroundColor = "";
        document.getElementsByClassName("error")[3].innerText = "";
    }

    if (password !== confirmation) {
        inputConfirmation.style.backgroundColor = "#d70e0e74"
        document.getElementsByClassName("error")[4].innerHTML = "";
        document.getElementsByClassName("error")[4].innerHTML += "<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='#821212'><path d='M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z'></path></svg>La confirmation doit être égale au mot de passe !";
        return;
    }
    else {
        inputConfirmation.style.backgroundColor = "";
        document.getElementsByClassName("error")[4].innerText = "";
    }

    for (const user of users) {
        if (user["mail"] === mail)
        {
            inputMailInscription.style.backgroundColor = "#d70e0e74"
            document.getElementsByClassName("error")[2].innerHTML = "";
            document.getElementsByClassName("error")[2].innerHTML += "<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='#821212'><path d='M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z'></path></svg>Ce mail est déjà renseigné dans nos base !";
            return;
        }
    };

    const inputPP = document.getElementById("pp");

    function finalInscription(img64) {
        const user = {
            id: new Date().valueOf(),
            nom: nom,
            prenom: prenom,
            mail: mail,
            pp: img64,
            mdp: password,
            follow: [],
            like: []
        };
        saveUser(user);
        formInscription.reset();
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "homePage.html";
    }

    if (inputPP.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(inputPP.files[0]);
        reader.onload = function (e) {
            finalInscription(e.target.result);
        };
    } else {
        finalInscription("");
    }
};

function signIn(event) {
    event.preventDefault();

    const formConnexion = document.getElementById("form-connexion");

    const inputMailConnexion = document.getElementById("mailConnexion");
    const inputPassWordConnexion = document.getElementById("passwordConnexion");

    const mail = inputMailConnexion.value.trim();
    const password = inputPassWordConnexion.value;

    if (mail === "" || (!mail.includes("@") || !(mail.slice(mail.lastIndexOf("@"))).includes("."))) {
        inputMailConnexion.style.backgroundColor = "#d70e0e74"
        document.getElementsByClassName("error")[5].innerHTML = "";
        document.getElementsByClassName("error")[5].innerHTML += "<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='#821212'><path d='M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z'></path></svg>L'email est invalide !";
        return;
    }
    else {
        inputMailConnexion.style.backgroundColor = "";
        document.getElementsByClassName("error")[5].innerText = "";
    }

    if (password === "") {
        inputPassWordConnexion.style.backgroundColor = "#d70e0e74"
        document.getElementsByClassName("error")[6].innerHTML = "";
        document.getElementsByClassName("error")[6].innerHTML += "<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='#821212'><path d='M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z'></path></svg>Le mot de passe est obligatoire.";
        return;
    }
    else {
        inputPassWordConnexion.style.backgroundColor = "";
        document.getElementsByClassName("error")[6].innerText = "";
    }

    let isIn = false;
    let currentUser;
    users.some(user => {
        if (user["mail"] === mail && user["mdp"] === password)
        {
            currentUser = user;
            isIn = true;
            return true;
        }
    });

    if (isIn === true)
    {

        localStorage.setItem("currentUser", 
            JSON.stringify(currentUser));

        inputPassWordConnexion.style.backgroundColor = "";
        document.getElementsByClassName("error")[6].innerText = "";
        formConnexion.reset();
        window.location.href = "homePage.html";
    }
    else
    {
        inputPassWordConnexion.style.backgroundColor = "#d70e0e74"
        document.getElementsByClassName("error")[6].innerHTML = "";
        document.getElementsByClassName("error")[6].innerHTML += "<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='#821212'><path d='M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z'></path></svg>Vous n'êtes pas dans nos base. Inscrivez-vous !";
        return;
    }
}

let changeImg = function (e) {

    let image = document.getElementById("photo");

    var reader = new FileReader();

    // On lit le fichier "picture" uploadé
    reader.readAsDataURL(e.files[0]);

    // L'événement déclenché lorsque la lecture est complète
    reader.onload = function (e) {
        // On change l'URL de l'image (base64)
        image.src = e.target.result;
        return e.target.result;
    }

    return "";
}