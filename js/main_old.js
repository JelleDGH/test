/* PAGE SET UP */
/*localStorage.clear();*/
let title;
let sub_title = "";
title = document.title = "Majadu" + sub_title;

/** IMPORT **/
import("./selectors.js"); //select all the ids and classes


/** LOAD NEWS FEED **/
function getNews() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = loadNews;
    xmlhttp.open("GET", "./json/latest_news.json");
    xmlhttp.send();
}
function loadNews() {
    const ul = document.createElement("ul");
    var JSON_news = JSON.parse(this.responseText);
    var feed = JSON_news["feed"];
    for (var x = 0; x < feed.length; x++) {
        var li = document.createElement('li');
        var h3 = document.createElement('h3');
        var p = document.createElement('p');
        h3.innerHTML = feed[x]["subject"];
        p.innerHTML = feed[x]["message"];
        li.appendChild(h3);
        li.appendChild(p);
        ul.appendChild(li);
    }
    news_feed.appendChild(ul);


}

/** SIGNUP **/
function clickSignup() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = signUp;
    xmlhttp.open("GET", "./json/maji.json");
    xmlhttp.send();
}
function signUp() {
    let register_username = document.querySelector('#username_register').value;
    let password_register = document.querySelector('#password_register').value;
    let password_register_repeat = document.querySelector('#password_register_repeat').value;
    let token_register = document.querySelector('#register_token').value;
    let user_id;

    let JSON_members,members,members_username,members_token;

    JSON_members = JSON.parse(this.responseText);
    members = JSON_members["members"];

    for (let x = 0; x <= members.length; x++) {
        members_username = members[x]["username"];
        members_token = members[x]["token"];

        //    CHECK USERNAME
        if (register_username === members_username) {
            user_id = x;

            return checkPass(password_register,password_register_repeat);
        } else if (register_username !== members_username) {
            console.log("username not found");
            break;

        }

    }
    //  CHECK PASS
    function checkPass(x,y){
        if(x === y){
            console.log("pass ok");
            return checkToken(token_register,members_token);
        }else{
            console.log("pass nok");

        }
    }
    //  CHECK TOKEN
    function checkToken(x,y){
        if(x === y){
            console.log("token ok");
            window.localStorage.setItem("id", user_id);
            window.localStorage.setItem("password", password_register);
            window.localStorage.setItem("token", token_register);

        }else{
            console.log("token nok");
        }
    }
}

/** SIGN IN **/
function clickSignin() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = signIn;
    xmlhttp.open("GET", "./json/maji.json");
    xmlhttp.send();
}
function signIn(){
    let login_username = document.querySelector('#login_username').value;
    let login_password = document.querySelector('#login_password').value;

    let localID = localStorage.getItem("id");

    let localPassword = localStorage.getItem("password");
    let localToken = localStorage.getItem("token");

    let JSON_members,members,members_username,members_token;

    JSON_members = JSON.parse(this.responseText);
    members = JSON_members["members"];
    members_username = members[localID]["username"];
    members_token = members[localID]["token"];
    checkName(login_username,members_username);
    checkPass(login_password,localPassword);
    checkToken(members_token,localToken);
    //  CHECK USERNAME
    function checkName(x,y){
        if(x===y){
           return console.log("user ok");
        }else{
            console.log("user nok");
        }
    }
    //  CHECK PASS
    function checkPass(x,y){
        if(x===y){
            return console.log("pass ok");
        }else{
            console.log("pass nok");
        }
    }
    //  CHECK PASS
    function checkToken(x,y){
        if(x===y){
            return console.log("token ok");
        }else{
            console.log("token nok");
        }
    }
}
window.addEventListener('load', getNews);