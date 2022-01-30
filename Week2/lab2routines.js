exports.fullNamePromise = (fname, lname) => {
    return new Promise((resolve, reject) => {
        let data = {fullName: `${fname}, ${lname}`};
        resolve(data);
    });
};

exports.nameAndProvincePromise = (fullName, prov) => {
    return new Promise((resolve, reject) => {
        let data = {nameAndProv: `${fullName} - lives in ${prov}`};
        resolve(data);
    });
};

exports.transferPaymentDataPromise = () => {
    var request = require('request');
    const srcAddr = 'http://www.infrastructure.gc.ca/alt-format/opendata/transfer-program-programmes-de-transfert-bil.json';

    return new Promise((resolve, reject) =>{
        request(srcAddr, (err, res, body) => {
            if(err) {
                reject(err); return;
            }
            resolve(JSON.parse(body));
        });
    });
};

exports.buildMessagePromise = (gocData, prov, nameAndProv) => {
    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    });

    let payment;
    switch(prov) {
        case 'ON' :
            payment = gocData.gtf.on['2016-2017'];
            break;
        case 'AB' :
            payment = gocData.gtf.ab['2016-2017'];
            break;
        case 'BC' :
            payment = gocData.gtf.bc['2016-2017'];
            break;
    }

    payment = formatter.format(payment);
    console.log(`${nameAndProv}`);
    console.log(`This individual's province of residence received ${payment} in transfer payments from the federal government.`);
};