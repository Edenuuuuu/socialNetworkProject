let pageState = 4;

let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

let posts = JSON.parse(localStorage.getItem("posts")) || [];
function savePost(post) {
    posts.push(post);
    localStorage.setItem("posts", 
        JSON.stringify(posts)
    )
}

function savePostAlreadyIn(post) {
    const realID = posts.findIndex((element) => element["id"] === post["id"])
    posts.splice(realID, 1, post);
    localStorage.setItem("posts", 
        JSON.stringify(posts)
    )
}


function savePosts() {
    localStorage.setItem("posts", 
        JSON.stringify(posts)
    )
}

let users = [];
const data = localStorage.getItem("users");
if (data !== null)
{
    users = JSON.parse(data);
}

function saveCurrentUser(currentUserM) {

    let i = 0;
    users.some(user => {
        if (user["id"] === currentUserM["id"])
        {
            users.splice(i, 1, currentUserM);
            return true;
        }
        i++;
    });


    localStorage.setItem("currentUser", 
        JSON.stringify(currentUser)
    );

    localStorage.setItem("users", 
        JSON.stringify(users)
    );
}

function saveUsers(users) {
    localStorage.setItem("users", 
        JSON.stringify(users)
    );
}

let contentContainer = document.getElementById("contentContainer");
function showContent() {
    contentContainer.innerHTML = "";
    switch (pageState) {
        case 1:
            showFeed();
            break;
        case 2:
            showFollow();
            break;
        case 3:
            showStat();
            break;
        case 4:
            showSetting();
            break;
        default:
            showFeed();
            break;
    }
}

