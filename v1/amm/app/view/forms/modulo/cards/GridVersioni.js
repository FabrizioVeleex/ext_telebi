/**
 * Created by luke on 19/08/21.
 */
Ext.define('amm.view.forms.modulo.cards.GridVersioni', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.column.Action',
        'Ext.grid.column.Check',
        'Ext.grid.column.Date',
        'Ext.grid.plugin.CellEditing'
    ],
    bind: {
        store: '{storeVersioni}'
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
    columns: [
        {xtype: 'actioncolumn', menuDisabled: true, resizable: false, sortable: false, width: 30,
        items: [{
            getClass: function (view, meta, record, rowIndex, colIndex, store) {
                let vm = this.lookupViewModel(),
                    lastrecord = store.last()
                if (vm.get('readOnly') === true) {
                    return false
                }
                if (lastrecord === record) {
                    return 'x-fas fa-plus-circle';
                } else {
                    if (record.get('action') === 2) {
                        return 'x-fas fa-plus-circle';
                    } else {
                        if (record.get('isnew') === 1 && record.get('ver') === '') {
                            return 'x-fas fa-plus-circle';
                        }
                    }
                    return 'x-fas fa-minus-circle';
                }
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
                        if(lastrecord!==record){
                            view.getStore().remove(record);
                        }
                    }
                }
            }
        }]
        },{
            xtype: 'actioncolumn', menuDisabled:true, resizable:false, sortable:false, width: 30,
            items: [{
                getClass: function(){
                    return 'x-fas fa-pencil-alt'
                },
                handler: 'onEditVersione'
            }]
        },
        {
            width: 100,
            xtype: 'checkcolumn',
            text: Locale.t('amm.forms.modulo.gridversion.attivo'),
            dataIndex: 'attivo',
            listeners: {
                beforecheckchange: function () {
                    let vm = this.lookupViewModel()
                    if (vm.get('readOnly') === true) {
                        return false
                    }
                },
                checkchange: function (colonna, rowIndex) {
                    let gridVer = colonna.up('grid')
                    let StoreVer = gridVer.getStore()
                    let row = StoreVer.getAt(rowIndex)
                    for (let i = 0; i < StoreVer.getCount(); i++) {
                        let r = StoreVer.getAt(i)
                        if (row.id !== r.id) {
                            r.set('attivo', 0)
                        }
                    }
                }
            }
        },
        {text: Locale.t('amm.forms.modulo.gridversion.versione'),
            width:100, menuDisabled: true, resizable: false, sortable: false,
            dataIndex: 'ver'
        },
        {text: Locale.t('amm.forms.modulo.gridversion.data'),
            width:120, menuDisabled: true, resizable: false, sortable: false,
            dataIndex: 'dataver',xtype: 'datecolumn', format: 'd/m/Y'
        },
        {text: Locale.t('amm.forms.modulo.gridversion.note'),
           flex:1, menuDisabled: true, resizable: false, sortable: false,
            dataIndex: 'note'
        }
    ]
});