/**
 * Created by fabrizio on 29/12/17.
 */
Ext.define('skd.view.grids.operatore.Operatore', {
    extend: 'skd.view.grids.Tabs',
    requires:[
        'skd.view.grids.operatore.OperatoreController',
        'skd.view.grids.operatore.OperatoreModel'
    ],
    viewModel:'operatore',
    controller:'operatore',
    title:Locale.t('skd.grids.operatore.title'),
    iconCls:'fas fa-table'
});
