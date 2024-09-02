/**
 * Created by luke on 20/06/22.
 */
Ext.define('impexp.view.forms.importazione.cards.GridAllegati', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.ActionColumn',
        'Ext.grid.plugin.CellEditing'
    ],
    height:200,
    bind: {
        store: '{storeAllegati}'
    },
    selType: 'cellmodel',
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1,
    },
    scrollable:'y',
    viewConfig:{
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
                    let ctrl = this.lookupController()
                    view.getStore().remove(record)
                    if (ctrl) {
                        ctrl.uploadfile.show()
                    }
                }
            }]
        },
        {text:Locale.t('global.attach.columns.file'), dataIndex: 'file', flex:1}
    ]
});