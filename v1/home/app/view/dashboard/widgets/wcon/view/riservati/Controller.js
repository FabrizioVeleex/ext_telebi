/**
 * Created by luke on 27/08/21.
 */
Ext.define('home.view.dashboard.widgets.wcon.view.riservati.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.v1-wconriservati',
    /**
     * Called when the view is created
     */
    init: function() {

    },
    onAfterRender:function() {
        let me = this, vm = me.getViewModel()
        let gridriservati = vm.getStore('storeRiservati')
        gridriservati.load()
    },
    onSaveGrid:function() {
        let me = this, vm = me.getViewModel()
        let storeriservati = vm.getStore('storeRiservati')
        let records=[]
        storeriservati.each(function(rec) {
            if (rec.data['codice']!=='' ) {
                records.push(rec.data)
            }
        })
        me.getView().el.mask(Locale.t('global.actions.incorso'))
        Ext.Ajax.request({
            method: 'POST',
            jsonData: {records:records},
            url: Backend.REST_VERSION + 'widgets/wcon/saveriservati',
            success: function () {
                me.getView().el.unmask()
                me.getView().close()
            },
            failure: function (response) {
                me.getView().el.unmask()
                let resp = Ext.decode(response.responseText);
                Ext.Msg.show({
                    title: Locale.t('global.errore'), msg:resp['msg'],
                    buttons: Ext.Msg.OK, icon: Ext.MessageBox.ERROR
                })
            }
        })
    },
    onCloseGrid: function() {
        this.getView().close()
    }
});