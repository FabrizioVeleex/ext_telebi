/**
 * Created by luke on 27/08/21.
 */
Ext.define('home.view.dashboard.widgets.wcon.view.dettaglio.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.v1-wcondettaglio',
    mixins: ['portal.v1.global.Util'],
    requires: [
        'home.view.dashboard.widgets.wcon.model.GridDettaglio',
        'home.view.dashboard.widgets.wcon.model.ModelDettaglio'
    ],
    /**
     * Called when the view is created
     */
    init: function() {

    },
    onAfterRender:function() {
        let me = this, vm = me.getViewModel()
        vm.set('hideFido', this.view.valori.hidefido)
        this.dettaglio = Ext.create('home.view.dashboard.widgets.wcon.model.ModelDettaglio')
        this.dettaglio.getProxy().extraParams.cdcli=this.view.valori.cdcli
        this.dettaglio.load({
            success:function(record){
                me.getViewModel().set('record', record.data)
                me.getView().setTitle(me.view.valori.titolo)
                let gridDett = vm.getStore('storeDettaglio');
                record.data.dettaglio.forEach(function(rec){
                    gridDett.add (Ext.create('home.view.dashboard.widgets.wcon.model.GridDettaglio',rec))
                })
            }
        })
    },
    onClosePannello: function() {
        this.getView().close()
    },
    onStampaPdf:function() {
        let me = this
        me.getView().el.mask(Locale.t("global.actions.incorso"))
        Ext.Ajax.request({
            method: "POST",
            params: {cdcli: me.view.valori.cdcli,cliente:me.view.valori.titolo,fido:me.view.valori.hidefido},
            url: Backend.REST_VERSION + 'widgets/wcon/stampapdf',
            success: function (resp) {
                let rest = Ext.decode(resp.responseText);
                me.view.el.unmask()
                me.onDownloadFile(rest['token'])
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
    },
    onEsportaXls:function() {
        let me = this
        me.getView().el.mask(Locale.t("global.actions.incorso"))
        Ext.Ajax.request({
            method: "POST",
            params: {cdcli: me.view.valori.cdcli,cliente:me.view.valori.titolo},
            url: Backend.REST_VERSION + 'widgets/wcon/esporta',
            success: function (resp) {
                let rest = Ext.decode(resp.responseText);
                me.view.el.unmask()
                me.onDownloadFile(rest['token'])
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