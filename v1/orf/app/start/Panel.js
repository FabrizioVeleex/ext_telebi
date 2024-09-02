Ext.define('orf.start.Panel', {
    extend: 'portal.v1.view.main.start.Panel',

    requires: [
        'orf.start.Controller',
        'orf.start.Model'
    ],
    controller: 'start',
    viewModel: 'start'
})