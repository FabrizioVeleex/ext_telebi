/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.watt.model.GridStore', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json'
    ],
    fields: [
        'id','titolo','dinizio','dfine','avanzamento','percentuale','ritardo'
    ],
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_VERSION + 'widgets/watt/getstore',
        extraParams: {},
        reader: {type: 'json', rootProperty: 'data'}
    }
});
