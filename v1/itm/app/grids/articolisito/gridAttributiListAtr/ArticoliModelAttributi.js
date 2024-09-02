/**
 * Created by fabrizio on 17/03/2023.
 */
Ext.define('itm.grids.articolisito.gridAttributi.ArticoliModelAttributiListAtr', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'string', defaultValue: '' },
        { name: 'recordDup', type: 'boolean', defaultValue: false },
        { name: 'id_art', type: 'string', defaultValue: '' },
        { name: 'id_atr', type: 'string', defaultValue: '' },
        { name: 'valore', type: 'string', defaultValue: '' },
        { name: 'attributo', type: 'string', defaultValue: '' },
        { name: 'isCopy', type: 'boolean', defaultValue: false },

    ]
});