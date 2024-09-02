Ext.define('stcom.view.forms.budget.cards.budget', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.TextField',
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
                {xtype: 'numberfield', fieldLabel: Locale.t('stcom.forms.budget.fields.anno'), width: 200, hideTrigger: true,
                    bind: {readOnly: '{readOnly}', value: '{record.anno}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('stcom.forms.budget.fields.cdcli'), width:200,
                    bind: {value: '{record.cdcli}',readOnly: '{readOnly}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('stcom.forms.budget.fields.ragsoc'), flex:1,
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
                {xtype: 'numberfield', fieldLabel: Locale.t('stcom.forms.budget.fields.bdg01'), width: 200, hideTrigger: true,
                    bind: {readOnly: '{readOnly}', value: '{record.bdg01}'}
                },
                {xtype: 'numberfield', fieldLabel: Locale.t('stcom.forms.budget.fields.bdg02'), width: 200, hideTrigger: true,
                    bind: {readOnly: '{readOnly}', value: '{record.bdg02}'}
                },
                {xtype: 'numberfield', fieldLabel: Locale.t('stcom.forms.budget.fields.bdg03'), width: 200, hideTrigger: true,
                    bind: {readOnly: '{readOnly}', value: '{record.bdg03}'}
                },
                {xtype: 'numberfield', fieldLabel: Locale.t('stcom.forms.budget.fields.bdg04'), width: 200, hideTrigger: true,
                    bind: {readOnly: '{readOnly}', value: '{record.bdg04}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'numberfield', fieldLabel: Locale.t('stcom.forms.budget.fields.bdg05'), width: 200, hideTrigger: true,
                    bind: {readOnly: '{readOnly}', value: '{record.bdg05}'}
                },
                {xtype: 'numberfield', fieldLabel: Locale.t('stcom.forms.budget.fields.bdg06'), width: 200, hideTrigger: true,
                    bind: {readOnly: '{readOnly}', value: '{record.bdg06}'}
                },
                {xtype: 'numberfield', fieldLabel: Locale.t('stcom.forms.budget.fields.bdg07'), width: 200, hideTrigger: true,
                    bind: {readOnly: '{readOnly}', value: '{record.bdg07}'}
                },
                {xtype: 'numberfield', fieldLabel: Locale.t('stcom.forms.budget.fields.bdg08'), width: 200, hideTrigger: true,
                    bind: {readOnly: '{readOnly}', value: '{record.bdg08}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'numberfield', fieldLabel: Locale.t('stcom.forms.budget.fields.bdg09'), width: 200, hideTrigger: true,
                    bind: {readOnly: '{readOnly}', value: '{record.bdg01}'}
                },
                {xtype: 'numberfield', fieldLabel: Locale.t('stcom.forms.budget.fields.bdg10'), width: 200, hideTrigger: true,
                    bind: {readOnly: '{readOnly}', value: '{record.bdg02}'}
                },
                {xtype: 'numberfield', fieldLabel: Locale.t('stcom.forms.budget.fields.bdg11'), width: 200, hideTrigger: true,
                    bind: {readOnly: '{readOnly}', value: '{record.bdg03}'}
                },
                {xtype: 'numberfield', fieldLabel: Locale.t('stcom.forms.budget.fields.bdg12'), width: 200, hideTrigger: true,
                    bind: {readOnly: '{readOnly}', value: '{record.bdg04}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'numberfield', fieldLabel: Locale.t('stcom.forms.budget.fields.totale'), width: 200, hideTrigger: true,
                    bind: {readOnly: '{readOnly}', value: '{record.totale}'}
                }
            ]
        }
    ]
});