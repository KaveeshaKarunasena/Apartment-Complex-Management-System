const mongoose = require('mongoose');

const schema = mongoose.Schema;

// creating service provider schema
const serviceProviderSchema = new schema({

    companyName : {
        type: String,
        required: true
    },

    serviceType : {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    contactNumber : {
        type: String,
        required: true
    },
    photo: {
        type: String
    }
})

// Specifies the table name
// Will be converted to service-provider
const ServiceProvider = mongoose.model("Service-Provider", serviceProviderSchema);

module.exports = ServiceProvider;


