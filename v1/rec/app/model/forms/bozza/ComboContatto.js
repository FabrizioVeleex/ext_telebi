/**
 * Created by luke on 22/07/2020.
 */
Ext.define('rec.model.forms.bozza.ComboContatto', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'nominativo', type: 'string',defaultValue:''},
        { name: 'email', type: 'string',defaultValue:''},
        { name: 'utente', type: 'string',defaultValue:''}
    ]
})