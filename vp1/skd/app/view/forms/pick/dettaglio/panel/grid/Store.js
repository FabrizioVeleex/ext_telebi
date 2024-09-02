/**
 * Created by fabrizio on 30/01/18.
 */
Ext.define('skd.view.forms.pick.dettaglio.panel.grid.Store', {
    extend: 'Ext.data.Store',
    alias: 'store.v1-form-pich-pick',
    requires: [
        'Ext.data.proxy.Rest',
        'skd.view.forms.pick.dettaglio.panel.grid.Model'
    ],
    model: 'skd.view.forms.pick.dettaglio.panel.grid.Model',
    groupField: 'ord_prod',
    autoLoad: false,
    remoteGroup: false,
    remoteSort: false,
    remoteFilter: false,
    proxy: {
        type: 'rest',
        simpleSortMode: true,
        url: Backend.REST_API + 'forms/pick/getstore/',
        extraParams: { _fn: 'store' },
        reader: { type: 'json', rootProperty: 'data', totalProperty: 'totalCount' },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    },
    listeners: {
        beforeload: function (store) {
            if (store.isLoading()) return false;
        }
    }
});
