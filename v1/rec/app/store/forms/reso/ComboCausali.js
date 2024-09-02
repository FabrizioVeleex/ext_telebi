/**
 * Created by luke on 15/05/21.
 */
Ext.define('rec.store.forms.reso.ComboCausali', {
    extend: 'Ext.data.Store',
    alias: 'store.v1-combocausaliall',
    requires: [
        'Ext.data.proxy.Rest',
        'rec.model.forms.bozza.ComboCausali'
    ],
    model:'rec.model.forms.bozza.ComboCausali',
    sorters: { property: 'psdesc', direction: 'ASC' },
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        url: Backend.REST_API + 'forms/reso/combocausale/',
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