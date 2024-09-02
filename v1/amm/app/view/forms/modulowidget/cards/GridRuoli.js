/**
 * Created by luke on 19/08/21.
 */
Ext.define('amm.view.forms.modulowidget.cards.GridRuoli', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.form.field.Text',
        'Ext.grid.plugin.CellEditing',
        'amm.model.forms.modulo.GridRuoli'
    ],
    bind: {
        store: '{storeRuoli}'
    },
    selType: 'cellmodel',
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1
    },
    columns: [//Non metto la funzione di cancellazione in quanto le funzioni sono normalmente assegnate,
        // in caso necessità intervento manuale allineamento
        {text: Locale.t('amm.forms.modulowidget.gridruoli.ruolo'),
            width:350, menuDisabled: true, resizable: false, sortable: false,
            dataIndex: 'ruolo',
            getEditor: function () {
                let vm = this.lookupViewModel()
                if (vm.get('readOnly') === true) {
                    return false
                }
                return {xtype: 'textfield'}
            }
        },
        {text: Locale.t('amm.forms.modulowidget.gridruoli.valore'),
            width:250, menuDisabled: true, resizable: false, sortable: false,
            dataIndex: 'valore',
            getEditor: function (record) {
                let vm = this.lookupViewModel()
                if (vm.get('readOnly') === true) {
                    return false
                }
                return {xtype: 'textfield',
                    listeners: {
                        specialkey:function(cmp,e) {
                            if (e.getKey() === e.ENTER || e.getKey()===e.TAB) {
                                let grid = cmp.up('grid')
                                let controller = this.lookupController()
                                let lastrecord = grid.getStore().last()
                                let row = grid.getSelectionModel().getSelection()[0]
                                grid.getView().refreshNode(row)
                                if (lastrecord === row) {
                                    grid.getStore().add(Ext.create('amm.model.forms.modulo.GridRuoli', {
                                        action: 1, isnew: 1, id: controller.randomString(32), idmodulo:'',ruolo:'',descrizione:'',valore:''
                                    }))
                                }
                            }
                        }
                    }
                }
            }
        },
        {text: Locale.t('amm.forms.modulowidget.gridruoli.descrizione'),
           flex:1, menuDisabled: true, resizable: false, sortable: false,
            dataIndex: 'descrizione',
            getEditor: function () {
                let vm = this.lookupViewModel()
                if (vm.get('readOnly') === true) {
                    return false
                }
                return {xtype: 'textfield'}
            }
        }
    ]
});