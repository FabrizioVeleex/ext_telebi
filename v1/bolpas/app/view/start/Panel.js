Ext.define('bolpas.view.start.Panel', {
    extend: 'portal.v1.view.main.start.Panel',

    requires: [
        'bolpas.view.start.Controller',
        'bolpas.view.start.Model'
    ],
    controller: 'start',
    viewModel: 'start'
})
