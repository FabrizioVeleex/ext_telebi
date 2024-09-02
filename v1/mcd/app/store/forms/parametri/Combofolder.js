/**
 * Created by luca on 17/07/2018.
 */
Ext.define('mcd.store.forms.parametri.Combofolder', {
    extend: 'Ext.data.Store',
    alias:'store.v1-combofolder',
    requires:[
        'Ext.data.proxy.Rest',
        'mcd.model.forms.parametri.Combofolder'
    ],
    model:'mcd.model.forms.parametri.Combofolder',
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        url: Backend.REST_API + 'forms/parametri/combofolder/',
        extraParams: {'iduo':''},
        appendId: false,
        reader: {
            type: 'json',
            rootProperty: 'data'},
        writer: {
            type: 'json',
            writeAllFields: true
        }
    },
    listeners:{
        beforeload:'onbeforeload'
    }
});