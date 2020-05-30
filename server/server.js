const express = require('express')
const app = express()

//##    Session             ##
const session = require('express-session');
app.use(session({
    secret: `this is a secret and shouldn't be shared in version control etc.`,
    resave: false,
    saveUninitialized: true
}))

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