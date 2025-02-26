const { Module } = require('@farahub/framework/foundation');
const models = require('./models');
const schemas = require('./schemas');
const controllers = require('./controllers');
const conditions = require('./conditions');
const triggers = require('./triggers');


class SmsModule extends Module {

    /**
     * The module name
     * 
     * @var string
     */
    name = 'Sms';

    /**
     * The module version
     * 
     * @var string
     */
    version = '1.0.0';

    /**
     * The module base path
     * 
     * use for routing 
     * 
     * @var string
     */
    basePath = '/sms';

    /**
     * The module conditions
     * 
     * @var array
     */
    conditions = conditions;

    /**
     * The module triggers
     * 
     * @var array
     */
    triggers = triggers;

    /**
     * Register the module
     * 
     * @return void
     */
    register() {
        this.registerModels(models);
        this.registerSchemas(schemas);
        this.registerControllers(controllers);
    }
}

module.exports = SmsModule;