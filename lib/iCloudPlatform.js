const iCloudSound = require("./iCloudSound");

const PLUGIN_NAME = 'homebridge-icloud';
const PLATFORM_NAME = 'HomebridgeiCloud';

class iCloudPlatform {
    constructor(log, config, api) {
        if (!config) return;

        this.accessories = [];

        this.log = log;
        this.config = config;
        this.api = api;
        this.debug = this.config.debug || false;

        this.api.on('didFinishLaunching', () => {
            if(this.config.devices && Array.isArray(this.config.devices)) {

                //loop through each lightstrp in array
                for (let device of this.config.devices) {

                    const uuid = this.api.hap.uuid.generate('homebridge-iCloud' + device.name + device.nameOverride );
                    let accessory = this.accessories.find(accessory => accessory.UUID === uuid)
                    new iCloudSound(this.log, this.config, this.api, this.debug, uuid, accessory, device);  
                }
            }
        });
    }

    configureAccessory(accessory) {
        this.accessories.push(accessory);
        this.log.info(`Restored ${accessory.displayName} [${accessory.UUID}]`);
    }

    removeAccessory(accessory) {
        this.api.unregisterPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
        this.log.info(`Removed ${accessory.displayName} [${accessory.UUID}]`);
    }
}

module.exports = iCloudPlatform;