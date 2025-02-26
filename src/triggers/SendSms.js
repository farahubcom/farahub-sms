const { Trigger } = require("@farahub/framework/foundation");

class SendSms extends Trigger {

    /**
     * Name of the task
     * 
     * @var string
     */
    name = "Send Sms";

    /**
     * Identifier of the task
     * 
     * @var string
     */
    identifier = "send-sms";

    /**
     * Handle the task
     * 
     * @return bool
     */
    handle(params, data) {
        // 
    }
}

module.exports = SendSms;