/**
 * Created by luke on 23/06/21.
 */
Ext.define('bolpas.model.forms.bolla.Gridresi', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'action', type: 'int',defaultValue:0},
        { name: 'isnew', type: 'int',defaultValue:1},
        { name: 'id', type: 'string',defaultValue:''},
        { name: 'idrecord', type: 'string',defaultValue:''},
        { name: 'idreso', type: 'string',defaultValue:''},
        { name: 'nreso', type: 'string',defaultValue:''},
        { name: 'dreso', type: 'string',defaultValue:''}
    ]
});