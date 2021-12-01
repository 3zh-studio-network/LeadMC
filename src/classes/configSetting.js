class ConfigSetting {
    defaultSetting() {
        var packageFile = require(process.cwd() + '/package.json');
        return {
            programName: "LeadMC",
            programVersion: packageFile.version,
            paths: [
                {
                    name: "TEMP",
                    path: "$DEFAULT"
                },
                {
                    name: "SERVERDATA",
                    path: "$DEFAULT"
                },
                {
                    name: "SERVERVERISON",
                    path: "$DEFAULT"
                },
                {
                    name: "SERVERCONFIG",
                    path: "$DEFAULT"
                },
                {
                    name: "LOGS",
                    path: "$DEFAULT"
                },
                {
                    name: "SETTING",
                    path: "$DEFAULT"
                }
            ]
        }
    }
    
    paths() {
        const { app } = require('electron');
        var userDataPath = app.getPath('userData');
        var tempPath = app.getPath('temp');
        return [
            {
                name: "TEMP",
                path: (this.getSetting("paths")).find(path => path.name == "TEMP").path == "$DEFAULT" ? tempPath + "/" + this.getSetting("programName") : (getSetting("paths")).find(path => path.name == "TEMP").path
            },
            {
                name: "SERVERVERISON",
                path: (this.getSetting("paths")).find(path => path.name == "SERVERDATA").path == "$DEFAULT" ? userDataPath + "/servers" : (getSetting("paths")).find(path => path.name == "SERVERDATA").path
            },
            {
                name: "SERVERDATA",
                path: (this.getSetting("paths")).find(path => path.name == "SERVERVERISON").path == "$DEFAULT" ? userDataPath + "/serverdata" : (getSetting("paths")).find(path => path.name == "SERVERVERISON").path
            },
            {
                name: "SERVERCONFIG",
                path: (this.getSetting("paths")).find(path => path.name == "SERVERCONFIG").path == "$DEFAULT" ? userDataPath + "/serverconfig" : (getSetting("paths")).find(path => path.name == "SERVERVERISON").path
            },
            {
                name: "LOGS",
                path: (this.getSetting("paths")).find(path => path.name == "LOGS").path == "$DEFAULT" ? userDataPath + "/logs" : (getSetting("paths")).find(path => path.name == "LOGS").path
            },
            {
                name: "SETTING",
                path: (this.getSetting("paths")).find(path => path.name == "SETTING").path == "$DEFAULT" ? userDataPath + "/setting" : (getSetting("paths")).find(path => path.name == "SETTING").path
            }
        ]
    }

    getSetting(setting) {
        const { app } = require('electron');
        var fs = require('fs');
        var path = require('path');
        var configPath = path.join(app.getPath('userData'), 'config.json');
        if (fs.existsSync(configPath)) {
            var configFile = fs.readFileSync(configPath);
            var config = JSON.parse(configFile);
        } else {
            var config = this.defaultSetting();
            fs.writeFileSync(configPath, JSON.stringify(config));
        }

        if (setting === undefined || setting === null || setting === "") {
            return config;
        } else {
            return config[setting];
        }
    }

    setSetting(setting, value) {
        const { app } = require('electron');
        var fs = require('fs');
        var settings = this.getSetting();
        var configPath = path.join(app.getPath('userData'), 'config.json');
        settings[setting] = value;
        fs.writeFileSync(configPath, JSON.stringify(settings));

        return config[setting];
    }

    setPath(pathName, path) {
        var path = this.getSetting("paths");
        paths.find(path => path.name == pathName).path = path;
        this.setSetting("paths", paths);

        return paths.find(path => path.name == pathName).path;
    }

    getPath(pathName) {
        var paths = this.paths();
        var path = paths.find(path => path.name == pathName).path;
        var fs = require('fs');
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
        return path;
    }

    // defaultServerData() {
    //     return {
    //         serverName: "",
    //         serverIP: "",
    //         serverPort: "",
    //         serverVersion: "",
    //         serverMaxPlayers: "",
    //         serverCurrentPlayers: "",
    //         serverDescription: "",
    //         serverIcon: "",
    //         serverArgs: "",
    //         serverOnline: false
    //     }
    // }
}

exports.ConfigSetting = ConfigSetting;