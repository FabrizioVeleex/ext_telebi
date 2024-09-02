/**
 * Created by luca on 17/06/2017.
 */
Ext.define('ana.view.forms.sottocategoriaatv.cards.Gridriservatezze', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.form.field.ComboBox',
        'Ext.grid.ActionColumn',
        'Ext.grid.column.Check',
        'Ext.grid.plugin.CellEditing',
        'ana.model.forms.sottocategoriaatv.Gridrisorse'
    ],
    minHeight: 120,
    bind: {
        store: '{storeRisorse}'
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
                        lastrecord = store.last();
                    if (gestore === false) {
                        return false;
                    }
                    if(lastrecord===record){
                        return 'x-fas fa-plus-circle';
                    }else{
                        if (record.get('action') === 2) {
                            return 'x-fas fa-plus-circle';
                        } else {
                            if (record.get('isnew') === 1 && record.get('nome') === ''){
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
                        lastrecord = grid.getStore().last();
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
        {text: Locale.t('ana.forms.sottocategoriaatv.gridautorizzazioni.column.risorsa'),
            width:600, menuDisabled: true, resizable: false, sortable: false,
            dataIndex: 'cognomenome',
            getEditor: function(record) {
                let vm = this.lookupViewModel(),
                    gestore = vm.get('gestore')
                if (gestore === 0 || record.data.isnew===0) {
                    return false;
                }
                return Ext.create('Ext.form.ComboBox', {
                    anchor: '100%',
                    bind:{
                        store: '{comboUtente}',
                    },
                    displayField: 'nomecognome', hideTrigger: true, minChars: 3, selectOnFocus: true, forceSelection: true,
                    tpl: Ext.create('Ext.XTemplate',
                        '<ul class="x-list-plain"><tpl for=".">',
                        '<li role="option" class="x-boundlist-item">{nomecognome}</li>',
                        '</tpl></ul>'
                    ),
                    listeners: {
                        select: function (combo,record) {
                            let grid = combo.up('grid')
                            let lastrecord = grid.getStore().last();
                            let row = grid.getSelectionModel().getSelection()[0]
                            if (row) {
                                row.data.idrisorsa = record.data['id']
                            }
                            grid.getView().refreshNode(row);
                            if (lastrecord === row) {
                                grid.getStore().add(Ext.create('ana.model.forms.sottocategoriaatv.Gridrisorse', {
                                    idrisorsa: '', lettura:0, scrittura:0, elimina:0, action: 1, isnew: 1
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
        {width: 100, xtype: 'checkcolumn', text: Locale.t('ana.forms.sottocategoriaatv.gridautorizzazioni.column.lettura'), dataIndex: 'lettura',
            listeners: {
                beforecheckchange: function (me, rowIndex, checked, record) {
                    let vm = this.lookupViewModel();
                    if (vm.get('gestore') === false || record.data.idrisorsa === '') {
                        return false;
                    }
                }
            }
        },
        {width: 100, xtype: 'checkcolumn', text: Locale.t('ana.forms.sottocategoriaatv.gridautorizzazioni.column.scrittura'), dataIndex: 'scrittura',
            listeners: {
                beforecheckchange: function (me, rowIndex, checked, record) {
                    let vm = this.lookupViewModel();
                    if (vm.get('gestore') === false || record.data.idrisorsa === '') {
                        return false;
                    }
                }
            }
        },
        {width: 100, xtype: 'checkcolumn', text: Locale.t('ana.forms.sottocategoriaatv.gridautorizzazioni.column.elimina'), dataIndex: 'elimina',
            listeners: {
                beforecheckchange: function (me, rowIndex, checked, record) {
                    let vm = this.lookupViewModel();
                    if (vm.get('gestore') === false || record.data.idrisorsa === '') {
                        return false;
                    }
                }
            }
        }
    ]
});