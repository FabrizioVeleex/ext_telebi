
Ext.define('pak.start.Panel', {
    extend: 'portal.v1.view.main.start.Panel',

    requires: [
        'pak.start.Controller',
        'pak.start.Model'
    ],
    controller: 'start',
    viewModel: 'start'
});
