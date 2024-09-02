/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wvoi.GridUtenti', {
    extend: 'Ext.grid.Panel',
    xtype: 'v1-wvoi-gridUtenti',
    requires:[
        'Ext.grid.column.Action',
        'Ext.grid.plugin.CellEditing',
        'Ext.form.field.Text'
    ],
    padding:10,
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1
    },
    viewConfig:{
        getRowClass: function(record){
            return (record.get('action')==2) ? "bd-deleterow" : "";
        }
    },
    columns: [
        {xtype: 'actioncolumn',
            menuDisabled:true,
            resizable:false,
            sortable:false,
            width: 30,
            items: [{
                getClass: function( view, meta, record ){
                    if (record.get('action')==2){
                        return 'x-fas fa-plus-circle';
                    }else{
                        if (record.get('isnew')==0 || (record.get('isnew')==1 && record.get('codice')!='')){
                            return 'x-fas fa-minus-circle';
                        }
                    }
                    return 'x-fas fa-user-plus';
                },
                handler: 'onRemoveUtente'
            }]
        },
        {text: Locale.t('widgetvoice.utenti.column.codice'),
            menuDisabled:true, resizable:false, sortable:false,
            dataIndex: 'codice', width:100,
            getEditor: function () {
                return {xtype: 'textfield',listeners: {
                    blur :'onBlurAddcodice'//aggiunge riga vuota dopo inserimento nome
                }}
            }
        },
        {text: Locale.t('widgetvoice.utenti.column.nome'),
            menuDisabled: true, resizable: false, sortable: false,
            dataIndex: 'nome', flex: 1,
            getEditor: function () {
                return {xtype: 'textfield'}
            }
        },
        {text: Locale.t('widgetvoice.utenti.column.cognome'),
            menuDisabled: true, resizable: false, sortable: false,
            dataIndex: 'cognome', flex: 1,
            getEditor: function () {
                return {xtype: 'textfield'}
            }
        },
        {text: Locale.t('widgetvoice.utenti.column.badge'),
            menuDisabled: true, resizable: false, sortable: false,
            dataIndex: 'badge', flex: 1,
            getEditor: function () {
                return {xtype: 'textfield'}
            }
        }
    ],
    listeners:{
        afterRender:'onAfterRenderWinUtenti'
    }
});
