/**
 * Created by fabrizio on 08/10/2022.
 */
Ext.define('spl.start.Panel', {
    extend: 'portal.v1.view.main.start.Panel',

    requires: [
        'spl.start.Controller',
        'spl.start.Model'
    ],
    controller: 'start',
    viewModel: 'start'
});