function showFeed() {
    let titleFeed = document.createElement("h1");
    titleFeed.setAttribute("class", "title");
    titleFeed.textContent = "MySpace";

    let formAddPost = document.createElement("form");
    formAddPost.setAttribute("id", "postForm");

    const titreForm = document.createElement("h2");
    titreForm.textContent = "Créer un poste :";

    const inputTitrePost = document.createElement("input");
    inputTitrePost.setAttribute("type", "text");
    inputTitrePost.setAttribute("id", "titrePostInput");

    const inputTitrePostLabel = document.createElement("label");
    inputTitrePostLabel.setAttribute("for", "titrePostInput");
    inputTitrePostLabel.textContent = "Titre : ";

    const inputContentPost = document.createElement("textarea");;
    inputContentPost.setAttribute("id", "contentInput");

    const inputContentPostLabel = document.createElement("label");
    inputContentPostLabel.setAttribute("for", "contentInput");
    inputContentPostLabel.textContent = "Contenue : ";

    let labelImage = document.createElement("label");
    labelImage.setAttribute("for", "imgInput");
    labelImage.textContent = "Image : ";
    let imgPostForm = document.createElement("img");
    imgPostForm.setAttribute("id", "imgPostForm");
    imgPostForm.setAttribute("src", "");
    labelImage.appendChild(imgPostForm);

    const inputFilePost = document.createElement("input");
    inputFilePost.setAttribute("type", "file");
    inputFilePost.setAttribute("id", "imgInput");
    inputFilePost.setAttribute("accept", "image/*");
    inputFilePost.setAttribute("onchange", "changeImg(this)");

    const inputSubmit = document.createElement("input");
    inputSubmit.setAttribute("type", "submit");
    inputSubmit.setAttribute("value", "Poster");

    formAddPost.appendChild(titreForm);
    formAddPost.appendChild(inputTitrePostLabel);
    formAddPost.innerHTML += "<br>"
    formAddPost.appendChild(inputTitrePost);
    formAddPost.innerHTML += "<br>"
    formAddPost.appendChild(inputContentPostLabel);
    formAddPost.innerHTML += "<br>"
    formAddPost.appendChild(inputContentPost);
    formAddPost.innerHTML += "<br>"
    formAddPost.appendChild(labelImage);
    formAddPost.innerHTML += "<br>"
    formAddPost.appendChild(inputFilePost);
    formAddPost.innerHTML += "<br>"
    formAddPost.appendChild(inputSubmit);

    formAddPost.addEventListener("submit", (e) => {
        e.preventDefault();
        const titleInput = document.getElementById("titrePostInput");
        const contentInput = document.getElementById("contentInput");
        const imgInput = document.getElementById("imgInput");

        const titre = titleInput.value;
        const content = contentInput.value;

        const imgPost = imgInput.value;

        if (titre === "" || content === "") {
            return;
        }

        function finalPosting(img64) {
            const post = {
                id: new Date().valueOf(),
                user: currentUser["id"],
                date: new Date(),
                titre: titre,
                contenue: content,
                img: img64,
                nblike: 0,
                comments : []
            }
            savePost(post);
            afficherPost(posts);
            formAddPost.reset();
        }

        if (imgInput.files.length === 0) {
            
        }


        if (imgInput.files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(imgInput.files[0]);
            reader.onload = function (e) {
                finalPosting(e.target.result);
            };
        } 
        else {
            finalPosting("");
        }
    })

    let searchInputDiv = document.createElement("div");
    searchInputDiv.setAttribute("class", "searchInputDiv");

    let searchLabel = document.createElement("label");
    searchLabel.innerHTML = "Recherche : ";
    let searchInput = document.createElement("input");
    searchInput.setAttribute("type", "text");
    let selectTheme = document.createElement("select");
    selectTheme.innerHTML = "<option value='0'>Auteur</option>"
                          + "<option value='1'>Contenue</option>";

    searchInputDiv.appendChild(searchLabel);
    searchInputDiv.appendChild(searchInput);
    searchInputDiv.appendChild(selectTheme);

    let postHolder = document.createElement("div");
    postHolder.setAttribute("id", "postHolder");

    

    searchInput.addEventListener("input", (e) => {
        e.preventDefault();
        if (searchInput.value !== "")
        {
            let postsSearch = [];
            if (selectTheme.value === "0")
            {
                posts.some(post => {
                    let userPost = users.find((element) => element["id"] === post["user"]);
                    if (((userPost["prenom"].concat(" ", userPost["nom"])).toLowerCase()).includes((searchInput.value).toLowerCase()))
                    {
                        postsSearch.push(post);
                    }
                })
                afficherPost(postsSearch);
            }
            else if (selectTheme.value === "1")
            {
                posts.some(post => {
                    if (((post["titre"].concat(post["contenue"])).toLowerCase()).includes((searchInput.value).toLowerCase()))
                    {
                        postsSearch.push(post);
                    }
                })
                afficherPost(postsSearch);
            }
        }
        else
        {
            afficherPost(posts);
        }
    })


    contentContainer.appendChild(titleFeed);
    contentContainer.appendChild(formAddPost);
    contentContainer.appendChild(searchInputDiv);
    contentContainer.appendChild(postHolder);
    afficherPost(posts);
}

function showFollow() {
    let titleFollow = document.createElement("h1");
    titleFollow.setAttribute("class", "title");
    titleFollow.textContent = "MySpace";

    let postHolder = document.createElement("div");
    postHolder.setAttribute("id", "postHolder");

    contentContainer.appendChild(titleFollow);
    contentContainer.appendChild(postHolder);

    afficherFollowPost(posts);
}

