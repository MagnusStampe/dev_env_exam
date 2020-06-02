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

client.connect();

//##    GET     ##
// Rent property
router.get('/property/rent', (req, res) => {
    if(!req.session.userID) return res.status(404).send({status: 0, message: 'Not logged in'})

    const {
        userid: userID,
        propertyid: propertyID,
        startdate:  startDate,
        enddate: endDate
    } = req.params

    if(
        !userID
        || !propertyID
        || !startDate
        || !endDate
    ) return res.status(404).send({status: 0, message: 'Insuffient parameters provided'})

    const queryFindPrice = `
        SELECT nPrice FROM tProperty
        WHERE nPropertyID = '${propertyID}'
    `

    client.query(queryFindPrice, (err, dbRes) => {
        if(err) return res.status(500).send({status: 0, message: 'Server error'})
        
        const rentCost = dbRes.rows[0].nPrice
        
        const queryProcedure = `
        CALL procedurecreaterentdeal(
            '${userID}', 
            '${propertyID}', 
            '${startDate}', 
            '${endDate}', 
            '${rentCost}'
            )
        `

        client.query(queryProcedure, (err, dbRes) => {
            if(err) return res.status(500).send({status: 0, message: 'Server error'})
            
            const result = test.row
            return res.status(200).send({status: 0, message: 'Property rented successfully'})
        })
    })
})


//##    POST    ##
// Create property
router.post('/properties/create', (req, res) => {
    if(!req.session.userID) return res.status(404).send({status: 0, message: 'Not logged in'})

    const {
        propertytype: propertyType,
        zipcode: zipCode,
        cityname: cityName,
        familyfriendly: familyFriendly,
        housesize: houseSize,
        address,
        size,
        price,
        ethernet,
        animals
    } = req.body
    
    if(
        !propertyType
        || !zipCode
        || !cityName
        || !address
        || !size
        || !houseSize
        || !price
        || !ethernet
        || !animals
        || !familyFriendly
    ) return res.status(404).send({status: 0, message: 'Insufficient parameters provided'})
        
    const query = `CALL procedurecreateproperty(
        '${propertyType}',
        '${zipCode}',
        '${cityName}',
        '${req.session.userID}',
        '${address}',
        '${size}',
        '${houseSize}',
        '${price}',
        '${ethernet}',
        '${animals}',
        '${familyFriendly}'
    );`

    client.query(query, (err, dbRes) => {
        console.log(err)
        if(err) return res.status(500).send({status: 0, message: 'Error'})
    
        return res.status(200).send({status: 1, message: 'User created'})
    })
})

// Search properties
router.get('/properties', async(req, res) => {
    const {
        startDate,
        endDate
    } = req.query

    if(!startDate || !endDate) return res.status(404).send({status: 0, message: 'Dates not provided'})

    query = `
        SELECT tRented."nRentID", tProperty."nPropertyID", tRented."dStart", tRented."dEnd"
        FROM tRented
        FULL JOIN tProperty
        ON tRented."nPropertyID" = tProperty."nPropertyID"
        WHERE '${startDate}' < tRented."dStart"
        OR '${endDate}' > tRented."dEnd"
        OR NOT EXISTS (
            SELECT * 
            FROM tRented 
            WHERE tRented."nPropertyID" = tProperty."nPropertyID")
        OR tRented."nPropertyID" NOT IN (
            SELECT tProperty."nPropertyID"
            FROM tProperty 
        )
        ORDER BY tProperty."nPropertyID"
    `
    client.query(query, (err, dbRes) => {
        if(err) return res.status(500).send({status: 0, message: 'Server error'})
        
        return res.status(200).send({status: 1, message: 'Properties found', results: dbRes.rows})
    })
})

// Get property

//##    PATCH   ##
// Update property
router.patch('/property/update', (req, res) => {
    if(res.session.userID) return res.status(404).send({status: 0, message: 'Not logged in'})

    const {
        propertyid: propertyID,
        newprice: newPrice,
        familyfriendly: familyFriendly,
        ethernet,
        animals
    } = req.headers

    if(
        !propertyID
        || !newPrice
        || !familyFriendly
        || !ethernet
        || !animals
    ) return res.status(404).send({status: 0, message: 'Insufficient parameters provided'})

    const updateProperty = `
        UPDATE tproperty
        SET "nPrice" = '${inputPriceNew}'
        WHERE "nPropertyID" = '${propertyID}';
    `

    const updateFacilities = `
        UPDATE tFacility
        SET "bEthernet" = '${inputbooleanethernet}', "bAnimals" = '${inputbooleananimals}', "bFamilyFriendly" = '${inputbooleanfamilyfriendly}'
        WHERE "nPropertyID" = '${propertyID}';
    `

    client.query(updateProperty, (err, dbRes) => {
        if(err) return res.status(500).send({status: 0, message: 'Server error'})

        client.query(updateFacilities, (err, dbRes) => {
            if(err) return res.status(500).send({status: 0, message: 'Server error'})

            return res.status(200).send({status: 0, message: 'Success'})
        })
    })
})


//##    DELETE  ##
// Delete property
router.delete('/property/:id', (req,res) => {
    if(!req.session.userID) return res.status(404).send({status: 0, message: 'Not logged in'})

    const propertyID = req.params.id;

    if(!!propertyID) return res.status(404).send({status: 0, message: 'No property ID given'})

    const deleteFacilities = `DELETE FROM tFacility WHERE "nPropertyID" = '${propertyID}';`
    // NEEDS TO DELETE IMAGES TOO
 
    const deleteProperty = `DELETE FROM tProperty WHERE "nPropertyID" = '${propertyID}';`
    
 
    client.query(deleteFacilities, (err, dbRes) => {
        if(err) return res.status(500).send({status: 0, message: 'Server error'})
        
        client.query(deleteProperty, (err, dbRes) => {
            if(err) return res.status(500).send({status: 0, message: 'Server error'})

            res.status(200).send({status: 1, message: 'Property deleted'})
        })
    })
})

module.exports = router
