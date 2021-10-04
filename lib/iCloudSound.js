let findiPhone = require("find-my-iphone");

const PLUGIN_NAME = 'homebridge-icloud';
const PLATFORM_NAME = 'HomebridgeiCloud';

class iCloudSound {
    constructor(log, config, api, debug, uuid, accessory, device) {
        if(!config) return;

        this.log = log;
        this.config = config;
        this.api = api;
        this.debug = debug;
        this.uuid = uuid;
        this.accessory = accessory;
        this.device = device;

        this.Service = this.api.hap.Service;
        this.Characteristic = this.api.hap.Characteristic;
        this.Categories = this.api.hap.Categories;

        this.name = this.device.nameOverride || "Find My " + this.device.name;

        //Create Accessory if we didn't find a matching device by uuid
        if ( this.accessory == undefined ) {
            this.accessory = new this.api.platformAccessory(this.name, this.uuid);
            this.accessory.category = this.Categories.SWITCH;
            this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [this.accessory]);
        }
        this.deviceService = this.accessory.getService(this.Service.Switch) || this.accessory.addService(this.Service.Switch);

        this.log.info(`${this.name} - Initialized`);
        this.debugLog("uuid: [" + this.uuid + "]");

        this.updateAllCharacteristic();
    }

    updateAllCharacteristic() {

        //On = boolean
        this.deviceService.getCharacteristic(this.Characteristic.On)
            .onSet(async (state) => {
                try{
                    this.log("Triggering '" + this.name + "'");
                    this.debugLog(`Calling 'findiPhone(${this.config.username}, *redacted*, ${this.device.name})`);
                    findiPhone(this.config.username, this.config.password, this.device.name);
                } catch(error) {
                    this.log("Error triggering " + this.name);
                    this.debugLog(error)
                }
                setTimeout(() => {
                    this.deviceService.updateCharacteristic(this.Characteristic.On, false);
                    this.debugLog("Turning off stateless switch");
                }, 1500);  //1.5 seconds
            }).onGet(async () => {
                const state = false;
                return state;
            });
    }

    debugLog(text) {
        if(this.debug) this.log.info(`\x1b[2m${this.name} - ${text}\x1b[0m`);
    }
}

module.exports = iCloudSound;