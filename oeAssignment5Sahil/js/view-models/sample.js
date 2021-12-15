/**
 * Core
 */
import { exportToViewModel } from 'occ-components/widget-core/decorators';
import { BaseWidget } from 'occ-components/widget-core';

/**
 * Libraries, Helpers
 */
import ko from 'knockout';
import ccRestClient from 'ccRestClient';
import ccConstants from 'ccConstants';
/**
/**
 * Models
 */
import dataObject from '../models/sample';

export class Sample extends BaseWidget {

    /**
     * On load view model
     */
    constructor() {
        //Constructing the BaseWidget
        super();

        console.log('[ONLOAD] - Sample');
    }

    @exportToViewModel dataArray = ko.observableArray([]);
    @exportToViewModel gotoCollectionpage(path) {
        window.open(path, '_blank');
    }
    beforeAppear() {

        let data = {};
        let widget = this.$data;
        data[ccConstants.CATEGORY_IDS] = this.$data.collectionItem();
        ccRestClient.request(
            ccConstants.ENDPOINT_LIST_COLLECTIONS,
            data,
            (response) => {
                response.map(data => {
                    widget.dataArray.push(new dataObject(data.displayName, `/file${data.categoryImages[0].path}`, data.route))

                });
            },
            (error) => { console.log("Im error", error) }
        );
        console.log('[BEFORE APPEAR] Sample');

    }


}