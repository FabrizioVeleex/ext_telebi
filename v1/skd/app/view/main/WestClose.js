/**
 * Created by fabrizio on 30/09/17.
 */
Ext.define('skd.view.main.WestClose', {
    extend: 'Ext.panel.Panel',
    requires:[
        'Ext.button.Button',
        'Ext.container.Container'
    ],
    resizable: false,
    border:true,
    floatable: false,
    width: 42,
    items:[
        {
            xtype: 'component',
            html: '<img class="logo-nav-close" src="/images/azienda/logo_32.png" alt="&nbsp;">'
        },
        {
            xtype: 'component',
            html: '<img class="logo-nav-close" src="/images/32/SKD.png" alt="&nbsp;">'
        },
        {
            xtype:'toolbar',
            padding:3,
            items:[
                {
                    xtype:'button',
                    tooltip:Locale.t('global.showmenu'),
                    iconCls:'fas fa-caret-square-right bd-color-green',
                    action:false,
                    handler:'onToggleNav'
                }
            ]
        },
        {
            xtype:'toolbar',
            padding:3,
            items:[
                {
                    iconCls:'fas fa-window-close bd-color-red',
                    tooltip:Locale.t('global.closeapp'),
                    handler:'onCloseApp'
                }
            ]
        },
        {
            xtype: 'container',
            html: '<div class="text-nav-rotate">'+Locale.t('skd.apptitle')+'</div>'
        }
    ]
});
