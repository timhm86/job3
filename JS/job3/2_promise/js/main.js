'use strict';

console.log('Zapros dannyh....');


const req = new Promise(function (resolve, reject) {
    setTimeout(() => {
        console.log('Podgotovka dannyh....');

        const product = {
            name: 'TV',
            price: 3000
        };
        resolve(product);


    }, 2000);

});

req.then(product => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            product.status = 'order';
            resolve(product);
        }, 2000);
    });
 }).then(data => {
     data.modify = true;
     return data;
}).then((data1) => {
    console.log(data1);
});

