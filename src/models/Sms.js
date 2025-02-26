// const fetch = require("node-fetch");

class Sms {

    // /**
    //  * Get string token
    //  * 
    //  * @return {string} token
    //  */
    // static async getToken() {
    //     try {
    //         const response = await fetch(
    //             'https://RestfulSms.com/api/Token',
    //             {
    //                 method: 'POST',
    //                 body: JSON.stringify({
    //                     'UserApiKey': process.env.SMSIR_API_KEY,
    //                     'SecretKey': process.env.SMSIR_SECRET_KEY
    //                 }),
    //                 headers: { 'Content-Type': 'application/json' }
    //             }
    //         );
    //         const result = await response.json();
    //         return result.TokenKey;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // /**
    //  * Send sms to receivers
    //  * 
    //  * @return {object}
    //  */
    // static async send(receivers, messages) {
    //     try {
    //         const token = await this.getToken();
    //         const response = await fetch(
    //             'http://RestfulSms.com/api/MessageSend',
    //             {
    //                 method: 'POST',
    //                 body: JSON.stringify({
    //                     'Messages': messages,
    //                     'MobileNumbers': receivers,
    //                     'LineNumber': '30004747478085'
    //                 }),
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'x-sms-ir-secure-token': token
    //                 }
    //             }
    //         );
    //         const result = await response.json();
    //         return result;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // /**
    //  * Send verification code
    //  */
    // static async sendVerification(phone, code) {
    //     try {
    //         const token = this.getToken();
    //         const response = await fetch(
    //             'https://RestfulSms.com/api/UltraFastSend',
    //             {
    //                 method: 'POST',
    //                 body: JSON.stringify({
    //                     'ParameterArray': [{
    //                         "Parameter": "VerificationCode",
    //                         "ParameterValue": code
    //                     }],
    //                     'Mobile': phone,
    //                     'TemplateId': 68712
    //                 }),
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'x-sms-ir-secure-token': token
    //                 }
    //             }
    //         );
    //         const result = await response.json();
    //         return result;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // /**
    //  * Create new sms & send to receiver
    //  * 
    //  * @param {User} receiver 
    //  * @param {*} content 
    //  */
    // static async createAndSend(receiver, content) {
    //     try {
    //         const Sms = this.model('Sms');
    //         const sms = new Sms({
    //             receiver,
    //             content,
    //             sentAt: new Date()
    //         });

    //         await sms.save();

    //         await this.send([receiver], [content]);
    //         //
    //     } catch (error) {
    //         throw error;
    //     }
    // }
}

module.exports = Sms;