Ext.define('impexp.view.start.Panel', {
    extend: 'portal.v1.view.main.start.Panel',

    requires: [
        'impexp.view.start.Controller',
        'impexp.view.start.Model'
    ],
    controller: 'start',
    viewModel: 'start'
});
