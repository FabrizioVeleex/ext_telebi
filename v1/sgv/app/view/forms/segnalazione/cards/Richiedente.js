Ext.define('sgv.view.forms.segnalazione.cards.Richiedente', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.RadioGroup',
        'Ext.form.TextField',
        'Ext.form.field.Date',
        'Ext.form.field.TextArea',
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
                {xtype: 'textfield', fieldLabel: Locale.t('sgv.forms.segnalazione.fields.richiedente'),
                    flex:1, readOnly:true,
                    bind: {value: '{record.richiedente}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('sgv.forms.segnalazione.fields.filiale'),
                    flex:1, readOnly:true,labelWidth:120,
                    bind: {value: '{record.filiale}'}
                },
                {xtype: 'datefield', fieldLabel: Locale.t('sgv.forms.segnalazione.fields.datadoc'),
                    flex:1, format: 'd/m/Y',readOnly:true,
                    bind: {value: '{record.datadoc}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,msgTarget: 'side'},
            items: [
                {xtype: 'radiogroup',fieldLabel: Locale.t('sgv.forms.segnalazione.fields.conflitto'),
                    columns: 2, width:500,simpleValue: true,
                    items: [
                        {boxLabel:Locale.t('sgv.forms.segnalazione.radio.si'),inputValue:1},
                        {boxLabel:Locale.t('sgv.forms.segnalazione.radio.no'),inputValue:0}
                    ],
                    bind: {value:'{record.conflitto}',readOnly: '{readOnly}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textarea',flex:1,autoScroll: true, overflow: 'auto',
                    allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    fieldLabel: Locale.t('sgv.forms.segnalazione.fields.descrizione'),
                    height: 100,bind:{value:'{record.descrizione}',readOnly: '{readOnly}'}
                }
            ]
        }
    ]
});