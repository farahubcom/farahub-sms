const { Condition } = require('@farahub/framework/foundation');


class SmsSent extends Condition {

    /**
     * Name of the condition
     * 
     * @var string
     */
    name = 'Sms sent';

    /**
     * Identifier of the condition
     * 
     * @var string
     */
    identifier = 'sms-sent';

    /**
     * Handle the condition
     * 
     * @param object data
     * @return bool
     */
    async handle(params, data) {
        return true;
    }
}

module.exports = SmsSent;