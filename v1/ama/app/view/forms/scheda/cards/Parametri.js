/**
 * Created by luke on 20/01/23.
 */
Ext.define('ama.view.forms.scheda.cards.Parametri', {
    extend: 'Ext.form.Panel',
    requires:[
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
            defaults: {margin: 5,labelWidth:150},
            items: [
                {xtype: 'checkbox', fieldLabel: Locale.t('ama.forms.scheda.parametri.dimensionisez'), width: 200,
                    bind: {value: '{record.sez1}', readOnly: '{readOnly}'},
                    listeners:{
                        change:function(fld) {
                            let vm = this.lookupViewModel()
                            if (fld.checked) {
                                vm.set('hidesz1',false)
                            } else {
                                vm.set('hidesz1',true)
                            }
                        }
                    }
                },
                {xtype: 'checkbox', fieldLabel: Locale.t('ama.forms.scheda.parametri.pesosez'), width: 200,
                    bind: {value: '{record.sez2}', readOnly: '{readOnly}'},
                    listeners:{
                        change:function(fld) {
                            let vm = this.lookupViewModel()
                            if (fld.checked) {
                                vm.set('hidesz2',false)
                            } else {
                                vm.set('hidesz2',true)
                            }
                        }
                    }
                },
                {xtype: 'checkbox',labelWidth:150, fieldLabel: Locale.t('ama.forms.scheda.parametri.graficasez'), width: 200,
                    bind: {value: '{record.sez3}', readOnly: '{readOnly}'},
                    listeners:{
                        change:function(fld) {
                            let vm = this.lookupViewModel()
                            if (fld.checked) {
                                vm.set('hidesz3',false)
                            } else {
                                vm.set('hidesz3',true)
                            }
                        }
                    }
                },
                {xtype: 'checkbox', fieldLabel: Locale.t('ama.forms.scheda.parametri.coloresez'), width: 200,
                    bind: {value: '{record.sez4}', readOnly: '{readOnly}'},
                    listeners:{
                        change:function(fld) {
                            let vm = this.lookupViewModel()
                            if (fld.checked) {
                                vm.set('hidesz4',false)
                            } else {
                                vm.set('hidesz4',true)
                            }
                        }
                    }
                }
            ]
        }
    ]
});