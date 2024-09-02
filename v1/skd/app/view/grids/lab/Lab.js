/**
 * Created by fabrizio on 29/12/17.
 */
Ext.define('skd.view.grids.lab.Lab', {
    extend: 'skd.view.grids.Tabs',
    requires:[
        'skd.view.grids.lab.LabController',
        'skd.view.grids.lab.LabModel'
    ],
    viewModel:'lab',
    controller:'lab',
    title:Locale.t('skd.grids.lab.title'),
    iconCls:'fas fa-table'
});
