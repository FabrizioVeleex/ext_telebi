Ext.define('sgv.view.forms.segnalazione.cards.Gestore', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.TextField',
        'Ext.form.field.Number',
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
                {xtype: 'textfield', fieldLabel: Locale.t('sgv.forms.segnalazione.fields.nominativo'),
                    flex:1,name:'nominativo',
                    maxLength: 250,maxLengthText:Locale.t('global.maxlengthtext'),
                    bind: {value: '{record.nominativo}',readOnly: '{readOnlyGestore}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('sgv.forms.segnalazione.fields.violazione'),
                    flex:1,name:'violazione',allowBlank:false,
                    maxLength: 250,maxLengthText:Locale.t('global.maxlengthtext'),
                    bind: {value: '{record.violazione}',readOnly: '{readOnlyGestore}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'numberfield', fieldLabel: Locale.t('sgv.forms.segnalazione.fields.importo'),
                    width: 250, hideTrigger: true,decimalSeparator:',',allowDecimals:true,validateOnChange:false,
                    bind: {value: '{record.importo}',readOnly: '{readOnlyGestore}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textarea',flex:1,autoScroll: true, overflow: 'auto',name:'note',
                    fieldLabel: Locale.t('sgv.forms.segnalazione.fields.note'),
                    height: 100,bind:{value:'{record.note}',readOnly: '{readOnlyGestore}'}
                }
            ]
        }
    ]
});