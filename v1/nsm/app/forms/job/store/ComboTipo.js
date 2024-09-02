Ext.define('nsm.store.forms.job.ComboTipo', {
    extend: 'Ext.data.Store',
    alias:'store.v1-combotipo',
    fields:[
        'id','tipo'
    ],
    data:[
        {id:'cron',tipo:'Cron'},
        {id:'job',tipo:'Job'}
    ]
});