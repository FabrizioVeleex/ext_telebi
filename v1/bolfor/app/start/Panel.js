Ext.define('bolfor.start.Panel', {
    extend: 'portal.v1.view.main.start.Panel',

    requires: [
        'bolfor.start.Controller',
        'bolfor.start.Model'
    ],
    controller: 'start',
    viewModel: 'start'
});
