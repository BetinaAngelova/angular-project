const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = (settings) => {
    mongoose.connect(settings.db);

    let database = mongoose.connection;
    database.once('open', (error) => {
        if (error) {
            console.log(error);
            return;
        }

        console.log('MongoDB ready!')
    });
    database.on('error', err => console.log(`Database error: ${err}`))

    require('./../models/Role').initialize();
    require('./../models//User').seedAdmin();
    require('./../models//Article');
    require('./../models//Edit');
};

// index.js
// require('./server/config/database')(settings)