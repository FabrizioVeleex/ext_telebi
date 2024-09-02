/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.view.forms.sottocategoriaatv.cards.Sottocategoriaatv', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.TextField',
        'Ext.form.field.ComboBox',
        'Ext.form.field.TextArea',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('ana.forms.sottocategoriaatv.fields.codice'),
                    width:200, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 10, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.codice}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'combo', fieldLabel: Locale.t('ana.forms.sottocategoriaatv.fields.idcategoria'),
                    width: 700,  allowBlank: false,blankText: Locale.t('global.form.blanktext'),
                    displayField: 'nome', valueField: 'id',
                    queryMode: 'local', forceSelection: true,
                    bind: {store: '{comboCategoria}', value: '{record.idcategoria}', readOnly: '{readOnly}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('ana.forms.sottocategoriaatv.fields.nome'), flex:1,
                    maxLength: 250, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.nome}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textarea',scrollable:true,overflow:'auto',
                    fieldLabel: Locale.t('ana.forms.sottocategoriaatv.fields.descrizione'),
                    flex:1,padding:'0 0 10 0',
                    bind: {value: '{record.descrizione}',readOnly: '{readOnly}'}
                }
            ]
        }
    ]
})