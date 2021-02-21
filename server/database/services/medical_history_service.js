var jwt = require('jsonwebtoken');
var env = require('../config/env');

function medical_history_service(db, indexRouter){

    // Get all medical history ordered by name
    indexRouter.get('/medhist', (req, res) => {
        db.medical_history.findAll({order: ['name']})
            .then(hist => {
                console.log(JSON.stringify(hist));
                res.send(JSON.stringify(hist));
            }).catch(error => {
                res.send({error: JSON.stringify(error)});
        })
    })

    // Update medical history given id
    // Test Case: TODO
    indexRouter.put('/medhist/:id', (req, res) => {
        // Get JWT token from user
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        console.log('Token: ' + token);
        if (token){
            // Remove beginning substring
            if (token.startsWith('Bearer')) {
                token = token.slice(7, token.length);
                // Decrypt using secret and the token to get user
                jwt.verify(token, env.SECRET, (error, user) => {
                    if (error) {
                        res.send({error: "Authentication failure"});
                    }else{
                        console.log('Token user: ' + JSON.stringify(user));
                        // Query for id of medical history to be updated
                        const id = req.params.id;
                        db.medical_history.findOne({
                            where: {id: id},
                            // Get user information from medical_history->user relationship
                            include: [
                                {model: db.users, as: 'user'}
                            ]
                        }).then(hist => {
                            console.log('Update history: ' + JSON.stringify(hist));
                            // Additional check for whether hist token matches user token
                            if (hist.user.id === user.id){
                                hist.update(req.body)
                                // Update history based on HTTP request parameters
                                    .then(updated_hist => res.json(updated_hist))
                                    .catch(error => {
                                        res.send({error: JSON.stringify(error)});
                                    });
                            }else{
                                res.send({error: 'Not your medical history to update'});
                            }
                        })
                    }
                })
            }else{
                res.send({error: 'Authentication failure'});
            }
        }else{
            res.send({error: 'Authentication failure'});
        }
    });

    // Create new medical history
    //curl -d '{"name":"test"}' -H "Content-Type: application/json" -X POST http://localhost:3000/medhist
    indexRouter.post('/medhist', (req, res) => {
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
                        db.users.findOne({
                            where: {id: user.id}
                        }).then( user => {
                            req.body.userId = user.id
                            db.medical_history.create(req.body, {include: [{
                                model: db.users, as: 'user'
                            }]}).then(new_hist => {
                                    res.json(new_hist)
                                })         // Print out the new hist to the specified URL in JSON format
                                .catch(error => {
                                    res.send({error:  JSON.stringify(error)});
                                });

                        })

                    }
                })
            } else {
                res.send({error: 'Authentication failed'});
            }
        } else {
            res.send({error: 'Authentication failed'});
        }

    });

    // Delete medical history given an id
    // Test Case: TODO
    indexRouter.delete('/medhist/:id', (req, res) => {
        const id = req.params.id;
        db.medical_history.destroy({
            where: {id: id}
        }).then(deleted_hist => res.json(deleted_hist))
            .catch(error => {
                res.send({error: JSON.stringify(error)});
            });
    });

}

module.exports = medical_history_service;