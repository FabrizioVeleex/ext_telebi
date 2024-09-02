/**
 * Created by luke on 30/08/21.
 */
Ext.define('home.view.dashboard.widgets.wcon.model.ModelDettaglio', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json'
    ],
    fields: [
        { name :'dataagg'},
        { name :'pagamento',defaultValue:'-'},
        { name :'totesp',defaultValue:'-'},
        { name :'totsca',defaultValue:'-'},
        { name :'fido',defaultValue:'-'},
        { name: 'store' }
    ],
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_VERSION + 'widgets/wcon/getdettaglio',
        extraParams: {cdcli:''},
        reader: {type: 'json', rootProperty: 'data'}
    }
});