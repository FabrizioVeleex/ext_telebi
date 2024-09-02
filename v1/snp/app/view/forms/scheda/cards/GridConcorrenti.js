/**
 * Created by luke on 13/05/2020.
 */
Ext.define('snp.view.forms.scheda.cards.GridConcorrenti', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.form.field.Number',
        'Ext.form.field.Text',
        'Ext.grid.ActionColumn',
        'Ext.grid.plugin.CellEditing',
        'Ext.util.Format',
        'portal.util.Functions',
        'snp.model.forms.scheda.GridConcorrenti'
    ],
    minHeight: 120,
    bind: {
        store: '{storeConcorrenti}'
    },
    selType: 'cellmodel',
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1
    },
    viewConfig:{
        getRowClass: function(record){
            return (record.get('action')===2) ? "bd-deleterow bd-defaultrow" : "bd-defaultrow";
        }
    },
    columns: [{
        xtype: 'actioncolumn', menuDisabled:true, resizable:false, sortable:false, width: 30,
        items: [{
            getClass: function( view, meta, record){
                if (record.get('action')===2){
                    return 'x-fas fa-plus-circle';
                }else{
                    if (record.get('isnew')===0 || (record.get('isnew')===1 && record.get('concorrente')!=='')){
                        return 'x-fas fa-minus-circle';
                    }
                }
                return 'x-fas fa-plus-circle';
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
                        if (record.data.concorrente!=='') {
                            rec.data.storeConcorrenti = rec.data.storeConcorrenti.filter(obj=>obj.id!==record.data.id) //lo rimuovo dal record backend
                            if(lastrecord!==record){
                                view.getStore().remove(record)
                            } else {
                                view.getStore().remove(lastrecord)
                            }
                        }
                    }
                }
            }
        }]
    }, {
        text: Locale.t('snp.forms.scheda.concorrenti.concorrente'),
        flex:1, menuDisabled: true, resizable: false, sortable: false,
        dataIndex: 'concorrente',
        getEditor: function () {
            let vm = this.lookupViewModel()
            if (vm.get('readOnly')) {
                return false
            }
            return {xtype: 'textfield', maxLength: 150,
                listeners: {
                    blur :function(campo) {
                        let vm = this.lookupViewModel()
                        let rec = vm.get('record')
                        let grid = campo.up('grid')
                        let row = grid.getSelectionModel().getSelection()[0];
                        grid.getView().refreshNode(row)
                        let task = new Ext.util.DelayedTask(function (campo) {
                            campo.ownerCt.completeEdit();
                        }, this, [campo])
                        task.delay(100)
                        let lastrecord = grid.getStore().last()
                        if (lastrecord === row && campo.value!=='') {
                            rec.data.storeConcorrenti.push(row.data) //lo metto nel record backend
                            grid.getStore().add(Ext.create('snp.model.forms.scheda.GridConcorrenti', {
                                action: 1, isnew: 1, id: bdFunctions.bpRandomString(32),
                                concorrente:'',codice:'',prezzo:0
                            }))
                        }
                    }
                }
            }
        }
    }, {
        text: Locale.t('snp.forms.scheda.concorrenti.codice'),
        width:300, menuDisabled: true, resizable: false, sortable: false,
        dataIndex: 'codice',
        getEditor: function () {
            let vm = this.lookupViewModel()
            if (vm.get('readOnly')) {
                return false
            }
            return {xtype: 'textfield', maxLength: 150}
        }
    }, {
        text: Locale.t('snp.forms.scheda.concorrenti.prezzo'),
        width:200, menuDisabled: true, resizable: false, sortable: false,
        dataIndex: 'prezzo',
        renderer: function (v) {
            return Ext.util.Format.number(v,'0,000.00');
        },
        getEditor: function () {
            let vm = this.lookupViewModel()
            if (vm.get('readOnly')) {
                return false
            }
            return {xtype: 'numberfield', allowDecimals: true,decimalSeparator: ',',minValue: 0, hideTrigger: true}
        }
    }
    ],
    items: []
});