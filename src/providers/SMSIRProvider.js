const SmsProvider = require('./SmsProvider');

class SMSIRProvider extends SmsProvider {

    /**
     * Get string token
     * 
     * @return {string} token
     */
    async getToken() {
        try {
            const response = await fetch(
                'https://RestfulSms.com/api/Token',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        'UserApiKey': this.config.api_key,
                        'SecretKey': this.config.secret_key
                    }),
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            const result = await response.json();
            return result.TokenKey;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Send message
     * 
     * @param {string} message
     * @param {string[]} receivers
     */
    async sendMessage(message, receivers) {
        try {
            const token = this.getToken();
            const response = await fetch(
                'https://RestfulSms.com/api/UltraFastSend',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        'ParameterArray': [{
                            "Parameter": "VerificationCode",
                            "ParameterValue": message
                        }],
                        'Mobile': receivers[0],
                        'TemplateId': 68712
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'x-sms-ir-secure-token': token
                    }
                }
            );
            const result = await response.json();
            return result;
        } catch (error) {
            throw error;
        }
        // try {
        //     const token = this.getToken();
        //     const response = await fetch(
        //         'http://RestfulSms.com/api/MessageSend',
        //         {
        //             method: 'POST',
        //             body: JSON.stringify({
        //                 'Messages': message,
        //                 'MobileNumbers': receivers,
        //                 'LineNumber': this.config.line_number
        //             }),
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'x-sms-ir-secure-token': token
        //             }
        //         }
        //     );
        //     const result = await response.json();
        //     return result;
        // } catch (error) {
        //     throw error;
        // }
    }

    /**
     * Get credit
     */
    getCredit() {
        //
    }
}

module.exports = SMSIRProvider;