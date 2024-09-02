/**
 * Created by luke on 27/09/22.
 */
Ext.define('fmc.view.forms.tipologia.cards.Tipologia', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
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
                {xtype: 'textfield', fieldLabel: Locale.t('fmc.forms.tipologia.fields.descrizione'),
                    flex:1, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 250, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.descrizione}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'radiogroup',fieldLabel:Locale.t('fmc.forms.tipologia.fields.obbligo'),
                    columns: 2,width:400,simpleValue: true,
                    items: [
                        {boxLabel:Locale.t('fmc.forms.tipologia.fields.si'),inputValue:1},
                        {boxLabel:Locale.t('fmc.forms.tipologia.fields.no'),inputValue:0}
                    ],
                    bind: {value:'{record.obbligo}',readOnly: '{readOnly}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'radiogroup',fieldLabel:Locale.t('fmc.forms.tipologia.fields.abilitata'),
                    columns: 2,width:400,simpleValue: true,
                    items: [
                        {boxLabel:Locale.t('fmc.forms.tipologia.fields.si'),inputValue:1},
                        {boxLabel:Locale.t('fmc.forms.tipologia.fields.no'),inputValue:0}
                    ],
                    bind: {value:'{record.abilitata}',readOnly: '{readOnly}'}
                }
            ]
        }
    ]
});