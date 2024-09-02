Ext.define('cde.view.start.Panel', {
    extend: 'portal.v1.view.main.start.Panel',

    requires: [
        'cde.view.start.Controller',
        'cde.view.start.Model'
    ],
    controller: 'start',
    viewModel: 'start'
});
