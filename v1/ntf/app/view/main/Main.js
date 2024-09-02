Ext.define('ntf.view.main.Main', {
    extend: 'portal.v1.view.main.Main',
    xtype: 'app-main',
    requires: [
        'ntf.view.main.Controller',
        'ntf.view.main.Model'
    ],
    controller: 'main',
    viewModel: 'main',
    listeners: {
        afterrender: 'onAfterRender',
        runapertura:'onRunApertura',
        checkDati:'onCheckDati'
    }
});
