/**
 * Created by luke on 27/08/21.
 */
Ext.define('rec.view.forms.reso.info.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.v1-info',
    /**
     * Called when the view is created
     */
    init: function() {

    },
    onAfterRender:function() {
        let vm = this.getViewModel(), me=this
        me.getView().el.mask(Locale.t('global.form.caricamento'))
        Ext.Ajax.request({
            method:'GET',
            params: {
                iditem: this.getView().valori.iditem
            },
            url: Backend.REST_VERSION + 'rec/forms/reso/info',
            success:function(record){
                me.getView().el.unmask()
                let rec = Ext.decode(record.responseText);
                vm.set('record',rec.data[0]) //imposto il record del panel
            }
        })
    },
    onCloseInfo: function() {
        this.getView().close()
    }
});