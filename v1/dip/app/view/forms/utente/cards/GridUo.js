Ext.define('dip.view.forms.utente.cards.GridUo', {
    extend: 'Ext.grid.Panel',
    mixins: ['portal.v1.global.Util'],
    requires: [
        'Ext.form.field.ComboBox',
        'Ext.grid.ActionColumn',
        'Ext.grid.column.Check',
        'Ext.grid.plugin.CellEditing',
        'dip.model.forms.utente.GridUo'
    ],
    bind: {
        store: '{gridUo}'
    },
    selType: 'cellmodel',
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1
    },
    viewConfig: {
        emptyText: Locale.t('global.grid.empty'),
        getRowClass: function (record) {
            let css = ''
            if (record.get('predef')===true){
                css = 'row-green '
            }
            if (record.get('action')===2){
                css +="bd-deleterow bd-defaultrow ";
            }else{
                css +="bd-defaultrow ";
            }
            return css
        }
    },
    columns: [
        {
            xtype: 'actioncolumn', menuDisabled: true, resizable: false, sortable: false, width: 30,
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
                    if(lastrecord===record){
                        return 'x-fas fa-user-plus';
                    }else{
                        if (record.get('action') === 2) {
                            return 'x-fas fa-plus-circle';
                        } else {
                            if (record.get('isnew') === 1 && record.get('iduo') === ''){
                                return 'x-fas fa-user-plus';
                            }
                        }
                        return 'x-fas fa-minus-circle';
                    }

                },
                handler: function(view, rowIndex, colIndex, item, event, record){
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
                    }else{
                        if (record.data.isnew===0){
                            record.set('action', 2)
                        }else{
                            if(lastrecord!==record){
                                view.getStore().remove(record);
                            }
                        }
                    }

                }
            }]
        },
        {
            text: Locale.t('dip.forms.utente.griduo.uo'),
            flex: 1, menuDisabled: true, resizable: false, sortable: false,
            dataIndex: 'uo',
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
                    xtype: 'combo',
                    queryMode: 'local',
                    displayField: 'uo',
                    forceSelection: true,
                    bind: {
                        store: '{comboUo}'
                    }
                    , listeners: {
                        select: function (combo, record) {
                            let gridUo = combo.up('grid')
                            let lastrecord = gridUo.getStore().last();
                            let row = gridUo.getSelectionModel().getSelection()[0]
                            if (row) {
                                row.data.iduo = record.data['id']
                                row.data.predef = 0
                                row.data.funzione = ''
                                row.data.idfunz = ''
                            }
                            gridUo.getView().refreshNode(row);
                            if (lastrecord === row) {
                                gridUo.getStore().add(Ext.create('dip.model.forms.utente.GridUo', {
                                    iduo: '', idfunz: '', predef: 0, action: 1, isnew: 1
                                }));
                            }

                        },
                        beforequery: function (qe) {
                            delete qe.combo.lastQuery;
                        }
                    }
                }
            }
        }, {
            text: Locale.t('dip.forms.utente.griduo.funzione'),
            width: 300,
            menuDisabled: true,
            resizable: false,
            sortable: false,
            dataIndex: 'funzione',
            getEditor: function (row) {
                let vm = this.lookupViewModel(),
                    rec = vm.get('record'),
                    gestore = vm.get('gestore')
                if (gestore === false || rec.data.stato === 'C' || row.data.iduo === '') {
                    return false;
                }

                return {
                    xtype: 'combo',
                    displayField: 'funz',
                    forceSelection: true,
                    bind: {
                        store: '{comboFunzioni}'
                    },
                    listeners: {
                        select: function (combo,record) {
                            let gridUo = combo.up('grid')
                            let row = gridUo.getSelectionModel().getSelection()[0]
                            if (row) {
                                row.data.idfunz = record.data['idfunz']
                            }
                        },
                        beforequery: function (query) {
                            delete query.combo.lastQuery
                            let gridUo = query.combo.up('grid')
                            let row = gridUo.getSelectionModel().getSelection()[0]
                            if (row && row.data.iduo !== '') {
                                query.combo.getStore().getProxy().extraParams.iduo = row.data.iduo
                            } else {
                                return false
                            }
                        }
                    }
                }
            }
        },
        {
            width: 100,
            xtype: 'checkcolumn',
            text: Locale.t('dip.forms.utente.griduo.predefinito'),
            dataIndex: 'predef',
            listeners: {
                beforecheckchange: function (me, rowIndex, checked, record) {
                    let vm = this.lookupViewModel();
                    if (checked === false || vm.get('gestore') === false || record.data['iduo'] === '') {
                        return false;
                    }
                },
                checkchange: function (colonna, rowIndex) {
                    let gridUo = colonna.up('grid')
                    let StoreUo = gridUo.getStore()
                    let row = StoreUo.getAt(rowIndex)
                    for (let i = 0; i < StoreUo.getCount(); i++) {
                        let r = StoreUo.getAt(i)
                        if (row.id !== r.id) {
                            r.set('predef', false);
                        }
                    }
                }
            }
        }
    ]
});