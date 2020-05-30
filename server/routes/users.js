const router = require("express").Router()

const dbCredentials = require('./../config/dbcredentials')
const { Client } = require('pg')
const client = new Client({
    user: dbCredentials.user,
    host: dbCredentials.host,
    database: dbCredentials.database,
    password: dbCredentials.password,
    port: dbCredentials.port,
})

//##    GET     ##
// User session

// Log out
router.get("/users/logout", (req, res) => {
    req.session.destroy();
    res.status(200).send({status: 1, message: 'Logged out'})
});

//##    POST    ##
// Create user
router.post('/users/create', (req,res) => {
    if(!req.query) return res.status(404).send({status: 0, message: 'No parameters provided'})
    
    const { 
        username,
        password,
        email,
        name,
        phonenumber: phoneNumber,
        phonecode: phoneCode,
        countrycode: countryCode,
        iban: IBAN,
        ccv: CCV,
        expirationdate: expirationDate
    } = req.headers

    if(
        !username
        || !password
        || !email
        || !name
        || !phoneNumber
        || !phoneCode
        || !countryCode
        || !IBAN
        || !CCV
        || !expirationDate
    ) return res.status(404).send({status: 0, message: 'Insufficient parameters provided'})

    const query = `CALL proUserInsert(
        '${username}',
        '${password}',
        '${email}',
        '${phoneNumber}',
        '${phoneCode}',
        '${countryCode}',
        '${IBAN}',
        '${CCV}',
        '${expirationDate}'
    );`

    client.connect()
    client.query(query, (err, dbRes) => {
        if(err) return res.status(500).send({status: 0, message: 'Error'})

        client.end()
        return res.status(200).send({status: 1, message: 'User created'})
    })
})

// Login
router.post('/users/login', (req,res) => {
    if(req.session.userID) return res.status(404).send({status: 0, message: 'Already logged in'})
    
    const {
       email,
       password
    } = req.headers

    if(!email || !password) return res.status(404).send({status: 0, message: 'Insufficient parameters provided'})

    const query = `
        SELECT tUser."nUserID", tUser."cUsername", tUser."cPassword"
        FROM tUser
        WHERE tUser."cEmail" = '${email}';
    `

    client.connect()
    client.query(query, (err, dbRes) => {
        if(err) return res.status(500).send({status: 0, message: 'Server error'})

        if(!dbRes.rows[0]) return res.status(404).send({status: 0, message: 'Incorrect email or password'})
        if(dbRes.rows[0].cPassword !== password) return res.status(404).send({status: 0, message: 'Incorrect email or password'})

        const hour = 1000 * 60 * 60;
        req.session.username = dbRes.rows[0].cUsername;
        req.session.userID = dbRes.rows[0].nUserID
        req.session.cookie.maxAge = hour;

        client.end()
        return res.status(200).send({
                status: 1,
                message: 'Authentication successful',
                user: {
                    userID: req.session.userID, 
                    username: req.session.username
                }
            }
        )
    })
})

//##    PATCH   ##

//##    DELETE  ##
// Delete user
router.delete('/users/:id', (req,res)=>{
    try {
        //Users.delete()
        res.status(200).send({message: 'Succes'})
    } catch {
        res.status(404).send({message: 'Server error'})
    }
})

module.exports = router
