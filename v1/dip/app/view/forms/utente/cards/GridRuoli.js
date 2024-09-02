Ext.define('dip.view.forms.utente.cards.GridRuoli', {
    extend: 'Ext.grid.Panel',
    mixins: ['portal.v1.global.Util'],
    requires: [
        'Ext.form.field.ComboBox',
        'Ext.grid.ActionColumn',
        'Ext.grid.plugin.CellEditing',
        'dip.model.forms.utente.GridRuoli'
    ],
    minHeight: 120,
    bind: {
        store: '{gridRuoliFunz}'
    },
    selType: 'cellmodel',
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1
    },
    viewConfig: {
        emptyText: Locale.t('global.grid.empty'),
        getRowClass: function (record) {
            return (record.get('action') === 2) ? "bd-deleterow bd-defaultrow" : "bd-defaultrow";
        }
    },
    columns: [{
        xtype: 'actioncolumn',
        menuDisabled: true,
        resizable: false,
        sortable: false,
        width: 30,
        items: [{
            getClass: function (view, meta, record, rowIndex, colIndex, store) {
                let vm = this.lookupViewModel(),
                    rec = vm.get('record'),
                    gestore = vm.get('gestore'),
                    lastrecord = store.last();
                if (!rec) {
                    return false;
                }
                if (gestore === false || rec.data.stato === 'C') {
                    return false;
                }
                if (lastrecord === record) {
                    return 'x-fas fa-user-plus';
                } else {
                    if (record.get('action') === 2) {
                        return 'x-fas fa-plus-circle';
                    } else {
                        if (record.get('isnew') === 1 && record.get('iduo') === '') {
                            return 'x-fas fa-user-plus';
                        }
                    }
                    return 'x-fas fa-minus-circle';
                }
            },
            handler: function (view, rowIndex, colIndex, item, event, record) {
                let vm = this.lookupViewModel(),
                    rec = vm.get('record'),
                    gestore = vm.get('gestore'),
                    gridUo = view.up('grid'),
                    lastrecord = gridUo.getStore().last();
                    if (gestore === false || rec.data.stato === 'C') {
                        return false;
                    }
                if (record.get('action') === 2) {
                    record.set('action', 0)
                } else {
                    if (record.data.isnew === 0) {
                        record.set('action', 2)
                    } else {
                        if(lastrecord!==record){
                            view.getStore().remove(record);
                        }
                    }
                }

            }
        }]
    },
        {
            text: Locale.t('dip.forms.ruolo.fields.ruolo'),
            flex: 1,
            menuDisabled: true,
            resizable: false,
            sortable: false,
            dataIndex: 'ruolofunz',
            renderer: function (value) {
                if (value === '') {
                    return Locale.t('global.form.combo.combo');
                } else {
                    return value;
                }
            },
            getEditor: function (record) {
                if (record.get('isnew') === 0) {
                    return false;
                }
                let vm = this.lookupViewModel(),
                    rec = vm.get('record'),
                    gestore = vm.get('gestore')
                if (gestore === false || rec.data.stato === 'C') {
                    return false;
                }
                return {
                    xtype: 'combo', queryMode: 'local', displayField: 'ruolofunz', forceSelection: true,
                    bind: {
                        store: '{comboRuoliFunz}'
                    }
                    , listeners: {
                        select: function (combo, record) {
                            let gridUo = combo.up('grid')
                            let lastrecord = gridUo.getStore().last();
                            let row = gridUo.getSelectionModel().getSelection()[0]
                            if (row) {
                                row.data.idfunzione = record.data['id']
                            }
                            gridUo.getView().refreshNode(row);
                            if (lastrecord === row) {
                                gridUo.getStore().add(Ext.create('dip.model.forms.utente.GridRuoli'));
                            }

                        },
                        beforequery: function (qe) {
                            delete qe.combo.lastQuery;
                        }
                    }
                }
            }
        }
    ]
});