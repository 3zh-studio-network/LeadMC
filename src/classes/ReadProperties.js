class ReadProperties {
    constructor(serverid) {
        this.serverid = serverid;
        this.serverSettings = new (require('./ServerConfig.js') || window.require("./ServerConfig.js")).ServerConfig(this.serverid);
        this.propertiesFile = this.serverSettings.getConfig("serverPath");
    }

    read() {
        var fs = require('fs');
        if (fs.existsSync(this.propertiesFile)) return false;

        var propertiesData = fs.readFileSync(propertiesFile);

        return this.parse(propertiesData);
    }

    write(properties, value) {
        var fs = require('fs');
        var propertiesData = this.read();

        propertiesData[properties] = value;

        fs.writeFileSync(this.propertiesFile, this.stringify(propertiesData));

        return true;
    }

    parse(propertiesData) {
        var properties = {};
        var temp = propertiesData.split("\n");
        if (propertiesData.startsWith("\n")) temp.shift();
        if (propertiesData.endsWith("\n")) temp.pop();
        for (var i = 0; i < temp.length; i++) {
            if (temp[i].startsWith("#")) continue;
            var property = temp[i].split("=");
            properties[property[0]] = property[1];
        }
        return properties;
    }

    stringify(properties) {
        var propertiesData = "";
        for (var property in properties) {
            propertiesData += property + "=" + properties[property] + "\n";
        }
        return propertiesData;
    }
}

exports.ReadProperties = ReadProperties;