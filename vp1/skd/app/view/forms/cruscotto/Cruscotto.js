/**
 * Created by fabrizio on 29/12/17.
 */
Ext.define('skd.view.forms.cruscotto.Cruscotto', {
    extend: 'Ext.Container',
    requires:[
        'skd.view.forms.cruscotto.CruscottoModel',
        'skd.view.forms.cruscotto.CruscottoController',
        'Ext.layout.container.Fit'
    ],
    viewModel:'cruscotto',
    controller:'cruscotto',
    flex:1,
    layout:'fit',
    userCls:'goma-cruscotto',
    items: [
    ],
    listeners:{
        loadData:'onLoadData',
        removeData:'onRemoveData',
        setStatusApp:'onSetStatusApp'
    }
});