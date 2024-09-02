/**
 * Created by fabrizio on 18/08/16.
 */
Ext.define('home.view.widgets.switchuo.Main', {
    extend: 'Ext.panel.Panel',
    requires: [
        'home.view.widgets.switchuo.MainController',
        'home.view.widgets.switchuo.MainModel',
        'Ext.layout.container.HBox'
    ],
    controller: 'v1-switchuo',
    viewModel: 'v1-switchuo',
    userCls: ' big-100 small-100',
    height: 50,
    bodyPadding: 5,
    bodyStyle: {
        'background-color': 'transparent'
    },
    style: 'background:transparent url(/images/white.png) repeat 0 50%;',
    reference: 'panelswitchuo',
    animation: !Ext.isIE9m && Ext.os.is.Desktop,
    layout: { type: "hbox", align: "stretch" },
    items: [
        {
            xtype: 'image',
            width: 151,
            src: '/logos/logo_45.png',
            alt: '&nbsp;'
        },
        {
            xtype: 'image',
            itemId: 'imgUser',
            width: 42,
            padding: 5,
            src: '/images/no-image.png',
            alt: Ext.global.Vars.infoUser.titolo + ' ' + Ext.global.Vars.infoUser.cognomenome
        }

    ],
    listeners: {
        afterRender: 'onAfterRender'
    }
});
