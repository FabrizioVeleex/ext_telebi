/**
 * Created by fabrizio on 14/10/2021.
 */
Ext.define('sdc.view.forms.lista.cards.GridElenco', {
    extend: 'Ext.grid.Panel',
    alias:'store.v1-gridelenco',
    requires: [
        'Ext.form.field.Text',
        'Ext.grid.ActionColumn',
        'Ext.grid.plugin.CellEditing'
    ],
    minHeight: 350,
    selType: 'cellmodel',
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1
    },
    viewConfig:{
        emptyText: Locale.t('global.emptygrid'),
        enableTextSelection: true,
        getRowClass: function(record){
            return (record.get('action')===2) ? "bd-deleterow bd-defaultrow" : "bd-defaultrow";
        }
    },
    columns: [{
        bind:{
            hidden:'{readOnly}'
        },
        xtype: 'actioncolumn',
        menuDisabled:true,
        resizable:false,
        sortable:false,
        width: 30,
        items: [{
            getClass: function( view, meta, record){
                if (record.get('action')===2){
                    meta.tdAttr = 'data-qtip="'+Locale.t('sdc.forms.lista.gridelenco.ripristina')+'"';
                    return 'x-fas fa-trash bd-color-red';
                }else{
                    if (record.get('isnew')===0 || (record.get('isnew')===1 && record.get('nominativo')!=='')){
                        meta.tdAttr = 'data-qtip="'+Locale.t('sdc.forms.lista.gridelenco.rimuovi')+'"';
                        return 'x-fas fa-trash bd-color-blue';
                    }
                }
                meta.tdAttr = 'data-qtip="'+Locale.t('sdc.forms.lista.gridelenco.aggiungi')+'"';
                return 'x-fas fa-arrow-right bd-color-green';
            },
            handler: function (view, rowIndex, colIndex, item, event, record) {
                let vm = this.lookupViewModel(),
                    grid = view.up('grid'),
                    store=vm.get('storeElenco'),
                    lastrecord = grid.getStore().last();
                if (record.get('action') === 2) {
                    // record.set('action', 0)
                    store.getAt(rowIndex).set('action',0)
                } else {
                    if (record.data.isnew === 0) {
                        // record.set('action', 2)
                        store.getAt(rowIndex).set('action',2)
                    } else {
                        if(lastrecord!==record){
                            view.getStore().remove(record);
                        }
                    }
                }

            }
        }]
    }, {text: Locale.t('sdc.forms.lista.gridelenco.nominativo'), flex:1, menuDisabled: true, resizable: false, sortable: false, dataIndex: 'nominativo',
            getEditor: function (record) {
                if (record.get('isread')) return;
                return {
                    xtype: 'textfield',width:300
                }
            }
        },
        {text: Locale.t('sdc.forms.lista.gridelenco.email'), flex:1, menuDisabled: true, resizable: false, sortable: false, dataIndex: 'email',
            getEditor: function (record) {
                if (record.get('isread')) return;
                return {
                    xtype: 'textfield',width:300,vtype:'email',
                    listeners: {
                        blur :'onblurNominativo',
                        beforequery: function (qe) {
                            delete qe.combo.lastQuery;
                        }
                    }
                }
            }
        }
    ]
});