/**
 * Created by fabrizio on 27/02/17.
 */
Ext.define('ama.model.forms.scheda.ComboProdotto', {
    extend: 'Ext.data.Model',
    fields:[
        { name: 'id', type: 'string',defaultValue:''},
        { name: 'cdcom1', type: 'string',defaultValue:''},
        { name: 'depar', type: 'string',defaultValue:''}
    ]
})