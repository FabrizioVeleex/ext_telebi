Ext.define('gnc.view.start.Panel', {
    extend: 'portal.v1.view.main.start.Panel',

    requires: [
        'gnc.view.start.Controller',
        'gnc.view.start.Model'
    ],
    controller: 'start',
    viewModel: 'start'
});
