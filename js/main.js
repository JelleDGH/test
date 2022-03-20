
let local = {
    "id":localStorage.getItem("id"),
    "username":localStorage.getItem("username"),
    "password":localStorage.getItem("password"),
    "token":localStorage.getItem("token"),
    "rank":localStorage.getItem("rank"),
    "class":localStorage.getItem("class"),
    "speciality":localStorage.getItem("speciality"),
    "karma":localStorage.getItem("karma"),
    "exp":localStorage.getItem("exp"),
    "max_exp":localStorage.getItem("max_exp"),
    "gold":localStorage.getItem("gold"),
    "shop_name":localStorage.getItem("shop_name"),
    "status":localStorage.getItem("status"),
    "logins":localStorage.getItem("login"),
    "update":localStorage.getItem("update")
}

let login = document.querySelector('.login');
let signup = document.querySelector('.signup');
let welcome = document.querySelector('#welcome');
let section = document.querySelectorAll('.section__right_content');
let user_username = document.querySelectorAll('.js_username');
let user_id = document.querySelectorAll('.js_id');
let user_exp = document.querySelectorAll('.js_exp');
let user_rank = document.querySelectorAll('.js_rank');
let user_class = document.querySelectorAll('.js_class');
let user_status = document.querySelectorAll('.js_status');
let user_gold = document.querySelectorAll('.js_gold');
let user_karma = document.querySelectorAll('.js_karma');
let user_update = document.querySelector('.js_update');



function getMember(x) {

    const xmlhttp = new XMLHttpRequest();
    if (x === "Login") {
        xmlhttp.onload = Login;
    } else {
        xmlhttp.onload = signUp;
    }
    xmlhttp.open("GET", "./json/maji.json");
    xmlhttp.send();

}
/** SIGN UP **/
function signUp() {
    let register_username = document.querySelector('#username_register').value;
    let password_register = document.querySelector('#password_register').value;
    let password_register_repeat = document.querySelector('#password_register_repeat').value;
    let token_register = document.querySelector('#register_token').value;
    let class_register = document.querySelector('#class_register').value;
    let karma_register = document.querySelector('#karma_register').value;
    let user_id;



    let json, json_member, json_username, json_token;
    json = JSON.parse(this.responseText);
    json_member = json["members"];


    for (let x = 0; x <= json_member.length; x++) {
        json_username = json_member[x]["username"];
        json_token = json_member[x]["token"];

        //    CHECK USERNAME
        if (register_username === json_username) {
            user_id = x;

            checkData(password_register,password_register_repeat);
            checkData(token_register,json_token);
            window.localStorage.setItem("id", user_id);
            window.localStorage.setItem("username",json_username);
            window.localStorage.setItem("password", password_register);
            window.localStorage.setItem("token", json_token);
            window.localStorage.setItem("rank",json_member[x]["rank"]);
            window.localStorage.setItem("class",class_register);
            window.localStorage.setItem("speciality","");
            window.localStorage.setItem("karma",karma_register);
            window.localStorage.setItem("exp","0");
            window.localStorage.setItem("max_exp","1500");
            window.localStorage.setItem("gold","100");
            window.localStorage.setItem("shop_name","");
            window.localStorage.setItem("login","0");
            window.localStorage.setItem("update","First login!");
            window.location.reload();
            break;
        } else if (register_username !== json_username) {
            console.log("username not found");


        }

    }
    //  CHECK DATA
    function checkData(x,y){
        if(x === y){
            console.log("ok");

        }else{
           return console.log("nok");


        }
    }

}
/** LOGIN **/
function Login() {
    let login_count;
    let login_username, login_password;
    let json, json_member, json_username, json_token;
    json = JSON.parse(this.responseText);
    json_member = json["members"];
    json_username = json_member[local.id]["username"];
    json_token = json_member[local.id]["token"];

    login_username = document.querySelector('.js_login_username').value;
    login_password = document.querySelector('.js_login_password').value;
    checkData(login_username, json_username);
    checkData(login_password, local.password);
    checkData(json_token, local.token);
    updateLocal("status","online");
    login_count = parseInt(local.logins)+1;
    localStorage.setItem("login", login_count);
    window.location.reload();

    //  CHECK DATA
    function checkData(x, y) {
        if (x === y) {
            return console.log("ok");
        } else {
            console.log("nok");
        }
    }
}
/** USER ONLINE **/
function userOnline() {
    let user_on = document.querySelectorAll(".user_online");
    let user_off = document.querySelectorAll(".user_offline");

    if (local.status !== "online") {
        for (var x = 0; x < user_on.length; x++) {
            user_on[x].style.display = "none"
        }
        for (x = 0; x < user_off.length; x++) {
            user_off[x].style.display = "block"
        }
    } else {
        for (x = 0; x < user_on.length; x++) {
            user_on[x].style.display = "block"
        }
        for (x = 0; x < user_off.length; x++) {

            user_off[x].style.display = "none"
        }
    }

}
function loadData(){
    if(local.status ==="online"){
        console.log(local.update)
        user_update.innerHTML = local.update
        for(var x = 0; x < user_id.length;x++){user_id[x].innerHTML = local.id;}
        for(x = 0; x < user_username.length;x++){user_username[x].innerHTML = local.username;}
        for(x = 0; x < user_exp.length;x++){user_exp[x].innerHTML = local.exp;}
        for(x = 0; x < user_class.length;x++){user_class[x].innerHTML = local.class;}
        for(x = 0; x < user_rank.length;x++){user_rank[x].innerHTML = local.rank;}
        for(x = 0; x < user_status.length;x++){user_status[x].innerHTML = local.status;}
        for(x = 0; x < user_gold.length;x++){user_gold[x].innerHTML = local.gold;}
        for(x = 0; x < user_karma.length;x++){user_karma[x].innerHTML = local.karma;}

    }
}
function addUpdate(){
    let updatevalue = document.querySelector('#updatevalue').value;
    localStorage.setItem("update",updatevalue);
    document.querySelector('#updatevalue').value = "";
    window.location.reload();
}
function updateLocal(local,value){
    localStorage.setItem(local,value)
}


/** News Feed **/
/*function getNews() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = loadNews;
    xmlhttp.open("GET", "./json/latest_news.json");
    xmlhttp.send();

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

}*/

window.addEventListener("load", loadData);
window.addEventListener("load", userOnline);
login.querySelector("#login_bttn").addEventListener("click",function (e){
    e.preventDefault();
    getMember("Login");
});
login.querySelector("#login_signup_bttn").addEventListener("click",function (e){
    e.preventDefault();
    signup.style.display = "block"
});
signup.querySelector("#signup_bttn").addEventListener("click",function (e){
    e.preventDefault();
    getMember("signUp");
});
signup.querySelector("#signup_close_bttn").addEventListener("click",function (e){
    e.preventDefault();
    signup.style.display ="none";
});

if(local.logins > 1 && local.status === "online"){
        welcome.querySelector('h2').innerHTML = `Welcome back ${local.username}`;

}else {welcome.querySelector('h2').innerHTML = `Welcome ${local.username}`;}