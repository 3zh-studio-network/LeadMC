class ServerConfig {
    constructor(serverid, { serverName = "New Server", serverVersion = "1.16", serverPort = 25565, serverQueryPort = 25566, serverJavaVersion = "16", serverPath } = {}) {
        this.serverid = serverid || require("uuid").v4();
        this.setting = new (require("./ConfigSetting.js")).ConfigSetting;
        this.serverName = serverName;
        this.serverVersion = serverVersion;
        this.serverPort = serverPort;
        this.serverJavaVersion = serverJavaVersion;
        this.serverPath = serverPath || this.setting.getPath("SERVERDATA");
        this.configPath = this.setting.getPath("SERVERDATA") + "/" + this.serverid + ".json";
    }

    defaultConfig() {
        return {
            serverID: this.serverid,
            serverName: this.serverName,
            serverVersion: this.serverVersion,
            serverJavaVersion: this.serverJavaVersion,
            serverPath: this.serverPath,
        }
    }

    configExists() {
        var fs = require("fs");
        return fs.existsSync(this.configPath);
    }

    createConfig() {
        var config = this.defaultConfig();
        var fs = require("fs");

        if (this.configExists()) return this.configPath;

        fs.writeFileSync(this.configPath, JSON.stringify(config));
        return this.configPath;
    }

    getConfig(config = undefined) {
        var fs = require("fs");
        if (!this.configExists()) {
            return false;
        }

        var configData = JSON.parse(fs.readFileSync(this.configPath));
        if (!config) {
            return configData;
        } else {
            return configData[config];
        }
    }
}

exports.ServerConfig = ServerConfig;