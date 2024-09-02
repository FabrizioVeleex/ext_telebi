/**
 * Created by luke on 14/09/21.
 */
Ext.define('rec.view.forms.cliente.cards.Cliente', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Text',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('rec.forms.cliente.fields.cdcli'),
                    width:200,readOnly:true,
                    bind: {hidden: '{hideCodice}', value: '{record.cdcli}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'combobox', fieldLabel: Locale.t('rec.forms.cliente.fields.idsoggetto'),minChars:3,
                    flex:1,matchFieldWidth:false,emptyText:Locale.t('global.form.combo.combo'),
                    autoLoadOnValue:true,forceSelection:true,allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    bind: {
                        store: '{storeClienti}',
                        value: '{record.idsoggetto}',
                        readOnly: '{readOnly}'
                    },
                    tpl: Ext.create('Ext.XTemplate',
                        '<ul class="x-list-plain"><tpl for=".">',
                        '<li role="option" class="x-boundlist-item"><b>{codice}</b>: - {ragsoc}</li>',
                        '</tpl></ul>'
                    ),
                    valueField: 'id',displayField: 'ragsoc',
                    listeners: {
                        beforequery: function (qe) {
                            delete qe.combo.lastQuery;
                        }
                    }
                }
            ]
        }
    ]
});