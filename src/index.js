// Load information from .env file
require('dotenv').config();

const FileWatcher = require('./files/watcher');
const generateTranslationFiles = require('./files/translation-converter');

const watcher = new FileWatcher(process.env.TRANSLATION_FILE);

watcher.on('change', generateTranslationFiles);

require('./server');
