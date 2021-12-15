/**
 * Core
 */
import { exportToViewModel } from 'occ-components/widget-core/decorators';
import { BaseWidget } from 'occ-components/widget-core';

/**
 * Libraries, Helpers
 */
import ko from 'knockout';

/**
 * Models
 */
import SampleModel from '../models/sample';

export class Sample extends BaseWidget {

    /**
     * On load view model
     */
    constructor() {
        //Constructing the BaseWidget
        super();

        console.log('[ONLOAD] - Sample');
    }
    @exportToViewModel AmountOutput = ko.observable("0.00");
    @exportToViewModel CurrencyOutput = ko.observable("");

    beforeAppear() {
        let widget = this.$data;
        document.getElementsByClassName("convertButton")[0].onclick = function() {
            let value1 = document.getElementById("baseCurrency").value;
            let value2 = document.getElementById("convertCurrency").value;
            var am = document.querySelector('#AmountNumber').value;
            if (value2 !== value1) {
                var data = {
                    "amount": am,
                    "baseCurrency": value1,
                    "convertCurrency": value2
                }
                $.ajax({
                    url: "/ccstorex/custom/v1/currencyconvertersahil",
                    type: "POST",
                    contentType: "application/json",
                    data: ko.toJSON(data),
                    success: function(result) {
                        widget.AmountOutput(result.ConvertedAmount);
                        widget.CurrencyOutput(result.currencyType);
                    },
                    error: function(err) {
                        console.log(err);
                    }
                });
            } else {
                console.log("You selected both base Currency and converted Currency are same");
                alert("You selected both base Currency and converted Currency are same.Please Change any one");
            }
        };
        console.log('[BEFORE APPEAR] Sample');
    }
}