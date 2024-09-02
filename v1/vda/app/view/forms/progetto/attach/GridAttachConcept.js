/**
 * Created by luke on 22/05/21.
 */
Ext.define('vda.view.forms.progetto.attach.GridAttachConcept', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.form.field.Text',
        'Ext.grid.ActionColumn',
        'Ext.grid.column.Date',
        'Ext.grid.plugin.CellEditing',
        'portal.util.Functions'
    ],
    height:200,
    bind: {
        store: '{storeAttachConcept}'
    },
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
                    if (record.get('readOnlyAttach')==='true') {
                        return 'bd-action-null'
                    }
                    if (record.get('action')===2){
                        return 'x-fas fa-trash bd-color-green'
                    }
                    return 'x-fas fa-trash bd-color-red'
                },
                handler: function (view, rowIndex, colIndex, item, event, record) {
                    if (record.get('readOnlyAttach')==='true') {
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
        {xtype:'actioncolumn', width:30,
            items: [
                {getClass: function (view, meta, record) {
                    if (record.data.hideDownload==='true') {
                        return 'bd-action-null'
                    }
                    return 'x-fas fa-download';
                    },
                    getTip: function (v, meta, record) {
                         if (record.data.hideDownload==='true') {
                             return ''
                        }
                        return Locale.t('global.download.startdownload')+': <b>' + record.get('file') + '</b>';
                    },
                    handler: 'onGetAttach'
                }
            ]
        },
        {xtype: 'actioncolumn', width: 20, menuDisabled: true, fixed: true,
            items: [{
                getClass: function (v, meta, record) {
                    let icona=record.get('estensione').replace(".", "");
                    return 'icon-'+icona;
                },
                handler: 'onOpenImage'
            }]
        },
        {text:Locale.t('global.attach.columns.file'), dataIndex: 'file', width:400},
        {text: Locale.t('global.attach.columns.descrizione'),flex:1, dataIndex: 'descrizione',
            getEditor: function (rec) {
                if (rec.get('readOnlyAttach')==='true') {
                    return false
                }
                return {xtype: 'textfield',maxLength: 250, maxLengthText: Locale.t('global.form.maxlengthtext')}
            }
        },
        {text: Locale.t('global.attach.columns.creationdate'), dataIndex: 'creationdate', width: 100, xtype: 'datecolumn', format: 'd/m/Y'},
        {text:Locale.t('global.attach.columns.autore'), dataIndex: 'autore',width:200},
        {text:Locale.t('global.attach.columns.dimensione'), dataIndex: 'dimensione',width:100,
            renderer:function(value){
                return bdFunctions.sizeformat(value)
            },
            sortable:false
        }
    ]
});