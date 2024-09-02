/**
 * Created by fabrizio on 02/01/18.
 */
Ext.define('skd.view.forms.pick.dettaglio.Panel', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.layout.container.Card',
        'skd.view.forms.pick.dettaglio.Controller',
        'skd.view.forms.pick.dettaglio.ViewModel'
    ],
    viewModel: 'dettagliopick',
    controller: 'dettagliopick',
    layout: {
        type: 'card'
    },
    listeners: {
        firstRender: 'onAfterRender',
        activate: 'onActivate',
        statusApp: 'onStatusApp',
        showFiltri: 'showFiltri',
        updPreparata: 'onUpdPreparata',
        changeOrdinamento: 'onChangeOrdinamento',
        loadGrid: 'onLoadGrid'
    }
});
