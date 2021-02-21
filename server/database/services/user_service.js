var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var env = require('../config/env');
var nodemailer = require('nodemailer');
const {v4: uuidv4} = require('uuid');

function user_service(db, indexRouter) {

    /**
     * Get user's information through jwt
     */
    indexRouter.get('/user/info', (req, res) => {
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        console.log('Token: ' + token);
        if (token) {
            // JWT convention; remove beginning substring
            if (token.startsWith('Bearer ')) {
                token = token.slice(7, token.length);
                // Decrypt using the secret and the token to get user
                jwt.verify(token, env.SECRET, (error, user) => {
                    if (error) {
                        res.send({error: 'Authentication failed'});
                    } else {
                        console.log('Token User: ' + JSON.stringify(user));
                        db.users.findOne(
                            {where: {id: user.id}}
                        ).then(userU => {
                            res.send({user: userU})
                        }).catch(error => {
                            res.send({error: 'User could not be found - unexpected error'})
                        })
                    }
                })
            } else {
                res.send({error: 'Authentication failed'});
            }
        } else {
            res.send({error: 'Authentication failed'});
        }
    })

    /**
     * Update user's information
     */
    indexRouter.put('/user/update', (req, res) => {
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        console.log('Token: ' + token);
        if (token) {
            // JWT convention; remove beginning substring
            if (token.startsWith('Bearer ')) {
                token = token.slice(7, token.length);
                // Decrypt using the secret and the token to get user
                jwt.verify(token, env.SECRET, (error, user) => {
                    if (error) {
                        res.send({error: 'Authentication failed'});
                    } else {
                        console.log('Token User: ' + JSON.stringify(user));
                        db.users.findOne(
                            {where: {id: user.id}}
                        ).then(user => {
                            user.update(req.body)
                                // Update user based on HTTP request parameters.
                                .then(updated_user => res.send(updated_user))
                                .catch(error => {
                                    res.send({error: JSON.stringify(error)});
                                });
                            res.send({success: "User updates successfully"})
                        }).catch(error => {
                            res.send({error: 'User could not be found - unexpected error'})
                        })

                    }
                })
            } else {
                res.send({error: 'Authentication failed'});
            }
        } else {
            res.send({error: 'Authentication failed'});
        }
    })

    /**
     * Get one user by ID
     */
    indexRouter.get('/user/:id', (req, res) => {
        const id = req.params.id;       // Assigns id parameter taken from the HTTP request and assigns it to const id
        db.users.findOne({
            where: {id: id},             // Find the user that matches the given id
        }).then(user => {
            res.send({user: user});              // Print out the user to the specified URL in JSON format
        }).catch(error => {
            res.send({error: JSON.stringify(error)});
        })
    })


    // Authenticate user using username and password. Returns a JWT token
    // Test Case: curl -d '{"username":"cindy", "password": "test123"}' -H "Content-Type: application/json" -X POST http://localhost:3000/user/login
    indexRouter.post('/user/login', (req, res) => {
        db.users.findOne({
            where: {
                username: req.body.username,
                password: crypto.createHash('sha256').update(req.body.password).digest("hex")
            }
        }).then(user => {
            user.time = new Date().getTime();
            let token = jwt.sign(JSON.stringify(user), env.SECRET);
            res.send({token: token});
        }).catch(error => {
            res.send({error: JSON.stringify(error)});
        });
    });

    // User sign up service
    // Test Case: curl -d '{"email":"cindy.lin.sd@gmail.com", "username":"test", "password": "test123"}' -H "Content-Type: application/json" -X POST http://localhost:3000/user/signup
    indexRouter.post('/user/signup', (req, res) => {
        let email = req.body.email;
        let username = req.body.username;
        let password = req.body.password;
        let vtoken = uuidv4();

        // Check if user entered an email or password
        if (email === "" || password === "" || username === "") {
            res.send({error: 'empty email, username or password'});
        } else {
            // Query db to see if user already exists ( i.e. email linked to an existing account)
            db.users.findOne({
                where: {email: email}
            }).then(user => {
                // Continue sign up if no existing email is found
                if (user === null){
                    // Declare email that we're sending the activation code from
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'honkersgobonkers@gmail.com',
                            pass: 'bonkrange'
                        }
                    });

                    // Compose new automated email
                    var mail = {
                        from: 'honkersgobonkers@gmail.com',
                        to: email,
                        subject: 'Honk Account Activation',
                        html: '<h1>Thank You For Joining Honk!</h1> ' +
                            '<p>Please click the link to activate your account</p>' +
                            '<a href="'+ env.WEB_URL +'user/verify?token=' + vtoken + '">http://192.168.1.255:3000/user/verify?token=' + vtoken + '</a>'
                    };

                    // Send email
                    transporter.sendMail(mail, function (error, info) {
                        if (error) {
                            console.log(error);
                            res.send({error: 'could not reach email'});
                        } else {
                            // Create a new user in the database given the email
                            db.users.create({
                                username: username,
                                email: email,
                                password: crypto.createHash('sha256').update(password).digest("hex"),
                                verification_token: vtoken
                            })
                                .then(new_user => res.json({signup: 'ok'}))
                                .catch(error => {
                                    res.send({error: JSON.stringify(error)});
                                });
                        }
                    });

                    // Email entered is currently in db
                } else {
                    console.log(JSON.stringify(user));
                    res.send({error: 'email already exists'});
                }
            }).catch(error => {
                res.send({error: 'Unexpected error'});
            });
        }
    });

    // Update when user clicks verification link
    // Test Case: automatically performed when you click the link sent to your email
    indexRouter.get('/user/verify', (req, res) => {
        // Retrieve the verification token from the HTTP request
        const vtoken = req.query.token;
        // Query db to retrieve user with the given token
        db.users.findOne({
            where: {verification_token: vtoken}
        }).then(user => {
            // Set verification_token to null once user clicks the link
            if (user !== null){
                user.update({
                    verification_token: null
                })
                    // Print the updated user information in JSON string format on the verification URL
                    .then(updated_user => res.send(updated_user))
                    .catch(error => {
                        res.send({error: JSON.stringify(error)});
                    });
            } else {
                res.send({error: 'Verification failed, could be invalid verification token, could be that the user is already activated'});
            }
        }).catch(error => {
            res.send({error: 'invalid verification token'});
        });
    })
}

module.exports = user_service;