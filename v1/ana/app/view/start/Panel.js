Ext.define('ana.view.start.Panel', {
    extend: 'portal.v1.view.main.start.Panel',

    requires: [
        'ana.view.start.Controller',
        'ana.view.start.Model'
    ],
    controller: 'start',
    viewModel: 'start'
});
