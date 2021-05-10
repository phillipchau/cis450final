var AWS = require('aws-sdk')
var bcrypt = require('bcrypt');
require('dotenv').config();
var config = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN,
  region: process.env.AWS_REGION,
}
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

const addArticle = function(username, article, callback) {
    var params = {
        TableName: "Users",
        Key: {
            "username": username,
        },
        UpdateExpression: 'set articles = list_append(if_not_exists(articles, :empty_list), :article)',
        ExpressionAttributeValues: {
            ':article': [article],
            ':empty_list': []
        },
        ReturnValues : "UPDATED_NEW"
    }
    db.update(params, function(error, data) {
        if (error) {
            console.log(error);
            callback(error, null);
        }
        else {
            callback(null, data)
        }
    });
}

const addState = function(username, state, callback) {
    var params = {
        TableName: "Users",
        Key: {
            "username": username,
        },
        UpdateExpression: 'set #s = :curr',
        ExpressionAttributeNames: {
            "#s": "state"
        },
        ExpressionAttributeValues: {
            ':curr': state,
        },
        ReturnValues : "UPDATED_NEW"
    }
    db.update(params, function(error, data) {
        if (error) {
            console.log(error);
            callback(error, null);
        }
        else {
            callback(null, data)
        }
    });
}

const removeArticle = function(username, idx, callback) {
    console.log(idx)
    var params = {
        TableName: "Users",
        Key: {
            "username": username,
        },
        UpdateExpression: `REMOVE articles[${idx}]`,
        ReturnValues : "UPDATED_NEW"
    }
    db.update(params, function(error, data) {
        if (error) {
            console.log(error);
            callback(error, null);
        }
        else {
            callback(null, data)
        }
    });
}


var database = {
    profileInfo: profileInfo,
    loginLookup: loginLookup,
    userLookup: userLookup,
    addArticle: addArticle,
    removeArticle: removeArticle,
    addState: addState
}; 

module.exports = database;