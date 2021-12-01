class ReadProperties {
    constructor(serverid) {
        this.serverid = serverid;
        this.serverSettings = new (require('./ServerConfig.js')).ServerConfig(this.serverid);
        this.propertiesFile = this.serverSettings.getConfig("serverPath");
    }

    read() {
        var fs = require('fs');
        var properties = {};

        if (fs.existsSync(this.propertiesFile)) return false;

        var propertiesData = fs.readFileSync(propertiesFile);
        var temp = propertiesData.split("\n");
        for (var i = 0; i < temp.length; i++) {
            if (temp[i].startWith("#")) continue;
            var property = temp[i].split("=");
            properties[property[0]] = property[1];
        }

        return properties;
    }

    write(properties, value) {
        var fs = require('fs');
        var propertiesData = this.read();

        propertiesData[properties] = value;

        fs.writeFileSync(this.propertiesFile, propertiesData);

        return true;
    }
}

exports.ReadProperties = ReadProperties;