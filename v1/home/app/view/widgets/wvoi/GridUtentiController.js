/**
 * Created by luca on 14/10/16.
 */
Ext.define('home.view.widgets.wvoi.GridUtentiController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.wvoigridutenti',
    requires:[
        'home.model.widgets.wvoi.GridUtenti'
    ],

    /**
     * Called when the view is created
     */
    init: function() {

    },
    onRemoveUtente: function(view, rowIndex, colIndex, item, event, record){
        var grid = this.lookupReference('gridwvoiutenti');
        if (record.get('action') == 2) { // de era rimosso lo ripristino
            record.set('action', 0);
        } else {
            if (record.get('isnew') == 0) { // è già resente
                record.set('action', 2); //rimuovo
            }
            if (record.get('isnew') == 1 && record.get('codice') != '') { //è nuovo ed ha un valore inserito
                var position = grid.el.dom.scrollTop;
                view.getStore().remove(record);
                grid.el.dom.scrollTop = position;
            }
        }
    },
    onCloseUtenti:function(){
        this.getView().close();
    },
    onSaveUtenti: function () {
        var me = this;
        var grid = this.lookupReference('gridwvoiutenti');
        var store = grid.getStore();
        var records=[];
        store.each(function(rec) {
            if (rec.data['codice']!=='' ) {
                records.push(rec.data);
            }
        });
        this.getView().el.mask(Locale.t('global.salvataggio'));
        Ext.Ajax.request({
            params:{'_fn': 'setStoreUtenti',records:Ext.encode(records)},
            url: Backend.API_WIDGET + 'WVOI/Main.php',
            success:function(record){
                var rec = Ext.decode(record.responseText);
                if (rec['success']===true){
                    me.getView().fireEvent('onCloseWinUtenti',grid);
                    me.getView().close();
                }else{
                    me.getView().el.unmask();
                    Ext.Msg.show({
                        title: Locale.t('global.attenzione'),
                        msg: rec['msg'],
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            }
        });
    },
    onBlurAddcodice: function(campo) {
        campo.ownerCt.completeEdit();
        var pannello = this.getView();
        var record = this.getViewModel().get('record');
        //posizione scroll del panel iniziale
        var position = pannello.el.dom.scrollTop;
        var gridutenti = this.lookupReference('gridwvoiutenti');
        var recordStore = gridutenti.getSelectionModel().getSelection()[0];
        var store = gridutenti.getStore();
        var lastrecord = store.last();
        //non ho selezionato niente
        if (recordStore && campo.value == null) {
            gridutenti.getStore().remove(recordStore);
            gridutenti.getView().refresh();
        }
        //verifico se devo aggiungete una nuova riga
        if (lastrecord && lastrecord.data['codice'] !== '') {
            store.add(Ext.create('home.model.widgets.wvoi.GridUtenti', {
                action: 1, isnew: 1,
                codice:'',nome:''
            }));
        }
        pannello.el.dom.scrollTop = position;
        //aggiungo ruolo alla combo autorizzazioni
    },
    onAfterRenderWinUtenti: function(grid){
        var store = grid.getStore();
        store.load(function(r){
            store.add(Ext.create('home.model.widgets.wvoi.GridUtenti', {
                isnew: 1,
                action: 1
            }));
        });
    }
});