function showStat() {
    let titleStat = document.createElement("h1");
    titleStat.setAttribute("class", "title");
    titleStat.textContent = "Dashboard";

    let nbLikeInPost = 0;
    let nbPostsByCur = 0;
    posts.some(post => {
        if (post["user"] == currentUser["id"])
        {
            nbLikeInPost += post["nblike"];
            nbPostsByCur++;
        }
    });

    let nbFollower = 0;
    users.some(user => {
        if (user["follow"].findIndex((element) => element === currentUser["id"]) != -1)
        {
            nbFollower++;
        }
    })

    let statHolder = document.createElement("div");
    statHolder.setAttribute("id", "statsHolder");


    let likeIn = document.createElement("h3");
    likeIn.setAttribute("class", "statInfo");
    likeIn.textContent = "Nombres de Posts que vous avez aimés : " + currentUser["like"].length;

    let likeOut = document.createElement("h3");
    likeOut.setAttribute("class", "statInfo");
    likeOut.textContent = "Nombres de personnes à avoir aimés vos Posts : " + nbLikeInPost;
    
    let nbPosts = document.createElement("h3");
    nbPosts.setAttribute("class", "statInfo");
    nbPosts.textContent = "Nombres de Posts que vous avez publié : " + nbPostsByCur;

    let nbFollowerIn = document.createElement("h3");
    nbFollowerIn.setAttribute("class", "statInfo");
    nbFollowerIn.textContent = "Nombres de personnes qui sont abonnés à votre compte : " + nbFollower;

    let nbFollowerOut = document.createElement("h3");
    nbFollowerOut.setAttribute("class", "statInfo");
    nbFollowerOut.textContent = "Nombres de personnes que vous suivés : " + currentUser["follow"].length;

    statHolder.appendChild(likeIn);
    statHolder.appendChild(likeOut);
    statHolder.appendChild(nbPosts);
    statHolder.appendChild(nbFollowerIn);
    statHolder.appendChild(nbFollowerOut);

    contentContainer.appendChild(titleStat);
    contentContainer.appendChild(statHolder);
}

