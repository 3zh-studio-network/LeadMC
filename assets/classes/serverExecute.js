class ServerExecute {
    constructor(serverid, serverDir) {
        this.serverDir = serverDir + "/";
        this.serverid = serverid | require("uuid").v4();

        var { app } = require("electron");
        var appLocal = app.getPath("userData");

        if (!fs.existsSync(appLocal + "/serverInfo")) {
            fs.mkdirSync(appLocal + "/serverInfo");
        }
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
        var { app } = require("electron");
        if (!fs.existsSync(app.getPath("userData") + "/serverInfo/" + this.serverid + ".json")) {
            return false;
        }
        return true;
    }

    createServerData(serverDir, serverName, serverPort, serverVersion, servertype, serverArgs) {
        if (!this.checkServerFileisExist() || !this.checkServerisExist()) {
            var serverInfo = {
                serverid: this.serverid,
                serverDir: this.serverDir,
                serverName: "",
                serverPort: "",
                serverVersion: "",
                serverType: "",
                serverCretateTime: "",
                serverLog: "",
                serverArgs: "",
            };
        }
        return true;
    }

}