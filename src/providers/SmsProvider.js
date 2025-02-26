class SmsProvider {

    /**
     * Workspace instance
     * 
     * @var Workspace
     */
    workspace;

    /**
     * The workspace connection instance
     * 
     * @var Connection
     */
    connection;

    /**
     * Provider config
     * 
     * @var array
     */
    config;

    /**
     * make the provider
     * 
     * @constructor
     * @param {object} config
     * @return {SmsProvider} provider
     */
    constructor(workspace, connection, config) {
        this.workspace = workspace;
        this.connection = connection;
        this.config = config;
    }

    /**
     * Send message
     * 
     * @param {string} message
     * @param {string[]} receivers
     * 
     * @return {Sms} created sms
     */
    async sendMessage(message, receivers) {
        //
    }

    /**
     * Get credit
     */
    async getCredit() {
        //
    }
}

module.exports = SmsProvider;