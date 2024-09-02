/**
 * Created by luca on 12/08/16.
 */
Ext.define('eve.view.forms.scheda.cards.GridContatti', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.form.field.ComboBox',
        'Ext.form.field.Text',
        'Ext.grid.ActionColumn',
        'Ext.grid.plugin.CellEditing',
        'eve.model.forms.scheda.GridContatti',
        'eve.store.forms.scheda.Suffisso',
        'portal.util.Functions'
    ],
    minHeight: 120,
    bind: {
        store: '{storeContatti}'
    },
    selType: 'cellmodel',
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
    viewConfig:{
        getRowClass: function(record){
            return (record.get('action')===2) ? "bd-deleterow bd-defaultrow" : "bd-defaultrow";
        }
    },
    columns: [
        {xtype: 'actioncolumn', menuDisabled:true, resizable:false, sortable:false, width: 30,
            items: [{
                getClass: function( view, meta, record){
                    if (record.get('action')===2){
                        return 'x-fas fa-plus-circle';
                    }else{
                        if (record.get('isnew')===0 || (record.get('isnew')===1 && record.get('nominativo')!=='')){
                            return 'x-fas fa-minus-circle';
                        }
                    }
                    return 'x-fas fa-plus-circle';
                },
                handler: function (view, rowIndex, colIndex, item, event, record) {
                    let vm = this.lookupViewModel()
                    let rec=vm.get('record');
                    if (vm.get('readOnly') || rec.data.modifica==='N') {
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
                            if (record.data.nominativo!=='') {
                                let vm = this.lookupViewModel()
                                let rec = vm.get('record')
                                rec.data.storeContatti = rec.data.storeContatti.filter(obj=>obj.id!==record.data.id) //lo rimuovo dal record backend
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
        },
        {text: Locale.t('eve.forms.scheda.gridcontatti.suffisso'), menuDisabled:true, resizable:false, sortable:false,
                dataIndex: 'suffisso', width:100,
                getEditor: function () {
                    let vm = this.lookupViewModel()
                    let rec=vm.get('record');
                    if (vm.get('readOnly') || rec.data.modifica==='N') {
                        return false
                    }
                    return {
                        xtype: 'combo', queryMode: 'local',displayField: 'descrizione',forceSelection:true,
                        store: Ext.create('eve.store.forms.scheda.Suffisso')
                    }
                }
            },
        {text: Locale.t('eve.forms.scheda.gridcontatti.nominativo'), flex: 1, menuDisabled: true, resizable: false, sortable: false, dataIndex: 'nominativo',
                getEditor: function () {
                    let vm = this.lookupViewModel()
                    let rec=vm.get('record');
                    if (vm.get('readOnly') || rec.data.modifica==='N') {
                        return false
                    }
                    return {xtype: 'textfield', allowBlank:false, blankText: Locale.t('global.blanktext'),
                        listeners: {
                            blur :function(campo) {
                                let vm = this.lookupViewModel()
                                let rec = vm.get('record')
                                let grid = campo.up('grid')
                                let row = grid.getSelectionModel().getSelection()[0];
                                grid.getView().refreshNode(row)
                                let lastrecord = grid.getStore().last()
                                if (lastrecord === row && campo.value!=='') {
                                    rec.data.storeContatti.push(row.data) //lo metto nel record backend
                                    grid.getStore().add(Ext.create('eve.model.forms.scheda.GridContatti', {
                                        action: 1, isnew: 1, id: bdFunctions.bpRandomString(32),
                                        idrecord: rec.data.id, idmansione:'',suffisso: '', nominativo: '',  email: ''
                                    }))
                                }
                            }
                        }
                    }
                }
            },
        {text: Locale.t('eve.forms.scheda.gridcontatti.mansione'), width:300, menuDisabled: true, resizable: false, sortable: false, dataIndex: 'mansione',
            getEditor: function () {
                let vm = this.lookupViewModel()
                let rec=vm.get('record');
                if (vm.get('readOnly') || rec.data.modifica==='N') {
                    return false
                }
                return {
                    xtype: 'combo',queryMode: 'local', displayField: 'mansione', forceSelection:true,
                    bind: {store: '{storeMansioni}'},
                    listeners: {
                        select: function (cmb,record) {
                            let grid = cmb.up('grid')
                            let row = grid.getSelectionModel().getSelection()[0];
                            row.data['idmansione'] = record.data['id'];
                            grid.getView().refreshNode(row)
                            let task = new Ext.util.DelayedTask(function (cmb) {
                                cmb.ownerCt.completeEdit();
                            }, this, [cmb])
                            task.delay(100)
                        },
                        beforequery: function (qe) {
                            delete qe.combo.lastQuery;
                        }
                    }
                }
            }
            },
        {text: Locale.t('eve.forms.scheda.gridcontatti.email'), width:300, menuDisabled: true, resizable: false, sortable: false, dataIndex: 'email',
            getEditor: function () {
                let vm = this.lookupViewModel()
                let rec=vm.get('record');
                if (vm.get('readOnly') || rec.data.modifica==='N') {
                    return false
                }
                return {xtype: 'textfield', vtype:'email'}
            }
            }
        ]
});