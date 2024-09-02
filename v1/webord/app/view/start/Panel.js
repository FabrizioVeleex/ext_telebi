Ext.define('webord.view.start.Panel', {
    extend: 'portal.v1.view.main.start.Panel',

    requires: [
        'webord.view.start.Controller',
        'webord.view.start.Model'
    ],
    controller: 'start',
    viewModel: 'start'
});
