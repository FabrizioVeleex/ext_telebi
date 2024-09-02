/**
 * Created by fabrizio on 12/03/18.
 */
Ext.define('skd.view.forms.pick.dettaglio.panel.filtri.StoreComboComponent', {
    extend: 'Ext.data.Store',
    alias: 'store.comboComponentpick',

    requires: [
        'Ext.data.proxy.Rest'
    ],
    fields: [
        { name: 'part_no', type: 'string' }
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/pick/getcombocomponent',
        appendId: false,
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }

});
