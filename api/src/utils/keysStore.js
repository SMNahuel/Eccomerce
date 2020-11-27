const store = {};

function set(email){
    clear();
    let key = randomKey(10);
    store[key] = [email, Date.now() + 86400000];
    return key;
};

function get(key) {
    clear();
    if (store.hasOwnProperty(key)) {
        let email = store[key][0];
        delete store[key];
        return email;
    };
    return false;
};

function clear(){
    let now = Date.now();
    for(let key in store){
        if(store[key][1] < now){
            delete store[key];
        };
    };
};

function randomKey(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.random() * characters.length | 0);
    };
    return result;
};

module.exports = { set, get };