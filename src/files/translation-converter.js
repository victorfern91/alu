const parse = require('csv-parse');
const { set } = require('lodash');
const fs = require('fs');

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
        Object.keys(output).forEach(language => {
            fs.writeFile(
                `${process.cwd()}/static/${language}.json`,
                JSON.stringify(output[language], null, 2),
                (err) => {
                    if (err) {
                        throw new Error('Ups! :(', err);
                    }
                }
            );
        })
    });
}
