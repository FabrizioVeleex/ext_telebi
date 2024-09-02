/**
 * Created by luca on 16/07/2018.
 */
Ext.define('vda.view.forms.progetto.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins:['portal.v1.global.Util','vda.view.forms.component.Contoller','vda.view.forms.component.ControllerConcept',
        'vda.view.forms.component.ControllerFmea','vda.view.forms.component.ControllerPfmea','vda.view.forms.component.ControllerPpap'],
    alias: 'controller.v1-progetto',
    requires: [
        'Ext.form.FieldSet',
        'portal.v1.view.main.global.upload.Attach',
        'portal.v1.view.main.global.upload.CardAttach',
        'portal.v1.view.main.global.upload.GridAttachModel',
        'portal.v1.view.main.global.upload.Image',
        'vda.model.forms.progetto.Model',
        'vda.view.forms.component.btnAnnulla',
        'vda.view.forms.component.btnAzioni',
        'vda.view.forms.component.btnRespingi',
        'vda.view.forms.component.btnRipristina',
        'vda.view.forms.component.btnSospendi',
        'vda.view.forms.progetto.attach.GridAttachConcept',
        'vda.view.forms.progetto.attach.GridAttachFmea',
        'vda.view.forms.progetto.attach.GridAttachPfmea',
        'vda.view.forms.progetto.attach.GridAttachPpap',
        'vda.view.forms.progetto.cards.Concept',
        'vda.view.forms.progetto.cards.Fmea',
        'vda.view.forms.progetto.cards.Pfmea',
        'vda.view.forms.progetto.cards.Ppap',
        'vda.view.forms.progetto.cards.Progetto',
        'vda.view.forms.progetto.mail.Grid'
    ],
    init: function () {
        let vm = this.getViewModel();
        //creo tasti della scheda
        this.btnInoltraConcept = {xtype: "button", ui: "blue", text: Locale.t("vda.forms.progetto.concept.btn.inoltratext"),
            tooltip: Locale.t("vda.forms.progetto.concept.btn.inoltratooltip"), iconCls: "fas fa-arrow-circle-right", handler: "obbInoltroConcept",
        };
        this.btnInoltraFmea = {xtype: "button", ui: "blue", text: Locale.t("vda.forms.progetto.fmea.btn.inoltratext"),
            tooltip: Locale.t("vda.forms.progetto.fmea.btn.inoltratooltip"), iconCls: "fas fa-arrow-circle-right", handler: "obbInoltroFmea",
        };
        this.btnInoltraPfmea = {xtype: "button", ui: "blue", text: Locale.t("vda.forms.progetto.pfmea.btn.inoltraclientetext"),
            tooltip: Locale.t("vda.forms.progetto.pfmea.btn.inoltraclientetooltip"), iconCls: "fas fa-arrow-circle-right", handler: "obbInoltroPfmea",
        };
        this.btnInoltraPpap = {xtype: "button", ui: "blue", text: Locale.t("vda.forms.progetto.pfmea.btn.inoltratext"),
            tooltip: Locale.t("vda.forms.progetto.pfmea.btn.inoltratooltip"), iconCls: "fas fa-arrow-circle-right", handler: "onInoltraPpap",
        };
        this.btnApprovaPpap = {xtype: "button", ui: "blue", text: Locale.t("vda.forms.progetto.ppap.btn.approvatext"),
            tooltip: Locale.t("vda.forms.progetto.ppap.btn.approvatooltip"), iconCls: "fas fa-thumbs-up", handler: "obbApprovaPapp",
        };
        this.btnRespingi =Ext.create('vda.view.forms.component.btnRespingi')
        this.btnAnnulla =Ext.create('vda.view.forms.component.btnAnnulla')
        this.btnSospendi =Ext.create('vda.view.forms.component.btnSospendi')
        this.btnRipristina =Ext.create('vda.view.forms.component.btnRipristina')
        this.btnAzioni =Ext.create('vda.view.forms.component.btnAzioni')
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('vda.model.forms.progetto.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },
    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        //valori comuni controller
        let readOnlyConcept=true,readOnlyFmea=true,readOnlyPfmea=true,readOnlyPpap=true, hideComponente = true, hideCliente = false
        let hideNew = false, hideScheda=true
        if (vm.get('isnew')===1) {
            readOnlyConcept=false //nuovo
            hideNew = true
            vm.set('btn.save', true)
        } else {
            vm.set("btn.cronology", true)
            switch (record.data.step) {
                case 10: //concept
                    if (this.checkRuoli(['99', '98','10'])) {
                        readOnlyConcept=false //nuovo
                        vm.set('btn.save', true)
                        this.toolBar.add(this.btnInoltraConcept)
                        this.toolBar.add(this.btnSospendi)
                        this.toolBar.add(this.btnAnnulla)
                        vm.set('btn.delete', true)
                    }
                    break
                case 15: // fmea
                    if (this.checkRuoli(['99', '98','15'])) {
                        readOnlyFmea=false
                        vm.set('btn.save', true)
                        this.toolBar.add(this.btnInoltraFmea)
                        this.toolBar.add(this.btnRespingi)
                        this.toolBar.add(this.btnSospendi)
                        this.toolBar.add(this.btnAnnulla)
                        this.toolBar.add(this.btnAzioni)
                    }
                    break
                case 20://pfmea
                case 25://attesa ok cliente
                    if (this.checkRuoli(['99', '98','20'])) {
                        if (record.data.step===20) {
                            readOnlyPfmea=false
                            vm.set('btn.save', true)
                            this.toolBar.add(this.btnInoltraPfmea)
                        } else {
                            this.toolBar.add(this.btnInoltraPpap)
                        }
                        this.toolBar.add(this.btnRespingi)
                        this.toolBar.add(this.btnSospendi)
                        this.toolBar.add(this.btnAnnulla)
                        this.toolBar.add(this.btnAzioni)
                    }
                    break
                case 30: //ppap
                    if (this.checkRuoli(['99', '98','30'])) {
                        readOnlyPpap=false
                        vm.set('btn.save', true)
                        this.toolBar.add(this.btnApprovaPpap)
                        this.toolBar.add(this.btnRespingi)
                        this.toolBar.add(this.btnSospendi)
                        this.toolBar.add(this.btnAnnulla)
                        this.toolBar.add(this.btnAzioni)
                    }
                    break
            }
        }
        if (record.data.step===97 && this.checkRuoli(['99', '98'])) {
            this.toolBar.add(this.btnRipristina) //se sospeso testo ripristina x supervisore/gestore
        }
        if (record.data.tipo===2) { //componente
            hideComponente=false; hideCliente = true
        }
        vm.set('btn.close', true)
        //titolo tab
        vm.set('title',record.data['numero'] +' - '+record.data['nome']|| 'n.d.')
        vm.set('label',Locale.t('vda.forms.progetto.title'))
        //creo form principale
        this.cardProgetto = Ext.create('vda.view.forms.progetto.cards.Progetto');
        this.cardConcept = Ext.create('vda.view.forms.progetto.cards.Concept');
        //allegati
        this.cardAttachConcept = Ext.create("portal.v1.view.main.global.upload.CardAttach")
        if (readOnlyConcept === false) {
            //inserisco tasto allegati
            if (!this.uploadfile) {
                this.uploadfile = Ext.create(
                    "portal.v1.view.main.global.upload.Attach"
                ).on("returnRequest", "onReturnRequestAttach");
            }
            this.cardAttachConcept.down("#updfile").add(this.uploadfile);
            this.uploadfile.fireEvent("updateInfo", {
                url: "", src: "", thumb: false, descrizione: "", readOnly: readOnlyConcept, updimage: false, rif: "", type: [],
            })
        }
        this.gridAAttachConcept = Ext.create("vda.view.forms.progetto.attach.GridAttachConcept")
        this.cardAttachConcept.down("#updgrid").add(this.gridAAttachConcept);
        //carico allegati presenti
        let storeAttachConcept =vm.getStore("storeAttachConcept");
        storeAttachConcept.removeAll();
        record.data.allegati.forEach(function (rec) {
            if (rec['step']===10) {
                rec["readOnlyAttach"] = readOnlyConcept;
                rec["hideDownload"] = "false";
                storeAttachConcept.add(Ext.create("portal.v1.view.main.global.upload.GridAttachModel", rec))
            }
        });
        //definisco immagini connettori
        if (!this.imgcon1) {
            this.imgcon1 = Ext.create('portal.v1.view.main.global.upload.Image')
                .on('returnRequest', 'onReturnRequest').on('onResetImg', 'onResetImg').on('onClickImg', 'onClickImg')
        }
        this.imgcon1.fireEvent('updateInfo', {
            url: record.data['imgcon1'], src: '', thumb: true, descrizione: '',
            readOnly: readOnlyConcept, updimage: true, rif: 'imgcon1', type: ['jpg', 'jpeg', 'png', 'gif']
        })
        this.cardConcept.down('#imgCon1').add(this.imgcon1)
        if (!this.imgcon2) {
            this.imgcon2 = Ext.create('portal.v1.view.main.global.upload.Image')
                .on('returnRequest', 'onReturnRequest').on('onResetImg', 'onResetImg').on('onClickImg', 'onClickImg')
        }
        this.imgcon2.fireEvent('updateInfo', {
            url: record.data['imgcon2'], src: '', thumb: true, descrizione: '',
            readOnly: readOnlyConcept, updimage: true, rif: 'imgcon2', type: ['jpg', 'jpeg', 'png', 'gif']
        })
        this.cardConcept.down('#imgCon2').add(this.imgcon2)
        this.cardConcept.add(this.cardAttachConcept);
        //creo fieldset sezione
        this.sezioneConcept=Ext.create('Ext.form.FieldSet',{
            collapsible: true, collapsed: false,
            title: '<span style="color: black;font-weight:bold">'+Locale.t('vda.forms.progetto.concept.title')+'</span>',
            style: {'background-color': "transparent;"},
            items: [this.cardConcept]
        })
        this.cardProgetto.add(this.sezioneConcept)
        if (record.data.step>10) {
            //seione Fmea card + allegati
            this.cardFmea = Ext.create('vda.view.forms.progetto.cards.Fmea');
            this.cardAttachFmea = Ext.create("portal.v1.view.main.global.upload.CardAttach")
            if (readOnlyFmea === false) {
                if (!this.uploadfile) {
                    this.uploadfile = Ext.create(
                        "portal.v1.view.main.global.upload.Attach"
                    ).on("returnRequest", "onReturnRequestAttach");
                }
                this.cardAttachFmea.down("#updfile").add(this.uploadfile);
                this.uploadfile.fireEvent("updateInfo", {
                    url: "", src: "", thumb: false, descrizione: "", readOnly: readOnlyFmea, updimage: false, rif: "", type: [],
                })
            }
            this.gridAttachFmea = Ext.create("vda.view.forms.progetto.attach.GridAttachFmea")
            this.cardAttachFmea.down("#updgrid").add(this.gridAttachFmea);
            let storeAttachFmea= this.getViewModel().get("storeAttachFmea");
            storeAttachFmea.removeAll();
            record.data.allegati.forEach(function (rec) {
                if (rec.step===15) {
                    rec["readOnlyAttach"] = readOnlyFmea;
                    rec["hideDownload"] = "false";
                    storeAttachFmea.add(Ext.create("portal.v1.view.main.global.upload.GridAttachModel", rec))
                }
            });
            this.cardFmea.add(this.cardAttachFmea);
            this.sezioneFmea=Ext.create('Ext.form.FieldSet',{
                collapsible: true, collapsed: false,
                title: '<span style="color: black;font-weight:bold">'+Locale.t('vda.forms.progetto.fmea.title')+'</span>',
                style: {'background-color': "transparent;"},
                items: [this.cardFmea]
            })
            this.cardProgetto.add(this.sezioneFmea)
        }
        if (record.data.step>15) {
            //sezione Pfmea card + immagini + allegati
            if (record.data.idscheda!=='') {
                hideScheda=false
            }
            this.cardPfmea = Ext.create('vda.view.forms.progetto.cards.Pfmea');
            this.cardAttachPfmea = Ext.create("portal.v1.view.main.global.upload.CardAttach")
            if (readOnlyPfmea === false) {
                if (!this.uploadfile) {
                    this.uploadfile = Ext.create(
                        "portal.v1.view.main.global.upload.Attach"
                    ).on("returnRequest", "onReturnRequestAttach");
                }
                this.cardAttachPfmea.down("#updfile").add(this.uploadfile);
                this.uploadfile.fireEvent("updateInfo", {
                    url: "", src: "", thumb: false, descrizione: "", readOnly: readOnlyPfmea, updimage: false, rif: "", type: [],
                })
            }
            this.gridAttachPfmea = Ext.create("vda.view.forms.progetto.attach.GridAttachPfmea")
            this.cardAttachPfmea.down("#updgrid").add(this.gridAttachPfmea);
            let storeAttachPfmea= this.getViewModel().get("storeAttachPfmea");
            storeAttachPfmea.removeAll();
            record.data.allegati.forEach(function (rec) {
                if (rec.step===20 || rec.step===25) {
                    rec["readOnlyAttach"] = readOnlyPfmea;
                    rec["hideDownload"] = "false";
                    storeAttachPfmea.add(Ext.create("portal.v1.view.main.global.upload.GridAttachModel", rec))
                }
            });
            if (!this.imgdis1) {
                this.imgdis1 = Ext.create('portal.v1.view.main.global.upload.Image')
                    .on('returnRequest', 'onReturnRequestDis').on('onResetImg', 'onResetImgDis').on('onClickImg', 'onClickDis')
            }
            this.imgdis1.fireEvent('updateInfo', {
                url: record.data['imgdis1'], src: '', thumb: true, descrizione: '',
                readOnly: readOnlyPfmea, updimage: true, rif: 'imgdis1', type: ['jpg', 'jpeg', 'png', 'gif']
            })
            this.cardPfmea.down('#imgDis1').add(this.imgdis1)
            if (!this.imgdis2) {
                this.imgdis2 = Ext.create('portal.v1.view.main.global.upload.Image')
                    .on('returnRequest', 'onReturnRequestDis').on('onResetImg', 'onResetImgDis').on('onClickImg', 'onClickDis')
            }
            this.imgdis2.fireEvent('updateInfo', {
                url: record.data['imgdis2'], src: '', thumb: true, descrizione: '',
                readOnly: readOnlyPfmea, updimage: true, rif: 'imgdis2', type: ['jpg', 'jpeg', 'png', 'gif']
            })
            this.cardPfmea.down('#imgDis2').add(this.imgdis2)
            if (!this.imgdis3) {
                this.imgdis3 = Ext.create('portal.v1.view.main.global.upload.Image')
                    .on('returnRequest', 'onReturnRequestDis').on('onResetImg', 'onResetImgDis').on('onClickImg', 'onClickDis')
            }
            this.imgdis3.fireEvent('updateInfo', {
                url: record.data['imgdis3'], src: '', thumb: true, descrizione: '',
                readOnly: readOnlyPfmea, updimage: true, rif: 'imgdis3', type: ['jpg', 'jpeg', 'png', 'gif']
            })
            this.cardPfmea.down('#imgDis3').add(this.imgdis3)
            if (!this.imgdis4) {
                this.imgdis4 = Ext.create('portal.v1.view.main.global.upload.Image')
                    .on('returnRequest', 'onReturnRequestDis').on('onResetImg', 'onResetImgDis').on('onClickImg', 'onClickDis')
            }
            this.imgdis4.fireEvent('updateInfo', {
                url: record.data['imgdis4'], src: '', thumb: true, descrizione: '',
                readOnly: readOnlyPfmea, updimage: true, rif: 'imgdis4', type: ['jpg', 'jpeg', 'png', 'gif']
            })
            this.cardPfmea.down('#imgDis4').add(this.imgdis4)
            if (!this.imgdis5) {
                this.imgdis5 = Ext.create('portal.v1.view.main.global.upload.Image')
                    .on('returnRequest', 'onReturnRequestDis').on('onResetImg', 'onResetImgDis').on('onClickImg', 'onClickDis')
            }
            this.imgdis5.fireEvent('updateInfo', {
                url: record.data['imgdis5'], src: '', thumb: true, descrizione: '',
                readOnly: readOnlyPfmea, updimage: true, rif: 'imgdis5', type: ['jpg', 'jpeg', 'png', 'gif']
            })
            this.cardPfmea.down('#imgDis5').add(this.imgdis5)
            //fine immagini - inizio allegati
            this.cardPfmea.add(this.cardAttachPfmea);
            this.sezionePfmea=Ext.create('Ext.form.FieldSet',{
                collapsible: true, collapsed: false,
                title: '<span style="color: black;font-weight:bold">'+Locale.t('vda.forms.progetto.pfmea.title')+'</span>',
                style: {'background-color': "transparent;"},
                items: [this.cardPfmea]
            })
            this.cardProgetto.add(this.sezionePfmea)
        }
        if (record.data.step>25) {
            //seione Ppap card + allegati
            this.cardPpap = Ext.create('vda.view.forms.progetto.cards.Ppap');
            this.cardAttachPpap = Ext.create("portal.v1.view.main.global.upload.CardAttach")
            if (readOnlyPpap === false) {
                if (!this.uploadfile) {
                    this.uploadfile = Ext.create(
                        "portal.v1.view.main.global.upload.Attach"
                    ).on("returnRequest", "onReturnRequestAttach");
                }
                this.cardAttachPpap.down("#updfile").add(this.uploadfile);
                this.uploadfile.fireEvent("updateInfo", {
                    url: "", src: "", thumb: false, descrizione: "", readOnly: readOnlyPpap, updimage: false, rif: "", type: [],
                })
            }
            this.gridAttachPpap = Ext.create("vda.view.forms.progetto.attach.GridAttachPpap")
            this.cardAttachPpap.down("#updgrid").add(this.gridAttachPpap);
            let storeAttachPpap= this.getViewModel().get("storeAttachPpap");
            storeAttachPpap.removeAll();
            record.data.allegati.forEach(function (rec) {
                if (rec.step===30) {
                    rec["readOnlyAttach"] = readOnlyPpap;
                    rec["hideDownload"] = "false";
                    storeAttachPpap.add(Ext.create("portal.v1.view.main.global.upload.GridAttachModel", rec))
                }
            });
            this.cardPpap.add(this.cardAttachPpap);
            this.sezionePpap=Ext.create('Ext.form.FieldSet',{
                collapsible: true, collapsed: false,
                title: '<span style="color: black;font-weight:bold">'+Locale.t('vda.forms.progetto.ppap.title')+'</span>',
                style: {'background-color': "transparent;"},
                items: [this.cardPpap]
            })
            this.cardProgetto.add(this.sezionePpap)
        }
        //grid mail inviate
        if (record.data.step>10) {
            this.gridmail=Ext.create("vda.view.forms.progetto.mail.Grid")
            this.sezionMail=Ext.create('Ext.form.FieldSet',{
                collapsible: true, collapsed: false,
                title: '<span style="color: black;font-weight:bold">'+Locale.t('vda.forms.progetto.gridmail.title')+'</span>',
                style: {'background-color': "transparent;"},
                items: [this.gridmail]
            })
            this.cardProgetto.add(this.sezionMail)
        }
        //imposto variabili viewmodel
        vm.set('hideNew',hideNew) //nascondo campi x il nuovo
        vm.set('hideScheda',hideScheda) //nascondo testo apertura scheda
        vm.set('readOnlyConcept',readOnlyConcept) //campi in lettura sezione concept
        vm.set('readOnlyFmea',readOnlyFmea) //campi in lettura sezione fmea
        vm.set('readOnlyPfmea',readOnlyPfmea) //campi in lettura sezione pfmea
        vm.set('readOnlyPpap',readOnlyPpap) //campi in lettura sezione ppap
        vm.set('hideComponente',hideComponente) //camnpi componente
        vm.set('hideCliente',hideCliente) //campi progetto primo impianto
        //panel principale
        this.form.add(this.cardProgetto);
        this.getView().setActiveItem(this.form);
    },
    //Salvataggio
    onSave: function () {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        if (!this.obb()) {
            return false;
        }
        if (record.data.idsoggetto==='') {record.data.cdcli=''}
        //allegati
        let storeallegati = vm.getStore("storeAttachConcept") //default allegati concept
        switch (record.data.step) {
            case 15: //fmea
                storeallegati = vm.getStore("storeAttachFmea")
                break
            case 20://pfmea
            case 25://attesa ok cliente
                storeallegati = vm.getStore("storeAttachPfmea")
                break
            case 30: //ppap
                storeallegati = vm.getStore("storeAttachPpap")
                break
        }
        record.data.allegati = [];
        storeallegati.each(function (rec) {
            rec.data.step = record.data.step
            record.data.allegati.push(rec.data);
        })
        this.callParent(arguments)
    },
    obb: function () {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        let progetto = this.cardProgetto.getForm() //default
        let modulo = this.cardConcept.getForm() //default
        switch (record.data.step) {
            case 15: //fmea
                modulo =  this.cardFmea.getForm()
                break
            case 20://pfmea
            case 25://attesa ok cliente
                modulo =  this.cardPfmea.getForm()
                break
            case 30: //ppap
                modulo =  this.cardPpap.getForm()
                break
        }
        if (!progetto.isValid()) {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('global.form.validation.modulo'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return false;
        }
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
    onReturnRequestAttach: function (res) {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        let store = vm.getStore("storeAttachConcept") //default allegati concept
        switch (record.data.step) {
            case 15: //fmea
                store = vm.getStore("storeAttachFmea")
                break
            case 20://pfmea
            case 25://attesa ok cliente
                store = vm.getStore("storeAttachPfmea")
                break
            case 30: //ppap
                store = vm.getStore("storeAttachPpap")
                break
        }
        res.valori.idautore = Ext.global.Vars.infoUser.id //imposto autore frontend
        res.valori.autore = Ext.global.Vars.infoUser.cognomenome //imposto autore frontend
        res.valori.hideDownload = "true" //il nuovo non lo posso scaricare
        store.add(
            Ext.create(
                "portal.v1.view.main.global.upload.GridAttachModel",
                res.valori
            )
        )
    },
    //setto id record prima del caricamento grid mail
    onBeforeLoad: function (store) {
        if (store.isLoading()) return false;
        let me = this,
            vm = me.getViewModel();
        let record = vm.get('record');
        store.getProxy().extraParams.idrecord = record.data.id
    }
})