/**
 * Created by luke on 15/02/21.
 */
Ext.define('ana.view.forms.fascicolo.cards.Gridschede', {
    extend: 'Ext.grid.Panel',
    mixins: ['portal.v1.global.Util'],
    requires: [
        'Ext.form.field.Text',
        'Ext.grid.ActionColumn',
        'Ext.grid.plugin.CellEditing',
        'ana.model.forms.fascicolo.Gridschede'
    ],
    minHeight: 120,
    bind: {
        store: '{storeSchede}'
    },
    selType: 'cellmodel',
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1
    },
    viewConfig:{
        getRowClass: function (record) {
            let css = ''
            if (record.get('action')===2){
                css +="bd-deleterow bd-defaultrow ";
            }else{
                css +="bd-defaultrow ";

            }
            return css
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
        {text: Locale.t('ana.forms.fascicolo.gridschede.column.nome'),
            width:600, menuDisabled: true, resizable: false, sortable: false,
            dataIndex: 'nome',
            getEditor: function () {
                let vm = this.lookupViewModel(),
                    gestore = vm.get('gestore'),
                    rec = vm.get('record')

                if (gestore === 0) {
                    return false;
                }
                return {xtype: 'textfield',
                    listeners: {
                        specialkey : function(campo,e) {
                            if (e.getKey() === e.ENTER || e.getKey() === e.TAB) {
                                let grid = campo.up('grid')
                                let lastrecord = grid.getStore().last();
                                let row = grid.getSelectionModel().getSelection()[0]
                                grid.getView().refreshNode(row);
                                let value = grid.editingPlugin.getActiveEditor().field.value //recupero valore dell'editor
                                if (value!=='' && lastrecord === row) {
                                    grid.getStore().add(Ext.create('ana.model.forms.fascicolo.Gridschede'));
                                }
                            }
                        }
                    }
                }
            }
        }
    ]
});