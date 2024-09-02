/**
 * Created by luca on 16/07/2018.
 */
Ext.define('amm.view.forms.parametri.cards.Parametri', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.Label',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Text',
        'Ext.layout.container.HBox'
    ],
    scrollable: 'y',
    items: [
        {
            xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5, msgTarget: 'side'},
            items: [
                {
                    xtype: 'combo', fieldLabel: Locale.t('amm.forms.parametri.fields.idtipodoc'),
                    width: 600, displayField: 'descrizione', valueField: 'id',labelWidth: 200,
                    queryMode: 'local', forceSelection: true,
                    bind: {store: '{comboTipo}', value: '{record.idtipodoc}', readOnly: '{readOnly}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('amm.forms.parametri.fields.pswestrazione'),labelWidth: 200,
                    inputType: 'password',width:600, maxLength: 50, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.pswestrazione}'}
                },
                {xtype: 'label', padding:'8 0 5', style: {cursor: 'pointer'},
                    bind:{
                        html:'{infoPsw}'
                    },
                    listeners: {
                        click: {
                            element: 'el',
                            delegate: 'a.add',
                            fn: 'onShowPsw'
                        }
                    }
                }
            ]
        },

    ]
});