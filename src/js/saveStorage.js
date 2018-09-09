import e12 from "./e12.json";
import e13 from "./e13.json";
import e14 from "./e14.json";

const questions = {
    e12,
    e13,
    e14,
    favorites: []
};

const saveStorage = {
    e12: (localStorage.e12 && JSON.parse(localStorage.e12)) || questions.e12,
    e13: (localStorage.e13 && JSON.parse(localStorage.e13)) || questions.e13,
    e14: (localStorage.e14 && JSON.parse(localStorage.e14)) || questions.e14,
    favorites: (localStorage.favorites && JSON.parse(localStorage.favorites)) || [],
    save(prop){
        if(saveStorage[prop].length || Array.isArray(saveStorage[prop])){
            localStorage[prop] = JSON.stringify(saveStorage[prop]);
        } else{
            saveStorage[prop] = questions[prop];
            saveStorage.save(prop);
        } 
    }
};

export default saveStorage;