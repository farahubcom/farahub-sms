const SmsProvider = require('./SmsProvider');
const axios = require("axios");
const get = require("lodash/get");

class IPPanelProvider extends SmsProvider {

    /**
     * Api endpoint
     * 
     * @var string
     */
    endpoint = "https://api2.ippanel.com/api/v1";

    /**
     * Axios instance
     * 
     * @var Axios
     */
    http;

    /**
     * Create provider instance
     * 
     * @constructor
     */
    constructor(workspace, connection, config) {
        super(workspace, connection, config);

        this.http = axios.create({
            baseURL: this.endpoint,
            headers: {
                "apikey": this.config['api_key']
            }
        })
    }

    /**
     * Send message
     * 
     * @param {string} message
     * @param {string[]} receivers
     * @param {object} extraParams
     * 
     * @return {Sms} created sms
     */
    async sendMessage(message, receivers, extraParams = {}) {
        try {
            const type = extraParams['pattern'] && extraParams['params'] ? 'pattern' : 'send';
            const url = type == "pattern" ? '/sms/pattern/normal/send' : '/sms/send/webservice/single';

            const response = await this.http.post(url, {
                "sender": this.config['originator_number'],
                "recipient": type == "pattern" ? receivers[0] : receivers,
                ...(type == "pattern" ? {
                    "code": extraParams['pattern'],
                    "variable": extraParams['params'],
                } : {
                    "message": message,
                    "description": {
                        "summary": message,
                        "count_recipient": String(receivers.length)
                    },
                })
            });

            const messageId = response.data?.data?.message_id;

            if (!messageId) {
                throw "returned response not valid";
            }

            const info = await this.http.get('/sms/message/all?page=1&per_page=1');

            if(get(info.data, "data[0].message_id") != messageId) {
                throw "returned response not valid";
            }

            const cost = get(info.data, "data[0].cost");
            const totalParts = get(info.data, "data[0].part");

            const Sms = this.connection.model("Sms");
            const sms = new Sms({
                receiver: receivers[0],
                content: message,
                cost, 
                totalParts,
                sentAt: new Date(),
                providerData: get(info.data, "data[0]"),
            });

            await sms.save();

            return sms;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get credit
     */
    async getCredit() {
        const response = this.http.get("/sms/accounting/credit/show");

        if (!response.data.credit) {
            throw new Exception("returned response not valid", 1);
        }

        return response.data.credit;
    }
}

module.exports = IPPanelProvider;