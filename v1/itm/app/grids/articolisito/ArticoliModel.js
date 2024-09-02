/**
 * Created by luca on 27/10/2017.
 */
Ext.define('itm.grids.articolisito.ArticoliModel', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.itm-v1-model.articolisito',
    fields: [
        { name: 'id', type: 'string' },
        { name: 'cd_art', type: 'string' },
        { name: 'descrizione', type: 'string' },
        { name: 'descr_clm', type: 'string' },
        { name: 'descr_fam', type: 'string' },
        { name: 'descr_gruppo', type: 'string' },
        { name: 'pubblica_sito', type: 'number' },
        { name: 'id_padre', type: 'string' },
        { name: 'descr_sottogruppo', type: 'string' },
        { name: 'dateupdate', type: 'date', dateFormat: 'c' },
        { name: 'storeAttributi', type: 'auto' },
        { name: 'descrizione_estesa', type: 'string', defaultValue: '' },
        { name: 'creationdate', type: 'date', dateFormat: 'c' }
    ]
});