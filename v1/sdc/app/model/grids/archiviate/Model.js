/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('sdc.model.grids.archiviate.Model', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'datestop',type: 'date',dateFormat: 'Y-m-d'},
        {name: 'creationdate',type: 'date',dateFormat: 'Y-m-d'},
        {name: 'nomecognome', type: 'string'},
        {name: 'subject', type: 'string'}
    ]
});