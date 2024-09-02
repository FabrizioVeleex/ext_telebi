/**
 * Created by luke on 26/08/21.
 */
Ext.define('home.view.dashboard.widgets.wcon.view.riservati.Grid', {
    extend: 'Ext.grid.Panel',
    requires:[
        'Ext.button.Button',
        'Ext.form.ComboBox',
        'Ext.grid.CellEditor',
        'Ext.grid.column.Action',
        'Ext.grid.plugin.CellEditing',
        'home.view.dashboard.widgets.wcon.model.GridRiservati',
        'home.view.dashboard.widgets.wcon.view.riservati.Controller',
        'home.view.dashboard.widgets.wcon.view.riservati.Model'
    ],
    controller:'v1-wconriservati',
    viewModel:'v1-wconriservati',
    bind: {
        store: '{storeRiservati}'
    },
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1
    },
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            {xtype: 'button' ,
                ui:'ocra',
                iconCls:'fas fa-times',
                text: Locale.t('wcon.gridconfig.close'),
                handler: 'onCloseGrid'
            },
            {
                text: Locale.t('wcon.gridconfig.save'),
                iconCls: 'fas fa-pencil-alt',
                ui: 'green',
                handler: 'onSaveGrid'
            }
        ]
    }],
    viewConfig:{
        getRowClass: function(record){
            return (record.get('action')===2) ? "bd-deleterow" : "";
        }
    },
    columns: [
        {
            xtype: 'actioncolumn',
            menuDisabled:true,
            resizable:false,
            sortable:false,
            width: 30,
            items: [{
                getClass: function( view, meta, record ){
                    if (record.get('action')===2){
                        return 'x-fa fa-plus-circle';
                    }else{
                        if (record.get('isnew')===0 || (record.get('isnew')===1 && record.get('codice')!=='')){
                            return 'x-fas fa-minus-circle';
                        }
                    }
                    return 'x-fas fa-user-plus';
                },
                handler: function(view, rowIndex, colIndex, item, event, record){
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
        {
            text: Locale.t('wcon.riservati.codice'),
            menuDisabled:true,
            resizable:false,
            sortable:false,
            dataIndex: 'codice',
            width:300,
            getEditor: function(record) {
                if (record.get('isnew')===0){
                    return false;
                }
                return Ext.create('Ext.grid.CellEditor', {
                    field: Ext.create('Ext.form.ComboBox', {
                        anchor: '100%',
                         bind:{
                            store: '{comboEsclusi}'
                         },
                        displayField: 'codice',
                        hideTrigger: true,
                        minChars: 3,
                        recordStore: record,
                        selectOnFocus: true,
                        forceSelection: true,
                        tpl: Ext.create('Ext.XTemplate',
                            '<ul class="x-list-plain"><tpl for=".">',
                            '<li role="option" class="x-boundlist-item">{codice} - {ragsoc}</li>',
                            '</tpl></ul>'
                        ),
                        listConfig: {
                            loadingText: Locale.t('global.btn.ricerca') + '...',
                            emptyText: Locale.t('global.grid.store.empty')
                        },
                        listeners: {
                            select: function (combo, record) {
                                let grid = combo.up('grid')
                                let row = grid.getSelectionModel().getSelection()[0]
                                if (row) {
                                    row.data.ragsoc = record.data['ragsoc']
                                }
                                grid.getView().refreshNode(row)
                                //creo nuovo record
                                grid.getStore().add(Ext.create('home.view.dashboard.widgets.wcon.model.GridRiservati', {
                                    codice:'',ragsoc:'', action: 1, isnew: 1
                                }));
                            },
                            beforequery: function (qe) {
                                delete qe.combo.lastQuery;
                            }
                        }
                    })
                })
            }
        },
        {text: Locale.t('wcon.riservati.ragsoc'), menuDisabled: true,
            resizable: false, sortable: false, dataIndex: 'ragsoc', flex: 1
        }
    ],
    listeners:{
        afterRender:'onAfterRender'
    }
});