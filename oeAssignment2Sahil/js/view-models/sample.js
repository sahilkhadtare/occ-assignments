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
        var imageName = ["trailer.png", "lightTruck.png", "mobile.png", "lawnGarden.png", "farmIndustrial.png", "golfCart.png", "atv_utv.png", "wheels_accessories.png"]
        var images = document.getElementsByClassName("greenball_product_card");
        for (let i = 0; i < images.length; i++) {
            var image = images[i];
            image.onclick = function(event) {
                window.open(`https://asbx50c1dev-store.occa.ocs.oraclecloud.com/file/collections/${imageName[i]}`);
            };
        }

        console.log('[BEFORE APPEAR] Sample');
    }
}