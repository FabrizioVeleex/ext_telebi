/**
 * Created by luke on 27/09/22.
 */
Ext.define('eve.view.forms.evento.cards.Evento', {
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
            layout: {type: "hbox"},
            defaults: {margin: 5,msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('eve.forms.evento.fields.nome'),
                    flex:1, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 250, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.nome}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('eve.forms.evento.fields.luogo'),
                    flex:1, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 250, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.luogo}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,msgTarget: 'side'},
            items: [
                {xtype: 'datefield', fieldLabel: Locale.t('eve.forms.evento.fields.datain'),
                    allowBlank: false, blankText: Locale.t('global.blanktext'), width: 250,
                    format: 'd/m/Y', submitFormat: 'Y-m-d',
                    bind: {readOnly: '{readOnly}', value: '{record.datain}'}
                },
                {xtype: 'datefield', fieldLabel: Locale.t('eve.forms.evento.fields.datafin'),
                    allowBlank: false, blankText: Locale.t('global.blanktext'), width: 250,
                    format: 'd/m/Y', submitFormat: 'Y-m-d',
                    bind: {readOnly: '{readOnly}', minValue: '{record.datain}',value: '{record.datafin}'}
                },
                {xtype: 'radiogroup',fieldLabel:Locale.t('eve.forms.evento.fields.stato'),
                    columns: 2,width:400,simpleValue: true,
                    items: [
                        {boxLabel:Locale.t('eve.forms.evento.fields.aperto'),inputValue:1},
                        {boxLabel:Locale.t('eve.forms.evento.fields.chiuso'),inputValue:0}
                    ],
                    bind: {value:'{record.aperto}',readOnly: '{readOnly}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textarea',scrollable:true,overflow:'auto',minHeight: 100,
                    flex:1,padding:'0 0 10 0',fieldLabel: Locale.t('eve.forms.evento.fields.note'),
                    bind: {value: '{record.note}',readOnly: '{readOnly}'}
                }
            ]
        }
    ]
});