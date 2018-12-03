let express = require('express')
let app = express()
let MongoClient = require("mongodb").MongoClient;
let ObjectID = require("mongodb").ObjectID;
let sha256 = require('sha256')
let fs = require('fs')
let bodyParser = require('body-parser')
let url = 'mongodb://admin:password1@ds153093.mlab.com:53093/mymondo'

app.use(bodyParser.raw({
    type: '*/*',
    limit: '50mb'
}))
app.use(express.static(__dirname + '/images/'))

app.post('/upics', function (req, res) {
    var extension = req.query.ext.split('.').pop();
    var randomString = '' + Math.floor(Math.random() * 10000000)
    var randomFilename = randomString + '.' + extension
    fs.writeFileSync(__dirname + '/images/' + randomFilename, req.body);
    res.send(randomFilename)
})
/*
app.post('/message', function (req, res) {
    let sessionID = req.headers.cookie
    if(sessionID) {
        let parsed = JSON.parse(req.body)
        let sessionID = parsed.sessionID
    }
})
*/
app.post('/addInfo', function (req, res) {
    let parsed = JSON.parse(req.body.toString())
    let sessionID = req.headers.cookie
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        let dbo = db.db("mymondo")
        dbo.collection("sessions").findOne({
            sessionID: parseInt(sessionID)
        }, function (err, result) {

            if (err) throw err;
            if (result === null) {
                res.send({
                    error: true
                })
            }
            let username = result.username
            let info = {
                name: parsed.name,
                email: parsed.email,
                address: parsed.address,
                username: username
            }
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                let dbo = db.db("mymondo")
                dbo.collection("information").update({
                        username: username
                    },
                    info,
                    function (err, result) {
                        if (err) throw err;
                        MongoClient.connect(url, function (err, db) {
                            if (err) throw err;
                            let dbo = db.db("mymondo")
                            dbo.collection("information").findOne(info, function (err, result) {
                                if (err) throw err;
                            })
                        })
                        let response = {
                            status: true
                        }
                        db.close()
                        res.send(JSON.stringify(response))
                    })
            })
        })
    })
})
app.post('/displayInfo', function (req, res) {
    let sessionID = req.headers.cookie
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        let dbo = db.db("mymondo")
        dbo.collection("sessions").findOne({
            sessionID: parseInt(sessionID)
        }, function (err, result) {
            if (result === null) {
                res.send({
                    error: true
                })
                return
            }
            if (err) throw err;
            let username = result.username
            dbo.collection("information").findOne({
                username: username
            }, function (err, result) {
                if (err) throw err;
                db.close()
                res.send(JSON.stringify(result))

            })
        })
    })
})
app.post('/search', function (req, res) {
    let parsed = JSON.parse(req.body.toString());
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        let dbo = db.db("mymondo")
        dbo.collection("items").find({}).toArray(function (err, result) {
            if (err) throw err;
            let searchWord = parsed.query
            let response = result.filter(function (item) {
                return item.description.includes(searchWord)
            })
            res.send(JSON.stringify(response))
            db.close()
        })
    })
})
app.post('/postMessage', function (req, res) {
    let sessionID = req.headers.cookie
    let parsed = JSON.parse(req.body)
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        let dbo = db.db("mymondo")
        dbo.collection("")
    })
})
app.get('/getMessages', function (req, res) {
    chatMessages = chatMessages.slice(-10)
    res.send(JSON.stringify(chatMessages))
})
app.get('/getAllItems', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        let dbo = db.db("mymondo")
        dbo.collection("items").find({}).toArray(function (err, result) {
            if (err) throw err;
            db.close()
            res.send(JSON.stringify(result))
        })
    })
})
app.post('/addItems', function (req, res) {
    let parsed = JSON.parse(req.body.toString())
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        let dbo = db.db("mymondo")
        dbo.collection("sessions").findOne({
            sessionID: parseInt(parsed.sessionID)
        }, function (err, result) {
            if (err) throw err;
            if (result === null) {
                res.send({
                    error: true
                })
            }
            let username = result.username
            let item = {
                description: parsed.description,
                price: parsed.price,
                location: parsed.location,
                imageLocation: parsed.imageLocation,
                username: username,
                reviews: []
            }
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                let dbo = db.db("mymondo")
                dbo.collection("items").insertOne(item, function (err, result) {
                    if (err) throw err;
                    let response = {
                        status: true,
                    }
                    db.close()
                    res.send(response)
                })
            })
        })
    })
})
app.post('/displayItems', function (req, res) {
    let sessionID = req.headers.cookie
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        let dbo = db.db("mymondo")
        dbo.collection("sessions").findOne({
            sessionID: parseInt(sessionID)
        }, function (err, result) {
            if (result === null) {
                res.send({
                    error: true
                })
                return
            }
            if (err) throw err;
            let username = result.username
            dbo.collection("cart").find({
                username: username
            }).toArray(function (err, result) {
                if (err) throw err;
                let itemCartIds = []
                for (i = 0; i < result.length; i++) {
                    itemCartIds = itemCartIds.concat(result[i].itemID)
                }
                dbo.collection("items").find({}).toArray(function (err, result) {
                    if (err) throw err;
                    let itemsInCart = result.filter(function (candidate) {
                        for (i = 0; i < itemCartIds.length; i++) {
                            if (candidate._id.toString() === itemCartIds[i])
                                return true
                        }
                        return false
                    })
                    let ret = []
                    for (i = 0; i < itemsInCart.length; i++) {
                        let cnt = 0;
                        for (j = 0; j < itemCartIds.length; j++) {
                            if (itemsInCart[i]._id.toString() === itemCartIds[j]) {
                                cnt++
                            }
                        }
                        ret = ret.concat({
                            item: itemsInCart[i],
                            count: cnt
                        })
                    }
                    res.send(JSON.stringify(ret))
                    db.close()
                })
            })
        })
    })
})
app.post('/addItemstoCart', function (req, res) {
    let parsed = JSON.parse(req.body)
    let sessionID = req.headers.cookie
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        let dbo = db.db("mymondo")
        dbo.collection("sessions").findOne({
            sessionID: parseInt(sessionID)
        }, function (err, result) {
            if (result === null) {
                res.send({
                    error: true
                })
                return
            }
            dbo.collection("cart").insertOne({
                username: result.username,
                itemID: parsed.itemID
            }, function (err, result) {
                if (err) throw err;
                let response = {
                    status: true,
                    message: "document successfully inserted"
                }
                db.close()
                res.send(response)
            })
        })
    })
})
app.post('/addReview', function (req, res) {
    let parsed = JSON.parse(req.body.toString())
    let sessionID = req.headers.cookie
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        let dbo = db.db("mymondo")
        dbo.collection("sessions").findOne({
            sessionID: parseInt(sessionID)
        }, function (err, result) {
            let username = result.username
            if (result === null) {
                res.send({
                    error: true
                })
                return
            }
            dbo.collection("items").update({
                    "_id": ObjectID(parsed._id)
                }, {
                    $push: {
                        reviews: {
                            review: parsed.reviews,
                            username: username
                        }
                    }
                },
                function (err, result) {
                    if (err) throw err;
                    let response = {
                        status: true,
                        message: "document inserted"
                    }
                    db.close()
                    res.send(JSON.stringify(response))
                })
        })
    })
})
app.post('/getDetails', function (req, res) {
    let parsed = JSON.parse(req.body.toString())
    let itemID = parsed.itemID
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        let dbo = db.db("mymondo")
        dbo.collection("items").findOne({
            _id: new ObjectID(itemID)
        }, function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result))
        })
    })
})
app.post('/signup', function (req, res) {
    let parsed = JSON.parse(req.body.toString())
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        let dbo = db.db("mymondo")
        dbo.collection("passwords").findOne({
            username: parsed.username
        }, function (err, result) {
            if (result) {
                res.send({
                    error: "username already taken"
                })
                db.close()
            } else {
                dbo.collection("passwords").insertOne({
                    username: parsed.username,
                    password: sha256(parsed.password)
                }, function (err, result) {
                    if (err) throw err;
                    let response = {
                        status: true,
                        message: "document successfully inserted"
                    }
                    let info = {
                        name: '',
                        email: '',
                        address: '',
                        username: parsed.username
                    }
                    let username = result.username
                    dbo.collection("information").insertOne(info, function (err, result) {
                        if (err) throw err;
                    })
                    db.close()
                    res.send(response)
                })
            }
        })
    })
})
app.post('/removeItems', function (req, res) {
    let parsed = JSON.parse(req.body)
    let itemID = parsed.itemID
    let sessionID = req.headers.cookie
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        let dbo = db.db("mymondo")
        dbo.collection("sessions").findOne({
            sessionID: parseInt(sessionID)
        }, function (err, result) {
            if (err) throw err;
            let username = result.username
            dbo.collection("cart").removeOne({
                username: username,
                itemID: itemID
            }, function (err, result) {
                if (err) throw err;
                dbo.collection("cart").find({
                    username: username
                }).toArray(function (err, result) {
                    if (err) throw err;
                    console.log(result)
                    let itemCartIds = []
                    for (i = 0; i < result.length; i++) {
                        itemCartIds = itemCartIds.concat(result[i].itemID)
                    }
                    dbo.collection("items").find({}).toArray(function (err, result) {
                        if (err) throw err;
                        let response = result.filter(function (candidate) {
                            for (i = 0; i < itemCartIds.length; i++) {
                                if (candidate._id.toString() === itemCartIds[i])
                                    return true
                            }
                            return false
                        })
                        res.send(JSON.stringify(response))
                        db.close()
                    })
                })
            })
        })
    })
})
app.post('/stayLogin', function (req, res ) {
    let sessionID = req.headers.cookie
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbo = db.db("mymondo")
    dbo.collection("sessions").findOne({sessionID: parseInt(sessionID)}, function (err, result) {
        if(result) {
            let response = {
                status: true,
                message: "document successfully inserted",
                id: sessionID
            }
            db.close()
            res.send(JSON.stringify(response))
        } else {
            res.send({
                status: false
            })
        }
    })
})
})
app.post('/login', function (req, res) {
    let parsed = JSON.parse(req.body)
    let generateSessionID = function () {
        return Math.floor(Math.random() * 10000000000)
    }
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        let dbo = db.db("mymondo")
        dbo.collection("passwords").findOne({
            username: parsed.username,
            password: sha256(parsed.password)
        }, function (err, result) {
            if (result === null) {
                res.send({
                    error: "login failed"
                })
            } else {
                let sessionID = generateSessionID()
                res.set('Set-Cookie', sessionID)
                dbo.collection("sessions").findOne({
                    sessionID: sessionID,
                    username: parsed.username
                }, function (err, result) {
                    if (err) throw err;
                    dbo.collection("sessions").insertOne({
                        sessionID: sessionID,
                        username: parsed.username
                    }, function (err, result) {
                        if (err) throw err;
                        let response = {
                            status: true,
                            message: "document successfully inserted",
                            id: sessionID
                        }
                        db.close()
                        res.send(JSON.stringify(response))
                    })
                })
            }
        })
    })
})
app.listen(3001, function () {
    console.log("Server started on port 3001")
})