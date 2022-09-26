const _ = require('lodash');
const countryInfo = require('../tools/downloaded/countryInfo.json');

async function getDataSource() {
    const countryByCc = _.keyBy(countryInfo, 'cc');

    return {
        countryByCc,
    };
}

module.exports = {
    getDataSource,
};