const express = require('express')
const app = express()

//##    Routes              ##
const usersRoute = require("./routes/users.js")
const propertiesRoute = require("./routes/properties.js")
const paymentsRoute = require("./routes/payments.js")
app.use(usersRoute)
app.use(propertiesRoute)
app.use(paymentsRoute)

//##    Start server        ##
const server = app.listen(8080, err => {
    if(err) {console.log('Error starting server'); return}
    console.log('Server running on port', server.address().port)
})