function showSetting() {
    let titleSetting = document.createElement("h1");
    titleSetting.setAttribute("class", "title");
    titleSetting.textContent = "MySpace";

    let settingBoard = document.createElement("div");
    settingBoard.setAttribute("id", "settingBoard");

    let formModify = document.createElement("form");

    const titreForm = document.createElement("h2");
    titreForm.textContent = "Modifier votre profil : ";

    let labelNameModify = document.createElement("label");
    labelNameModify.setAttribute("for", "nameModify");
    labelNameModify.textContent = "Nom : ";
    let inputNameModify = document.createElement("input");
    inputNameModify.setAttribute("id", "nameModify");
    inputNameModify.setAttribute("type", "text");
    inputNameModify.setAttribute("value", currentUser["nom"]);

    let labelSurnameModify = document.createElement("label");
    labelSurnameModify.setAttribute("for", "surnameModify");
    labelSurnameModify.textContent = "Prénom : ";
    let inputSurnameModify = document.createElement("input");
    inputSurnameModify.setAttribute("id", "surnameModify");
    inputSurnameModify.setAttribute("type", "text");
    inputSurnameModify.setAttribute("value", currentUser["prenom"]);

    let labelMailModify = document.createElement("label");
    labelMailModify.setAttribute("for", "mailModify");
    labelMailModify.textContent = "Mail : ";
    let inputMailModify = document.createElement("input");
    inputMailModify.setAttribute("id", "mailModify");
    inputMailModify.setAttribute("type", "text");
    inputMailModify.setAttribute("value", currentUser["mail"]);

    let labelLastPassword = document.createElement("label");
    labelLastPassword.setAttribute("for", "lastPassword");
    labelLastPassword.textContent = "Ancient Mot de passe : ";
    let inputLastPassword = document.createElement("input");
    inputLastPassword.setAttribute("id", "lastPassword");
    inputLastPassword.setAttribute("type", "password");

    let labelNewPassword = document.createElement("label");
    labelNewPassword.setAttribute("for", "newPassword");
    labelNewPassword.textContent = "Nouveau Mot de passe : ";
    let inputNewPassword = document.createElement("input");
    inputNewPassword.setAttribute("id", "newPassword");
    inputNewPassword.setAttribute("type", "password");

    let labelConfirmationPassword = document.createElement("label");
    labelConfirmationPassword.setAttribute("for", "confirmationPassword");
    labelConfirmationPassword.textContent = "Confirmation du Mot de passe : ";
    let inputConfirmationPassword = document.createElement("input");
    inputConfirmationPassword.setAttribute("id", "confirmationPassword");
    inputConfirmationPassword.setAttribute("type", "password");

    let inputSubmit = document.createElement("input");
    inputSubmit.setAttribute("value", "Modifier");
    inputSubmit.setAttribute("type", "submit");

    let error = document.createElement("div");
    error.setAttribute("class", "error");

    formModify.appendChild(titreForm);
    formModify.innerHTML += "<br>";
    formModify.appendChild(labelNameModify);
    formModify.innerHTML += "<br>";
    formModify.appendChild(inputNameModify);
    formModify.innerHTML += "<br>";
    formModify.appendChild(error);
    formModify.innerHTML += "<br>";

    formModify.appendChild(labelSurnameModify);
    formModify.innerHTML += "<br>";
    formModify.appendChild(inputSurnameModify);
    formModify.innerHTML += "<br>";
    formModify.appendChild(error);
    formModify.innerHTML += "<br>";

    formModify.appendChild(labelMailModify);
    formModify.innerHTML += "<br>";
    formModify.appendChild(inputMailModify);
    formModify.innerHTML += "<br>";
    formModify.appendChild(error);
    formModify.innerHTML += "<br>";

    formModify.appendChild(labelLastPassword);
    formModify.innerHTML += "<br>";
    formModify.appendChild(inputLastPassword);
    formModify.innerHTML += "<br>";
    formModify.appendChild(error);
    formModify.innerHTML += "<br>";

    formModify.appendChild(labelNewPassword);
    formModify.innerHTML += "<br>";
    formModify.appendChild(inputNewPassword);
    formModify.innerHTML += "<br>";
    formModify.appendChild(error);
    formModify.innerHTML += "<br>";

    formModify.appendChild(labelConfirmationPassword);
    formModify.innerHTML += "<br>";
    formModify.appendChild(inputConfirmationPassword);
    formModify.innerHTML += "<br>";
    formModify.appendChild(error);
    formModify.innerHTML += "<br>";

    formModify.appendChild(inputSubmit);

    formModify.addEventListener("submit", (e) => {
        e.preventDefault();

        const inputNom = document.getElementById("nameModify");
        const inputPrenom = document.getElementById("surnameModify");
        const inputMail = document.getElementById("mailModify");
        const inputLastPassWord = document.getElementById("lastPassword");
        const inputPassWord = document.getElementById("newPassword");
        const inputConfirmation = document.getElementById("confirmationPassword");

        const nom = inputNom.value.trim();
        const prenom = inputPrenom.value.trim();
        const mail = inputMail.value.trim();
        const lastPassword = inputLastPassWord.value;
        const password = inputPassWord.value;
        const confirmation = inputConfirmation.value;

        if(lastPassword === "") 
        {
            inputLastPassWord.style.backgroundColor = "#d70e0e74"
            document.getElementsByClassName("error")[3].innerHTML = "";
            document.getElementsByClassName("error")[3].innerHTML += "<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='#821212'><path d='M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z'></path></svg>L'ancien mot de passe est un champ obligatoire !";
            return; 
        }
        else
        {
            inputLastPassWord.style.backgroundColor = "";
            document.getElementsByClassName("error")[3].innerText = "";

            if (nom === "")
            {
                inputNom.style.backgroundColor = "#d70e0e74"
                document.getElementsByClassName("error")[0].innerHTML = "";
                document.getElementsByClassName("error")[0].innerHTML += "<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='#821212'><path d='M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z'></path></svg>Le nom est un champ obligatoire !";
                return;
            }
            else {
                currentUser["nom"] = nom;
                inputNom.style.backgroundColor = "";
                document.getElementsByClassName("error")[0].innerText = "";
            }

            
            if (prenom === "")
            {
                inputPrenom.style.backgroundColor = "#d70e0e74"
                document.getElementsByClassName("error")[1].innerHTML = "";
                document.getElementsByClassName("error")[1].innerHTML += "<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='#821212'><path d='M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z'></path></svg>Le prénom est un champ obligatoire !";
                return;
            }
            else {
                currentUser["prenom"] = prenom;
                inputPrenom.style.backgroundColor = "";
                document.getElementsByClassName("error")[1].innerText = "";
            }

            if (mail === "" || (!mail.includes("@") || !(mail.slice(mail.lastIndexOf("@"))).includes(".")))
            {
                inputMail.style.backgroundColor = "#d70e0e74"
                document.getElementsByClassName("error")[2].innerHTML = "";
                document.getElementsByClassName("error")[2].innerHTML += "<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='#821212'><path d='M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z'></path></svg>L'email est invalide !";
                return;
            }
            else {
                currentUser["mail"] = mail;
                inputMail.style.backgroundColor = "";
                document.getElementsByClassName("error")[2].innerText = "";
            }

            if (lastPassword !== currentUser["mdp"])
            {
                inputLastPassWord.style.backgroundColor = "#d70e0e74"
                document.getElementsByClassName("error")[3].innerHTML = "";
                document.getElementsByClassName("error")[3].innerHTML += "<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='#821212'><path d='M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z'></path></svg>L'ancien mot de passe est invalide !";
                return;
            }
            else {
                inputLastPassWord.style.backgroundColor = "";
                document.getElementsByClassName("error")[3].innerText = "";
            }

            if(password === "") { }
            else {
                if(confirmation !== password) {
                    inputConfirmation.style.backgroundColor = "#d70e0e74"
                    document.getElementsByClassName("error")[5].innerHTML = "";
                    document.getElementsByClassName("error")[5].innerHTML += "<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='#821212'><path d='M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z'></path></svg>L'email est invalide !";
                    return;
                }
                else {
                    currentUser["mdp"] = password;
                    inputConfirmation.style.backgroundColor = "";
                    document.getElementsByClassName("error")[5].innerText = "";
                }
            }

            saveCurrentUser(currentUser);

            let pp = document.getElementById("ppCurUser");
            if (currentUser["pp"] === "") {
                pp.src = "image/astro.jpg";
            } else {
                pp.src = currentUser["pp"];
            }
            let pseudo = document.getElementById("currentUserPseudo");
            pseudo.textContent = currentUser["prenom"].concat(" ", currentUser["nom"]);

            formModify.reset();
            showContent();
        }
    })

    settingBoard.appendChild(formModify);

    contentContainer.appendChild(titleSetting);
    contentContainer.appendChild(settingBoard);
}

