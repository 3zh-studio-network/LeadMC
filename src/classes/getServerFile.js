class GetServerFile {
    constructor(ServerVersion = "", ServerFileLocation = "https://launchermeta.mojang.com/mc/game/version_manifest.json") {
        this.fileDownloader = require("./downloadFile.js").DownloadFile;
        this.settings = require("./configSetting.js").ConfigSetting;
        this.ServerVersion = ServerVersion;
        this.FileServerLocation = ServerFileLocation;
    }

    async downloadServerListFile() {
        var downloader = this.fileDownloader;
        var settings = (new this.settings);
        return new Promise(async (resolve, reject) => {
            var fileName = "version_manifest.json";
            var tempFolder = settings.getPath("TEMP");
            var filePath = settings.getPath("SERVERVERISON");
            
            return resolve(await new downloader(tempFolder, filePath, fileName, this.FileServerLocation).downloadFile());
        });
    }

    async getServerList(showSnapshot = true, showBeta = false, showAlpha = false) {
        return new Promise(async (resolve, reject) => {
            var filePath = await this.downloadServerListFile();
            var fs = require('fs');
            var file = fs.readFileSync(filePath);
            var json = JSON.parse(file);
            var list = [];
            json.versions.forEach(version => {
                if (version.type == "snapshot" && !showSnapshot || version.type == "old_beta" && !showBeta || version.type == "old_alpha" && !showAlpha) {
                    version = "";
                } else {
                    list.push(version);
                }
            })
            return resolve(list);
        });
    }

    async getVersionMetadata() {
        return new Promise(async (resolve, reject) => {
            var filePath = await this.downloadServerListFile();
            var fs = require('fs');
            var file = fs.readFileSync(filePath);
            var json = JSON.parse(file);
            var serverFile = json.versions.find(x => x.id === this.ServerVersion);
            if (serverFile) {
                var serverFileLocation = serverFile.url;
                return resolve(serverFileLocation);
            } else {
                return resolve(false);
            }
        });
    }

    async downloadServerMetaFile() {
        var downloader = this.fileDownloader;
        var settings = (new this.settings);
        return new Promise(async (resolve, reject) => {
            var metadata = await this.getVersionMetadata();
            if (!metadata) {
                return resolve(false);
            }

            var fileName = this.ServerVersion + ".json";
            var tempFolder = settings.getPath("TEMP");
            var filePath = settings.getPath("SERVERVERISON");

            return resolve(await new downloader(tempFolder, filePath, fileName, metadata).downloadFile());
        })
    }

    async downloadServerFile() {
        var downloader = this.fileDownloader;
        var settings = (new this.settings);
        return new Promise(async (resolve, reject) => {
            var metadata = await this.downloadServerMetaFile();
            var fs = require('fs');
            var file = fs.readFileSync(metadata);
            var json = JSON.parse(file);
            try {
                var serverFile = json.downloads.server.url;
                if (!metadata) {
                    return resolve(false);
                }
            } catch (e) {
                return resolve(false);
            }

            var fileName = this.ServerVersion + ".jar";
            var tempFolder = settings.getPath("TEMP");
            var filePath = settings.getPath("SERVERVERISON");

            return resolve(await new downloader(tempFolder, filePath, fileName, serverFile).downloadFile());
        })
    }

    async serverFileExists() {
        var fs = require('fs');
        var settings = (new this.settings);
        var appFolder = settings.getPath("SERVERVERISON");
        var filePath = appFolder + "/" + this.ServerVersion + ".jar";
        if (fs.existsSync(filePath)) {
            return filePath;
        } else {
            return await this.downloadServerFile();
        }
    }

    async getServerFile() {
        return await new Promise(async (resolve, reject) => {
            var filePath = await this.serverFileExists();
            return resolve(filePath);
        });
    }
}

exports.GetServerFile = GetServerFile;