/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.view.forms.categoriaatv.cards.Categoriaatv', {
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
                {xtype: 'textfield', fieldLabel: Locale.t('ana.forms.categoriaatv.fields.codice'),
                    width:300, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 10, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnlyCat}', value: '{record.codice}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('ana.forms.categoriaatv.fields.nome'),
                    flex:1, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 250, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnlyCat}', value: '{record.nome}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textarea',scrollable:true,overflow:'auto',
                    fieldLabel: Locale.t('ana.forms.categoriaatv.fields.descrizione'),
                    flex:1,padding:'0 0 10 0',
                    bind: {value: '{record.descrizione}',readOnly: '{readOnly}'}
                }
            ]
        }
    ]
});