/**
 * Created by fabrizio on 21/07/21.
 */
Ext.define('home.view.dashboard.widgets.switchuo.Main', {
    extend: 'Ext.panel.Panel',
    requires: [
        'home.view.dashboard.widgets.switchuo.Controller',
        'home.view.dashboard.widgets.switchuo.Model',
        'Ext.layout.container.HBox'
    ],
    xtype: 'switchuo',
    cls: 'app-header',
    controller: 'v11-switchuo',
    viewModel: 'v11-switchuo',
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
