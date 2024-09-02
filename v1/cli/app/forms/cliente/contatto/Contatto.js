/**
 * Created by luke on 03/06/23.
 */
Ext.define('cli.forms.cliente.contatto.Contatto', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.field.*',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    dockedItems: [{xtype: 'toolbar', dock: 'top', reference:'toolbarForm',items: [
            {xtype: 'button', text: Locale.t('cli.forms.cliente.contatto.btn.close'),
                iconCls: 'x-fas fa-list', ui: 'blue', handler: 'onCloseContatto'
            },
            {reference: 'btnsavecontact', xtype: 'button', ui: 'green',text: Locale.t('cli.forms.cliente.contatto.btn.save'),
                iconCls: 'x-fas fa-check-square',
                handler: 'onSaveContatto'
            }
        ]
    }
    ],
    items: [
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('cli.forms.cliente.contatto.fields.titolo'), width:100,
                    maxLength: 10,maxLengthText:Locale.t('global.maxlengthtext'),
                    bind: {value: '{reccont.titolo}',readOnly:'{readOnlyContatto}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('cli.forms.cliente.contatto.fields.nominativo'), flex:1,
                    allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 150,maxLengthText:Locale.t('global.maxlengthtext'),
                    bind: {value: '{reccont.nominativo}',readOnly:'{readOnlyContatto}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('cli.forms.cliente.contatto.fields.email'), flex:1,
                    maxLength: 100,maxLengthText:Locale.t('global.maxlengthtext'),
                    bind: {value: '{reccont.email}',readOnly:'{readOnlyContatto}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('cli.forms.cliente.contatto.fields.telefono'), width:300,
                    maxLength: 50,maxLengthText:Locale.t('global.maxlengthtext'),
                    bind: {value: '{reccont.telefono}',readOnly:'{readOnlyContatto}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('cli.forms.cliente.contatto.fields.cellulare'), width:300,
                    maxLength: 25,maxLengthText:Locale.t('global.maxlengthtext'),
                    bind: {value: '{reccont.cellulare}',readOnly:'{readOnlyContatto}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('cli.forms.cliente.contatto.fields.interno'), width:300,
                    maxLength: 15,maxLengthText:Locale.t('global.maxlengthtext'),
                    bind: {value: '{reccont.interno}',readOnly:'{readOnlyContatto}'}
                }
            ]
        },
    ],
    bind:{
        //hidden: '{hideContatto}'
    }
});