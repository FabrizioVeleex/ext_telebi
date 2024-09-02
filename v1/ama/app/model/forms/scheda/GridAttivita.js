/**
 * Created by luca on 28/09/2018.
 */
Ext.define('ama.model.forms.scheda.GridAttivita', {
    extend: 'Ext.data.Model',
    alias: 'model.gridattivita',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'numero', type: 'string'},
        {name: 'articolo', type: 'string'},
        {name: 'idrisorsa', type: 'string'},
        {name: 'risorsa', type: 'string'},
        {name: 'descrizione', type: 'string'},
        {name: 'note', type: 'string'},
        {name: 'step', type: 'int'},
        {name: 'stato', type: 'string'},
        {name: 'fine', type: 'date',dateFormat:'c',defaultValue:''},
        {name: 'chiusa', type: 'date',dateFormat:'c',defaultValue:''}
    ]
});