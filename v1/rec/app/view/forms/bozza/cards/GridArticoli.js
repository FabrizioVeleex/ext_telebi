/**
 * Created by luca on 17/03/2017.
 */
Ext.define('rec.view.forms.bozza.cards.GridArticoli', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.form.field.ComboBox',
        'Ext.form.field.Text',
        'Ext.grid.column.Action',
        'Ext.grid.column.Date',
        'Ext.grid.plugin.CellEditing',
        'rec.model.forms.reso.GridArticoli'
    ],
    minHeight: 120,
    bind: {
        store: '{gridArticoli}'
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
    columns: [
        {xtype: 'actioncolumn', menuDisabled:true, resizable:false, sortable:false, width: 30,
            items: [{
                getClass: function(view, meta, record, rowIndex, colIndex, store){
                    let vm = this.lookupViewModel(),
                        gestore = vm.get('gestore'),
                        lastrecord = store.last()
                    if (gestore === false) {
                        return false;
                    }
                    if(lastrecord===record){
                        return 'x-fas fa-plus-circle';
                    }else{
                        if (record.get('action') === 2) {
                            return 'x-fas fa-plus-circle';
                        } else {
                            if (record.get('isnew') === 1 && record.get('cdars') === ''){
                                return 'x-fas fa-plus-circle';
                            }
                        }
                        return 'x-fas fa-minus-circle';
                    }
                },
                handler: function(view, rowIndex, colIndex, item, event, record){
                    let vm = this.lookupViewModel(),
                        gestore = vm.get('gestore'),
                        grid = view.up('grid'),
                        lastrecord = grid.getStore().last()
                    if (gestore === false) {
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
        {text: Locale.t('rec.forms.bozza.gridarticoli.depar'), flex:1, menuDisabled: true, dataIndex: 'depar',
            getEditor: function () {
                return {
                    xtype: 'combo',width:300,displayField: 'descrizione',
                    minChars: 3, selectOnFocus: true, forceSelection:true,allowBlank: false,matchFieldWidth:false,
                    listConfig: {loadingText: Locale.t('global.form.combo.ricerca')+'...', emptyText: Locale.t('global.grid.store.empty')},
                    bind: {
                        store: '{storeProdotti}'
                    },
                    listeners: {
                        beforequery: function (qe) {
                            let vm = this.lookupViewModel(),
                                rec = vm.get('record')
                            delete qe.combo.lastQuery
                            let storeprodotti=vm.get('storeProdotti')
                            if (storeprodotti) {
                                storeprodotti.getProxy().extraParams.cdcfs=rec.data.cdcli
                            }
                        },
                        select: function (combo, record) {
                            let grid = combo.up('grid')
                            let row = grid.getSelectionModel().getSelection()[0]
                            if (row) {
                                row.data.cdars = record.data['cdars']
                                //pulisco campi successivi
                                row.data.idrecord = ''
                                row.data.nrbos = ''
                                row.data.dtbos = ''
                                row.data.codcaus = ''
                                row.data.causale = ''
                            }
                            grid.getView().refreshNode(row)
                            let vm = this.lookupViewModel()
                            let storeDdt=vm.get('storeDdt')
                            if (storeDdt) {
                                storeDdt.getProxy().extraParams.cdars=record.data.cdars
                            }
                        }
                    }
                }
            }
        },
        {text: Locale.t('rec.forms.bozza.gridarticoli.nrbos'), width:150, menuDisabled: true, dataIndex: 'nrbos',
            getEditor: function () {
                return {
                    xtype: 'combo',width:150,displayField: 'descr',valueField:'nrbos',
                    minChars: 3, selectOnFocus: true,forceSelection:true,allowBlank: false,matchFieldWidth:false,
                    listConfig: {loadingText: Locale.t('global.form.combo.ricerca')+'...', emptyText: Locale.t('global.grid.store.empty')},
                    bind: {
                        store: '{storeDdt}'
                    },
                    listeners: {
                        beforequery: function (qe) {
                            let vm = this.lookupViewModel(),
                                rec = vm.get('record')
                            delete qe.combo.lastQuery
                            let grid = qe.combo.up('grid')
                            let row = grid.getSelectionModel().getSelection()[0]
                            let storeDdt=vm.get('storeDdt')
                            if (storeDdt) {
                                storeDdt.getProxy().extraParams.cdcfs=rec.data.cdcli
                                storeDdt.getProxy().extraParams.cdars=row.data.cdars
                            }
                        },
                        select: function (combo, record) {
                            let grid = combo.up('grid')
                            let row = grid.getSelectionModel().getSelection()[0]
                            if (row) {
                                row.data.idrecord = record.data['id']
                                row.data.dtbos = record.data['dtbos']
                                //pulisco campi successivi
                                row.data.codcaus = ''
                                row.data.causale = ''
                            }
                            grid.getView().refreshNode(row)
                            let vm = this.lookupViewModel()
                            let storeCausali=vm.get('storeCausali')
                            if (storeCausali) {
                                storeCausali.getProxy().extraParams.idbolla=record.data.id
                            }
                        }
                    }
                }
            }
        },
        {text: Locale.t('rec.forms.reso.gridarticoli.dtbos'), width:150, menuDisabled: true,
            dataIndex: 'dtbos',xtype: 'datecolumn', format: 'd/m/Y'
        },
        {text: Locale.t('rec.forms.bozza.gridarticoli.causale'), width:250, menuDisabled: true, dataIndex: 'causale',
            getEditor: function () {
                return {
                    xtype: 'combo',width:250,displayField: 'psdesc', minChars: 3, selectOnFocus: true,forceSelection:true,allowBlank: false,matchFieldWidth:false,
                    listConfig: {loadingText: Locale.t('global.form.combo.ricerca')+'...', emptyText: Locale.t('global.grid.store.empty')},
                    bind: {
                        store: '{storeCausali}'
                    },
                    listeners: {
                        select: function (combo, record) {
                            let grid = combo.up('grid')
                            let lastrecord = grid.getStore().last();
                            let row = grid.getSelectionModel().getSelection()[0]
                            if (row) {
                                row.data.codcaus = record.data['pscaus']
                            }
                            grid.getView().refreshNode(row)
                            let controller = this.lookupController()
                            if (lastrecord === row) {
                                grid.getStore().add(Ext.create('rec.model.forms.reso.GridArticoli', {
                                    id: controller.randomString(32),idtestata:'',idrecord:'',codcaus:'',pcdos:'',qta:1, action: 1, isnew: 1
                                }));
                            }
                        },
                        beforequery: function (qe) {
                            delete qe.combo.lastQuery
                            let grid = qe.combo.up('grid')
                            let row = grid.getSelectionModel().getSelection()[0]
                            let vm = this.lookupViewModel()
                            let storeCausali=vm.get('storeCausali')
                            if (storeCausali) {
                                storeCausali.getProxy().extraParams.idbolla=row.data.idrecord
                            }
                        }
                    }
                }
            }
        },
        {text: Locale.t('rec.forms.reso.gridarticoli.qta'), width:80, menuDisabled: true, dataIndex: 'qta'},
        {text: Locale.t('rec.forms.reso.gridarticoli.dossier'), width:200, menuDisabled: true, dataIndex: 'pcdos',
            getEditor: function () {
                return {xtype: 'textfield'}
            }
        }
    ]
})