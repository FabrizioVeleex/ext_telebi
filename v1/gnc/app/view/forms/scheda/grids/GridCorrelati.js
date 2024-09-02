/**
 * Created by luke on 22/05/21.
 */
Ext.define('gnc.view.forms.scheda.grids.GridCorrelati', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.data.ArrayStore',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Text',
        'Ext.grid.ActionColumn',
        'Ext.grid.plugin.CellEditing',
        'gnc.model.forms.scheda.ComboCorrelati',
        'gnc.model.forms.scheda.GridCorrelati',
        'gnc.store.forms.scheda.ComboCorrelati',
        'portal.util.Functions'
    ],
    minHeight:100,
    store: new Ext.data.ArrayStore({
        model:'gnc.model.forms.scheda.GridCorrelati'
    }),
    selType: 'cellmodel',
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1,
    },
    scrollable:'y',
    viewConfig:{
        emptyText: Locale.t('global.grid.empty'),
        getRowClass: function(record){
            return (record.get('action')===2) ? "bd-deleterow bd-defaultrow" : "bd-defaultrow";
        }
    },
    columns: [
        {xtype: 'actioncolumn', menuDisabled:true, resizable:false, sortable:false, width: 30,
            items: [{
                getClass: function( view, meta, record){
                    let vm = this.lookupViewModel()
                    if (vm.get('readOnlyIstituzionalize') || record.data.codice==='') {
                        return 'bd-action-null'
                    }
                    if (record.get('action')===2){
                        return 'x-fas fa-trash bd-color-green'
                    }
                    return 'x-fas fa-trash bd-color-red'
                },
                handler: function (view, rowIndex, colIndex, item, event, record) {
                    let vm = this.lookupViewModel()
                    if (vm.get('readOnlyIstituzionalize')) {
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
                            rec.data.correlati = rec.data.correlati.filter(obj=>obj.id!==record.data.id) //lo rimuovo dal record backend
                            if(lastrecord!==record){
                                view.getStore().remove(record)
                            } else {
                                view.getStore().remove(lastrecord)
                            }
                        }
                    }
                }
            }]
        },
        {text: Locale.t('gnc.forms.scheda.grids.correlati.cdcom1'), dataIndex: 'cdcom1',width:100,
            getEditor: function (record) {
                let vm = this.lookupViewModel()
                if (vm.get('readOnlyIstituzionalize') === true || record.data.isnew===0) {
                    return false
                }
                let store = Ext.create('gnc.store.forms.scheda.ComboCorrelati');
                return {
                    xtype: 'combo', width:300,displayField: 'cdcom1',hideTrigger: true, minChars: 3,
                    store: store, selectOnFocus: true, matchFieldWidth:false,
                    tpl: Ext.create('Ext.XTemplate',
                        '<ul class="x-list-plain"><tpl for=".">',
                        '<li role="option" class="x-boundlist-item" style="border-bottom: 1px solid black"><b>Prodotto</b>: {cdcom1} - {depar}<br></li>',
                        '</tpl></ul>'
                    ),
                    listConfig: {emptyText: Locale.t('global.form.combo.combo')},
                    listeners: {
                        select: function (cmb,record) {
                            let vm = this.lookupViewModel()
                            let rec = vm.get('record')
                            let grid = cmb.up('grid')
                            let row = grid.getSelectionModel().getSelection()[0];
                            row.data['codice'] = record.data['cdpar'];
                            row.data['depar'] = record.data['depar'];
                            grid.getView().refreshNode(row)
                            let task = new Ext.util.DelayedTask(function (cmb) {
                                cmb.ownerCt.completeEdit();
                            }, this, [cmb])
                            task.delay(100)
                            let lastrecord = grid.getStore().last()
                            if (lastrecord === row) {
                                rec.data.correlati.push(row.data) //lo metto nel record backend
                                grid.getStore().add(Ext.create('gnc.model.forms.scheda.ComboCorrelati', {
                                    action: 1, isnew: 1, id: bdFunctions.bpRandomString(32),
                                    codice: '', cdcom1: '', depar: '',notecorr:''
                                }))
                            }
                        },
                        beforequery: function (qe) {
                            delete qe.combo.lastQuery;
                        }
                    }
                }
            }
        },
        {text: Locale.t('gnc.forms.scheda.grids.correlati.depar'), dataIndex: 'depar',width:500},
        {text: Locale.t('gnc.forms.scheda.grids.correlati.notecorr'), dataIndex: 'notecorr',flex:1,
            getEditor: function () {
                let vm = this.lookupViewModel()
                if (vm.get('readOnlyIstituzionalize')=== true) {
                    return false
                }
                return {xtype: 'textfield',maxLength: 250, maxLengthText: Locale.t('global.form.maxlengthtext')}
            }
        }
    ]
});