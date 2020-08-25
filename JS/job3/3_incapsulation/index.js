"use strictr";

class User {
    constructor (name, age) {
        this.name = name;
        this._age = age;
    }

    #surname = 'Timushev';

    say () {
        return console.log(`имя: ${this.name} ${this.#surname}, возраст ${this._age}`);
    }

    get ageUser () {
        return this._age;
    }

    set ageUser (age) {
        this._age = age;
    }

    get surnameGet() {
        return this.#surname;
    }

    set surnameGet (sur) {
        this.#surname = sur;
    }

}


const Ivan = new User ('Ivan', 32);

Ivan.say();

Ivan.age = 30;

console.log(Ivan.age);

Ivan.say();

console.log(Ivan.surnameGet);

Ivan.ageUser = 302;

// Ivan.surname = 'as';

console.log(Ivan.surname);

Ivan.say();

console.log( Ivan.surnameGet);

Ivan.surnameGet = 'sasasa';

Ivan.say();


// class Example {
//     constructor(prop){
//         this.prop = prop;
//     }
 
//     showThis() {
//         console.log(this)
//     }
// }
 
// new Example('smth').showThis();

// class Example {
//     constructor(prop){
//         this.prop = prop;
//     }
 
//     showThis = ()  => {
//         console.log(this)
//     }
 
//     doSmth(){
//         console.log('Действие');
//         return this.showThis;
//     }
// }
 
// const func = new Example('smth').doSmth();
// func();