Ext.define('portal.model.cronology.Cronology', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'string' },
        { name: 'nomecognome', type: 'string' },
        { name: 'log', type: 'string' },
        { name: 'note', type: 'string' },
        {type:'date',dateFormat :'Y-m-d H:i:s',name:'datelog'}
    ]
});