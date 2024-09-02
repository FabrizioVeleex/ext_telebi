/**
 * Created by fabrizio on 18/08/16.
 */
Ext.define('home.view.widgets.weti.Main', {
    extend: 'Ext.panel.Panel',
    requires: [
        'home.view.widgets.weti.MainController',
        'home.view.widgets.weti.MainModel',
        'Ext.layout.container.HBox'
    ],
    controller: 'widgetetichette',
    viewModel: 'widgetetichette',
    userCls: ' big-100 small-100',
    height: 150,
    bodyPadding: 5,
    bodyStyle: {
        'background-color': 'transparent'
    },
    style: 'background:transparent url(/images/white.png) repeat 0 50%;',
    reference: 'paneletichette',
    animation: !Ext.isIE9m && Ext.os.is.Desktop,
    layout: { type: "hbox", align: "stretch" },
    listeners: {
        afterRender: 'onAfterRender'
    }
});