/**
 * Created by fabrizio on 05/08/21.
 */
Ext.define('skd.view.forms.setting.dashboard.cards.Dashboard', {
    extend: 'Ext.form.Panel',
    requires:[
        'Ext.form.FieldSet',
        'Ext.container.Container',
        'Ext.layout.container.HBox',
        'Ext.button.Button'
    ],
    scrollable: 'y',
    bodyPadding:'0 15',
    defaults: {
        msgTarget: 'under',
        labelAlign: 'top'
    },
    items: [
        {
            xtype: 'fieldset',
            title: Locale.t('skd.forms.cards.dashboard.sync.title'),
            cls: 'sts-fieldset-background-color',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items:[
                {
                    xtype:'container',
                    padding:15,
                    bind:{
                        html:'{formSyncDb}'
                    }
                },
                {
                    xtype:'container',
                    padding:15,
                    html:Locale.t('skd.forms.cards.dashboard.sync.stato.info')
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: Locale.t('skd.forms.cards.dashboard.syncall.title'),
            cls: 'sts-fieldset-background-color',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items:[
                {
                    xtype:'button',
                    iconCls:'fas fa-sync',
                    disabled: true,
                    text:Locale.t('skd.forms.cards.dashboard.syncall.btn.start'),
                    padding:15,
                    handler:'onBntSyncAll',
                    bind:{
                        disabled:'{syncDbAll}'
                    }
                },
                {
                    xtype:'container',
                    padding:15,
                    bind:{
                        html:'{formSyncDbAll}'
                    }
                }
            ]
        }
    ]
});
