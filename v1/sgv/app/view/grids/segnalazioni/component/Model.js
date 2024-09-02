/**
 * Created by luke on 2019-02-12.
 */
Ext.define('sgv.view.grids.segnalazioni.component.Model', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.segnalazioni',

    fields: [
        {name: 'id', type: 'string'},
        {name: 'anno', type: 'int'},
        {name: 'daradoc',type: 'date',dateFormat: 'Y-m-d'},
        {name: 'richiedente', type: 'string'},
        {name: 'filiale', type: 'string'},
        {name: 'nominativo', type: 'string'},
        {name: 'violazione', type: 'string'},
        {name: 'importo', type: 'float'},
        {name: 'conflitto', type: 'string'}
    ]
});