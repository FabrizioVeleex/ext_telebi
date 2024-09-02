/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.wort.model.Chart', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json'
    ],

    fields: [
        { name: 'CDARR'},
        { name: 'TOT',defaultValue:0}
    ],
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_VERSION + 'widgets/wort/getchart',
        extraParams: {q:''},
        reader: {type: 'json', rootProperty: 'data'}
    }
});
