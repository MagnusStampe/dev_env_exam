const router = require("express").Router();
const dbCredentials = require('./../config/dbcredentials')

const { Client } = require('pg')
const client = new Client({
    user: dbCredentials.user,
    host: dbCredentials.host,
    database: dbCredentials.database,
    password: dbCredentials.password,
    port: dbCredentials.port,
})

//##    POST    ##
// Create property owner
router.post('/property-owner/create', (req,res) => {
    const {
        username,
        password,
        email,
        phonenumber: phoneNumber,
        phonecode: phoneCode,
        countrycode: countryCode
    } = req.body

    if(
        !username
        || !password
        || !email
        || !phoneNumber
        || !phoneCode
        || !countryCode
    ) return res.status(404).send({status: 0, message: 'Insufficient parameters provided'})

    const query = `CALL procedureInsertPropertyOwner(
        '${username}', 
        '${password}', 
        '${email}', 
        '${phoneNumber}', 
        '${phoneCode}', 
        '${countryCode}'
    )`
 
    client.connect()
    client.query(query, (err, dbRes) => {
        if(err) return res.status(500).send({status: 0, message: 'Error'})
 
        client.end()
        return res.status(200).send({status: 1, message: 'User created'})
    })
})


//##    DELETE  ##
router.delete('/property-owner/:id', (req, res) => {
    const propertyOwnerID = req.params

    const findProperties = `
        SELECT "nPropertyID" from tProperty WHERE "nPropertyOwnerID" = '${propertyOwnerID}'
    `
 
    client.connect()
        client.query(findProperties, (err, dbRes) => {
        if(err) return res.status(500).send({status: 0, message: 'Server error'})
        
        const propertyIDs = properties.rows

        if(!propertyID)
        console.log(propertyIDs)

        propertyIDs.map((ID) => {
            console.log(ID.nPropertyID)
            const propertyID = ID.nPropertyID
            const queryDeleteFacilities = `DELETE FROM tFacility WHERE "nPropertyID" = '${propertyID}';`
            // DELETE IMAGES
            const queryDeleteProperty = `DELETE FROM tProperty WHERE "nPropertyID" = '${propertyID}';`

            client.query(queryDeleteFacilities, (err, dbRes) => {
                if(err) return res.status(500).send({status: 0, message: 'Server error'})

                client.query(queryDeleteProperty, (err, dbRes) => {
                    if(err)  return res.status(500).send({status: 0, message: 'Server error'})

                    const queryDeletePropertyOwner = `DELETE FROM tPropertyOwner WHERE "nPropertyOwnerID" = '${propertyOwnerID}'`  
                    client.query(queryDeletePropertyOwner, (err, dbRes) => {
                        if(err) return res.status(500).send({status: 0, message: 'Server error'})

                        return res.status(200).send({status: 1, message: propertyID + ' successfully deleted'})
                    })
                })
            })
        })
    })
})

module.exports = router
