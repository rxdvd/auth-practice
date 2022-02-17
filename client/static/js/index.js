const { navLinkHandler, pageLoadHandler } = require("./handlers");

function init(){
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(link => {
        link.addEventListener('click', navLinkHandler);
    });

    pageLoadHandler();
}

init();
