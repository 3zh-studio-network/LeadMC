class DownloadFile {
    constructor(fileTempPath, filePath, fileName, fileURL) {
        this.uuid = require('uuid');
        this.fileTempPath = fileTempPath;
        this.filePath = filePath;
        this.fileURL = fileURL;
        this.fileName = fileName;
        this.uid = this.uuid.v4();
        this._events = {};
    }

    sentMessage = (name, data, _events = this._events) => {
        if (_events[name]) {
            _events[name].forEach(listener => {
                listener(data);
            });
        }
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
            var _events = this._events;
            var uuid = this.uid;
            var l = this;

            var file = fs.createWriteStream(fileTempPath + "/" + this.uid);
            var req = request.get(this.fileURL);
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
                            fileTotalSize: nowDownloadSize,
                            fileDownloadedSize: response.headers['content-length']
                        }, _events);
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
                        }, _events);
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

    on(name, listener) {
        if (!this._events[name]) {
            this._events[name] = [];
        }

        this._events[name].push(listener);
    }

    removeListener(name, listener) {
        if (this._events[name]) {
            this._events[name].splice(this._events[name].indexOf(listener), 1);
        }
    }

}

exports.DownloadFile = DownloadFile;