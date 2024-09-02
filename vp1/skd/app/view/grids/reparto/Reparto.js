/**
 * Created by fabrizio on 29/12/17.
 */
Ext.define('skd.view.grids.reparto.Reparto', {
    extend: 'skd.view.grids.Tabs',
    requires:[
        'skd.view.grids.reparto.RepartoController',
        'skd.view.grids.reparto.RepartoModel'
    ],
    viewModel:'reparto',
    controller:'reparto',
    title:Locale.t('skd.grids.reparto.title'),
    iconCls:'fas fa-table'
});
