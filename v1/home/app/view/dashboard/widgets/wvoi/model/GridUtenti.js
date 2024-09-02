/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wvoi.model.GridUtenti', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json'
    ],
    fields: [
        {name: 'action',defaultValue:0},
        {name: 'isnew',defaultValue:0},
        { name :'codice',defaultValue:''},
        { name :'nome',defaultValue:''},
        { name :'cognome',defaultValue:''},
        { name :'badge',defaultValue:''}
    ],
    autoLoad: true,
    proxy: {
        simpleSortMode:true,
        type: 'rest',
        url: Backend.API_WIDGET + 'WVOI/Main.php',
        extraParams: {'_fn': 'dataUtenti'},
        reader: {type: 'json', rootProperty: 'data',totalProperty:'totalCount'}
    }
});
