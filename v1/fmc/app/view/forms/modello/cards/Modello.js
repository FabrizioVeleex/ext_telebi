/**
 * Created by luke on 15/11/2019.
 */
Ext.define('fmc.view.forms.modello.cards.Modello', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.field.*',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5},
            items: [
                {xtype: 'combobox', fieldLabel: Locale.t('fmc.forms.modello.fields.idtipologia'),minChars:3,
                    flex:1,forceSelection:true,emptyText:Locale.t('fmc.forms.modello.emptytipologia'),
                    allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    bind: {
                        store: '{storeTipologie}',
                        readOnly: '{readOnly}',
                        value: '{record.idtipologia}'
                    },
                    valueField: 'id',displayField: 'descrizione', queryMode: 'local'
                },
                {xtype: 'numberfield', fieldLabel: Locale.t('fmc.forms.modello.fields.durata'),
                    width: 200, hideTrigger: true,allowDecimals:false,
                    bind: {value: '{record.durata}',readOnly: '{readOnly}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5},
            items: [
                {xtype: 'textfield',fieldLabel: Locale.t('fmc.forms.modello.fields.docente'),width:500,
                    maxLength: 250, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {value: '{record.docente}', readOnly: '{readOnly}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5},
            items: [
                {xtype: 'textarea',scrollable:true,overflow:'auto',grow:true,
                    fieldLabel: Locale.t('fmc.forms.modello.fields.oggetto'),
                    flex:1,padding:'0 0 10 0',maxLength:3000, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {value: '{record.oggetto}', readOnly: '{readOnly}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5},
            items: [
                {xtype: 'textarea',scrollable:true,overflow:'auto',grow:true,
                    fieldLabel: Locale.t('fmc.forms.modello.fields.materiale'),
                    flex:1,padding:'0 0 10 0',maxLength:3000, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {value: '{record.materiale}', readOnly: '{readOnly}'}
                }
            ]
        }
    ]
});