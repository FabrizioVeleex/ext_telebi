/**
 * Created by luke on 19/08/21.
 */
Ext.define('amm.model.forms.modulo.GridRuoli', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'action', type: 'int',defaultValue:0},
        { name: 'isnew', type: 'int',defaultValue:1},
        { name: 'id', type: 'string',defaultValue:''},
        { name: 'idmodulo', type: 'string',defaultValue:''},
        { name: 'ruolo', type: 'string',defaultValue:''},
        { name: 'descrizione', type: 'string',defaultValue:''},
        { name: 'valore', type: 'string',defaultValue:''}
    ]
});