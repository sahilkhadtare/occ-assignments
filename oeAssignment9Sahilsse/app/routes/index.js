module.exports = async app => {
    app.post('/v1/currencyconvertersahil', require('./currencyhandler'));
};