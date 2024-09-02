/**
 * Created by luke on 27/08/21.
 */
Ext.define('home.view.dashboard.widgets.wcon.view.config.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.v1-wconconfig',
    /**
     * Called when the view is created
     */
    init: function() {

    },
    onAfterRender:function() {
        let me = this, vm = me.getViewModel()
        let gridesclusi = vm.getStore('storeEsclusi')
        gridesclusi.load()
    },

    onSaveGrid:function() {
        let me = this, vm = me.getViewModel()
        let storeesclusi = vm.getStore('storeEsclusi')
        let records=[]
        storeesclusi.each(function(rec) {
            if (rec.data['codice']!=='' ) {
                records.push(rec.data)
            }
        })
        me.getView().el.mask(Locale.t('global.actions.incorso'))
        Ext.Ajax.request({
            method: 'POST',
            jsonData: {records:records},
            url: Backend.REST_VERSION + 'widgets/wcon/saveesclusi',
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