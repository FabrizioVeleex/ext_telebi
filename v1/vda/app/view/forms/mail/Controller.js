/**
 * Created by luca on 16/07/2018.
 */
Ext.define('vda.view.forms.mail.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.v1-mail',
    requires: [
        'portal.v1.view.main.global.upload.Attach',
        'portal.v1.view.main.global.upload.CardAttach',
        'portal.v1.view.main.global.upload.GridAttachModel',
        'portal.v1.view.main.global.upload.GridAttachs',
        'vda.model.forms.mail.Model',
        'vda.view.forms.mail.cards.Mail'
    ],
    init: function () {
        let vm = this.getViewModel();
        //creo tasti della scheda
        this.btnInvia = {xtype: "button", ui: "blue", text: Locale.t("vda.forms.mail.btn.invia"),
             iconCls: "fas fa-paper-plane", handler: "onInvia"
        };
        this.btnAnnulla = {text: Locale.t('vda.forms.mail.btn.annulla'), iconCls: 'fas fa-window-close', handler: 'onClose'};
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('idprogetto', this.getView().valori.idprogetto);
        vm.set('step', this.getView().valori.step);
        vm.set('record', Ext.create('vda.model.forms.mail.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },
    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(), record = vm.get('record'), readOnly = true, readOnlyAttach=true
        //valori comuni controller
        if (vm.get('isnew')===1) {
            readOnly = false; readOnlyAttach=false
            this.toolBar.add(this.btnAnnulla)
            this.toolBar.add(this.btnInvia)
        } else {
            vm.set('btn.close', true)
        }
        //titolo tab
        vm.set('title',record.data['subject'] || Locale.t('vda.forms.mail.title'))
        vm.set('label',Locale.t('vda.forms.progetto.title'))
        //creo form principale
        this.cardMail = Ext.create('vda.view.forms.mail.cards.Mail');
        //allegati
        this.cardAllegati = Ext.create("portal.v1.view.main.global.upload.CardAttach")
        if (readOnlyAttach === false) {
            if (!this.uploadfile) { //inserisco tasto caricamento
                this.uploadfile = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestMailAttach");
            }
            this.cardAllegati.down("#updfile").add(this.uploadfile);
            this.uploadfile.fireEvent("updateInfo", {
                url: "", src: "", thumb: false, descrizione: "", readOnly: readOnly, rif: "", type: []
            });
        }
        this.gridAllegati = Ext.create("portal.v1.view.main.global.upload.GridAttachs");
        this.cardAllegati.down("#updgrid").add(this.gridAllegati);
        //carico allegati presenti
        let storeAllegati = this.getViewModel().get("storeAllegati");
        storeAllegati.removeAll();
        record.data.allegati.forEach(function (rec) {
            rec["readOnlyAttach"] = readOnlyAttach;
            rec["hideDownload"] = !readOnlyAttach;
            storeAllegati.add(Ext.create("portal.v1.view.main.global.upload.GridAttachModel", rec));
        });
        this.cardMail.add(this.cardAllegati);
        //imposto variabili viewmodel
        vm.set('readOnly',readOnly) //campi in lettura sezione concept
        //panel principale
        this.form.add(this.cardMail);
        this.getView().setActiveItem(this.form);
    },
    onInvia:function() {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        if (!this.obb()) {
            return false;
        }
        //recupero allegati
        let storeallegati = vm.getStore("storeAllegati")
        record.data.allegati = [];
        storeallegati.each(function (rec) {
            rec.data.step = record.data.step
            record.data.allegati.push(rec.data);
        })
        //info principali
        record.data.idprogetto = vm.get('idprogetto')
        record.data.step = vm.get('step')
        me.getView().el.mask(Locale.t("global.actions.incorso"));
        Ext.Ajax.request({
            method: "POST",
            jsonData: {data: record.data},
            url: Backend.REST_API + "forms/mail/invia", //azione flusso
            success: function () {
                me.getView().el.unmask()
                me.getView().fireEvent('closeFormInvio')
                me.onClose()
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
    obb: function () {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        let modulo = this.cardMail.getForm()
        if (!modulo.isValid()) {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('global.form.validation.modulo'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return false;
        }
        return true;
    },
    //ritorno caricamento allegato
    onReturnRequestMailAttach: function (res) {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        let store = vm.getStore("storeAllegati")
        res.valori.idautore = Ext.global.Vars.infoUser.id //imposto autore frontend
        res.valori.autore = Ext.global.Vars.infoUser.cognomenome //imposto autore frontend
        res.valori.hideDownload = "true" //il nuovo non lo posso scaricare
        store.add(
            Ext.create(
                "portal.v1.view.main.global.upload.GridAttachModel",
                res.valori
            )
        )
    }
})