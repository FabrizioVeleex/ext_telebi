Ext.define('cde.view.forms.listsconto.cards.Listsconto', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.TextField',
        'Ext.form.field.Date',
        'Ext.form.field.Number',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('cde.forms.listsconto.fields.cd_gruppo'), width:300,
                    bind: {value: '{record.cd_gruppo}',readOnly: '{readOnly}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('cde.forms.listsconto.fields.cd_cli'),width: 300,
                    bind: {value: '{record.cd_cli}',readOnly: '{readOnly}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('cde.forms.listsconto.fields.ragsoc'),flex:1,
                    bind: {value: '{record.ragsoc}',readOnly: '{readOnly}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'datefield', fieldLabel: Locale.t('cde.forms.listsconto.fields.dateins'),
                    flex:1, format: 'd/m/Y',
                    bind: {value: '{record.dateins}',readOnly: '{readOnly}'}
                },
                {xtype: 'datefield', fieldLabel: Locale.t('cde.forms.listsconto.fields.datestart'),
                    flex:1, format: 'd/m/Y',
                    bind: {value: '{record.datestart}',readOnly: '{readOnly}'}
                },
                {xtype: 'numberfield', fieldLabel: Locale.t('cde.forms.listsconto.fields.sconto1'),
                    flex:1,  hideTrigger: true, allowDecimals:true, decimalSeparator: ',',
                    bind: {value: '{record.sconto1}',readOnly: '{readOnly}'}
                },
                {xtype: 'numberfield', fieldLabel: Locale.t('cde.forms.listsconto.fields.sconto2'),
                    flex:1,  hideTrigger: true, allowDecimals:true, decimalSeparator: ',',
                    bind: {value: '{record.sconto2}',readOnly: '{readOnly}'}
                }
            ]
        }
    ]
});