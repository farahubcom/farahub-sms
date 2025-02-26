const SmsProvider = require('./SmsProvider');

class AfeProvider extends SmsProvider {

    /**
     * Send message
     * 
     * @param {string} message
     * @param {string[]} receivers
     */
    sendMessage(message, receivers) {
        //
    }

    /**
     * Get credit
     */
    getCredit() {
        //
    }
}

module.exports = AfeProvider;