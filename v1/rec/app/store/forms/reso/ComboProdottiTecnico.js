/**
 * Created by fabrizio on 25/02/17.
 */
Ext.define('rec.store.forms.reso.ComboProdottiTecnico', {
    extend: 'Ext.data.Store',
    alias: 'store.v1-comboprodottitecnico',
    requires:[
        'Ext.data.proxy.Rest',
        'rec.model.forms.bozza.ComboProdotti'
    ],
    model:'rec.model.forms.bozza.ComboProdotti',
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        url: Backend.REST_API + 'forms/reso/comboarticolotecnico/',
        extraParams: {cdcfs:''},
        appendId: false,
        reader: {
            type: 'json',
            rootProperty: 'data'},
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
})