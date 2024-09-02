/**
 * Created by luke on 10/10/2019.
 */
Ext.define('fmc.model.forms.verifica.GridNominativi', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'idutente', type: 'string'},
        {name: 'idrecord', type: 'string'},
        {name: 'nomecognome', type: 'string'},
        {name: 'firma', type: 'string'}
    ]
});