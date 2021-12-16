const logger = require('../api/platform/logger');
const CurrencyConverter = require('../api/currencyconverter/currencyConverter');

/**
 * Send a "hello" message back to the caller.
 *
 * @param {*} req The expressJS request object.
 * @param {*} res The expressJS response object.
 */
async function CurrConvertrouteHandler(req, res) {
    logger.info('[oeAssignment9Sahil] Sending converted Value!');
    const object = new CurrencyConverter();
    object.ConvertCurrency(req.body.amount, req.body.baseCurrency, req.body.convertCurrency)
        .then(data => {
            logger.info(data);
            res.status(200).json({ ConvertedAmount: data, currencyType: req.body.convertCurrency })
        })
        .catch(err => {
            res.status(404).json(err);
        })
}

module.exports = CurrConvertrouteHandler;