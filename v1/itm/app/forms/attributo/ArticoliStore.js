/**
 * Created by luca on 16/02/2017.
 */
Ext.define('itm.forms.attributo.storeArticoli', {
    extend: 'Ext.data.Store',
    alias: 'store.v1-itm-forms-attributo-storearticoli',
    fields: [
        { name: 'descrizione', type: 'string' },
        { name: 'id', type: 'string' },
        { name: 'cd_art', type: 'string' },
    ],
    data: []
});