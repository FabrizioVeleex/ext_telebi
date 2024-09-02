/**
 * Created by fabrizio on 11/02/21.
 */
Ext.define('nsm.model.grids.Jobs', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'nome', type: 'string'},
        {name: 'deescrizione', type: 'string'},
        {name: 'tipo', type: 'string'},
        {name: 'filejs', type: 'string'},
        {name: 'worker', type: 'string'},
        {name: 'enable', type: 'boolean'},
        {name: 'running', type: 'boolean'},
        {name: 'interval', type: 'string'},
        {name: 'timeout', type: 'string'},
        // {name: 'lastjob', type:'date',dateFormat :'Y-m-d H:i:s'},
        {name: 'startJob', type:'date',dateFormat :'Y-m-d H:i:s'},
        {name: 'stopJob', type:'date',dateFormat :'Y-m-d H:i:s'},
        ]
});