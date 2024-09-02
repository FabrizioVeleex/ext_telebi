/**
 * Created by luke on 27/08/21.
 */
Ext.define('home.view.dashboard.widgets.wcon.view.note.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.v1-wconnote',
    mixins: ['portal.v1.global.Util'],
    requires: [
    ],
    /**
     * Called when the view is created
     */
    init: function() {

    },
    onAfterRender:function() {
        let me = this, vm = me.getViewModel(),recnote='',readOnlyNote=false,cdcli=''
        if (this.getView().note) { //recupero le note
            recnote=this.getView().note
        }
        if (this.getView().readOnlyNote) { //verifico se può modificare
            readOnlyNote=true
        }
        if (this.getView().cdcli) { //imposto il cliente
            cdcli=this.getView().cdcli
        }
        vm.set('cdcli', cdcli);
        vm.set('recnote', recnote);
        vm.set('readOnlyNote', readOnlyNote);
    },
    onClosePannelloNote: function() {
        this.getView().close()
    },
    onSaveNota:function() {
        let me = this,vm = me.getViewModel()
        let nota=  vm.get('recnote');//recupero contenuto
        let cdcli=  vm.get('cdcli');//recupero codice cliente
        me.getView().el.mask(Locale.t("global.actions.incorso"))
        Ext.Ajax.request({
            method: "POST",
            params: {cdcli: cdcli,nota:nota},
            url: Backend.REST_VERSION + 'widgets/wcon/salvanota',
            success: function () {
                me.getView().el.unmask();
                me.tipsHome.msg(Locale.t('global.btn.edit.ok'),Locale.t('wcon.note.salvaok'));
            },
            failure: function (response) {
                me.getView().el.unmask();
                let resp = Ext.decode(response.responseText);
                Ext.Msg.show({
                    title: Locale.t("global.errore"),
                    msg: resp["msg"],
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR
                })
            }
        })
    }
});