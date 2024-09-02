Ext.define('dip.view.main.Main', {
    extend: 'portal.v1.view.main.Main',
    xtype: 'app-main',
    requires: [
        'dip.view.main.Controller',
        'dip.view.main.Model'
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
