class ServerExecute {
    constructor(serverid, serverDir) {
        this.serverDir = serverDir + "/";
        this.serverid = serverid | require("uuid").v4();
        this.setting = new (require("./configSetting.js")).ConfigSetting;
    }

    checkServerisExist() {
        var fs = require("fs");
        if (fs.existsSync(this.serverDir + this.serverid)) {
            return true;
        } else {
            return false;
        }
    }

    checkServerFileisExist() {
        var fs = require("fs");
        var filePath = settings.getPath("SERVERDATA");
        if (!fs.existsSync(filePath + "/" + this.serverid + ".json")) {
            return false;
        }
        return true;
    }
}

exports.ServerExecute = ServerExecute;