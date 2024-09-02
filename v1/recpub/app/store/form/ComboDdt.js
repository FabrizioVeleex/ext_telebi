/**
 * Created by fabrizio on 25/02/17.
 */
Ext.define('recpub.store.form.ComboDdt', {
    extend: 'Ext.data.Store',
    alias: 'store.comboStoreDdt',
    sorters: [{
        property: 'dtbos',
        direction: 'ASC'
    }],
    fields:[
        'nrbos','descr','dtbos','id'
    ],
    proxy: {
        type: 'rest',
        url: Backend.API_ADDRESS + 'Main.php',
        extraParams: {_fn: 'loadDdt'},
        appendId:false,
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