Ext.define('sgv.view.forms.segnalazione.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    alias: 'controller.v1-segnalazione',
    mixins: ['portal.v1.global.Util'],
    requires:[
        'Ext.form.FieldSet',
        'portal.v1.view.main.global.upload.Attach',
        'portal.v1.view.main.global.upload.CardAttach',
        'portal.v1.view.main.global.upload.GridAttachModel',
        'sgv.view.forms.segnalazione.attach.GridAttachGestore',
        'sgv.view.forms.segnalazione.attach.GridAttachRichiedente',
        'sgv.view.forms.segnalazione.cards.Esito',
        'sgv.view.forms.segnalazione.cards.Gestore',
        'sgv.view.forms.segnalazione.cards.Richiedente',
        'sgv.view.forms.segnalazione.cards.Segnalazione',
        'sgv.view.forms.segnalazione.component.Model'
    ],
    init: function () {
        let vm = this.getViewModel();
        //tasti flusso
        this.btnInoltra = {xtype: 'button', ui: 'blue', text: Locale.t('sgv.forms.segnalazione.btn.inoltra.text'), tooltip: Locale.t('sgv.forms.segnalazione.btn.inoltra.tooltip'), iconCls: 'fas fa-arrow-circle-right',step:20, handler: 'onInoltra'}
        this.btnIstruttoria = {xtype: 'button', ui: 'blue', text: Locale.t('sgv.forms.segnalazione.btn.istruttoria.text'), tooltip: Locale.t('sgv.forms.segnalazione.btn.istruttoria.tooltip'), iconCls: 'fas fa-envelope',step:20, handler: 'onIstruttoria'}
        this.btnChiudi = {xtype: 'button', ui: 'blue', text: Locale.t('sgv.forms.segnalazione.btn.chiudi.text'), tooltip: Locale.t('sgv.forms.segnalazione.btn.chiudi.tooltip'), iconCls: 'fas fa-check-circle',step:20, handler: 'onChiudi'}
        this.btnRiapri = {xtype: 'button', ui: 'blue', text: Locale.t('sgv.forms.segnalazione.btn.riapri.text'), tooltip: Locale.t('sgv.forms.segnalazione.btn.riapri.tooltip'), iconCls: 'fas fa-check-circle',step:20, handler: 'onRiapri'}
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('sgv.view.forms.segnalazione.component.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },
    managerView: function(){
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(), record = vm.get('record'), readOnly = true,readOnlyAttach=true,readOnlyGestore=true,readOnlyAttachGestore=true
        let hideGestore=true
        //gestisco tasti in base allo stato
        switch (record.data.step){
            case 10: //bozza
                if (Ext.global.Vars.infoUser.id===record.data.idrichiedente || this.checkRuoli(['99'])){
                    readOnly = false;
                    readOnlyAttach = false
                    vm.set('btn.save', true);
                    if (record.data.isnew===0) {
                        vm.set('btn.delete', true);
                    }
                    this.toolBar.add(this.btnInoltra)
                }
                break
            case 15: //inoltrata x istruttoria
                if (this.checkRuoli(['99','2'])){
                    this.toolBar.add(this.btnIstruttoria)
                }
                break
            case 20: //in carico gestori
                if (this.checkRuoli(['99','2'])){
                    readOnlyGestore = false;
                    hideGestore = false
                    readOnlyAttachGestore=false
                    vm.set('btn.save', true);
                    this.toolBar.add(this.btnChiudi)
                }
                break
           default: //chiusa
                if (this.checkRuoli(['99','2'])){
                    hideGestore = false
                    this.toolBar.add(this.btnRiapri)
                }
                break
        }
        if (record.data.isnew===0 && this.checkRuoli(['99','2'])){
            vm.set('btn.cronology', true);
        }
        //gestione tasti default
        vm.set('btn.close', true);
        vm.set('readOnly', readOnly);
        vm.set('readOnlyGestore', readOnlyGestore);
        //titolo tab
        vm.set('title',record.data['richiedente'] || 'n.d.')
        vm.set('label',Locale.t('sgv.forms.segnalazione.title'))
        //card principale
        this.Segnalazione = Ext.create('sgv.view.forms.segnalazione.cards.Segnalazione')
        //sezione richiedente
        this.cardRichiedente = Ext.create('sgv.view.forms.segnalazione.cards.Richiedente')
        //allegati richiedente
        this.cardAllegati = Ext.create("portal.v1.view.main.global.upload.CardAttach")
        if (readOnlyAttach === false) {
            //inserisco tasto allegati
            if (!this.uploadfile) {
                this.uploadfile = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestRichiedente");
            }
            this.cardAllegati.down("#updfile").add(this.uploadfile);
            this.uploadfile.fireEvent("updateInfo", {
                url: "", src: "", thumb: false, descrizione: "",
                readOnly: readOnly, updimage: false, rif: "", type: []
            });
        }
        this.gridAllegati = Ext.create("sgv.view.forms.segnalazione.attach.GridAttachRichiedente");
        this.cardAllegati.down("#updgrid").add(this.gridAllegati);
        //carico allegati presenti
        let storeAllegati = this.getViewModel().get("storeAllegatiRichiedente");
        storeAllegati.removeAll();
        record.data.allegati.forEach(function (rec) {
            if (rec['step']===10) {
                rec["readOnlyAttach"] = readOnlyAttach;
                rec["hideDownload"] = "false";
                storeAllegati.add(Ext.create("portal.v1.view.main.global.upload.GridAttachModel", rec));
            }
        });
        this.cardRichiedente.add(this.cardAllegati);
        this.sezRichiedente=Ext.create('Ext.form.FieldSet',{
            collapsible: true, collapsed: false,
            title: '<span style="color: black;font-weight:bold">'+Locale.t('sgv.forms.segnalazione.sezrichiedente')+'</span>',
            style: {'background-color': "transparent;"},
            items: [this.cardRichiedente]
        })
        this.Segnalazione.add(this.sezRichiedente)
        //sezione gestore
        this.cardGestore = Ext.create('sgv.view.forms.segnalazione.cards.Gestore')
        //allegati gestore
        this.cardAllegatiGestore = Ext.create("portal.v1.view.main.global.upload.CardAttach")
        if (readOnlyAttachGestore === false) {
            //inserisco tasto allegati
            if (!this.uploadfileGestore) {
                this.uploadfileGestore = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestGestore");
            }
            this.cardAllegatiGestore.down("#updfile").add(this.uploadfileGestore);
            this.uploadfileGestore.fireEvent("updateInfo", {
                url: "", src: "", thumb: false, descrizione: "",
                readOnly: readOnlyGestore, updimage: false, rif: "", type: []
            });
        }
        this.gridAllegatiGestore = Ext.create("sgv.view.forms.segnalazione.attach.GridAttachGestore");
        this.cardAllegatiGestore.down("#updgrid").add(this.gridAllegatiGestore);
        //carico allegati presenti
        let storeAllegatiGestore = this.getViewModel().get("storeAllegatiGestore");
        storeAllegatiGestore.removeAll();
        record.data.allegati.forEach(function (rec) {
            if (rec['step']===20) {
                rec["readOnlyAttach"] = readOnlyAttachGestore;
                rec["hideDownload"] = "false";
                storeAllegatiGestore.add(Ext.create("portal.v1.view.main.global.upload.GridAttachModel", rec));
            }
        });
        this.cardGestore.add(this.cardAllegatiGestore);
        this.sezGestore=Ext.create('Ext.form.FieldSet',{
            collapsible: true, collapsed: false,hidden:hideGestore,
            title: '<span style="color: black;font-weight:bold">'+Locale.t('sgv.forms.segnalazione.sezgestore')+'</span>',
            style: {'background-color': "transparent;"},
            items: [this.cardGestore]
        })
        this.Segnalazione.add(this.sezGestore)
        //sezione esito
        this.cardEsito = Ext.create('sgv.view.forms.segnalazione.cards.Esito')
        this.sezEsito=Ext.create('Ext.form.FieldSet',{
            collapsible: true, collapsed: false,
            title: '<span style="color: black;font-weight:bold">'+Locale.t('sgv.forms.segnalazione.sezesito')+'</span>',
            style: {'background-color': "transparent;"},
            items: [this.cardEsito]
        })
        this.Segnalazione.add(this.sezEsito)
        //modulo
        this.form.add(this.Segnalazione);
        this.getView().setActiveItem(this.form);
    },
    onSave: function () {
        if (!this.obb()) {
            return false;
        }
        let me = this, vm = me.getViewModel(), record = vm.get("record");
        //allegati richiedente
        let storeallegati = vm.getStore("storeAllegatiRichiedente");
        record.data["allegati"] = [];
        storeallegati.each(function (rec) {
            record.data["allegati"].push(rec.data);
        });
        //allegati gestore
        let storeallegatiGestore = vm.getStore("storeAllegatiGestore");
        storeallegatiGestore.each(function (rec) {
            record.data["allegati"].push(rec.data);
        });
        this.callParent(arguments)
    },
    obb: function () {
        let modulo = this.cardRichiedente.getForm()
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
    //allegati
    onReturnRequestRichiedente: function (res) {
        let me = this, vm = me.getViewModel(),
            store = vm.getStore("storeAllegatiRichiedente"),record = vm.get('record')
        res.valori.idautore = Ext.global.Vars.infoUser.id; //imposto autore frontend
        res.valori.autore = Ext.global.Vars.infoUser.cognomenome; //imposto autore frontend
        res.valori.hideDownload = "true"; //il nuovo non lo posso scaricare
        res.valori.step = record.data.step
        store.add(
            Ext.create("portal.v1.view.main.global.upload.GridAttachModel", res.valori)
        );
    },
    onReturnRequestGestore: function (res) {
        let me = this, vm = me.getViewModel(),
            store = vm.getStore("storeAllegatiGestore"),record = vm.get('record')
        res.valori.idautore = Ext.global.Vars.infoUser.id; //imposto autore frontend
        res.valori.autore = Ext.global.Vars.infoUser.cognomenome; //imposto autore frontend
        res.valori.hideDownload = "true"; //il nuovo non lo posso scaricare
        res.valori.step = record.data.step
        store.add(
            Ext.create("portal.v1.view.main.global.upload.GridAttachModel", res.valori)
        );
    },
    //flusso
    onInoltra: function () {
        if (!this.obb()) {
            return false;
        }
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        Ext.Msg.show({
            title: Locale.t("global.attenzione"), msg: Locale.t('sgv.forms.segnalazione.btn.inoltra.msg'),
            buttons: Ext.Msg.YESNO, icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === "yes") {
                    record.data.step=11 //imposto step a 11 x passaggio al successivo (15)
                    me.closeForm = true //chiusura modulo
                    me.onSave();
                }
            }
        });
    },
    onIstruttoria: function () {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        Ext.Msg.show({
            title: Locale.t("global.attenzione"), msg: Locale.t('sgv.forms.segnalazione.btn.istruttoria.msg'),
            buttons: Ext.Msg.YESNO, icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === "yes") {
                    record.data.step=16 //imposto step a 16 x passaggio al successivo (20)
                    me.closeForm = true //chiusura modulo
                    me.onSave();
                }
            }
        });
    },
    onChiudi: function () {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        if (record.data.esito==='') {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('sgv.forms.segnalazione.obbesito'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return false;
        }
        Ext.Msg.show({
            title: Locale.t("global.attenzione"), msg: Locale.t('sgv.forms.segnalazione.btn.chiudi.msg'),
            buttons: Ext.Msg.YESNO, icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === "yes") {
                    record.data.step=99 //imposto step a 99 x chiusura
                    me.closeForm = true //chiusura modulo
                    me.onSave();
                }
            }
        });
    },
    onRiapri: function () {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        Ext.Msg.show({
            title: Locale.t("global.attenzione"), msg: Locale.t('sgv.forms.segnalazione.btn.riapri.msg'),
            buttons: Ext.Msg.YESNO, icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === "yes") {
                    record.data.step=-1 //imposto step a 99 x chiusura
                    me.closeForm = true //chiusura modulo
                    me.onSave();
                }
            }
        });
    }
});