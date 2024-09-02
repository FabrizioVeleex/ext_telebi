/**
 * Created by fabrizio on 25/02/17.
 */
Ext.define('recpub.model.form.newReso', {
    extend: 'Ext.data.Model',
    alias:'model-newreso-old',
    fields: [],
    proxy: {
        type: 'rest',
        url: Backend.API_ADDRESS + 'Main.php',
        extraParams: {_fn: 'loadNewOLD'},
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