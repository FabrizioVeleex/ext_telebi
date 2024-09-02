/**
 * Created by luca on 27/10/2017.
 */
Ext.define('itm.grids.articolilength.articoliLengthModel', {
    extend: 'Ext.data.Model',
    // alias: 'viewmodel.itm-v1-model.articolilength',
    fields: [
        { name: 'id', type: 'string' },
        { name: 'cd_art', type: 'string' },
        { name: 'descrizione', type: 'string' },
        { name: 'length_descrizione_estesa', type: 'number' },
        { name: 'pubblica_sito', type: 'number' },
        { name: 'id_padre', type: 'string' },
        { name: 'dateupdate', type: 'date', dateFormat: 'c' }
    ]
});