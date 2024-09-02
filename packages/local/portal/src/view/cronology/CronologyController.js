/**
 * Created by luca on 22/06/16.
 */
Ext.define('portal.view.cronology.CronologyController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cronology',
    requires:[
        'portal.store.cronology.Cronology'
    ],
    /**
     * Called when the view is created
     */
    init: function() {

    },
    //Finestra cronologia
    onRender:function(){
       var store=Ext.create('portal.store.cronology.Cronology'); //creo lo store
       var record = this.getView().record;
        if (this.getView().urlRest){
            store.getProxy().url = this.getView().urlRest
        }
        store.getProxy().extraParams.extra=this.getView().extra; //personalizzazione
        store.getProxy().extraParams.id=record.data.id;//carico dati backend passando l'id record
        store.getProxy().extraParams.tabella=this.getView().tabella; //nome tabella
        store.load();
       var grid=this.getView().lookupReference('gridCron'); //recupero la vista
       grid.setStore(store); //passo lo store alla vista
    },
    onClose: function () {
        this.getView().destroy(); //distruggo la finestra
    },
    onPress: function (btn,pressed) {
        var grid=this.getView().lookupReference('gridCron'); //recupero la vista
        grid.getPlugin('notePreview').toggleExpanded(pressed);
    }
});