/**
 * Created by luke on 22/05/21.
 */
Ext.define('gnc.view.forms.scheda.grids.GridCollaudo', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.data.ArrayStore',
        'Ext.form.field.ComboBox',
        'Ext.grid.ActionColumn',
        'Ext.grid.plugin.CellEditing',
        'gnc.model.forms.scheda.ComboFormazione',
        'gnc.model.forms.scheda.GridCollaudo',
        'gnc.store.forms.scheda.ComboCollaudo',
        'portal.util.Functions'
    ],
    minHeight:100,
    store: new Ext.data.ArrayStore({
        model:'gnc.model.forms.scheda.GridCollaudo'
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
                    if (vm.get('readOnlyValidation') || record.data.tipologia==='') {
                        return 'bd-action-null'
                    }
                    if (record.get('action')===2){
                        return 'x-fas fa-trash bd-color-green'
                    }
                    return 'x-fas fa-trash bd-color-red'
                },
                handler: function (view, rowIndex, colIndex, item, event, record) {
                    let vm = this.lookupViewModel()
                    if (vm.get('readOnlyValidation')) {
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
                            rec.data.collaudo = rec.data.collaudo.filter(obj=>obj.id!==record.data.id) //lo rimuovo dal record backend
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
        {xtype: 'actioncolumn', width: 30, menuDisabled:true,
            items: [{
                getClass: function( view, meta, record){
                    let vm = this.lookupViewModel()
                    if (record.data.isnew===1) {
                        return 'bd-action-null'
                    }
                    return 'x-fas fa-eye'
                },
                handler: 'onOpenScheda'
            }]
        },
        {text: Locale.t('gnc.forms.scheda.grids.collaudo.numero'), dataIndex: 'numero',width:100,
            getEditor: function (record) {
                let vm = this.lookupViewModel()
                if (vm.get('readOnlyValidation') === true || record.data.isnew===0) {
                    return false
                }
                let store = Ext.create('gnc.store.forms.scheda.ComboCollaudo');
                return {
                    xtype: 'combo', width:300,displayField: 'numero', minChars: 3,
                    store: store, selectOnFocus: true, matchFieldWidth:false,forceSelection: true,
                    emptyText: Locale.t('gnc.forms.scheda.grids.combotext'),
                    tpl: Ext.create('Ext.XTemplate',
                        '<ul class="x-list-plain"><tpl for=".">',
                        '<li role="option" class="x-boundlist-item" style="border-bottom: 1px solid black"><b>Scheda</b>: {numero} - {tipologia}<br><b>Prodotto</b>: {codacr} - {articolo}<br><b>Fornitore</b>: {fornitore}<br><b>Stato</b>: {stato}</li>',
                        '</tpl></ul>'
                    ),
                    listeners: {
                        select: function (cmb,record) {
                            let vm = this.lookupViewModel()
                            let rec = vm.get('record')
                            let grid = cmb.up('grid')
                            let row = grid.getSelectionModel().getSelection()[0];
                            row.data['idscheda'] = record.data['id'];
                            row.data['tipologia'] = record.data['tipologia'];
                            row.data['codacr'] = record.data['codacr'];
                            row.data['articolo'] = record.data['articolo'];
                            row.data['fornitore'] = record.data['fornitore'];
                            row.data['stato'] = record.data['stato'];
                            grid.getView().refreshNode(row)
                            let task = new Ext.util.DelayedTask(function (cmb) {
                                cmb.ownerCt.completeEdit();
                            }, this, [cmb])
                            task.delay(100)
                            let lastrecord = grid.getStore().last()
                            if (lastrecord === row) {
                                rec.data.collaudo.push(row.data) //lo metto nel record backend
                                grid.getStore().add(Ext.create('gnc.model.forms.scheda.ComboFormazione', {
                                    action: 1, isnew: 1, id: bdFunctions.bpRandomString(32),
                                    numero: '', tipologia: '', codacr: '', articolo: '', fornitore: '',stato:'',idscheda:''
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
        {text: Locale.t('gnc.forms.scheda.grids.collaudo.tipologia'), dataIndex: 'tipologia', width: 100},
        {text: Locale.t('gnc.forms.scheda.grids.collaudo.codacr'), dataIndex: 'codacr', width: 100},
        {text: Locale.t('gnc.forms.scheda.grids.collaudo.articolo'), dataIndex: 'articolo', flex:1},
        {text: Locale.t('gnc.forms.scheda.grids.collaudo.fornitore'), dataIndex: 'fornitore',width:200},
        {text: Locale.t('gnc.forms.scheda.grids.collaudo.stato'), dataIndex: 'stato',width:200}
    ]
});