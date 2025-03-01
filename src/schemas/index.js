const Sms = require('./Sms')
const Workspace = require('./Workspace')

const schemas = {
    Sms,
    'injects': {
        'Core': {
            Workspace
        },
    }
}

module.exports = schemas;