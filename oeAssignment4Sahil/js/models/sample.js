import constants from 'ccConstants';
import rest from 'ccRestClient';

export default class dataObject {
    constructor(displayName, filePath, CollectionPath) {
        this.displayName = displayName;
        this.filePath = filePath;
        this.CollectionPath = CollectionPath;
    }
};