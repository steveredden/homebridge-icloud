<p align="center">
    <a href="https://homebridge.io/"><img src="https://github.com/homebridge/branding/raw/master/logos/homebridge-wordmark-logo-vertical.png" width="190"/></a>
</p>

[![GitHub license](https://badgen.net/github/license/steveredden/homebridge-icloud)](https://github.com/steveredden/homebridge-icloud/blob/main/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/steveredden/homebridge-icloud.svg?style=flat-square)](https://github.com/steveredden/homebridge-icloud)
[![GitHub issues](https://img.shields.io/github/issues/steveredden/homebridge-icloud.svg)](https://GitHub.com/steveredden/homebridge-icloud/issues/)
[![Npm package version](https://badgen.net/npm/v/homebridge-icloud)](https://npmjs.com/package/homebridge-icloud)
[![Npm package total downloads](https://badgen.net/npm/dt/homebridge-icloud)](https://www.npmjs.com/package/homebridge-icloud)

# homebridge-icloud

`homebridge-icloud` is a [Homebridge](https://homebridge.io) plugin that exposes your Apple devices to [Apple's](https://www.apple.com) [HomeKit](https://www.apple.com/ios/home) smart home platform as stateless switches, which when turned on, actiave the "Find my Device" functionality.

## Installation Instructions

#### Option 1: Install via Homebridge Config UI X

Search for "icloud" in [homebridge-config-ui-x](https://github.com/oznu/homebridge-config-ui-x) and install `homebridge-icloud`.

#### Option 2: Manually Install

```sh
sudo npm install -g homebridge-icloud
```

## Configuration

Device names and IP Addresses must be configured manually in current state:

### Example

```json
platforms: [
    {
        "platform": "HomebridgeiCloud",
        "username": "you@apple.com",
        "password": "yourPassword",
        "devices": [
            "iPhone SE",
            "iPhone 13"
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
  * ***label** (mandatory): the label of your accessory
* *name* (optional): platform name to display in logs
* *debug* (optional): boolean to enable more verbose logging

<br><hr><br>
<p align="center">
    <a href="https://buymeacoffee.com/steveredden"><img src="img/bmc-new-logo.jpg" width="230"/></a>
</p>