function createPost(user, date, titre, contenue, img, nblike, comments, id) {
    // Création de la div qui contient le post
    let post = document.createElement("div");
    post.setAttribute("class", "post");

    // Création de la div qui contient le haut du poste
    let topPost = document.createElement("div");
    topPost.setAttribute("class", "topPost");

    let userInfoPost = document.createElement("div");
    userInfoPost.setAttribute("class", "userInfoPost");

    let ppPost = document.createElement("img");
    ppPost.setAttribute("class", "ppPost");
    if (user["pp"] === "") {
        ppPost.src = "image/astro.jpg";
    } else {
        ppPost.src = user["pp"];
    }

    let stockInfo = document.createElement("span");

    let pseudoPost = document.createElement("h3");
    pseudoPost.setAttribute("class", "pseudo"); 
    pseudoPost.textContent = user["prenom"].concat(" ").concat(user["nom"]);

    stockInfo.appendChild(pseudoPost);

    if (user["id"] === currentUser["id"]) {

    } else {
        const postID = "follow" + id;

        let followCheckbox = document.createElement("input");
        followCheckbox.setAttribute("type", "checkbox");
        followCheckbox.setAttribute("id", postID);
        followCheckbox.setAttribute("class", "followCheckbox"); 

        // Restaure l'état coché
        followCheckbox.checked = currentUser["follow"].some(u => u === user["id"]);

        followCheckbox.addEventListener("click", (e) => {
            if (followCheckbox.checked) {
                currentUser["follow"].push(user["id"]);
            } else {
                currentUser["follow"].splice(
                    currentUser["follow"].findIndex((element) => element === user["id"]), 1);
            }
            saveCurrentUser(currentUser);
            showContent();
            afficherUsersLeft();
        });

        let followLabel = document.createElement("label");
        followLabel.setAttribute("for", postID);
        followLabel.setAttribute("class", "followLabel"); 
        
        followLabel.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' height='14px' viewBox='0 -960 960 960' width='14px' fill='#FFFFFF'><path d='M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z'/></svg><h5 class='followLabelContent'>Follow</h5>";

        stockInfo.appendChild(followCheckbox);
        stockInfo.appendChild(followLabel);

    }

    userInfoPost.appendChild(ppPost);
    userInfoPost.appendChild(stockInfo);

    let infoPost = document.createElement("div");
    infoPost.setAttribute("class", "infoPost"); 

    let dateP = document.createElement("p");
    dateP.textContent = date.toLocaleDateString("fr-FR");
    let heureP = document.createElement("p");
    heureP.textContent = date.toLocaleTimeString("fr-FR");

    infoPost.appendChild(dateP);
    infoPost.appendChild(heureP);

    topPost.appendChild(userInfoPost);
    topPost.appendChild(infoPost);

    //Contenue du post
    let titreH2 = document.createElement("h2");
    titreH2.setAttribute("class", "postTitle"); 
    titreH2.textContent = titre;

    let content = document.createElement("p");
    content.textContent = contenue;

    // Bas du post
    let bottomPost = document.createElement("div");
    bottomPost.setAttribute("class", "bottomPost"); 

    if (user["id"] === currentUser["id"]) {
        const trashID = "trash" + id;
        let trashButton = document.createElement("div");
        trashButton.setAttribute("class", "trashButton"); 
        trashButton.setAttribute("id", trashID);

        trashButton.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='#0c0c17'><path d='M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z'/></svg>";

        trashButton.addEventListener("click", (e) => {
            const realID = posts.findIndex(((element) => element["id"] === id));
            posts.splice(realID, 1);
            users.some(user => {
                const postRemoveID = user["like"].findIndex(((element) => element === id));
                if (postRemoveID === -1) {}
                else { user["like"].splice(postRemoveID, 1); }
            });
            saveUsers(users);
            savePosts();
            showContent();
        });

        bottomPost.appendChild(trashButton);
    } else{
        let temp = document.createElement("div");
        bottomPost.appendChild(temp);
    }

    let commentSection = document.createElement("div");
    commentSection.setAttribute("class", "commentSection");
    commentSection.setAttribute("style", "display:none");

    let commentFormLabel = document.createElement("label");
    commentFormLabel.innerHTML = "Commenter :";
    let commentForm = document.createElement("input");
    commentForm.setAttribute("type", "text");

    commentSection.appendChild(commentFormLabel);
    commentSection.appendChild(commentForm);

    comments.some(comment => {
        let commentUserInfo = document.createElement("div");
        commentUserInfo.setAttribute("class", "commentUserInfo");

        const imgPPComment = document.createElement("img");
        const commentUser = users.find((element) => comment["id"] === element["id"]);
        imgPPComment.setAttribute("src", commentUser[pp]);
        const commentUserPseudo = commentUser["prenom"].concat(" ", commentUser["nom"]);
        
    })

    let interaction = document.createElement("div");
    interaction.setAttribute("class", "likeDiv")

    const commentID = "comment" + id;

    let commentInput = document.createElement("input");
    commentInput.setAttribute("type", "checkbox");
    commentInput.setAttribute("class", "commentCheckbox"); 
    commentInput.setAttribute("id", commentID);

    commentInput.addEventListener("click", (e) => {
        if(commentInput.checked) {
            commentSection.setAttribute("style", "display:inherit");
        } else {
            commentSection.setAttribute("style", "display:none");
        }
    })

    let commentLabel = document.createElement("label");
    commentLabel.setAttribute("class", "likeLabel");
    commentLabel.setAttribute("for", commentID);
    commentLabel.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' height='22px' viewBox='0 -960 960 960' width='22px' fill='#0c0c17'><path d='M160-240q-33 0-56.5-23.5T80-320v-480q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v623q0 27-24.5 37.5T812-148l-92-92H160Zm594-80 46 45v-525H160v480h594Zm-594 0v-480 480Z'/></svg>";


    let NbLike = document.createElement("h3");
    NbLike.setAttribute("class", "nbLike"); 
    NbLike.textContent = nblike;

    const likeID = "like" + id;

    let likeInput = document.createElement("input");
    likeInput.setAttribute("type", "checkbox");
    likeInput.setAttribute("class", "likeCheckbox"); 
    likeInput.setAttribute("id", likeID);

    const test = currentUser["like"].some(u => u === id);
    likeInput.checked = test;

    likeInput.addEventListener("click", (e) => {
        if (likeInput.checked) {
            nblike++;
            currentUser["like"].push(id);
        } else {
            nblike--;
            currentUser["like"].splice(
                currentUser["like"].findIndex((element) => element === id), 1);
        }

        const post = {
            id: id,
            user: user["id"],
            date: date,
            titre: titre,
            contenue: contenue,
            img: img,
            nblike: nblike,
            comments : comments
        };
        saveCurrentUser(currentUser);
        savePostAlreadyIn(post);
        showContent();
    });

    let likeLabel = document.createElement("label");
    likeLabel.setAttribute("class", "likeLabel");
    likeLabel.setAttribute("for", likeID);
    likeLabel.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' height='25px' viewBox='0 -960 960 960' width='25px' fill='none' stroke='#0c0c17' stroke-width='100'><path d='M480-269 300.67-161q-9 5.67-19 5-10-.67-17.67-6.33-7.67-5.67-11.67-14.5-4-8.84-1.66-19.84L298-401 139.67-538.67q-8.67-7.66-10.5-17.16-1.84-9.5.83-18.5t10-15q7.33-6 18.67-7.34L368-615l81-192.67q4.33-10 13.17-15 8.83-5 17.83-5 9 0 17.83 5 8.84 5 13.17 15L592-615l209.33 18.33q11.34 1.34 18.67 7.34 7.33 6 10 15t.83 18.5q-1.83 9.5-10.5 17.16L662-401l47.33 204.33q2.34 11-1.66 19.84-4 8.83-11.67 14.5-7.67 5.66-17.67 6.33-10 .67-19-5L480-269Z'/></svg>";


    interaction.appendChild(commentInput);
    interaction.appendChild(commentLabel);

    interaction.appendChild(likeInput);
    interaction.appendChild(likeLabel);
    interaction.appendChild(NbLike);

    bottomPost.appendChild(interaction);

    post.appendChild(topPost);
    post.appendChild(titreH2);
    post.appendChild(content);
    if (img !== "") {
        let imgPost = document.createElement("img");
        imgPost.setAttribute("class", "imgPost");
        imgPost.setAttribute("src", img);
        post.appendChild(imgPost);
    }
    post.appendChild(bottomPost);
    post.appendChild(commentSection);

    return post;
}

