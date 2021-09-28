let findiPhone = require("find-my-iphone");

const PLUGIN_NAME = 'homebridge-icloud';
const PLATFORM_NAME = 'HomebridgeiCloud';

class iCloudSound {
    constructor(log, config, api, debug, uuid, device) {
        if(!config) return;

        this.log = log;
        this.config = config;
        this.api = api;
        this.debug = debug;
        this.uuid = uuid;
        this.device = device;

        this.Service = this.api.hap.Service;
        this.Characteristic = this.api.hap.Characteristic;
        this.Categories = this.api.hap.Categories;

        this.name = "Find My " + this.config.device

        //Create Accessory if we didn't find a matching device by uuid
        if ( this.device == undefined ) {
            this.device = new this.api.platformAccessory(this.name, this.uuid);
            this.device.category = this.Categories.SWITCH;
            this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [this.device]);
        }
        this.deviceService = this.device.getService(this.Service.Switch) || this.device.addService(this.Service.Switch);

        this.log.info(`${this.name} - Initialized`);
        this.debugLog("uuid: [" + this.device.UUID + "]");

        this.updateAllCharacteristic();
    }

    updateAllCharacteristic() {

        //On = boolean
        this.deviceService.getCharacteristic(this.Characteristic.On)
            .onSet(async (state) => {
                this.debugLog(`Calling 'find(${this.config.username}, ${this.config.password}, ${this.config.device})`);
                findiPhone(this.config.username, this.config.password, this.config.device, function() {
                    this.debugLog("Done!")
                });
                setTimeout(() => {
                    this.deviceService.updateCharacteristic(this.Characteristic.On, false);
                    this.debugLog("SetEffect: turning off stateless switch");
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