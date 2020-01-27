const parse = require('csv-parse');
const { set } = require('lodash');


const output = {};

parse(`
  field,en_US,pt_PT
  confirmation.yes, Yes, Sim
  confirmation.no, No, Não
`, {
  trim: true,
  columns: true
})
// Use the readable stream api
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
    console.log(output);
});
