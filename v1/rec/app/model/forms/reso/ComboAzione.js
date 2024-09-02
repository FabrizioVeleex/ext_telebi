/**
 * Created by luke on 22/07/2020.
 */
Ext.define('rec.model.forms.reso.ComboAzione', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'string',defaultValue:''},
        { name: 'valore', type: 'string',defaultValue:''},
        { name: 'azione', type: 'string',defaultValue:''}
    ]
})