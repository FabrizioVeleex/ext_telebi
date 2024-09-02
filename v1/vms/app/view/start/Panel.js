Ext.define('vms.view.start.Panel', {
    extend: 'portal.v1.view.main.start.Panel',

    requires: [
        'vms.view.start.Controller',
        'vms.view.start.Model'
    ],
    controller: 'start',
    viewModel: 'start'
});
