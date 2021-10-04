<p align="center">
    <a href="https://homebridge.io/"><img src="https://github.com/homebridge/branding/raw/master/logos/homebridge-wordmark-logo-vertical.png" width="190"/></a>
</p>

[![GitHub license](https://badgen.net/github/license/steveredden/homebridge-icloud)](https://github.com/steveredden/homebridge-icloud/blob/main/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/steveredden/homebridge-icloud.svg?style=flat-square)](https://github.com/steveredden/homebridge-icloud)
[![GitHub issues](https://img.shields.io/github/issues/steveredden/homebridge-icloud.svg)](https://GitHub.com/steveredden/homebridge-icloud/issues/)
[![Npm package version](https://badgen.net/npm/v/homebridge-icloud)](https://npmjs.com/package/homebridge-icloud)
[![Npm package total downloads](https://badgen.net/npm/dt/homebridge-icloud)](https://www.npmjs.com/package/homebridge-icloud)

# homebridge-icloud

`homebridge-icloud` is a [Homebridge](https://homebridge.io) plugin that exposes your Apple devices to [Apple's](https://www.apple.com) [HomeKit](https://www.apple.com/ios/home) smart home platform as stateless switches, which when turned on, activates the "Find my Device" functionality.

<img src="img/findmyapp.jpg" width="110" />

## Use Cases

This plugin is designed to expose a button that assists in finding one's phone or other devices. The "Find my Phone" features of iCloud bypass any `Do not Disturb` or `Silent` settings on the phone, and plays an audible chime. Ideally, the buttons are to be triggered by Alexa (thanks, of course, to [homebridge-alexa](https://github.com/NorthernMan54/homebridge-alexa)), as an alternative to constantly asking [her] to `call my phone` - which, if on silent, may not be easily found. An Alexa Routine triggers the switch:

<p align="center"><img src="img/alexaroutine.jpg" width="280"></p>

## Installation Instructions

#### Option 1: Install via Homebridge Config UI X

Search for "icloud" in [homebridge-config-ui-x](https://github.com/oznu/homebridge-config-ui-x) and install `homebridge-icloud`.

#### Option 2: Manually Install

```sh
sudo npm install -g homebridge-icloud
```

## Configuration

Device names (labels) can be found in your "Find My" app in the Devices tab

### Example

```json
platforms: [
    {
        "platform": "HomebridgeiCloud",
        "username": "you@apple.com",
        "password": "yourPassword",
        "devices": [
            {
                "name": "iPhone SE"
            },
            {
                "name": "iPhone 13",
                "nameOverride": "Find My Thirteen"
            }
        ],
        "name": "iCloud",
        "debug": false
    }
]
```

* **platform** (mandatory): the name of the plugin
* **username** (mandatory): your Apple iCloud username
* **password** (mandatory): your Apple iCloud password
* **devices** (mandatory): array containing your devices' labels
  * **name** (mandatory): the name/identifier of your accessory (find in your iCloud dashboard)
  * *nameOverride* (optional): a customized name for the accessory (default: "Find My \<name\>")
* *name* (optional): platform name to display in logs
* *debug* (optional): boolean to enable more verbose logging

## Limitations

This plugin relies on the npmjs package ["find-my-iphone" v1.1.2](https://www.npmjs.com/package/find-my-iphone), which does not appear to support App-specific passwords. Similarly, it does not provide a great way to catch login / device errors, and the platform will restart.  It is **highly** recommended to run this as a [child bridge](https://github.com/homebridge/homebridge/wiki/Child-Bridges), so that you do not impact other plugins!

![fatalerror](img/childbridgerestart.png)

### Multiple Accounts / Family Devices

["find-my-iphone" v1.1.2](https://www.npmjs.com/package/find-my-iphone) does not appear to expose/support "family devices," so if you need to *find* a device from another iCloud account, you should set up a second [child bridge](https://github.com/homebridge/homebridge/wiki/Child-Bridges) with alternative credentails (ex. your spouse's credentials):

![twoChildBridges](img/twoChildBridge.png)

In particular, you'll want to modify the following to be unique:

* Name
* _bridge.username
* _bridge.port

Two [Child Bridges](https://github.com/homebridge/homebridge/wiki/Child-Bridges) will display:

![dashboardDisplay](img/dashboard2Bridge.png)

***Note**: You'll need to directly configure the settings of the second bridge in your `config.json` - the Plugins page will only show the config UI for the first bridge*

<br><hr><br>
<p align="center">
    <a href="https://buymeacoffee.com/steveredden"><img src="img/bmc-new-logo.jpg" width="230"/></a>
</p>
