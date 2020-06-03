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

client.connect()

//##    GET     ##

// Log out
router.post('/users/logout', (req, res) => {
    req.session.destroy();

    return res.status(200).send({ status: 1, message: 'Logged out' })
})

//##    POST    ##
// User session
router.post('/users/session', (req, res) => {
    if(!req.session.userID) return res.status(200).send({status: 0, message: 'Not logged in'})

    return res.status(200).send(
        {
            status: 1,
            message: 'Logged in',
            user: {
                userID: req.session.userID,
                username: req.session.username,
                email: req.session.email,
                userType: req.session.userType
            }
        }
    )
})

// User information
router.post('/users/information', (req, res) => {
    if(!req.session.userID) return res.status(404).send({status: 0, message: 'Not logged in'})

    const query = `
        SELECT * 
        FROM tUser 
        JOIN tcreditcard ON tUser."nUserID" = tCreditcard."nUserID"
        JOIN tPhoneCode ON tUser."nPhoneCodeID" = tPhonecode."nPhoneCodeID" 
        JOIN tCountryCode ON tUser."nCountryCodeID" = tCountryCode."nCountryCodeID" 
        WHERE tUser."cEmail" = '${req.session.email}'
    `

    client.query(query, (err, dbRes) => {

        if (err) return res.status(500).send({ status: 0, message: 'Server error' })
        if (!dbRes.rows[0]) return res.status(404).send({ status: 0, message: 'User not found' })

        const result = dbRes.rows[0]

        return res.status(200).send({
            status: 1, message: 'User found', user: {
                username: result.cUsername,
                email: result.cEmail,
                phoneCode: result.cPhoneCode,
                phoneNumber: result.cPhoneNumber,
                countryCode: result.cCountryCode,
                phoneNumber: result.cPhoneNumber,
                IBAN: result.cIBANcode,
                CVV: result.cCVV,
                expDate: result.cExpirationDate
            }
        })
    })
})

// Create user
router.post('/users/create', (req, res) => {
    if (!req.query) return res.status(404).send({ status: 0, message: 'No parameters provided' })

    const {
        username,
        password,
        email,
        phoneNumber,
        phoneCode,
        countryCode,
        IBAN,
        CVV,
        expirationDate
    } = req.body

    if (
        !username
        || !password
        || !email
        || !phoneNumber
        || !phoneCode
        || !countryCode
        || !IBAN
        || !CVV
        || !expirationDate
    ) return res.status(404).send({ status: 0, message: 'Insufficient parameters provided' })

    if (CVV.length !== 3) return res.status(404).send({ status: 0, message: 'CVV must be exactly 3 characters' })
    if (expirationDate.length !== 4) return res.status(404).send({ status: 0, message: 'Exp date must be exactly 4 characters' })

    const query = `CALL procedurecreateuser(
        '${username}',
        '${password}',
        '${email}',
        '${phoneNumber}',
        '${phoneCode}',
        '${countryCode}',
        '${IBAN}',
        '${CVV}',
        '${expirationDate}'
    );`

    client.query(query, (err, dbRes) => {
        if (err) return res.status(500).send({ status: 0, message: 'Server error' })

        return res.status(200).send({ status: 1, message: 'User created' })
    })
})

// Login
router.post('/users/login', (req, res) => {
    if (req.session.userID) return res.status(404).send({ status: 0, message: 'Already logged in' })

    const {
        email,
        password
    } = req.body

    if (!email || !password) return res.status(404).send({ status: 0, message: 'Insufficient parameters provided' })

    const query = `
        SELECT tUser."nUserID", tUser."cUsername", tUser."cPassword", tUser."cEmail"
        FROM tUser
        WHERE tUser."cEmail" = '${email}';
    `

    client.query(query, (err, dbRes) => {
        if (err) return res.status(500).send({ status: 0, message: 'Server error' })

        if (!dbRes.rows[0]) return res.status(404).send({ status: 0, message: 'Incorrect email or password' })
        if (dbRes.rows[0].cPassword !== password) return res.status(404).send({ status: 0, message: 'Incorrect email or password' })

        const hour = 1000 * 60 * 60;
        req.session.username = dbRes.rows[0].cUsername;
        req.session.userID = dbRes.rows[0].nUserID;
        req.session.email = dbRes.rows[0].cEmail;
        req.session.userType = 'user';
        req.session.cookie.maxAge = hour;

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
// Update user
router.patch('/users', (req, res) => {
    if(!req.session.userID) return res.status(404).send({ status: 0, message: 'Already logged in' })

    const {
        username,
        email,
        password
    } = req.body

    if(
        !username
        || !email
    ) return res.status(404).send({ status: 0, message: 'Insufficient parameters provided' })

    const query =`
        UPDATE tUser 
        SET "cUsername" = '${username}', "cEmail" = '${email}'
        WHERE "nUserID" = '${req.session.userID}'
    `
    const queryWithPassword =`
        UPDATE tUser 
        SET "cUsername" = '${username}', "cEmail" = '${email}', "cPassword" = '${password}'
        WHERE "nUserID" = '${req.session.userID}'
    `

    client.query(password ? queryWithPassword : query, (err, dbRes) => {
        if (err) return res.status(500).send({ status: 0, message: 'Server error' })

        req.session.email = email
        req.session.username = username

        return res.status(200).send({status: 1, message: 'User updated'})
    })
})

//##    DELETE  ##
// Delete user
router.delete('/users/:id', (req, res) => {
    try {
        //Users.delete()
        res.status(200).send({ message: 'Succes' })
    } catch {
        res.status(404).send({ message: 'Server error' })
    }
})

module.exports = router
