/**
 * Created by fabrizio on 06/08/21.
 */
Ext.define('skd.store.forms.filtri.ComboCdl', {
    extend: 'Ext.data.Store',
    alias:'store.comboCdl',

    requires: [
        'Ext.data.proxy.Rest'
    ],
    fields: [
        {name: 'ope_work_center_no', type: 'string'},
        {name: 'rep_cdl_wc_des', type: 'string'},
        {name: 'io', type: 'string',defaultValue:'in'}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/filters/getcombocdl/',
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
