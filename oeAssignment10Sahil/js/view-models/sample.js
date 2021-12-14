/**
 * Core
 */
import { exportToViewModel } from 'occ-components/widget-core/decorators';
import { BaseWidget } from 'occ-components/widget-core';

/**
 * Libraries, Helpers
 */
import ko from 'knockout';
import appLevel from 'ccResourceLoader!global/oeCore';

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
            console.log(am)
            console.log(value1)
            console.log(value2)
            var data = {
                "amount": am,
                "baseCurrency": value1,
                "convertCurrency": value2
            }
            appLevel.ApplevelSahil.convertCurrency(widget, data);
        };
        console.log('[BEFORE APPEAR] Sample');
    }
}