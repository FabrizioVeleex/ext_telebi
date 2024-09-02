/**
 * Created by fabrizio on 06/08/21.
 */
Ext.define('skd.store.forms.filtri.ComboReparto', {
    extend: 'Ext.data.Store',
    alias:'store.comboReparto',

    requires: [
        'Ext.data.proxy.Rest'
    ],
    fields: [
        {name: 'rep_cdl_department_no', type: 'string'},
        {name: 'io', type: 'string',defaultValue:'in'}
    ],
    proxy: {
        type: 'rest',
        url: Backend.REST_API + 'forms/filters/getcomboreparto/',
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
