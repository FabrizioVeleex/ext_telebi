/**
 * Created by fabrizio on 06/08/21.
 */
Ext.define('skd.view.forms.footer.Panel', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.field.ComboBox',
        'Ext.layout.container.HBox',
        'skd.view.forms.footer.Controller',
        'skd.view.forms.footer.Model'
    ],
    viewModel:'console',
    controller:'console',
    userCls:'main-footer',
    layout: {
        type: 'hbox',
        align: 'middle'
    },
    defaults:{
        padding:5
    },
    items: [
        {
            xtype:'image',
            autoEl: 'div',
            bind:{
                userCls:'{checkConnection}'
            }
        },
        {
            xtype:'container',
            bind:{
                html:'{msgConnection}'
            }
        },
        {
            xtype: 'combo',
            minChars:2,
            minWidth:100,
            width:250,
            queryMode: 'remote',
            displayField: 'name',
            valueField: 'id',
            labelAlign:'right',
            fieldLabel: Locale.t('skd.forms.footer.connection.label'),
            forceSelection:true,
            autoLoadOnValue:true,
            bind: {
                disabled:'{disabledUser}',
                store: '{storeComboConnections}',
                value: '{connection}'
            },
            listeners: {
                select :'onSelectConnection',
                beforequery: function (qe) {
                    delete qe.combo.lastQuery;
                }
            }
        },
        {
            xtype:'toolbar',
            items:[
                {
                    xtype:'button',
                    iconCls:'fas fa-cog',
                    tooltip:Locale.t('skd.top.btn.setting.tooltip'),
                    handler:'onCreateFormSetting',
                    bind: {
                        disabled:'{disabledUser}'
                    }
                }
            ]
        }
    ],
    listeners:{
        afterRender:'onAfterRender'
    }
});
