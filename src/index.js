const FileWatcher = require('./files/watcher');
const generateTranslationFiles = require('./files/translation-converter');

const watcher = new FileWatcher('./test.csv');

watcher.on('change', generateTranslationFiles);
