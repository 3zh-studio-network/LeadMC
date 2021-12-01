class DownloadFile {
    constructor(fileTempPath, filePath, fileName, fileURL) {
        this.uuid = require('uuid');
        this.fileTempPath = fileTempPath;
        this.filePath = filePath;
        this.fileURL = fileURL;
        this.fileName = fileName;
        this.uid = this.uuid.v4();
        this.events = global.events;
    }

    sentMessage = (name, data, events = this.events) => {
        events.emit(name, data);
    }

    async downloadFile() {
        return new Promise(async (resolve, reject) => {
            var request = require('request');
            var fs = require('fs');
            var fileTempPath = this.fileTempPath;
            var filePath = this.filePath + "/" + this.fileName;
            var nowDownloadSize = 0;
            var sentMessage = this.sentMessage;
            var moveFile = this.moveFile;
            var events = this.events;
            var uuid = this.uid;
            var l = this;

            var file = fs.createWriteStream(fileTempPath + "/" + this.uid);
            var req = request.get(this.fileURL);
            sentMessage("downloading", {
                status: "starting",
                type: "file",
                id: uuid,
                fileName: this.fileName,
                fileURL: this.fileURL,
            }, events);
            var rp;

            req.on('response', (response) => {
                rp = response;
                if (response.statusCode === 200) {
                    req.on('data', (chunk) => {
                        nowDownloadSize += chunk.length;
                        file.write(chunk);
                        sentMessage("downloading", {
                            status: "downloading",
                            type: "file",
                            id: uuid,
                            fileName: this.fileName,
                            fileURL: this.fileURL,
                            fileTotalSize: nowDownloadSize,
                            fileDownloadedSize: response.headers['content-length']
                        }, events);
                    });
                }
            });
            var t = setInterval(() => {
                if (nowDownloadSize == rp.headers['content-length'] && file.bytesWritten == rp.headers['content-length']) {
                    file.end();

                    clearInterval(t);
                    setTimeout(() => {
                        moveFile(l);
                        sentMessage("downloading", {
                            status: "finish",
                            type: "file",
                            id: uuid
                        }, events);
                        return resolve(filePath);
                    }, 1000);
                }
            }, 1000);
        });
    }

    async moveFile(self = this) {
        var fs = require('fs');
        var fileTempPath = self.fileTempPath;
        var filePath = self.filePath;
        var fileName = self.fileName;
        var uuid = self.uid;

        fs.renameSync(fileTempPath + "/" + uuid, filePath + "/" + fileName);
    }
}

exports.DownloadFile = DownloadFile;