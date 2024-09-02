Ext.define('stres.view.start.Panel', {
    extend: 'portal.v1.view.main.start.Panel',

    requires: [
        'stres.view.start.Controller',
        'stres.view.start.Model'
    ],
    controller: 'start',
    viewModel: 'start'
});
