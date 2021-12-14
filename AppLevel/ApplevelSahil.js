import ko from 'knockout';
import ccLogger from 'ccLogger';
import navigation from 'navigation';
import pubsub from 'pubsub';


export default {
    onLoad() {
        ccLogger.info("[OE][KO Binding Handler] Loading ApplevelSahil");
    },
    convertCurrency: function(widget, data) {
        $.ajax({
            url: "/ccstorex/custom/v1/currencyconvertersahil",
            type: "POST",
            contentType: "application/json",
            data: ko.toJSON(data),
            success: function(result) {
                console.log(result)
                widget.AmountOutput(result.ConvertedAmount);
                widget.CurrencyOutput(result.currencyType);
            },
            error: function(err) {
                console.log(err);
            }
        });
    }
}