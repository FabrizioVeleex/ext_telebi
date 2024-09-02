Ext.define('sdc.view.main.Main', {
    extend: 'portal.v1.view.main.Main',
    xtype: 'app-main',
    requires: [
        'sdc.view.main.Controller',
        'sdc.view.main.Model'
    ],
    controller: 'main',
    viewModel: 'main',
    listeners: {
        afterrender: 'onAfterRender',
        runapertura:'onRunApertura',
        checkDati:'onCheckDati'
    }
});
