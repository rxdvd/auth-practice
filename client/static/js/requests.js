function sendLoginRequest(username, password){
    return new Promise( async (resolve, reject) => {
        try {
            const options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            };
            const response = await fetch("http://localhost:3000/login", options);
            const json = await response.json();
            resolve(json);
        } catch (err) {
            reject(err);
        }
    });
}

function sendRegisterRequest(username, password){
    return new Promise( async (resolve, reject) => {
        try {
            const options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            };
            const response = await fetch("http://localhost:3000/register", options);
            const json = await response.json();
            resolve(json);
        } catch (err) {
            reject(err);
        }
    });
}

function getGreeting(){
    return new Promise( async (resolve, reject) => {
        try {
            const options = {
                headers: new Headers({
                    'Authorization': `Bearer ${window.localStorage.getItem('token')}`
                })
            };
            const response = await fetch("http://localhost:3000/", options);
            const json = await response.json();
            resolve(json);
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = {
    sendLoginRequest, sendRegisterRequest, getGreeting
};
