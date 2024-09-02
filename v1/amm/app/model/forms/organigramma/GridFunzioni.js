/**
 * Created by luke on 19/08/21.
 */
Ext.define('amm.model.forms.organigramma.GridFunzioni', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'action', type: 'int',defaultValue:0},
        { name: 'isnew', type: 'int',defaultValue:1},
        { name: 'id', type: 'string',defaultValue:''},
        { name: 'funz', type: 'string',defaultValue:''},
        { name: 'valore', type: 'string',defaultValue:''},
        { name: 'locale'},
        { name: 'globale'}
    ]
});