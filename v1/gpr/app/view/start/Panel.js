Ext.define('gpr.view.start.Panel', {
    extend: 'portal.v1.view.main.start.Panel',

    requires: [
        'gpr.view.start.Controller',
        'gpr.view.start.Model'
    ],
    controller: 'start',
    viewModel: 'start'
});
