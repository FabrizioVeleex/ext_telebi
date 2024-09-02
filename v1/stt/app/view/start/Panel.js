Ext.define('stt.view.start.Panel', {
    extend: 'portal.v1.view.main.start.Panel',

    requires: [
        'stt.view.start.Controller',
        'stt.view.start.Model'
    ],
    controller: 'start',
    viewModel: 'start'
});
