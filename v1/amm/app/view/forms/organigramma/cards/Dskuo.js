/**
 * Created by luke on 17/08/21.
 */
Ext.define('amm.view.forms.organigramma.cards.Dskuo', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'Ext.form.RadioGroup',
        'Ext.form.field.Text',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('amm.forms.organigramma.fields.nomedsk'),
                    flex:1, readOnly: true,
                    bind: { value: '{record.nome}'}
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