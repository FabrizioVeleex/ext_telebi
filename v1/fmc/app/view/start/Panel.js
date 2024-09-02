Ext.define('fmc.view.start.Panel', {
    extend: 'portal.v1.view.main.start.Panel',

    requires: [
        'fmc.view.start.Controller',
        'fmc.view.start.Model'
    ],
    controller: 'start',
    viewModel: 'start'
});
