/**
 * Created by luke on 28/06/21.
 */
Ext.define('bolpas.model.forms.bolla.Comboscheda', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', type: 'string',defaultValue:''},
        { name: 'numero', type: 'string',defaultValue:''},
        { name: 'descrizione', type: 'string',defaultValue:''}
    ]
});