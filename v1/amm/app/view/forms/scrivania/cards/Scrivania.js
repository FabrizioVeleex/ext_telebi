/**
 * Created by luca on 13/06/2017.
 */
Ext.define('amm.view.forms.scrivania.cards.Scrivania', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'Ext.form.RadioGroup',
        'Ext.form.TextField',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('amm.forms.scrivania.fields.nome'),
                    width:500, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 50,maxLengthText:Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.nome}'}
                }
            ]
        },
        {xtype: 'fieldset',collapsible: false, collapsed: false,
            title: '<span style="color: black;font-weight: bold">' + Locale.t('amm.forms.scrivania.barra') + '</span>',
            style: {'background-color': "transparent;"},
            items: [
                {xtype: 'radiogroup',
                    fieldLabel :Locale.t('amm.forms.scrivania.fields.taskbar'),
                    bind: {value:'{record.taskbar}'},width:300,height:20,simpleValue: true,
                    items: [
                        {boxLabel:Locale.t('amm.forms.scrivania.fields.abilitato'),inputValue:1},
                        {boxLabel:Locale.t('amm.forms.scrivania.fields.disabilitato'),inputValue:0}
                    ]
                },
                {xtype: 'radiogroup',
                    fieldLabel :Locale.t('amm.forms.scrivania.fields.startmenu'),
                    bind: {value:'{record.startmenu}'},width:300,height:20,simpleValue: true,
                    items: [
                        {boxLabel:Locale.t('amm.forms.scrivania.fields.abilitato'),inputValue:1},
                        {boxLabel:Locale.t('amm.forms.scrivania.fields.disabilitato'),inputValue:0}
                    ]
                },
                {xtype: 'radiogroup',
                    flex:1, fieldLabel :Locale.t('amm.forms.scrivania.fields.posta'),
                    bind: {value:'{record.posta}'},width:300,height:20,simpleValue: true,
                    items: [
                        {boxLabel:Locale.t('amm.forms.scrivania.fields.abilitato'),inputValue:1},
                        {boxLabel:Locale.t('amm.forms.scrivania.fields.disabilitato'),inputValue:0}
                    ]
                },
                {xtype: 'radiogroup',
                    flex:1, fieldLabel :Locale.t('amm.forms.scrivania.fields.notifiche'),
                    bind: {value:'{record.notifiche}'},width:300,height:20,simpleValue: true,
                    items: [
                        {boxLabel:Locale.t('amm.forms.scrivania.fields.abilitato'),inputValue:1},
                        {boxLabel:Locale.t('amm.forms.scrivania.fields.disabilitato'),inputValue:0}
                    ]
                }
            ]
        }
    ]
});