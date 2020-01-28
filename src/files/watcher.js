const chokidar = require('chokidar');
const { noop } = require('lodash');

class FileWatcher {
    constructor(filepath = null) {
        this.filepath = filepath;

        this.watcher = chokidar.watch(this.filepath);

        return this;
    }

    on(eventName, callback) {
        this.watcher.on(eventName, callback);

        return this;
    }
}

module.exports = FileWatcher;
