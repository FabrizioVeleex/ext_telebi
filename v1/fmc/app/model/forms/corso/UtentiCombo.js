/**
 * Created by luke on 10/10/2019.
 */
Ext.define('fmc.model.forms.corso.UtentiCombo', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'iduser', type: 'string'},
        {name: 'nomecognome', type: 'string'},
        {name: 'firma', type: 'string'},
        {name: 'iddoc', type: 'string'},
        {name: 'isnew', defaultValue:0},
        {name: 'action', defaultValue:0}
    ]
});