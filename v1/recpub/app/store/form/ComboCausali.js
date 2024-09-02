/**
 * Created by fabrizio on 25/02/17.
 */
Ext.define('recpub.store.form.ComboCausali', {
    extend: 'Ext.data.Store',
    alias: 'store.comboStoreCausali',
    sorters: [{
        property: 'psdesc',
        direction: 'ASC'
    }],
    fields:[
        'giorni','pscaus','psdesc'
    ],
    proxy: {
        type: 'rest',
        url: Backend.API_ADDRESS + 'Main.php',
        extraParams: {_fn: 'loadCausali'},
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