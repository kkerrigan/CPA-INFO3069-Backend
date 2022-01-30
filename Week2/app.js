const yargs = require('yargs');

const argv = yargs
    .options({
        firstname: {
            demand: true,
            alias: ['firstname', 'fname'],
            describe: `Resident's first name`,
            string: true
        },
        lastname: {
            demand: true,
            alias: ['lastname', 'lname'],
            describe: `Resident's last name`,
            string: true
        },
        province: {
            demand: true,
            alias: ['province', 'prov'],
            choices: ['ON', 'AB', 'BC'],
            describe: `Resident's home province`,
            string: true
        }
    })
    .help()
    .alias('help','h')
    .argv;

const lab2routines = require('./lab2routines');

asyncPromises = async (fname, lname, prov) =>
{
    try {
        let results = await lab2routines.fullNamePromise(fname, lname);
        results = await lab2routines.nameAndProvincePromise(results.fullName, prov);
        let goc = await lab2routines.transferPaymentDataPromise();
        let message = await lab2routines.buildMessagePromise(goc, prov, results.nameAndProv);
    }
    catch(err) {
        console.log(err);
    }
};

asyncPromises(argv.firstname, argv.lastname, argv.province);