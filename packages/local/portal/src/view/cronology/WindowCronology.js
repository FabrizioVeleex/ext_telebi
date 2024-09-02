/**
 * Created by luca on 22/06/16.
 */
Ext.define('portal.view.cronology.WindowCronology', {
    extend: 'Ext.window.Window',
    requires: [
        'Ext.button.Button',
        'Ext.layout.container.Fit',
        'portal.util.Locale',
        'portal.view.cronology.Cronology',
        'portal.view.cronology.CronologyController',
        'portal.view.cronology.CronologyModel'
    ],
    bodyPadding: 10,
    modal:true,
    width: 600,
    border:true,
    title: Locale.t('global.cronology'),
    iconCls: 'x-fa fa-history',
    closable: true,
    bodyStyle: {'background-color':'#ffffff'},
    resizable: false,
    draggable: false,
    layout:'fit',
    controller:'cronology',
    viewModel: 'cronology',
    dockedItems: [{
        xtype: 'toolbar', dock: 'top', items: [
            {xtype: 'button',
                text: Locale.t('global.btn.close.text'),
                iconCls: 'x-fa fa-times-circle',
                ui:'ocra',
                tooltip:Locale.t('global.btn.close.tooltip'),
                handler: 'onClose',
                reference: 'modclose'
            },
            {
                iconCls: 'x-fa fa-list',
                text: Locale.t('cronology.dettagliotext'),
                enableToggle: true,
                tooltip:Locale.t('cronology.dettagliotooltip'),
                pressed: false,
                toggleHandler:'onPress'
            }
        ]
    }],
    items: [
        {xtype: 'gridcronology',reference:'gridCron'}
    ],
    listeners:{
        render:'onRender'
    }
});