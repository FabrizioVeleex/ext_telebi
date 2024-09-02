Ext.define('websrv.view.main.Main', {
    extend: 'portal.v1.view.main.Main',
    xtype: 'app-main',
    requires: [
        'websrv.view.main.Controller',
        'websrv.view.main.Model'
    ],
    controller: 'main',
    viewModel: 'main',
    bodyStyle:{
        'background':'transparent'
    },
    listeners: {
        afterrender: 'onAfterRender',
        runapertura:'onRunApertura',
        checkDati:'onCheckDati'
    }
});
