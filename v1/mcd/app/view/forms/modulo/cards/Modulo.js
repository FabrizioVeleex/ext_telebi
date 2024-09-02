/**
 * Created by luca on 17/07/2018.
 */
Ext.define('mcd.view.forms.modulo.cards.Modulo', {
    extend: 'Ext.form.Panel',
    requires:[
        'Ext.container.Container',
        'Ext.form.field.*',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        {
            xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5, labelAlign: 'top', msgTarget: 'side'},
            items: [
                {
                    xtype: 'combo', fieldLabel: Locale.t('mcd.forms.modulo.fields.idsede'),
                    width: 500, displayField: 'nome', valueField: 'codice',
                    queryMode: 'local', forceSelection: true,allowBlank: false,
                    bind: {store: '{comboSede}', value: '{record.idsede}', readOnly: '{readOnly}'},
                    listeners: {
                        select:function (cmb,record) {
                            let vm = this.lookupViewModel(),
                                rec = vm.get('record')
                            rec.data.sede = record.data.nome
                            rec.data.idstabilimento = record.data.id
                        }
                    }
                }
            ]
        },
        {
            xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5, labelAlign: 'top', msgTarget: 'side'},
            items: [
                {xtype: 'combobox', fieldLabel: Locale.t('mcd.forms.modulo.fields.dip_nome'),
                    minChars:2, width:500,forceSelection:true,allowBlank: false,
                    bind: {
                        store: '{comboDip}',
                        value: '{record.dip_id}',
                        readOnly: '{readOnly}'
                    },
                    valueField: 'dip_id',displayField: 'dip_nome',
                    listeners: {
                        beforequery:function (qe) {
                            let vm = this.lookupViewModel(),
                                rec = vm.get('record')
                            delete qe.combo.lastQuery;
                            let storeDip=vm.get('comboDip');
                            if (storeDip) {
                                storeDip.getProxy().extraParams.idsede=rec.data.idsede;
                            }
                        },
                        select:function (cmb,record) {
                            let vm = this.lookupViewModel(),
                                rec = vm.get('record')
                            rec.data.dip_nome = record.data.dip_nome
                        }
                    }
                }
            ]
        },
        {
            xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5, labelAlign: 'top', msgTarget: 'side'},
            items: [
                {xtype: 'datefield',fieldLabel: Locale.t('mcd.forms.modulo.fields.consegna'),
                    width: 160, format: 'd/m/Y',submitFormat:'Y-m-d',allowBlank: false,
                    bind: {
                        value: '{record.consegna}',
                        readOnly: '{readOnly}'
                    }
                }
            ]
        }
    ]
});