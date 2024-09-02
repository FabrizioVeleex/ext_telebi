/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wvoi.WinDettaglioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.v1-windettaglio',

    requires:[
        'home.view.dashboard.widgets.wvoi.model.WindowTestata',
        'home.view.dashboard.widgets.wvoi.model.GridDettaglio'
    ],
    init: function() {

    },
    //caricamento dettaglio utente
    onAfterRenderWinDet: function (win) {
        let me = this;
        let center = me.getView(); //pannello
        let myMask = new Ext.LoadMask({ //maschera attesa
            msg:Locale.t('widgetvoice.caricamento'),
           target:center
        });
        myMask.show();
        this.dataForm = Ext.create('home.view.dashboard.widgets.wvoi.model.WindowTestata');
        this.dataForm.getProxy().extraParams.coduser=win.rec.data['coduser'];
        this.dataForm.getProxy().extraParams.datestart=win.rec.data['datestart'];
        this.dataForm.getProxy().extraParams.dateend=win.rec.data['dateend'];
        this.dataForm.load({
            success:function(record){
                me.getViewModel().set('recordDet', record.data);
                let gridDett = me.lookupReference('gridDettvoi');
                let storeDet = gridDett.getStore();
                record.data.store.root.forEach(function(rec){
                    storeDet.add (Ext.create('home.view.dashboard.widgets.wvoi.model.GridDettaglio',rec));
                });
                myMask.hide();
            },
            failure: function (a, o) {
                myMask.hide();
                Ext.Msg.show({
                    title: Locale.t('global.errore'),
                    msg: 'System error',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        });
    }
});
