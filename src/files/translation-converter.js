const parse = require('csv-parse');
const { set } = require('lodash');
const fs = require('fs');

const { writeJSON } = require('../utils/fs');

module.exports = filepath => {
  const output = {};

  fs.createReadStream(filepath)
    .pipe(
      parse({ trim: true, columns: true })
    )
    .on('readable', function () {
      let record = null;
      while (record = this.read()) {
        const { field, ...translations } = record;

        Object.keys(translations).forEach(language => {
            set(output, `${language}.${field}`, record[language]);
        });
      }
    })
    .on('end', () => {
        const availableLanguages = Object.keys(output);

        writeJSON(`${process.cwd()}/static/languages.json`, availableLanguages);

        Object.keys(output).forEach(language => {
            writeJSON(`${process.cwd()}/static/${language}.json`, output[language]);
        })
    });
}
