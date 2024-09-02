/**
 * Created by fabrizio on 15/03/17.
 */
Ext.define('recpub.model.form.ComboCausali', {
    extend: 'Ext.data.Model',
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