Ext.define('doc.start.Panel', {
    extend: 'portal.v1.view.main.start.Panel',

    requires: [
        'doc.start.Controller',
        'doc.start.ViewModel'
    ],
    controller: 'start',
    viewModel: 'start'
});
