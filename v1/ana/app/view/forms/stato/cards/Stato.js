/**
 * Created by luke on 12/02/21.
 */
Ext.define('ana.view.forms.stato.cards.Stato', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.TextField',
        'Ext.form.field.TextArea',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('ana.forms.stato.fields.statosogg'),
                    flex:1, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 250, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.statosogg}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textarea',scrollable:true,overflow:'auto',
                    fieldLabel: Locale.t('ana.forms.stato.fields.descrizione'),
                    flex:1,padding:'0 0 10 0',
                    bind: {value: '{record.descrizione}',readOnly: '{readOnly}'}
                }
            ]
        }
    ]
});