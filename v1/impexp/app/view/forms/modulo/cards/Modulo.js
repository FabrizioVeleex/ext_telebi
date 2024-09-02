/**
 * Created by luke on 04/05/21.
 */
Ext.define('impexp.view.forms.modulo.cards.Modulo', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.RadioGroup',
        'Ext.form.TextField',
        'Ext.form.field.HtmlEditor',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('impexp.forms.modulo.fields.codice'),
                    width:200, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 2, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.codice}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('impexp.forms.modulo.fields.nome'),
                    flex:1, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 255, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.nome}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5},
            items: [
                {xtype: 'radiogroup',fieldLabel:Locale.t('impexp.forms.modulo.fields.tipo'),
                    columns: 2,flex:1,simpleValue: true,
                    items: [
                        {boxLabel:Locale.t('impexp.forms.modulo.fields.importazione'),inputValue:1},
                        {boxLabel:Locale.t('impexp.forms.modulo.fields.esportazione'),inputValue:2}
                    ],
                    bind: {value:'{record.tipo}',readOnly: '{readOnly}'}
                }
            ]
        },
        {xtype: "container", flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: "htmleditor", flex: 1, autoScroll: true, style: "font-size:14px;",minHeight:200,
                    itemId: 'descthtml', //id x problema getDoc
                    bind: {readOnly: "{readOnly}", value: "{record.descrizione}"}
                }
            ]
        }
    ]
});