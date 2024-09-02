/**
 * Created by luke on 19/08/21.
 */
Ext.define('amm.view.forms.modulowidget.cards.GridAutorizzazioni', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.form.field.ComboBox',
        'Ext.grid.column.Action',
        'Ext.grid.plugin.CellEditing',
        'amm.model.forms.modulo.GridAutorizzazioni'
    ],
    bind: {
        store: '{storeAutorizzazioni}'
    },
    selType: 'cellmodel',
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1
    },
    viewConfig: {
        getRowClass: function (record) {
            return (record.get('action') === 2) ? "bd-deleterow bd-defaultrow" : "bd-defaultrow";
        }
    },
    columns: [
        {
            xtype: 'actioncolumn',
            menuDisabled: true,
            resizable: false,
            sortable: false,
            width: 30,
            items: [{
                getClass: function (view, meta, record) {
                    if (record.get('action') === 2) {
                        return 'x-fas fa-plus-circle';
                    } else {
                        if (record.get('isnew') === 0 || (record.get('isnew') === 1 && record.get('idrisorsa') !== '')) {
                            return 'x-fas fa-minus-circle';
                        }
                    }
                    return 'x-fas fa-user-plus';
                },
                handler: function (view, rowIndex, colIndex, item, event, record) {
                    let vm = this.lookupViewModel()
                    if (vm.get('readOnly') === true) {
                        return false
                    }
                    let gridVer = view.up('grid'),
                        lastrecord = gridVer.getStore().last()
                    if (record.get('action') === 2) {
                        record.set('action', 0)
                    } else {
                        if (record.data.isnew === 0) {
                            record.set('action', 2)
                        } else {
                            if (lastrecord !== record) {
                                view.getStore().remove(record);
                            }
                        }
                    }
                }
            }]
        }, {
            text: Locale.t('amm.forms.modulowidget.gridautorizzazioni.risorsa'),
            flex: 1, menuDisabled: true, resizable: false, sortable: false,
            dataIndex: 'risorsa',
            getEditor: function (record) {
                let vm = this.lookupViewModel()
                if (vm.get('readOnly') === true || record.data.isnew === 0) {
                    return false;
                }
                return Ext.create('Ext.form.ComboBox', {
                    anchor: '100%',
                    bind: {
                        store: '{comboRisorsa}',
                    },
                    displayField: 'risorsa', hideTrigger: false, minChars: 3, selectOnFocus: true, forceSelection: true,
                    tpl: Ext.create('Ext.XTemplate',
                        '<ul class="x-list-plain"><tpl for=".">',
                        '<li role="option" class="x-boundlist-item">{risorsa}</li>',
                        '</tpl></ul>'
                    ),
                    listeners: {
                        select: function (combo, record) {
                            let grid = combo.up('grid')
                            let cont = this.lookupController() //controller
                            let lastrecord = grid.getStore().last();
                            let row = grid.getSelectionModel().getSelection()[0]
                            if (row) {
                                row.data.idrisorsa = record.data['id']
                                row.data.tiporisorsa = record.data['tipo']
                            }
                            grid.getView().refreshNode(row);
                            if (lastrecord === row) {
                                grid.getStore().add(Ext.create('amm.model.forms.modulo.GridAutorizzazioni', {
                                    action: 1, isnew: 1, id: cont.randomString(32), risorsa: '', idrisorsa: '', ruoloass: '', idruoloass: '', tiporisorsa: ''
                                }));
                            }
                        },
                        beforequery: function (qe) {
                            delete qe.combo.lastQuery;
                        }
                    }
                })
            }
        },
        {
            text: Locale.t('amm.forms.modulowidget.gridautorizzazioni.ruolo'),
            width: 400, menuDisabled: true, resizable: false, sortable: false,
            dataIndex: 'ruoloass',
            getEditor: function () {
                return {
                    xtype: 'combo', multiSelect: true, displayField: 'ruolodesc', queryMode: 'local', editable: false,
                    bind: {
                        store: '{comboRuoli}'
                    }
                    , listeners: {
                        select: function (combo, record) {
                            let grid = combo.up('grid')
                            let row = grid.getSelectionModel().getSelection()[0]
                            row.data.idruoloass = []
                            record.forEach(function (rec) {
                                if (rec.data['idruolo'] !== '') {
                                    row.data.idruoloass.push(rec.data['idruolo']);
                                }
                            })
                        }
                    }
                }
            }
        }
    ]
});