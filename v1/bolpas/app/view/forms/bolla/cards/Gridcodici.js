/**
 * Created by luke on 23/06/21.
 */
Ext.define('bolpas.view.forms.bolla.cards.Gridcodici', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.form.field.Text',
        'Ext.grid.column.Action',
        'Ext.grid.plugin.CellEditing',
        'bolpas.model.forms.bolla.Gridcodici'
    ],
    bind: {
        store: '{storeCodici}'
    },
    minHeight: 120,
    selType: 'cellmodel',
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1,
    },
    columns: [
        {xtype: 'actioncolumn', menuDisabled:true, resizable:false, sortable:false, width: 30,
            items: [
                {getClass: function(view, meta, record, rowIndex, colIndex, store){
                        let vm = this.lookupViewModel()
                        if (vm.get('readOnlyCodici') === true) {
                            return false
                        }
                        let lastrecord = store.last()
                        if(lastrecord===record){
                            return 'x-fas fa-plus-circle';
                        }else{
                            if (record.get('action') === 2) {
                                return 'x-fas fa-plus-circle'
                            } else {
                                if (record.get('isnew') === 1 && record.get('codice') === ''){
                                    return 'x-fas fa-plus-circle'
                                }
                            }
                            return 'x-fas fa-minus-circle'
                        }
                    },
                    handler: function(view, rowIndex, colIndex, item, event, record) {
                        let vm = this.lookupViewModel()
                        if (vm.get('readOnlyCodici') === true) {
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
        {text: Locale.t('bolpas.forms.bolla.gridcodici.codice'), width:400, dataIndex: 'codice',
            getEditor: function () {
                let vm = this.lookupViewModel()
                if (vm.get('readOnlyCodici') === true) {
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
                                    grid.getStore().add(Ext.create('bolpas.model.forms.bolla.Gridcodici', {
                                        action: 1, isnew: 1, id: controller.randomString(32), codice:''
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