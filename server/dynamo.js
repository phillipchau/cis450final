var AWS = require('aws-sdk')
var bcrypt = require('bcrypt');
var config = require('./config')
AWS.config.update(config);
var db = new AWS.DynamoDB.DocumentClient();

//number of hash cycles that occur in bcrypt
const saltRounds = 10;

const profileInfo = function(info, callback) {
    //hashes password
    bcrypt.hash(info.password, saltRounds, function(err, hash) {
        if (err) {
            callback(err, null);
        }
        else {
            var params = {
                TableName: "Users",
                Item: {
                    'username': info.username,
                    'password': hash,
                    'first_name': info.fname,
                    'last_name': info.lname,
                    'name': info.fname + " " + info.lname,
                    "state": info.state,
                    "articles": [],
                    "picture": ''
                }
            }
            db.put(params, function(err, data) {
                if (err) {
                    console.log(err);
                    callback(err, null);
                }
                else {
                    callback(err, data);
                }
            });
        }
    });
}

const loginLookup = function(username, password, callback) {
    var params = {
        TableName: "Users",
        KeyConditionExpression: "#user = :username",
        ExpressionAttributeNames: {
            "#user": "username",
        },
        ExpressionAttributeValues: {
            ":username": username,
        }
    }
    db.query(params, function(error, data) {
        if (error || data.Items.length == 0) {
            console.log(error);
            callback(error, null);
        }
        else {
            console.log(data);
            let user = data.Items[0]
            if (username === user.username) {
                bcrypt.compare(password, user.password, function(err, res) {
                    console.log(err)
                    if (res === true) {
                        callback(err, 1)
                    } else {
                        callback(err, 0)
                    }
                })
            } else {
                callback(error, null)
            }
        }
    });
}

const userLookup = function(username, callback) {
    var params = {
        TableName: "Users",
        KeyConditionExpression: "#user = :username",
        ExpressionAttributeNames: {
            "#user": "username",
        },
        ExpressionAttributeValues: {
            ":username": username,
        }
    }
    db.query(params, function(error, data) {
        if (error || data.Items.length == 0) {
            console.log(error);
            callback(error, null);
        }
        else {
            let user = data.Items[0]
            if (username === user.username) {
                callback(null, user)
            } else {
                callback(error, null)
            }
        }
    });
}


var database = {
    profileInfo: profileInfo,
    loginLookup: loginLookup,
    userLookup: userLookup
}; 

module.exports = database;