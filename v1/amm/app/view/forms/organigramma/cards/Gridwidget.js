/**
 * Created by luke on 23/06/21.
 */
Ext.define('amm.view.forms.organigramma.cards.Gridwidget', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.form.field.ComboBox',
        'Ext.grid.column.Action',
        'Ext.grid.plugin.CellEditing',
        'amm.model.forms.scrivania.Gridwidget'
    ],
    bind: {
        store: '{storeWidget}'
    },
    minHeight: 120,
    selType: 'cellmodel',
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1,
    },
    viewConfig:{
        getRowClass: function(record){
            return (record.get('action')===2) ? "bd-deleterow bd-defaultrow" : "bd-defaultrow";
        }
    },
    columns: [
        {xtype: 'actioncolumn', menuDisabled:true, resizable:false, sortable:false, width: 30,
            items: [
                {getClass: function(view, meta, record, rowIndex, colIndex, store){
                        let vm = this.lookupViewModel()
                        if (vm.get('readOnly') === true) {
                            return false
                        }
                        if (record.data.idmodello!=='') {
                            return 'x-fas fa-lock'
                        } else {
                            let lastrecord = store.last()
                            if(lastrecord===record){
                                return 'x-fas fa-plus-circle';
                            }else{
                                if (record.get('action') === 2) {
                                    return 'x-fas fa-plus-circle'
                                } else {
                                    if (record.get('isnew') === 1 && record.get('idapp') === ''){
                                        return 'x-fas fa-plus-circle'
                                    }
                                }
                                return 'x-fas fa-minus-circle'
                            }
                        }
                    },
                    handler: function(view, rowIndex, colIndex, item, event, record) {
                        let vm = this.lookupViewModel()
                        if (vm.get('readOnly') === true || record.data.idmodello!=='') {
                            return false
                        }
                        let grid = view.up('grid'),
                            lastrecord = grid.getStore().last()
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
        {text: Locale.t('amm.forms.scrivania.gridwidget.titolo'), flex:1, dataIndex: 'titolo',sortable:false,
            getEditor: function (record) {
                let vm = this.lookupViewModel()
                if (vm.get('readOnly') === true || record.data.isnew===0) {
                    return false
                }
                return {
                    xtype: 'combo', width: 300, matchFieldWidth: true, minChars: 2, selectOnFocus: true, forceSelection: true,
                    bind: {
                        store: '{storeCombowidget}'
                    },
                    displayField: 'titolo',
                    listeners: {
                        beforequery: function (qe) {
                            let vm = this.lookupViewModel(),
                                rec = vm.get('record')
                            delete qe.combo.lastQuery
                            let storewidget=vm.get('storeCombowidget')
                            if (storewidget) {
                                storewidget.getProxy().extraParams.idcmp=rec.data.id
                            }
                        },
                        select: function (combo, rec) {
                            let grid = combo.up('grid')
                            let row = grid.getSelectionModel().getSelection()[0]
                            let lastrecord = grid.getStore().last()
                            if (row) {
                                let controller = this.lookupController()
                                row.data.idapp = rec.data['id']
                                grid.getView().refreshNode(row)
                                if (lastrecord === row) {
                                    grid.getStore().add(Ext.create('amm.model.forms.scrivania.Gridwidget', {
                                        action: 1, isnew: 1, id: controller.randomString(32),idmodello:'',idapp:'',titolo:''
                                    }))
                                }
                            }
                        }
                    }
                }
            }
        }
    ],
    items: []
});