/**
 * Created by fabrizio on 27/02/17.
 */
Ext.define('recpub.model.form.ComboDdt', {
    extend: 'Ext.data.Model',
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