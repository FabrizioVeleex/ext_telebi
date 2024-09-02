/**
 * Created by luke on 19/11/2019.
 */
Ext.define('fmc.view.forms.mansione.cards.GridModelli', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.form.field.ComboBox',
        'Ext.grid.ActionColumn',
        'Ext.grid.plugin.CellEditing',
        'fmc.model.forms.mansione.ModelliCombo',
        'fmc.store.forms.mansione.ModelliCombo',
        'portal.util.Functions'
    ],
    minHeight: 120,
    bind: {
        store: '{storeModelli}'
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
    columns: [{
        xtype: 'actioncolumn',
        menuDisabled:true,
        resizable:false,
        sortable:false,
        width: 30,
        items: [{
            getClass: function( view, meta, record){
                if (record.get('action')===2){
                    return 'x-fas fa-plus-circle';
                }else{
                    if (record.get('isnew')===0 || (record.get('isnew')===1 && record.get('idmodello')!=='')){
                        return 'x-fas fa-minus-circle';
                    }
                }
                return 'x-fas fa-user-plus';
            },
            handler: function (view, rowIndex, colIndex, item, event, record) {
                let vm = this.lookupViewModel()
                if (vm.get('readOnly')) {
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
                        let vm = this.lookupViewModel()
                        let rec = vm.get('record')
                        rec.data.gridmodelli = rec.data.gridmodelli.filter(obj=>obj.id!==record.data.id) //lo rimuovo dal record backend
                        if(lastrecord!==record){
                            view.getStore().remove(record)
                        } else {
                            view.getStore().remove(lastrecord)
                        }
                    }
                }
            }
        }]
    },{
        text: Locale.t('fmc.forms.mansione.gridmodelli.titolo'),
        flex:1, menuDisabled: true, resizable: false, sortable: false,
        dataIndex: 'titolo',
        renderer: function(value){
            if (value===''){
                return  Locale.t('fmc.forms.mansione.emptycorso');
            }else{
                return value;
            }
        },
        getEditor: function (record) {
            //se non è nuovo non faccio editare il campo
            if (record.get('isnew')===0){
                return false;
            }
            let store = Ext.create('fmc.store.forms.mansione.ModelliCombo');
            return {
                xtype: 'combo',width:300, store: store, displayField: 'descrizione',
                minChars: 3, selectOnFocus: true,
                tpl: Ext.create('Ext.XTemplate',
                    '<ul class="x-list-plain"><tpl for=".">',
                    '<li role="option" class="x-boundlist-item">{descrizione}</li>',
                    '</tpl></ul>'
                ),
                listConfig: {loadingText: Locale.t('global.ricerca')+'...', emptyText: Locale.t('global.empty')},
                listeners: {
                    select: function (cmb,record) {
                        let vm = this.lookupViewModel()
                        let rec = vm.get('record')
                        let grid = cmb.up('grid')
                        let row = grid.getSelectionModel().getSelection()[0];
                        row.data['idmodello'] = record.data['id'];
                        grid.getView().refreshNode(row)
                        let task = new Ext.util.DelayedTask(function (cmb) {
                            cmb.ownerCt.completeEdit();
                        }, this, [cmb])
                        task.delay(100)
                        let lastrecord = grid.getStore().last()
                        if (lastrecord === row) {
                            rec.data.gridmodelli.push(row.data) //lo metto nel record backend
                            grid.getStore().add(Ext.create('fmc.model.forms.mansione.ModelliCombo', {
                                action: 1, isnew: 1, id: bdFunctions.bpRandomString(32),
                                descrizione:'',idmodello:''
                            }))
                        }
                    },
                    beforequery: function (qe) {
                        delete qe.combo.lastQuery;
                    }
                }
            }
        }
    }
    ],
    items: []
});