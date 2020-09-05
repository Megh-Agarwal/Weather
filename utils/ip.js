const axios = require('axios');
const baseUrl = "https://location-api-megh.herokuapp.com/information?ip="
async function ipInformation(ip) {
    var url = baseUrl + ip;
    var information = await axios.get(url);
    return information;
}

module.exports = ipInformation;