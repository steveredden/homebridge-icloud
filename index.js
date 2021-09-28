const iCloudPlatform = require('./lib/iCloudPlatform')

module.exports = function (api) {
    api.registerPlatform('HomebridgeiCloud', iCloudPlatform)
}