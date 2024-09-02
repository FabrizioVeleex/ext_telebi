/**
 * Created by luca on 17/08/16.
 */
Ext.define('nsm.model.forms.job.gridLog', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.job.v1-gridjob',
    fields: [
        {name: 'idJob', type: 'string'},
        {name: 'idDay', type: 'string'},
        {name: 'idTime', type: 'string'},
        {name: 'esito', type: 'number'},
        {name: 'startJob', type:'date',dateFormat :'Y-m-d H:i:s'},
        {name: 'stopJob', type:'date',dateFormat :'Y-m-d H:i:s'},
    ]
});