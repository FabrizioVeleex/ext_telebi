/**
 * Created by luke on 19/08/21.
 */
Ext.define('amm.model.forms.modulo.GridAutorizzazioni', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'action', type: 'int',defaultValue:0},
        { name: 'isnew', type: 'int',defaultValue:1},
        { name: 'id', type: 'string',defaultValue:''},
        { name: 'idmodulo', type: 'string',defaultValue:''},
        { name: 'accesso', type: 'string',defaultValue:''},
        { name: 'tipoaccesso', type: 'string',defaultValue:''},
        { name: 'ruoli', type: 'auto'}
    ]
});