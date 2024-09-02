Ext.define('vda.view.start.Panel', {
    extend: 'portal.v1.view.main.start.Panel',

    requires: [
        'vda.view.start.Controller',
        'vda.view.start.Model'
    ],
    controller: 'start',
    viewModel: 'start'
});
