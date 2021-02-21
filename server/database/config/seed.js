var crypto = require('crypto');

const seed = function (medical_history, user) {
    return Promise.all([
        // Seed preset values into the database upon server start
        medical_history.create({name: 'Diabetes'}),
        medical_history.create({name: 'High blood pressure'}),
        medical_history.create({name: 'Knee surgery'}),

        user.create({username: 'testUsername1',
            password: crypto.createHash('sha256').update('test1').digest("hex"),
            age: 20}),
        user.create({username: 'testUsername2',
            password: crypto.createHash('sha256').update('test2').digest("hex"),
            age: 40}),
        user.create({username: 'testUsername3',
            password: crypto.createHash('sha256').update('test3').digest("hex"),
            age: 60})

    ]).then(([diabetes, blood, knee, test1, test2, test3]) => {
        return Promise.all([
            // Assign medical history to users
            diabetes.setUser(test1),
            blood.setUser(test2),
            knee.setUser(test3)
        ])
    }).catch(function (error) {
        console.log("Initialize database failed");
    })
};



module.exports = seed;