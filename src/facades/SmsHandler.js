const SmsProvider = require('../providers/SmsProvider');
const AfeProvider = require('../providers/AfeProvider');
const SMSIRProvider = require('../providers/SMSIRProvider');
const IPPanelProvider = require('../providers/IPPanelProvider');

class SmsHandler {

    /**
     * Default provider
     * 
     * @var string
     */
    static defaultProvider = process.env.SMS_DEFAULT_PROVIDER;

    /**
     * Default provider config
     * 
     * @var object
     */
    static defaultProviderConfig = {
        'api_key': process.env.SMS_DEFAULT_PROVIDER_API_KEY,
        'originator_number': process.env.SMS_DEFAULT_PROVIDER_ORIGINATOR_NUMBER
    };

    /**
     * make the provider
     * 
     * @constructor
     * @param {Workspace|null} workspace
     * @param {Connection} connection
     * @return {SmsProvider} provider
     */
    static make(workspace, connection) {

        const provider = workspace?.getOption('sms_provider') ?? this.defaultProvider;
        const providerConfig = workspace?.getOption('sms_provider_config') ?? this.defaultProviderConfig;

        if (Boolean(workspace) && Boolean(provider) && !Boolean(providerConfig)) {
            throw 'Sms Provider enable without any configuration for workspace :: '.concat(workspace.identifier);
        }

        switch (provider) {
            case "smsir":
                return new SMSIRProvider(workspace, connection, providerConfig);
            case "ippanel":
                return new IPPanelProvider(workspace, connection, providerConfig);
            case "afe":
                return new AfeProvider(workspace, connection, providerConfig);
            // case "kavenegar":
            // return (new KavenegarProvider()).make(app, workspace);
            // case "ippanel":
            // return (new KavenegarProvider()).make(app, workspace);
            default:
                throw `Provider ${provider} not exist`;
        }
    }
}

module.exports = SmsHandler;