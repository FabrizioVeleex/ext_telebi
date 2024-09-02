/**
 * Created by luca on 16/07/2018.
 */
Ext.define('vda.view.forms.component.ControllerFmea', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fmea',

    obbInoltroFmea: function (btn) {
        let me = this, vm = me.getViewModel(), record = vm.get('record'), error=''
        //controllo nome/data progetto obbligatori all'inizio
        if (!this.obb()) {
            return
        }
        if (record.data.stabilimenti === ''){
            error += Locale.t('vda.forms.progetto.fmea.fields.stabilimenti')+': '+Locale.t('global.form.inserirevalore')+'<br>';
        }
        if (record.data.fornitori === ''){
            error += Locale.t('vda.forms.progetto.fmea.fields.fornitori')+': '+Locale.t('global.form.inserirevalore')+'<br>';
        }
        if (error!==''){
            Ext.Msg.show({title: Locale.t('global.attenzione'), msg: error, buttons: Ext.Msg.OK, icon: Ext.MessageBox.ERROR});
            return
        }
        //allegati
        let storeallegati = vm.getStore("storeAttachFmea");
        record.data.allegati = [];
        storeallegati.each(function (rec) {
            rec.data.step = record.data.step
            record.data.allegati.push(rec.data);
        })
        this.onInoltra(btn);
    }
})