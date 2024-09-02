/**
 * Created by luca on 17/07/2018.
 * Modello store combo ordine fornitore
 */
Ext.define('bolfor.forms.bolla.modelform.ModelOrdine', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'string',defaultValue:''},
        { name: 'num_ord', type: 'string',defaultValue:''}
    ]
});