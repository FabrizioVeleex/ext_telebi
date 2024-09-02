/**
 * Created by fabrizio on 29/12/17.
 */
Ext.define('skd.view.grids.partnum.Partnum', {
    extend: 'skd.view.grids.Tabs',
    requires:[
        'skd.view.grids.partnum.PartnumController',
        'skd.view.grids.partnum.PartnumModel'
    ],
    viewModel:'partnum',
    controller:'partnum',
    title:Locale.t('skd.grids.partnum.title'),
    iconCls:'fas fa-table'
});
