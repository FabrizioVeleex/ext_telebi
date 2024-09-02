/**
 * Created by luke on 27/08/21.
 */
Ext.define('ama.view.forms.scheda.attivita.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.v1-attivita',

    requires: [
        'portal.util.Functions'
    ],
    /**
     * Called when the view is created
     */
    init: function() {
        let vm = this.getViewModel()
        vm.set('readOnlyAttivita',this.getView().valori.readOnlyAttivita) //new=0 tutto readonly
        vm.set('hideNote',this.getView().valori.hideNote) //new=1 non visualizza note
        vm.set('readOnlyNote',this.getView().valori.readOnlyNote) //abilitato a modificare le note
        vm.set('idstabilimento',this.getView().valori.idstabilimento) //idstabilimento x filtro store utenti
        vm.set('idrec',this.getView().valori.idrec) //id scheda
    },
    onAfterRender:function() {
        let vm = this.getViewModel(), me=this
        me.getView().el.mask(Locale.t('global.form.caricamento'))
        Ext.Ajax.request({
            method:'GET',
            params: {
                iditem: this.getView().valori.iditem
            },
            url: Backend.REST_VERSION + 'ama/forms/scheda/caricaattivita',
            success:function(record){
                me.getView().el.unmask()
                let rec = Ext.decode(record.responseText);
                vm.set('record',rec.data[0]) //imposto il record attivita
            }
        })
    },
    onBeforeLoadUtenti:function(store) {
        if (store.isLoading()) return false;
        let me = this,
            vm = me.getViewModel();
        store.getProxy().extraParams.idstabilimento =  vm.get('idstabilimento')
    },
    onSaveAttivita:function() {
        let me = this, vm = me.getViewModel(), record = vm.get('record'), error=''
        if (!record.descrizione || record.descrizione === ''){
            error += Locale.t('ama.forms.scheda.attivita.descrizione')+': '+Locale.t('global.form.inserirevalore')+'<br>';
        } else if (record.descrizione.length>250){
            error +=Locale.t('ama.forms.scheda.attivita.descrizione')+': '+Locale.t('global.form.lunghezzamassima')+' 250<br>';
        }
        if (!record.idrisorsa || record.idrisorsa === ''){
            error += Locale.t('ama.forms.scheda.attivita.idrisorsa')+': '+Locale.t('global.form.inserirevalore')+'<br>';
        }
        if (record.fine === '' || record.fine === '0000-00-00'){
            error += Locale.t('ama.forms.scheda.attivita.fine')+': '+Locale.t('global.form.inserirevalore')+'<br>';
        }
        if (error!==''){
            Ext.Msg.show({title: Locale.t('global.attenzione'), msg: error, buttons: Ext.Msg.OK, icon: Ext.MessageBox.ERROR});
            return
        }
        Ext.Ajax.request({
            method: "POST",
            jsonData: {data: record,idrec:vm.get('idrec')}, //come azione imposto 0=tutti gli steps
            url: Backend.REST_API + "forms/scheda/saveattivita", //azione flusso
            success: function () {
                me.onCloseAttivita()
            },
            failure: function (response) {
                me.getView().el.unmask();
                let resp = Ext.decode(response.responseText);
                Ext.Msg.show({
                    title: Locale.t("global.errore"),
                    msg: resp["msg"],
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        });
    },
    onSaveUser:function() {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        Ext.Ajax.request({
            method: "POST",
            jsonData: {note: record.note,id:record.id},
            url: Backend.REST_API + "forms/scheda/saveuser", //azione flusso
            success: function () {
                bdFunctions.bdTips.msg(Locale.t('ama.forms.scheda.attivita.salvataggio'),Locale.t("ama.forms.scheda.attivita.salvaok"));
            },
            failure: function (response) {
                me.getView().el.unmask();
                let resp = Ext.decode(response.responseText);
                Ext.Msg.show({
                    title: Locale.t("global.errore"),
                    msg: resp["msg"],
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        });
    },
    onCompleta:function() {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        Ext.Msg.show({
            title: Locale.t('global.avviso'), iconCls: 'x-fas fa-check-circle', msg: Locale.t('ama.forms.scheda.attivita.completamsg'),
            buttons: Ext.Msg.YESNO, icon: Ext.MessageBox.QUESTION, fn: function (b) {
                if (b === 'yes') {
                    Ext.Ajax.request({
                        method: "POST",
                        jsonData: {data:record,idrec:vm.get('idrec')},
                        url: Backend.REST_API + "forms/scheda/completa", //azione flusso
                        success: function () {
                            me.onCloseAttivita()
                        },
                        failure: function (response) {
                            me.getView().el.unmask();
                            let resp = Ext.decode(response.responseText);
                            Ext.Msg.show({
                                title: Locale.t("global.errore"),
                                msg: resp["msg"],
                                buttons: Ext.Msg.OK,
                                icon: Ext.MessageBox.ERROR
                            });
                        }
                    });
                }
            }
        })
    },
    onCloseAttivita: function() {
        this.getView().close()
    }
});