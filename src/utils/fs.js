const fs = require('fs');

module.exports = {
    writeJSON: (filepath, object) => {
        return fs.writeFile(
            filepath,
            JSON.stringify(object, null, 2),
            (err) => {
                if (err) {
                    throw new Error('Ups! :(', err);
                }
            }
        );
    }
}
