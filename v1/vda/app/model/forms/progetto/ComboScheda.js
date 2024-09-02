/**
 * Created by luca on 31/07/2017.
 */
Ext.define('vda.model.forms.progetto.ComboScheda', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string',defaultValue:''},
        {name: 'numero', type: 'string',defaultValue:''},
        {name: 'articolo', type: 'string',defaultValue:''},
        {name:'descrizione',type:'string',defaultValue: ''}
    ]
})