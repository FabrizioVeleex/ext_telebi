/**
 * Created by fabrizio on 11/02/21.
 */
Ext.define('nsm.view.start.Panel', {
    extend: 'portal.v1.view.main.start.Panel',

    requires: [
        'nsm.view.start.Controller',
        'nsm.view.start.Model'
    ],
    controller: 'start',
    viewModel: 'start'
});
