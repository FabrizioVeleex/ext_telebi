/**
 * Created by luke on 25/03/22.
 */
Ext.define('gnc.view.forms.component.ControllerCorrective', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.corrective',

    requires: [
        'Ext.form.FieldSet',
        'gnc.model.forms.scheda.ComboFormazione',
        'gnc.model.forms.scheda.ComboMacchinari',
        'gnc.view.forms.scheda.attach.corrective.GridAttachAltrocause_ca',
        'gnc.view.forms.scheda.attach.corrective.GridAttachMachine_ca',
        'gnc.view.forms.scheda.attach.corrective.GridAttachMan_ca',
        'gnc.view.forms.scheda.attach.corrective.GridAttachMateriale_ca',
        'gnc.view.forms.scheda.attach.corrective.GridAttachMetodo_ca',
        'gnc.view.forms.scheda.attach.corrective.GridAttachProgetto_ca',
        'gnc.view.forms.scheda.attach.corrective.GridAttachStrumenti_ca',
        'gnc.view.forms.scheda.grids.GridFormazione',
        'gnc.view.forms.scheda.grids.GridMacchinari',
        'portal.util.Functions',
        'portal.v1.view.main.global.upload.Attach',
        'portal.v1.view.main.global.upload.CardAttach',
        'portal.v1.view.main.global.upload.GridAttachModel'
    ],
    //grid formazione
    onCreateGridFormazione:function(record,readOnlyCorrective) {
        this.gridFormazione = Ext.create('gnc.view.forms.scheda.grids.GridFormazione');
        let store = this.gridFormazione.getStore()
        store.loadData(record.data.formazione)
        if (readOnlyCorrective === false) {
            this.gridFormazione.getStore().add(Ext.create('gnc.model.forms.scheda.ComboFormazione', {
                action: 1, isnew: 1, id: bdFunctions.bpRandomString(32),
                numero: '', tipologia: '', datac: '', datasca: '', sede: '',idcorso:''
            }))
        }
        this.cardFormazione=Ext.create('Ext.form.FieldSet',{
            collapsible: true, collapsed: false,
            title: '<span style="color: black;font-weight:bold">'+Locale.t('gnc.forms.scheda.grids.formazione.title')+'</span>',
            style: {'background-color': "transparent;"},
            items: [this.gridFormazione]
        })
        this.cardCorrective.down("#formazionefld").add(this.cardFormazione);
    },
    //grid macchinari
    onCreateGridMacchinari:function(record,readOnlyCorrective) {
        this.gridMacchinari = Ext.create('gnc.view.forms.scheda.grids.GridMacchinari');
        let store = this.gridMacchinari.getStore()
        store.loadData(record.data.macchinari)
        if (readOnlyCorrective === false) {
            this.gridMacchinari.getStore().add(Ext.create('gnc.model.forms.scheda.ComboMacchinari', {
                action: 1, isnew: 1, id: bdFunctions.bpRandomString(32),
                numero: '', tipologia: '', datac: '', datasca: '', sede: '',idmonitoraggio:'',prodotto:''
            }))
        }
        this.cardMacchinari=Ext.create('Ext.form.FieldSet',{
            collapsible: true, collapsed: false,
            title: '<span style="color: black;font-weight:bold">'+Locale.t('gnc.forms.scheda.grids.macchinari.title')+'</span>',
            style: {'background-color': "transparent;"},
            items: [this.gridMacchinari]
        })
        this.cardCorrective.down("#macchinarifld").add(this.cardMacchinari);
    },
    //sezioni allegati
    onCreateAttachMateriale_ca:function(record,readOnlyCorrective) {
        this.cardAttachMateriale_ca = Ext.create("portal.v1.view.main.global.upload.CardAttach")
        if (readOnlyCorrective === false) {
            if (!this.uploadfileMateriale_ca) {
                this.uploadfileMateriale_ca = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestAttachCorrective");
            }
            this.cardAttachMateriale_ca.down("#updfile").add(this.uploadfileMateriale_ca);
            this.uploadfileMateriale_ca.fireEvent("updateInfo", {
                url: "", src: "", thumb: false, descrizione: "", readOnly: false, updimage: false, rif: "materiale_ca", type: [],
            })
        }
        this.gridAttachMateriale_ca = Ext.create("gnc.view.forms.scheda.attach.corrective.GridAttachMateriale_ca")
        let store = this.gridAttachMateriale_ca.getStore()
        store.loadData(record.data.allegati.filter(obj=>obj.campo==='materiale_ca'))
        this.cardAttachMateriale_ca.down("#updgrid").add(this.gridAttachMateriale_ca);
        this.cardCorrective.down("#materiale_cafld").add(this.cardAttachMateriale_ca);
    },
    onCreateAttachMan_ca:function(record,readOnlyCorrective) {
        this.cardAttachMan_ca = Ext.create("portal.v1.view.main.global.upload.CardAttach")
        if (readOnlyCorrective === false) {
            if (!this.uploadfileMan_ca) {
                this.uploadfileMan_ca = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestAttachCorrective");
            }
            this.cardAttachMan_ca.down("#updfile").add(this.uploadfileMan_ca);
            this.uploadfileMan_ca.fireEvent("updateInfo", {
                url: "", src: "", thumb: false, descrizione: "", readOnly: false, updimage: false, rif: "man_ca", type: [],
            })
        }
        this.gridAttachMan_ca = Ext.create("gnc.view.forms.scheda.attach.corrective.GridAttachMan_ca")
        let store = this.gridAttachMan_ca.getStore()
        store.loadData(record.data.allegati.filter(obj=>obj.campo==='man_ca'))
        this.cardAttachMan_ca.down("#updgrid").add(this.gridAttachMan_ca);
        this.cardCorrective.down("#man_cafld").add(this.cardAttachMan_ca);
    },
    onCreateAttachMachine_ca:function(record,readOnlyCorrective) {
        this.cardAttachMachine_ca = Ext.create("portal.v1.view.main.global.upload.CardAttach")
        if (readOnlyCorrective === false) {
            if (!this.uploadfileMachine_ca) {
                this.uploadfileMachine_ca = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestAttachCorrective");
            }
            this.cardAttachMachine_ca.down("#updfile").add(this.uploadfileMachine_ca);
            this.uploadfileMachine_ca.fireEvent("updateInfo", {
                url: "", src: "", thumb: false, descrizione: "", readOnly: false, updimage: false, rif: "machine_ca", type: [],
            })
        }
        this.gridAttachMachine_ca = Ext.create("gnc.view.forms.scheda.attach.corrective.GridAttachMachine_ca")
        let store = this.gridAttachMachine_ca.getStore()
        store.loadData(record.data.allegati.filter(obj=>obj.campo==='machine_ca'))
        this.cardAttachMachine_ca.down("#updgrid").add(this.gridAttachMachine_ca);
        this.cardCorrective.down("#machine_cafld").add(this.cardAttachMachine_ca);
    },
    onCreateAttachStrumenti_ca:function(record,readOnlyCorrective) {
        this.cardAttachStrumenti_ca = Ext.create("portal.v1.view.main.global.upload.CardAttach")
        if (readOnlyCorrective === false) {
            if (!this.uploadfileStrumenti_ca) {
                this.uploadfileStrumenti_ca = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestAttachCorrective");
            }
            this.cardAttachStrumenti_ca.down("#updfile").add(this.uploadfileStrumenti_ca);
            this.uploadfileStrumenti_ca.fireEvent("updateInfo", {
                url: "", src: "", thumb: false, descrizione: "", readOnly: false, updimage: false, rif: "strumenti_ca", type: [],
            })
        }
        this.gridAttachStrumenti_ca = Ext.create("gnc.view.forms.scheda.attach.corrective.GridAttachStrumenti_ca")
        let store = this.gridAttachStrumenti_ca.getStore()
        store.loadData(record.data.allegati.filter(obj=>obj.campo==='strumenti_ca'))
        this.cardAttachStrumenti_ca.down("#updgrid").add(this.gridAttachStrumenti_ca);
        this.cardCorrective.down("#strumenti_cafld").add(this.cardAttachStrumenti_ca);
    },
    onCreateAttachMetodo_ca:function(record,readOnlyCorrective) {
        this.cardAttachMetodo_ca = Ext.create("portal.v1.view.main.global.upload.CardAttach")
        if (readOnlyCorrective === false) {
            if (!this.uploadfileMetodo_ca) {
                this.uploadfileMetodo_ca = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestAttachCorrective");
            }
            this.cardAttachMetodo_ca.down("#updfile").add(this.uploadfileMetodo_ca);
            this.uploadfileMetodo_ca.fireEvent("updateInfo", {
                url: "", src: "", thumb: false, descrizione: "", readOnly: false, updimage: false, rif: "metodo_ca", type: [],
            })
        }
        this.gridAttachMetodo_ca = Ext.create("gnc.view.forms.scheda.attach.corrective.GridAttachMetodo_ca")
        let store = this.gridAttachMetodo_ca.getStore()
        store.loadData(record.data.allegati.filter(obj=>obj.campo==='metodo_ca'))
        this.cardAttachMetodo_ca.down("#updgrid").add(this.gridAttachMetodo_ca);
        this.cardCorrective.down("#metodo_cafld").add(this.cardAttachMetodo_ca);
    },
    onCreateAttachProgetto_ca:function(record,readOnlyCorrective) {
        this.cardAttachProgetto_ca = Ext.create("portal.v1.view.main.global.upload.CardAttach")
        if (readOnlyCorrective === false) {
            if (!this.uploadfileProgetto_ca) {
                this.uploadfileProgetto_ca = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestAttachCorrective");
            }
            this.cardAttachProgetto_ca.down("#updfile").add(this.uploadfileProgetto_ca);
            this.uploadfileProgetto_ca.fireEvent("updateInfo", {
                url: "", src: "", thumb: false, descrizione: "", readOnly: false, updimage: false, rif: "progetto_ca", type: [],
            })
        }
        this.gridAttachProgetto_ca = Ext.create("gnc.view.forms.scheda.attach.corrective.GridAttachProgetto_ca")
        let store = this.gridAttachProgetto_ca.getStore()
        store.loadData(record.data.allegati.filter(obj=>obj.campo==='progetto_ca'))
        this.cardAttachProgetto_ca.down("#updgrid").add(this.gridAttachProgetto_ca);
        this.cardCorrective.down("#progetto_cafld").add(this.cardAttachProgetto_ca);
    },
    onCreateAttachAltrocause_ca:function(record,readOnlyCorrective) {
        this.cardAttachAltrocause_ca = Ext.create("portal.v1.view.main.global.upload.CardAttach")
        if (readOnlyCorrective === false) {
            if (!this.uploadfileAltrocause_ca) {
                this.uploadfileAltrocause_ca = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestAttachCorrective");
            }
            this.cardAttachAltrocause_ca.down("#updfile").add(this.uploadfileAltrocause_ca);
            this.uploadfileAltrocause_ca.fireEvent("updateInfo", {
                url: "", src: "", thumb: false, descrizione: "", readOnly: false, updimage: false, rif: "altrocause_ca", type: [],
            })
        }
        this.gridAttachAltrocause_ca = Ext.create("gnc.view.forms.scheda.attach.corrective.GridAttachAltrocause_ca")
        let store = this.gridAttachAltrocause_ca.getStore()
        store.loadData(record.data.allegati.filter(obj=>obj.campo==='altrocause_ca'))
        this.cardAttachAltrocause_ca.down("#updgrid").add(this.gridAttachAltrocause_ca);
        this.cardCorrective.down("#altrocause_cafld").add(this.cardAttachAltrocause_ca);
    },
    obbInoltroCorrective: function (btn) {
        let me = this, vm = me.getViewModel(), record = vm.get('record'), error=''
        //obb materiale
        if ((record.data.materiale_ca || record.data.materiale_ca===1) && (!record.data.materiale_resp || record.data.materiale_resp==='')) {
            error += Locale.t('gnc.forms.scheda.corrective.obb.materiale_resp')+'<br>';
        }
        if ((record.data.materiale_ca || record.data.materiale_ca===1) && (!record.data.notemateriale_ca || record.data.notemateriale_ca==='')) {
            error += Locale.t('gnc.forms.scheda.corrective.obb.notemateriale')+'<br>';
        }
        if ((record.data.materiale_ca || record.data.materiale_ca===1) && this.gridAttachMateriale_ca && this.gridAttachMateriale_ca.getStore().data.length===0) {
            error += Locale.t('gnc.forms.scheda.corrective.obb.attach_materiale')+'<br>';
        }
        if ((record.data.materiale_ca || record.data.materiale_ca===1) && (!record.data.dricmatca || record.data.dricmatca==='')) {
            error += Locale.t('gnc.forms.scheda.corrective.obb.dricmatca')+'<br>';
        }
        if ((record.data.materiale_ca || record.data.materiale_ca===1) && (!record.data.dcommatca || record.data.dcommatca==='')) {
            error += Locale.t('gnc.forms.scheda.corrective.obb.dcommatca')+'<br>';
        }
        //obb man
        if ((record.data.man_ca || record.data.man_ca===1) && (!record.data.man_resp || record.data.man_resp==='')) {
            error += Locale.t('gnc.forms.scheda.corrective.obb.man_resp')+'<br>';
        }
        if ((record.data.man_ca || record.data.man_ca===1) && (!record.data.noteman_ca || record.data.noteman_ca==='')) {
            error += Locale.t('gnc.forms.scheda.corrective.obb.noteman')+'<br>';
        }
        if ((record.data.man_ca || record.data.man_ca===1) && this.gridAttachMan_ca && this.gridAttachMan_ca.getStore().data.length===0) {
            error += Locale.t('gnc.forms.scheda.corrective.obb.attach_man')+'<br>';
        }
        if ((record.data.man_ca || record.data.man_ca===1) && (!record.data.dricmanca || record.data.dricmanca==='')) {
            error += Locale.t('gnc.forms.scheda.corrective.obb.dricmanca')+'<br>';
        }
        if ((record.data.man_ca || record.data.man_ca===1) && (!record.data.dcommanca || record.data.dcommanca==='')) {
            error += Locale.t('gnc.forms.scheda.corrective.obb.dcommanca')+'<br>';
        }
        //obb machine
        if ((record.data.machine_ca || record.data.machine_ca===1) && (!record.data.machine_resp || record.data.machine_resp==='')) {
            error += Locale.t('gnc.forms.scheda.corrective.obb.machine_resp')+'<br>';
        }
        if ((record.data.machine_ca || record.data.machine_ca===1) && (!record.data.notemachine_ca || record.data.notemachine_ca==='')) {
            error += Locale.t('gnc.forms.scheda.corrective.obb.notemachine')+'<br>';
        }
        if ((record.data.machine_ca || record.data.machine_ca===1) && this.gridAttachMachine_ca && this.gridAttachMachine_ca.getStore().data.length===0) {
            error += Locale.t('gnc.forms.scheda.corrective.obb.attach_machine')+'<br>';
        }
        if ((record.data.machine_ca || record.data.machine_ca===1) && (!record.data.dricmacca || record.data.dricmacca==='')) {
            error += Locale.t('gnc.forms.scheda.corrective.obb.dricmacca')+'<br>';
        }
        if ((record.data.machine_ca || record.data.machine_ca===1) && (!record.data.dcommacca || record.data.dcommacca==='')) {
            error += Locale.t('gnc.forms.scheda.corrective.obb.dcommacca')+'<br>';
        }
        //obb strumenti
        if ((record.data.strumenti_ca || record.data.strumenti_ca===1) && (!record.data.strumenti_resp || record.data.strumenti_resp==='')) {
            error += Locale.t('gnc.forms.scheda.corrective.obb.strumenti_resp')+'<br>';
        }
        if ((record.data.strumenti_ca || record.data.strumenti_ca===1) && (!record.data.notestrumenti_ca || record.data.notestrumenti_ca==='')) {
            error += Locale.t('gnc.forms.scheda.corrective.obb.notestrumenti')+'<br>';
        }
        if ((record.data.strumenti_ca || record.data.strumenti_ca===1) && this.gridAttachStrumenti_ca && this.gridAttachStrumenti_ca.getStore().data.length===0) {
            error += Locale.t('gnc.forms.scheda.corrective.obb.attach_strumenti')+'<br>';
        }
        if ((record.data.strumenti_ca || record.data.strumenti_ca===1) && (!record.data.dricstrca || record.data.dricstrca==='')) {
            error += Locale.t('gnc.forms.scheda.corrective.obb.dricstrca')+'<br>';
        }
        if ((record.data.strumenti_ca || record.data.strumenti_ca===1) && (!record.data.dcomstrca || record.data.dcomstrca==='')) {
            error += Locale.t('gnc.forms.scheda.corrective.obb.dcomstrca')+'<br>';
        }
        //obb metodo
        if ((record.data.metodo_ca || record.data.metodo_ca===1) && (!record.data.metodo_resp || record.data.metodo_resp==='')) {
            error += Locale.t('gnc.forms.scheda.corrective.obb.metodo_resp')+'<br>';
        }
        if ((record.data.metodo_ca || record.data.metodo_ca===1) && (!record.data.notemetodo_ca || record.data.notemetodo_ca==='')) {
            error += Locale.t('gnc.forms.scheda.corrective.obb.notemetodo')+'<br>';
        }
        if ((record.data.metodo_ca || record.data.metodo_ca===1) && this.gridAttachMetodo_ca && this.gridAttachMetodo_ca.getStore().data.length===0) {
            error += Locale.t('gnc.forms.scheda.corrective.obb.attach_metodo')+'<br>';
        }
        if ((record.data.metodo_ca || record.data.metodo_ca===1) && (!record.data.dricmetca || record.data.dricmetca==='')) {
            error += Locale.t('gnc.forms.scheda.corrective.obb.dricmetca')+'<br>';
        }
        if ((record.data.metodo_ca || record.data.metodo_ca===1) && (!record.data.dcommetca || record.data.dcommetca==='')) {
            error += Locale.t('gnc.forms.scheda.corrective.obb.dcommetca')+'<br>';
        }
        //obb progetto
        if ((record.data.progetto_ca || record.data.progetto_ca===1) && (!record.data.progetto_resp || record.data.progetto_resp==='')) {
            error += Locale.t('gnc.forms.scheda.corrective.obb.progetto_resp')+'<br>';
        }
        if ((record.data.progetto_ca || record.data.progetto_ca===1) && (!record.data.noteprogetto_ca || record.data.noteprogetto_ca==='')) {
            error += Locale.t('gnc.forms.scheda.corrective.obb.noteprogetto')+'<br>';
        }
        if ((record.data.progetto_ca || record.data.progetto_ca===1) && this.gridAttachProgetto_ca && this.gridAttachProgetto_ca.getStore().data.length===0) {
            error += Locale.t('gnc.forms.scheda.corrective.obb.attach_progetto')+'<br>';
        }
        if ((record.data.progetto_ca || record.data.progetto_ca===1) && (!record.data.dricproca || record.data.dricproca==='')) {
            error += Locale.t('gnc.forms.scheda.corrective.obb.dricproca')+'<br>';
        }
        if ((record.data.progetto_ca || record.data.progetto_ca===1) && (!record.data.dcomproca || record.data.dcomproca==='')) {
            error += Locale.t('gnc.forms.scheda.corrective.obb.dcomproca')+'<br>';
        }
        //obb altro
        if ((record.data.altrocause_ca || record.data.altrocause_ca===1) && (!record.data.altro_resp || record.data.altro_resp==='')) {
            error += Locale.t('gnc.forms.scheda.corrective.obb.altro_resp')+'<br>';
        }
        if ((record.data.altrocause_ca || record.data.altrocause_ca===1) && (!record.data.notealtrocause_ca || record.data.notealtrocause_ca==='')) {
            error += Locale.t('gnc.forms.scheda.corrective.obb.notealtro')+'<br>';
        }
        if ((record.data.altrocause_ca || record.data.altrocause_ca===1) && this.gridAttachAltrocause_ca && this.gridAttachAltrocause_ca.getStore().data.length===0) {
            error += Locale.t('gnc.forms.scheda.corrective.obb.attach_altro')+'<br>';
        }
        if ((record.data.altrocause_ca || record.data.altrocause_ca===1) && (!record.data.dricaltca || record.data.dricaltca==='')) {
            error += Locale.t('gnc.forms.scheda.corrective.obb.dricaltca')+'<br>';
        }
        if ((record.data.altrocause_ca || record.data.altrocause_ca===1) && (!record.data.dcomaltca || record.data.dcomaltca==='')) {
            error += Locale.t('gnc.forms.scheda.corrective.obb.dcomaltca')+'<br>';
        }
        if (error!==''){
            Ext.Msg.show({title: Locale.t('global.attenzione'), msg: error, buttons: Ext.Msg.OK, icon: Ext.MessageBox.ERROR});
            return
        }
        this.onInoltra(btn);
    },
    //ritorno caricamento allegato
    onReturnRequestAttachCorrective: function (res) {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        let store
        switch (res.valori.rif) {
            case 'materiale_ca':
                store = this.gridAttachMateriale_ca.getStore()
                break
            case 'man_ca':
                store = this.gridAttachMan_ca.getStore()
                break
            case 'machine_ca':
                store = this.gridAttachMachine_ca.getStore()
                break
            case 'strumenti_ca':
                store = this.gridAttachStrumenti_ca.getStore()
                break
            case 'metodo_ca':
                store = this.gridAttachMetodo_ca.getStore()
                break
            case 'progetto_ca':
                store = this.gridAttachProgetto_ca.getStore()
                break
            case 'altrocause_ca':
                store = this.gridAttachAltrocause_ca.getStore()
                break
        }
        res.valori.idautore = Ext.global.Vars.infoUser.id //imposto autore frontend
        res.valori.autore = Ext.global.Vars.infoUser.cognomenome //imposto autore frontend
        res.valori.hideDownload = "true" //il nuovo non lo posso scaricare
        let newrec=Ext.create("portal.v1.view.main.global.upload.GridAttachModel", res.valori) //creo oggetto
        store.add(newrec) //aggiungo nello store front-end
        newrec.data.campo=res.valori.rif //imposto campo
        record.data.allegati.push(newrec.data) //lo metto nel record backend
    }
});