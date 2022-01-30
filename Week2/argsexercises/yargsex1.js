const yargs = require('yargs');

const argv = yargs
    .options({
        p1: {
            demand: true,
            alias: 'province1',
            describe: 'first province to complete transfer payments',
            string: true
        },
        p2: {
            demand: true,
            alias: 'province2',
            describe: 'second province to compare transfer payments',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

console.log(`You entered ${argv.p1} for province 1 and ${argv.p2} for province 2`);