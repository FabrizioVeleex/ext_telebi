/**
 * Created by luke on 15/02/21.
 */
Ext.define('portal.v1.model.forms.combo.GetLocalita', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'string'},
        { name: 'cap', type: 'string'},
        { name: 'comune', type: 'string'},
        { name: 'regione', type: 'string'},
        { name: 'provincia', type: 'string'}
    ]
});