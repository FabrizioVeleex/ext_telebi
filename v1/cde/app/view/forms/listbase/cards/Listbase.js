Ext.define('cde.view.forms.listbase.cards.Listbase', {
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
                {xtype: 'textfield', fieldLabel: Locale.t('cde.forms.listbase.fields.cd_art'), width:300,
                    bind: {value: '{record.cd_art}',readOnly: '{readOnly}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('cde.forms.listbase.fields.descr_art'), flex:1,
                    bind: {value: '{record.descr_art}',readOnly: '{readOnly}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('cde.forms.listbase.fields.cd_gruppo'),width: 300,
                    bind: {value: '{record.cd_gruppo}',readOnly: '{readOnly}'}
                },
                {xtype: 'numberfield', fieldLabel: Locale.t('cde.forms.listbase.fields.prezzo')+' €',
                    width: 300, hideTrigger: true, allowDecimals:true, decimalSeparator: ',',
                    bind: {value: '{record.prezzo}',readOnly: '{readOnly}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'datefield', fieldLabel: Locale.t('cde.forms.listbase.fields.dateins'),
                    flex:1, format: 'd/m/Y',
                    bind: {value: '{record.dateins}',readOnly: '{readOnly}'}
                },
                {xtype: 'datefield', fieldLabel: Locale.t('cde.forms.listbase.fields.datestart'),
                    flex:1, format: 'd/m/Y',
                    bind: {value: '{record.datestart}',readOnly: '{readOnly}'}
                },
                {xtype: 'datefield', fieldLabel: Locale.t('cde.forms.listbase.fields.dateend'),
                    flex:1, format: 'd/m/Y',
                    bind: {value: '{record.dateend}',readOnly: '{readOnly}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('cde.forms.listbase.fields.cdcom1'), flex:1,
                    bind: {value: '{record.cdcom1}',readOnly: '{readOnly}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('cde.forms.listbase.fields.cdcom2'), flex:1,
                    bind: {value: '{record.cdcom2}',readOnly: '{readOnly}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('cde.forms.listbase.fields.cdcom3'), flex:1,
                    bind: {value: '{record.cdcom3}',readOnly: '{readOnly}'}
                }
            ]
        }
    ]
});