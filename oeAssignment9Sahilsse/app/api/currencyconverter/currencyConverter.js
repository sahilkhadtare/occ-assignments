const axios = require('axios');
const { data } = require('../platform/logger');
class CurrencyConverter {
    async ConvertCurrency(amount, baseCurrency, exchangeCurrency) {
        let result = 0;
        try {
            var res = await axios.get(`https://freecurrencyapi.net/api/v2/latest?apikey=fd4ab3e0-5984-11ec-9d03-357d2da94e54&base_currency=${baseCurrency}`)
            result = (res.data.data[exchangeCurrency] * amount).toFixed(2);
            return result;
        } catch (err) {
            throw new HttpClientError(`${e.message}`, e.response);
        }
    }
}
module.exports = CurrencyConverter;