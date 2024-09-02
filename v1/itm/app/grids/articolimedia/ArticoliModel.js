/**
 * Created by luca on 27/10/2017.
 */
Ext.define('itm.grids.articolimedia.ArticoliModel', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.itm-v1-model.articolimedia',
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
        { name: 'dateupdate', type: 'date', dateFormat: 'c' }
    ]
});