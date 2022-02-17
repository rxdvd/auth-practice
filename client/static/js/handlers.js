const { sendLoginRequest, sendRegisterRequest, getGreeting } = require("./requests");
const { renderLoginForm, renderRegisterForm, renderGreeting } = require("./render");
const helpers = require("./helpers");

async function pageLoadHandler(){
    helpers.updateNav();
    navLinkHandler(helpers.navLinkEvent(location.hash.slice(1) || 'home'));
}

async function navLinkHandler(e){
    e.preventDefault();
    let page = e.target.dataset.page;
    if(['login', 'register'].includes(page) && helpers.isLoggedIn()){
        page = 'home';
    }
    let newContent = [];
    switch(page){
        case 'logout':
            localStorage.removeItem('token');
            helpers.updateNav();
            page = 'home';
        case 'home':
            newContent = renderGreeting(await getGreeting());
            break;
        case 'login':
            newContent = renderLoginForm();
            newContent
                .querySelector("form#login-form")
                .addEventListener('submit', loginHandler);
            break;
        case 'register':
            newContent = renderRegisterForm();
            newContent
                .querySelector("form#reg-form")
                .addEventListener("submit", registerHandler);
            break;
    }
    location.hash = '#' + page;
    helpers.setContent(...newContent.children);
}

async function loginHandler(e){
    e.preventDefault();

    const username = e.target.username.value.trim();
    const password = e.target.password.value;

    if(!username || !password){
        window.alert("required field(s) missing");
        return;
    }

    const response = await sendLoginRequest(username, password);
    if(response.login){
        localStorage.setItem('token', response.token);
        navLinkHandler(helpers.navLinkEvent('home'));
        helpers.updateNav();
    }else{
        // login fail behaviour
        window.alert(response.message);
        helpers.resetForm();
    }
}

async function registerHandler(e){
    e.preventDefault();

    const username = e.target.username.value.trim();
    const password = e.target.password.value;
    const passwordConfirm = e.target['password-confirm'].value;

    if(!username || !password){
        window.alert("required field(s) missing");
        return;
    }

    if(password === passwordConfirm){
        const response = await sendRegisterRequest(username, password);
        if(response.success){
            window.alert("registration successful");
            navLinkHandler(helpers.navLinkEvent('login'));
        }else{
            window.alert("registration failed. error: " + response.error);
            helpers.resetForm();
        }
    }else{
        window.alert("passwords don't match");
    }
}

module.exports = {
    navLinkHandler, pageLoadHandler
};