function afficherPost(PrintPosts) {
    let postsContainer = document.getElementById("postHolder");
    postsContainer.innerHTML = "";
    if (PrintPosts === null) {

    } else {
        let postsReversed = PrintPosts.toReversed();
        postsReversed.some(post => {
            const date = new Date(post["date"]);
            postsContainer.appendChild(createPost(users.find((element) => post["user"] === element["id"]), date, post["titre"], post["contenue"], post["img"], post["nblike"], post["comments"], post["id"]));
        });
    }
}

function afficherFollowPost(PrintPosts) {
    let postsContainer = document.getElementById("postHolder");
    postsContainer.innerHTML = "";
    if (posts === null) {

    } else {
        let postsReversed = PrintPosts.toReversed();
        postsReversed.some(post => {
            if(currentUser["follow"].findIndex((element) => element === post["user"]) > -1 || post["user"] === currentUser["id"])
            {
                const date = new Date(post["date"]);
                postsContainer.appendChild(createPost(users.find((element) => post["user"] === element["id"]), date, post["titre"], post["contenue"], post["img"], post["nblike"], post["comments"], post["id"]));
            }
        });
    }
}

function afficherUsersLeft() {
    let users = JSON.parse(localStorage.getItem("users")) || null;
    if (users === null) {
        window.location.href = "startPage.html";
    }
    let usersContainer = document.getElementById("usersContainer");
    usersContainer.innerHTML = "";
    let id = 0;
    for(const user of users) {
        if (user["id"] === currentUser["id"]) {}
        else {
            let userInfoLeft = document.createElement("div");
            userInfoLeft.setAttribute("class", "userInfoLeft");

            let ppOther = document.createElement("img");
            ppOther.setAttribute("class", "ppOther");
            if (user["pp"] === "") {
                ppOther.src = "image/astro.jpg";
            } else {
                ppOther.src = user["pp"];
            }

            let stockInfo = document.createElement("span");

            let pseudoPost = document.createElement("h3");
            pseudoPost.setAttribute("class", "pseudo"); 
            pseudoPost.textContent = user["prenom"].concat(" ").concat(user["nom"]);

            stockInfo.appendChild(pseudoPost);

            const postID = "follow" + id;

            let followCheckbox = document.createElement("input");
            followCheckbox.setAttribute("type", "checkbox");
            followCheckbox.setAttribute("id", postID);
            followCheckbox.setAttribute("class", "followCheckbox"); 

            // Restaure l'état coché
            followCheckbox.checked = currentUser["follow"].some(u => u === user["id"]);

            followCheckbox.addEventListener("click", (e) => {
                if (followCheckbox.checked) {
                    currentUser["follow"].push(user["id"]);
                } else {
                    currentUser["follow"].splice(
                        currentUser["follow"].findIndex((element) => element === user["mail"]), 1);
                }
                saveCurrentUser(currentUser);
                showContent();
            });

            let followLabel = document.createElement("label");
            followLabel.setAttribute("for", postID);
            followLabel.setAttribute("class", "followLabel"); 
            
            followLabel.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' height='14px' viewBox='0 -960 960 960' width='14px' fill='#FFFFFF'><path d='M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z'/></svg><h5 class='followLabelContent'>Follow</h5>";

            stockInfo.appendChild(followCheckbox);
            stockInfo.appendChild(followLabel);

            userInfoLeft.appendChild(ppOther);
            userInfoLeft.appendChild(stockInfo);

            id++;

            usersContainer.appendChild(userInfoLeft);
        }
    }
}

