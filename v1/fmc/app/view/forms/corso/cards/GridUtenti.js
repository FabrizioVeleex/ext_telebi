/**
 * Created by luca on 17/06/2017.
 */
Ext.define('fmc.view.forms.corso.cards.GridUtenti', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.form.field.ComboBox',
        'Ext.grid.ActionColumn',
        'Ext.grid.plugin.CellEditing',
        'fmc.model.forms.corso.GridUtenti',
        'portal.util.Functions'
    ],
    minHeight: 120,
    bind: {
        store: '{storeUtenti}'
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
                        lastrecord = store.last();
                    if (vm.get('readOnly')) {
                        return false;
                    }
                    if(lastrecord===record){
                        return 'x-fas fa-plus-circle';
                    }else{
                        if (record.get('action') === 2) {
                            return 'x-fas fa-plus-circle';
                        } else {
                            if (record.get('isnew') === 1 && record.get('idutente') === ''){
                                return 'x-fas fa-plus-circle';
                            }
                        }
                        return 'x-fas fa-minus-circle';
                    }
                },
                handler: function(view, rowIndex, colIndex, item, event, record){
                    let vm = this.lookupViewModel(),
                        grid = view.up('grid'),
                        lastrecord = grid.getStore().last();
                    if (vm.get('readOnly')) {
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
        {text: Locale.t('fmc.forms.corso.gridutenti.nominativo'),
            width:500, menuDisabled: true, resizable: false, sortable: false,
            dataIndex: 'nomecognome',
            getEditor: function(record) {
                let vm = this.lookupViewModel()
                if (vm.get('readOnly')) {
                    return false;
                }
                if (record.data.isnew===0) {
                    return false;
                }
                return Ext.create('Ext.form.ComboBox', {
                    anchor: '100%',
                    bind:{
                        store: '{comboUtenti}',
                    },
                    displayField: 'nomecognome', hideTrigger: false, minChars: 3, selectOnFocus: true, forceSelection: true,
                    tpl: Ext.create('Ext.XTemplate',
                        '<ul class="x-list-plain"><tpl for=".">',
                        '<li role="option" class="x-boundlist-item">{nomecognome}</li>',
                        '</tpl></ul>'
                    ),
                    listeners: {
                        select: function (combo,record) {
                            let vm = this.lookupViewModel(), rec=vm.get('record')
                            let grid = combo.up('grid')
                            let lastrecord = grid.getStore().last();
                            let row = grid.getSelectionModel().getSelection()[0]
                            if (row) {
                                row.data.idutente = record.data.id //id collaboratore
                                row.data.idrecord = rec.data.id //id corso
                            }
                            grid.getView().refreshNode(row);
                            if (lastrecord === row) {
                                grid.getStore().add(Ext.create('fmc.model.forms.corso.GridUtenti', {
                                    action: 1, isnew: 1, id: bdFunctions.bpRandomString(32), idutente:'',nomecognome:'',firma:''
                                }));
                            }
                        },
                        beforequery: function (qe) {
                            delete qe.combo.lastQuery;
                        }
                    }
                });
            }
        },
        {xtype: 'actioncolumn', menuDisabled:true, resizable:false, sortable:false,
            width: 30,
            items: [{
                getClass: function(view, meta, record){
                    if (record.get('readOnly')===true) {
                        return null;
                    }
                    meta.tdAttr = 'data-qtip="' + Locale.t('corso.firmautente')+'"';
                    return 'x-fas fa-pencil-alt';
                },
                handler: 'onFirmaUtente'
            }]
        },
        {text: Locale.t('fmc.forms.corso.gridutenti.firma'),headerWrap:true,
            flex:1, menuDisabled: true, resizable: false, sortable: false,
            dataIndex: 'firma',
            renderer: function(value,meta,record){
                if (value) {
                    return '<img src="/v1/getfirmauser/'+record.data.idrecord+'&'+value+'.png?dc=' + new Date().getTime()+'" width="300" height="23"  alt="Firma"/></src>';
                }
            }
        },
        {xtype: 'actioncolumn', menuDisabled:true, resizable:false, sortable:false,
            width: 30,
            items: [{
                getClass: function(view, meta, record){
                    if (record.get('readOnly')===true) {
                        return null;
                    }
                    if (record.get('isnew')===1) {
                        return null;
                    }
                    meta.tdAttr = 'data-qtip="' + Locale.t('fmc.forms.corso.gridutenti.pdfuser')+'"';
                    return 'x-fas fa-file-pdf bd-color-red';
                },
                handler: 'onGeneraPdf'
            }]
        }
    ]
});