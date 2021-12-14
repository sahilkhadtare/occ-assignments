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

    beforeAppear() {
        document.getElementsByClassName("convertButton")[0].onclick = function() {
            var data = {
                "amount": 1,
                "baseCurrency": "USD",
                "convertCurrency": "INR"
            }
            let viewModel = [];
            $.ajax({
                url: "/ccstorex/custom/v1/currencyconvertersahil",
                type: "POST",
                contentType: "application/json",
                data: ko.toJSON(data),
                success: function(result) {
                    viewModel.push(result.ConvertedAmount);
                    viewModel.push(result.currencyType);
                    console.log(viewModel);
                },
                error: function(err) {
                    console.log(err);
                }
            });
        };


        console.log('[BEFORE APPEAR] Sample');
    }
}