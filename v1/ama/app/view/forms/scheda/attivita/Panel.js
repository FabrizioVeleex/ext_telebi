/**
 * Created by luke on 22/09/21.
 */
Ext.define('ama.view.forms.scheda.attivita.Panel', {
    extend: 'Ext.form.Panel',
    requires:[
        'Ext.container.Container',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.layout.container.HBox',
        'ama.view.forms.scheda.attivita.Controller',
        'ama.view.forms.scheda.attivita.Model'
    ],
    controller:'v1-attivita',
    viewModel:'v1-attivita',
    scrollable:true,
    dockedItems: [{
        xtype: 'toolbar', dock: 'top',
        items: [
            {text:  Locale.t('global.btn.close.text'),
                handler: 'onCloseAttivita'
            },
            {text:  Locale.t('ama.forms.scheda.attivita.salva'), ui: 'green', iconCls: 'fas fa-check',
                handler: 'onSaveAttivita',
                bind:{hidden:'{readOnlyAttivita}'}
            },
            {text:  Locale.t('ama.forms.scheda.attivita.salvauser'), ui: 'green', iconCls: 'fas fa-check',
                handler: 'onSaveUser',
                bind:{hidden:'{readOnlyNote}'}
            },
            {text:  Locale.t('ama.forms.scheda.attivita.completa'), ui: 'blue', iconCls: 'fas fa-check',
                handler: 'onCompleta',
                bind:{hidden:'{readOnlyNote}'}
            }
        ]
    }],
    items: [
        {xtype: 'container',
            layout: {type: "hbox"},
            defaults: {labelAlign: 'top', margin:5},
            items: [
                {xtype: 'combo',fieldLabel: Locale.t('ama.forms.scheda.attivita.idrisorsa'),
                    flex:1,displayField: 'nomecognome', valueField: 'id',autoLoadOnValue: true,
                    queryMode: 'remote', forceSelection:true,minChars:3,
                    bind: {store: '{comboUtente}',value: '{record.idrisorsa}',readOnly: '{readOnlyAttivita}'}
                },
                {xtype: 'datefield', fieldLabel: Locale.t('ama.forms.scheda.attivita.fine'),
                    allowBlank: false, width: 200, format: 'd/m/Y',submitFormat:'Y-m-d',
                    bind: {value: '{record.fine}',readOnly: '{readOnlyAttivita}'}
                }
            ]
        },
        {xtype: 'container',
            layout: {type: "hbox"},
            defaults: {labelAlign: 'top', margin:5},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('ama.forms.scheda.attivita.descrizione'),
                    flex:1,allowBlank: false,
                    bind: {value: '{record.descrizione}',readOnly: '{readOnlyAttivita}'}
                }
            ]
        },
        {xtype: 'container',
            layout: {type: "hbox"},
            bind:{hidden:'{hideNote}'},
            defaults: {labelAlign: 'top', margin:5},
            items: [
                {xtype: 'textarea',scrollable:true,overflow:'auto',minHeight: 300,
                    flex:1,padding:'0 0 10 0',hideLabel: true,
                    bind: {value: '{record.note}',readOnly: '{readOnlyNote}'}
                }
            ]
        }
    ],
    listeners:{
        afterRender: 'onAfterRender'
    }
});