document.addEventListener("DOMContentLoaded", function(e) {
    e.preventDefault();
    if(currentUser === null)
    {
        window.location.href = "startPage.html";
    }
    let pp = document.getElementById("ppCurUser");
    if (currentUser["pp"] === "") {
        pp.src = "image/astro.jpg";
    } else {
        pp.src = currentUser["pp"];
    }
    let pseudo = document.getElementById("currentUserPseudo");
    pseudo.textContent = currentUser["prenom"].concat(" ", currentUser["nom"]);

    afficherUsersLeft();
    showContent();

})

let decoButton = document.getElementsByClassName("decoButton")[0];
decoButton.addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = "startPage.html";
})

const feed = document.getElementById("Feed");
const follow = document.getElementById("Follow");
const stat = document.getElementById("Stat");
const setting = document.getElementById("Setting");

feed.addEventListener("click", (e) => {
    e.preventDefault();
    pageState = 1;
    showContent();
    return;
})

follow.addEventListener("click", (e) => {
    e.preventDefault();
    pageState = 2;
    showContent();
    return;
})

stat.addEventListener("click", (e) => {
    e.preventDefault();
    pageState = 3;
    showContent();
    return;
})

setting.addEventListener("click", (e) => {
    e.preventDefault();
    pageState = 4;
    showContent();
    return;
})

let changeImg = function (e) {

    let image = document.getElementById("imgPostForm");

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