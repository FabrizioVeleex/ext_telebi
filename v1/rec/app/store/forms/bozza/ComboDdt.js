/**
 * Created by luke on 15/05/21.
 */
Ext.define('rec.store.forms.bozza.ComboDdt', {
    extend: 'Ext.data.Store',
    alias: 'store.v1-comboddt',
    requires: [
        'Ext.data.proxy.Rest',
        'rec.model.forms.bozza.ComboDdt'
    ],
    model:'rec.model.forms.bozza.ComboDdt',
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        url: Backend.REST_API + 'forms/bozza/comboddt/',
        extraParams: {cdcfs:'',cdars:''},
        appendId: false,
        reader: {
            type: 'json',
            rootProperty: 'data'},
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});