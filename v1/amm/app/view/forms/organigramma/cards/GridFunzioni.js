/**
 * Created by luke on 19/08/21.
 */
Ext.define('amm.view.forms.organigramma.cards.GridFunzioni', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.form.field.ComboBox',
        'Ext.grid.column.Check',
        'Ext.grid.plugin.CellEditing',
        'amm.model.forms.organigramma.GridFunzioni'
    ],
    bind: {
        store: '{storeFunzioni}'
    },
    selType: 'cellmodel',
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1
    },
    columns: [//Non metto la funzione di cancellazione in quanto le funzioni sono normalmente assegnate,
        // in caso necessità intervento manuale allineamento
        {text: Locale.t('amm.forms.organigramma.gridfunzioni.funzione'),
            width:500, menuDisabled: true, resizable: false, sortable: false,
            dataIndex: 'funz',
            getEditor: function (record) {
                if (record.get('isnew')===0){
                    return false;
                }
                return {
                    xtype: 'combo', width: 300, queryMode: 'local',matchFieldWidth: true, minChars: 2, selectOnFocus: true, forceSelection: true,
                    bind: {
                        store: '{comboFunzioni}'
                    },
                    displayField: 'descrizione',
                    listeners: {
                        select: function (combo, rec) {
                            let vm = this.lookupViewModel()
                            record = vm.get('record')
                            let grid = combo.up('grid')
                            let row = grid.getSelectionModel().getSelection()[0]
                            let lastrecord = grid.getStore().last()
                            if (row) {
                                let controller = this.lookupController()
                                row.data.funz = rec.data['descrizione']
                                row.data.valore = rec.data['valore']
                                grid.getView().refreshNode(row)
                                if (lastrecord === row) {
                                    grid.getStore().add(Ext.create('amm.model.forms.organigramma.GridFunzioni', {
                                        action: 1, isnew: 1, id: controller.randomString(32),iduniversale:record.data.id,locale:1,globale:0,funz:'',valore:0
                                    }))
                                }
                            }
                        }
                    }
                }
            }
        },
        { width:100,xtype: 'checkcolumn', text:Locale.t('amm.forms.organigramma.gridfunzioni.tipoglobale'), dataIndex: 'globale',
            listeners: {
                checkchange: function (chk ,rowIndex,checked) {
                    let vm = this.lookupViewModel()
                    let store=vm.get('storeFunzioni')
                    if (checked===false) {
                        store.getAt(rowIndex).set('globale',true)
                    } else {
                        store.getAt(rowIndex).set('globale',true)
                        store.getAt(rowIndex).set('locale',false)
                    }
                }
            }
        },{
            width: 100, xtype: 'checkcolumn', text: Locale.t('amm.forms.organigramma.gridfunzioni.tipolocale'), dataIndex: 'locale',
            listeners: {
                checkchange: function (chk ,rowIndex,checked) {
                    let vm = this.lookupViewModel()
                    let store=vm.get('storeFunzioni')
                    if (checked===false) {
                        store.getAt(rowIndex).set('locale',true)
                    } else {
                        store.getAt(rowIndex).set('globale',false)
                        store.getAt(rowIndex).set('locale',true)
                    }
                }
            }
        }
    ]
});