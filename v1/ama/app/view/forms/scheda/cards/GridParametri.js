/**
 * Created by luca on 27/09/2018.
 */
Ext.define('ama.view.forms.scheda.cards.GridParametri', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.form.field.Text',
        'Ext.grid.ActionColumn',
        'Ext.grid.plugin.CellEditing',
        'ama.model.forms.scheda.GridParametri',
        'portal.util.Functions'
    ],
    minHeight: 120,
    bind: {
        store: '{storeParametri}'
    },
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1,
        listeners: {
            beforeedit:function(editor,context) {
                if (context.colIdx<2) {
                    context.grid.getSelectionModel().select(context.rowIdx);
                }
            }
        }
    },
    xtype: 'gridparametri',
    viewConfig:{
        getRowClass: function(record){
            return (record.get('action')===2) ? "bd-deleterow bd-defaultrow" : "bd-defaultrow";
        }
    },
    columns: [{
        xtype: 'actioncolumn',
        menuDisabled:true,
        resizable:false,
        sortable:false,
        width: 30,
        items: [{
            getClass: function( view, meta, record){
                let vm = this.lookupViewModel()
                if (vm.get('readOnly')) {
                    return false
                }
                if (record.get('action')===2){
                    return 'x-fas fa-plus-circle';
                }else{
                    if (record.get('isnew')===0 || (record.get('isnew')===1 && record.get('parametro')!=='')){
                        return 'x-fas fa-minus-circle';
                    }
                }
                return 'x-fas fa-minus-plus';
            },
            handler: function (view, rowIndex, colIndex, item, event, record) {
                let vm = this.lookupViewModel()
                if (vm.get('readOnly')) {
                    return false
                }
                let grid = view.up('grid'),
                    lastrecord = grid.getStore().last()
                if (record.get('action') === 2) {
                    record.set('action', 0)
                }else{
                    if (record.data.isnew===0){
                        record.set('action', 2)
                    } else {
                        let vm = this.lookupViewModel()
                        let rec = vm.get('record')
                       // rec.data.gridparametri = rec.data.gridparametri.filter(obj=>obj.id!==record.data.id) //lo rimuovo dal record backend
                        if(lastrecord!==record){
                            view.getStore().remove(record)
                        } else {
                            view.getStore().remove(lastrecord)
                        }
                    }
                }
            }
        }]
    },{text: Locale.t('ama.forms.scheda.gridparametri.parametro'),
            menuDisabled:true, resizable:false, sortable:false,
            dataIndex: 'parametro', flex:1,
            getEditor: function() {
                let vm = this.lookupViewModel()
                if (vm.get('readOnly')) {
                    return false
                }
                return {xtype: 'textfield',allowBlank:false,maxLength:100,
                    listeners: {
                        blur :function (campo) {
                            let gridpar = campo.up('grid')
                            let lastrecord = gridpar.getStore().last();
                            let row = gridpar.getSelectionModel().getSelection()[0]
                            //gridStab.getView().refreshNode(row);
                            if (lastrecord === row) {
                                gridpar.getStore().add(Ext.create('ama.model.forms.scheda.GridParametri', {
                                    action: 1, isnew: 1, id: bdFunctions.bpRandomString(32),
                                    parametro: '', um: '', tol: ''
                                }));
                            }
                        }
                    }
                }
            }
        },{text: Locale.t('ama.forms.scheda.gridparametri.um'),
            menuDisabled:true, resizable:false, sortable:false,width:200,dataIndex: 'um',
            getEditor: function() {
                let vm = this.lookupViewModel()
                if (vm.get('readOnly')) {
                    return false
                }
                return {xtype: 'textfield',allowBlank:false,maxLength:50}
            }
        },{text: Locale.t('ama.forms.scheda.gridparametri.tol'),
        menuDisabled:true, resizable:false, sortable:false,width:200,dataIndex: 'tol',
        getEditor: function() {
            let vm = this.lookupViewModel()
            if (vm.get('readOnly')) {
                return false
            }
            return {xtype: 'textfield',allowBlank:false,maxLength:50}
        }
    }
    ],
    items: [
        /* include child components here */
    ]
});