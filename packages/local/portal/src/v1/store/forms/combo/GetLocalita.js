/**
 * Created by luke on 15/02/21.
 * Combo per recuperare soggetti clienti/fornitori
 */
Ext.define('portal.v1.store.forms.combo.GetLocalita', {
    extend: 'Ext.data.Store',
    alias:'store.v1-getlocalita',
    requires:[
        'Ext.data.proxy.Rest',
        'portal.v1.model.forms.combo.GetLocalita'
    ],
    model:'portal.v1.model.forms.combo.GetLocalita',
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        url: Backend.REST_API + 'getlocalita/',
        extraParams:{tiposoggetto:''},
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        }
    }
});