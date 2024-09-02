/**
 * Created by luca on 08/02/2018.
 */
Ext.define('home.model.widgets.wvoi.WindowTestata', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'portal.data.writer.Associations'
    ],
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        noCache: false,
        url: Backend.API_WIDGET + 'WVOI/Main.php',
        extraParams: {'_fn': 'dataDettaglio','coduser':'','datestart':'','dateend':''},
        appendId: false,
        reader: {
            type: 'json',
            rootProperty: 'data'},
        writer: {
            type: 'associations',
            writeAllFields: true
        }
    }
});