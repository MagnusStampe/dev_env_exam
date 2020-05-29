const router = require("express").Router()

const dbCredentials = require('./../config/dbcredentials')
const { Client } = require('pg')

//##    GET     ##
// User session

//##    POST    ##
// Create user
router.post('/users/create', (req,res) => {
    if(!req.query) {
        return res.status(404).send({status: 0, message: 'No parameters provided'})
    }
    const { 
        username, 
        password, 
        email,
        name, 
        phonenumber: phoneNumber, 
        phonecode: phoneCode, 
        countrycode: countryCode, 
        iban: IBAN, 
        ccv: CCV 
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
    ) {
        return res.status(404).send({status: 0, message: 'Insufficient parameters provided'})
    }

    const client = new Client({
        user: dbCredentials.user,
        host: dbCredentials.host,
        database: dbCredentials.database,
        password: dbCredentials.password,
        port: dbCredentials.port,
    })

    //const query = `EXEC prouserinsert("${username}", "${password}", "${email}", "${phoneNumber}")`
    const query = 'SELECT * FROM public."tUser"'
    client.connect()
    client.query(query, (err, dbRes) => {
        if(err)  return res.status(500).send({status: 0, message: 'Error'})

        client.end()
        return res.status(200).send({status: 1, message: 'User created'})
    })
})

// Login

//##    PATCH   ##

//##    DELETE  ##
// Delete user
router.delete('/users/delete/:username', (req,res)=>{
    if(res.session.username !== 'b') {
        res.status(404).send({message: 'Unauthorized delete'})
    }
    try {
        //Users.delete()
        res.status(200).send({message: 'Succes'})
    } catch {
        res.status(404).send({message: 'Server error'})
    }
})

module.exports = router
