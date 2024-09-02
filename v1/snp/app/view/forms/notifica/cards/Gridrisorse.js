/**
 * Created by luca on 17/06/2017.
 */
Ext.define('snp.view.forms.notifica.cards.Gridrisorse', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.form.field.ComboBox',
        'Ext.grid.ActionColumn',
        'Ext.grid.plugin.CellEditing',
        'snp.model.forms.notifica.Gridrisorse'
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
                        lastrecord = store.last();
                    if (vm.get('readOnlyRisorsa')) {
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
                        grid = view.up('grid'),
                        lastrecord = grid.getStore().last();
                    if (vm.get('readOnlyRisorsa')) {
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
        {text: Locale.t('snp.forms.notifica.gridrisorse.risorsa'),
            flex:1, menuDisabled: true, resizable: false, sortable: false,
            dataIndex: 'nomecognome',
            getEditor: function() {
                let vm = this.lookupViewModel()
                if (vm.get('readOnlyRisorsa')) {
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
                                grid.getStore().add(Ext.create('snp.model.forms.notifica.Gridrisorse', {
                                    idrisorsa: '', action: 1, isnew: 1
                                }));
                            }
                        },
                        beforequery: function (qe) {
                            delete qe.combo.lastQuery;
                        }
                    }
                });
            }
        }
    ]
});