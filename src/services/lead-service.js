import { utilService } from './util-service.js';
import { storageService } from './async-storage-service.js';

const leadsDB = require('@/assets/db.json');

const KEY = 'leadsDB';
const gLeads = _createLeads();
utilService.saveToStorage(KEY, gLeads);

export const leadService = {
    query,
    save,
};

function query() {
    return storageService.query(KEY);
}

function save(updatedLeads) {
    utilService.saveToStorage(KEY, updatedLeads);
}

function _createLeads() {
    let leads = utilService.loadFromStorage(KEY);
    if (!leads || !leads.length) leads = leadsDB;
    return leads;
}
