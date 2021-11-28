class ServerConfig {
    constructor() {
        this.setting = new (require("./configSetting.js")).ConfigSetting;
    }
}

exports.ServerConfig = ServerConfig;