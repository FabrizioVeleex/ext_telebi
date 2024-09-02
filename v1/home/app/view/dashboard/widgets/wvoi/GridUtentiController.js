/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wvoi.GridUtentiController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.v1-wvoigridutenti',
    requires:[
        'home.view.dashboard.widgets.wvoi.model.GridUtenti'
    ],

    init: function() {

    },
    onRemoveUtente: function(view, rowIndex, colIndex, item, event, record){
        let grid = this.lookupReference('gridwvoiutenti');
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
        let me = this;
        let grid = this.lookupReference('gridwvoiutenti');
        let store = grid.getStore();
        let records=[];
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
        let pannello = this.getView();
        let record = this.getViewModel().get('record');
        //posizione scroll del panel iniziale
        let position = pannello.el.dom.scrollTop;
        let gridutenti = this.lookupReference('gridwvoiutenti');
        let recordStore = gridutenti.getSelectionModel().getSelection()[0];
        let store = gridutenti.getStore();
        let lastrecord = store.last();
        //non ho selezionato niente
        if (recordStore && campo.value == null) {
            gridutenti.getStore().remove(recordStore);
            gridutenti.getView().refresh();
        }
        //verifico se devo aggiungete una nuova riga
        if (lastrecord && lastrecord.data['codice'] !== '') {
            store.add(Ext.create('home.view.dashboard.widgets.wvoi.model.GridUtenti', {
                action: 1, isnew: 1,
                codice:'',nome:''
            }));
        }
        pannello.el.dom.scrollTop = position;
        //aggiungo ruolo alla combo autorizzazioni
    },
    onAfterRenderWinUtenti: function(grid){
        let store = grid.getStore();
        store.load(function(r){
            store.add(Ext.create('home.view.dashboard.widgets.wvoi.model.GridUtenti', {
                isnew: 1,
                action: 1
            }));
        });
    }
});
