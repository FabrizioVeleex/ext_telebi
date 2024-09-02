/**
 * Created by luca on 22/06/16.
 */
Ext.define('portal.view.cronology.CardCronologyController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.card-cronology',
    init: function() {

    },
    onAfterRender:function(){
        var me = this,
            vm = this.getViewModel(),
            store = vm.getStore('gridCronology'),
            id = this.getView().recordId,
            tabella = this.getView().tabella;

        if (this.getView().urlRest){
            store.getProxy().url = this.getView().urlRest
        }
        store.getProxy().extraParams.id=id;
        store.getProxy().extraParams.tabella=tabella;
        store.load();
    },
    onCloseCardCronology: function () {
        this.getView().fireEvent('closeCardCronology',this);
        this.getView().destroy(); //distruggo la finestra
    },
    onPress: function (btn,pressed) {
        this.getView().getPlugin('notePreview').toggleExpanded(pressed);
    }
});