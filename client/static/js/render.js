function renderLoginForm(){
    const heading = document.createElement("h2");
    heading.textContent = "Log in";

    const form = document.createElement("form");
    form.autocomplete = "off";
    form.id = "login-form";

    const usernameLabel = document.createElement("label");
    usernameLabel.for = "username";
    form.appendChild(usernameLabel);

    const usernameInput = document.createElement("input");
    usernameInput.type = "text";
    usernameInput.placeholder = "username";
    usernameInput.autocomplete = "off";
    usernameInput.required = true;
    usernameInput.id = "username";
    form.appendChild(usernameInput);

    form.appendChild(document.createElement("br"));

    const passLabel = document.createElement("label");
    passLabel.for = "password";
    form.appendChild(passLabel);

    const passInput = document.createElement("input");
    passInput.type = "password";
    passInput.placeholder = "password";
    passInput.required = true;
    passInput.id = "password";
    form.appendChild(passInput);

    form.appendChild(document.createElement("br"));

    const submitBtn = document.createElement("input");
    submitBtn.type = "submit";
    submitBtn.value = "Log In";
    form.appendChild(submitBtn);

    const main = document.createElement("main");
    main.id = "content";

    return renderWrapper(heading, form);
}

function renderRegisterForm(){
    const heading = document.createElement("h2");
    heading.textContent = "Register";

    const form = document.createElement("form");
    form.autocomplete = "off";
    form.id = "reg-form";

    const usernameLabel = document.createElement("label");
    usernameLabel.for = "username";
    form.appendChild(usernameLabel);

    const usernameInput = document.createElement("input");
    usernameInput.type = "text";
    usernameInput.placeholder = "username";
    usernameInput.autocomplete = "off";
    usernameInput.required = true;
    usernameInput.id = "username";
    form.appendChild(usernameInput);

    form.appendChild(document.createElement("br"));

    const passLabel = document.createElement("label");
    passLabel.for = "password";
    form.appendChild(passLabel);

    const passInput = document.createElement("input");
    passInput.type = "password";
    passInput.placeholder = "password";
    passInput.required = true;
    passInput.id = "password";
    form.appendChild(passInput);

    form.appendChild(document.createElement("br"));

    const passConfirmLabel = document.createElement("label");
    passConfirmLabel.for = "password-confirm";
    form.appendChild(passConfirmLabel);

    const passConfirmInput = document.createElement("input");
    passConfirmInput.type = "password";
    passConfirmInput.placeholder = "confirm password";
    passConfirmInput.required = true;
    passConfirmInput.id = "password-confirm";
    form.appendChild(passConfirmInput);

    form.appendChild(document.createElement("br"));

    const submitBtn = document.createElement("input");
    submitBtn.type = "submit";
    submitBtn.value = "Register";
    form.appendChild(submitBtn);

    return renderWrapper(heading, form);
}

function renderGreeting({message}){
    const heading = document.createElement("h2");
    heading.textContent = message;
    return renderWrapper(heading);
}

function renderWrapper(...elements){
    const main = document.createElement("main");
    main.id = "content";
    for(const element of elements){
        main.appendChild(element);
    }
    return main;
}

module.exports = {
    renderLoginForm, renderRegisterForm, renderGreeting
};
