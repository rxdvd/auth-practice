function setNav(...pages){
    const links = document.querySelectorAll("nav a");
    links.forEach(link => {
        if(pages.includes(link.dataset.page)){
            link.parentElement.classList.remove("hidden");
        }else{
            link.parentElement.classList.add("hidden");
        }
    });
}

function updateNav(){
    if(isLoggedIn()) setNav('home', 'logout');
    else setNav('home', 'login', 'register');
}

function setContent(...elements){
    const content = document.querySelector("#content");
    content.replaceChildren(...elements);
}

function resetForm(selector="form"){
    const form = document.querySelector(selector);
    if(form){
        form.reset();
        const firstInput = form.querySelector("input[type='text']");
        if(firstInput) firstInput.focus();
    }
}

function navLinkEvent(page){
    return {
        target: {
            dataset: { page }
        },
        preventDefault: new Function()
    };
}

function isLoggedIn(){
    const token = localStorage.getItem('token');
    if(token){
        const jwt = jwt_decode(token);
        if(jwt){
            return true;
        }
    }
    return false;
}

module.exports = {
    setContent, updateNav, resetForm, navLinkEvent, isLoggedIn
};
