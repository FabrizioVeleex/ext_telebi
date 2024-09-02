/**
 * Created by fabrizio on 29/12/17.
 */
Ext.define('skd.view.grids.cdl.Cdl', {
    extend: 'skd.view.grids.Tabs',
    requires:[
      'skd.view.grids.cdl.CdlController',
      'skd.view.grids.cdl.CdlModel'
    ],
    controller:'cdl',
    viewModel:'cdl',
    layout:'fit',
    title:Locale.t('skd.grids.cdl.title'),
    iconCls:'fas fa-ship'
});
