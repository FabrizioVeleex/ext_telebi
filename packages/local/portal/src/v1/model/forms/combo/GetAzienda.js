/**
 * Created by luke on 20/01/23.
 */
Ext.define('portal.v1.model.forms.combo.GetAzienda', {
    extend: 'Ext.data.Model',
    fields:[
        { name: 'id', type: 'string'},
        { name: 'codice', type: 'string'},
        { name: 'azienda', type: 'string'}
    ]
});