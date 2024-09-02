Ext.define('dip.view.forms.utente.cards.GridStab', {
    extend: 'Ext.grid.Panel',
    mixins: ['portal.v1.global.Util'],
    requires: [
        'Ext.form.field.ComboBox',
        'Ext.grid.ActionColumn',
        'Ext.grid.plugin.CellEditing',
        'dip.model.forms.utente.GridStab'
    ],
    bind: {
        store: '{storeStabilimenti}'
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
        {xtype: 'actioncolumn', menuDisabled: true, resizable: false, sortable: false, width: 30,
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
                            if (record.get('isnew') === 1 && record.get('idstabilimento') === ''){
                                return 'x-fas fa-user-plus';
                            } else {
                                return 'x-fas fa-minus-circle';
                            }
                        }
                    }
                },
                handler: function(view, rowIndex, colIndex, item, event, record){
                    let vm = this.lookupViewModel(),
                        rec = vm.get('record'),
                        gestore = vm.get('gestore'),
                        gridStab = view.up('grid'),
                        lastrecord = gridStab.getStore().last();
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
        {text: Locale.t('dip.forms.utente.stabilimenti'),
            flex: 1, menuDisabled: true, resizable: false, sortable: false,
            dataIndex: 'stabilimento',
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
                    xtype: 'combo', queryMode: 'local', displayField: 'nome', forceSelection: true,
                    bind: {store: '{comboStabilimenti}'}
                    , listeners: {
                        select: function (combo, record) {
                            let gridStab = combo.up('grid')
                            let lastrecord = gridStab.getStore().last();
                            let row = gridStab.getSelectionModel().getSelection()[0]
                            if (row) {
                                row.data.idstabilimento = record.data['id']
                            }
                            gridStab.getView().refreshNode(row);
                            if (lastrecord === row) {
                                gridStab.getStore().add(Ext.create('dip.model.forms.utente.GridStab', {
                                    iduser: '', idstabilimento: '', stabilimento: '', action: 1, isnew: 1
                                }));
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