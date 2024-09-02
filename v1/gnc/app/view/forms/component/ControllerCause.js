/**
 * Created by luke on 25/03/22.
 */
Ext.define('gnc.view.forms.component.ControllerCause', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cause',

    requires: [
        'gnc.view.forms.scheda.attach.cause.GridAttachAltrocause',
        'gnc.view.forms.scheda.attach.cause.GridAttachMachine',
        'gnc.view.forms.scheda.attach.cause.GridAttachMan',
        'gnc.view.forms.scheda.attach.cause.GridAttachMateriale',
        'gnc.view.forms.scheda.attach.cause.GridAttachMetodo',
        'gnc.view.forms.scheda.attach.cause.GridAttachProgetto',
        'gnc.view.forms.scheda.attach.cause.GridAttachStrumenti',
        'portal.v1.view.main.global.upload.Attach',
        'portal.v1.view.main.global.upload.CardAttach',
        'portal.v1.view.main.global.upload.GridAttachModel'
    ],
    //sezioni allegati
    onCreateAttachMateriale:function(record,readOnlyCause) {
        this.cardAttachMateriale = Ext.create("portal.v1.view.main.global.upload.CardAttach")
        if (readOnlyCause === false) {
            if (!this.uploadfileMateriale) {
                this.uploadfileMateriale = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestAttachCause");
            }
            this.cardAttachMateriale.down("#updfile").add(this.uploadfileMateriale);
            this.uploadfileMateriale.fireEvent("updateInfo", {
                url: "", src: "", thumb: false, descrizione: "", readOnly: false, updimage: false, rif: "materiale", type: [],
            })
        }
        this.gridAttachMateriale = Ext.create("gnc.view.forms.scheda.attach.cause.GridAttachMateriale")
        let store = this.gridAttachMateriale.getStore()
        store.loadData(record.data.allegati.filter(obj=>obj.campo==='materiale'))
        this.cardAttachMateriale.down("#updgrid").add(this.gridAttachMateriale);
        this.cardCause.down("#materialefld").add(this.cardAttachMateriale);
    },
    onCreateAttachMan:function(record,readOnlyCause) {
        this.cardAttachMan = Ext.create("portal.v1.view.main.global.upload.CardAttach")
        if (readOnlyCause === false) {
            if (!this.uploadfileMan) {
                this.uploadfileMan = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestAttachCause");
            }
            this.cardAttachMan.down("#updfile").add(this.uploadfileMan);
            this.uploadfileMan.fireEvent("updateInfo", {
                url: "", src: "", thumb: false, descrizione: "", readOnly: false, updimage: false, rif: "man", type: [],
            })
        }
        this.gridAttachMan = Ext.create("gnc.view.forms.scheda.attach.cause.GridAttachMan")
        let store = this.gridAttachMan.getStore()
        store.loadData(record.data.allegati.filter(obj=>obj.campo==='man'))
        this.cardAttachMan.down("#updgrid").add(this.gridAttachMan);
        this.cardCause.down("#manfld").add(this.cardAttachMan);
    },
    onCreateAttachMachine:function(record,readOnlyCause) {
        this.cardAttachMachine = Ext.create("portal.v1.view.main.global.upload.CardAttach")
        if (readOnlyCause === false) {
            if (!this.uploadfileMachine) {
                this.uploadfileMachine = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestAttachCause");
            }
            this.cardAttachMachine.down("#updfile").add(this.uploadfileMachine);
            this.uploadfileMachine.fireEvent("updateInfo", {
                url: "", src: "", thumb: false, descrizione: "", readOnly: false, updimage: false, rif: "machine", type: [],
            })
        }
        this.gridAttachMachine = Ext.create("gnc.view.forms.scheda.attach.cause.GridAttachMachine")
        let store = this.gridAttachMachine.getStore()
        store.loadData(record.data.allegati.filter(obj=>obj.campo==='machine'))
        this.cardAttachMachine.down("#updgrid").add(this.gridAttachMachine);
        this.cardCause.down("#machinefld").add(this.cardAttachMachine);
    },
    onCreateAttachStrumenti:function(record,readOnlyCause) {
        this.cardAttachStrumenti = Ext.create("portal.v1.view.main.global.upload.CardAttach")
        if (readOnlyCause === false) {
            if (!this.uploadfileStrumenti) {
                this.uploadfileStrumenti = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestAttachCause");
            }
            this.cardAttachStrumenti.down("#updfile").add(this.uploadfileStrumenti);
            this.uploadfileStrumenti.fireEvent("updateInfo", {
                url: "", src: "", thumb: false, descrizione: "", readOnly: false, updimage: false, rif: "strumenti", type: [],
            })
        }
        this.gridAttachStrumenti = Ext.create("gnc.view.forms.scheda.attach.cause.GridAttachStrumenti")
        let store = this.gridAttachStrumenti.getStore()
        store.loadData(record.data.allegati.filter(obj=>obj.campo==='strumenti'))
        this.cardAttachStrumenti.down("#updgrid").add(this.gridAttachStrumenti);
        this.cardCause.down("#strumentifld").add(this.cardAttachStrumenti);
    },
    onCreateAttachMetodo:function(record,readOnlyCause) {
        this.cardAttachMetodo = Ext.create("portal.v1.view.main.global.upload.CardAttach")
        if (readOnlyCause === false) {
            if (!this.uploadfileMetodo) {
                this.uploadfileMetodo = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestAttachCause");
            }
            this.cardAttachMetodo.down("#updfile").add(this.uploadfileMetodo);
            this.uploadfileMetodo.fireEvent("updateInfo", {
                url: "", src: "", thumb: false, descrizione: "", readOnly: false, updimage: false, rif: "metodo", type: [],
            })
        }
        this.gridAttachMetodo = Ext.create("gnc.view.forms.scheda.attach.cause.GridAttachMetodo")
        let store = this.gridAttachMetodo.getStore()
        store.loadData(record.data.allegati.filter(obj=>obj.campo==='metodo'))
        this.cardAttachMetodo.down("#updgrid").add(this.gridAttachMetodo);
        this.cardCause.down("#metodofld").add(this.cardAttachMetodo);
    },
    onCreateAttachProgetto:function(record,readOnlyCause) {
        this.cardAttachProgetto = Ext.create("portal.v1.view.main.global.upload.CardAttach")
        if (readOnlyCause === false) {
            if (!this.uploadfileProgetto) {
                this.uploadfileProgetto = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestAttachCause");
            }
            this.cardAttachProgetto.down("#updfile").add(this.uploadfileProgetto);
            this.uploadfileProgetto.fireEvent("updateInfo", {
                url: "", src: "", thumb: false, descrizione: "", readOnly: false, updimage: false, rif: "progetto", type: [],
            })
        }
        this.gridAttachProgetto = Ext.create("gnc.view.forms.scheda.attach.cause.GridAttachProgetto")
        let store = this.gridAttachProgetto.getStore()
        store.loadData(record.data.allegati.filter(obj=>obj.campo==='progetto'))
        this.cardAttachProgetto.down("#updgrid").add(this.gridAttachProgetto);
        this.cardCause.down("#progettofld").add(this.cardAttachProgetto);
    },
    onCreateAttachAltrocause:function(record,readOnlyCause) {
        this.cardAttachAltrocause = Ext.create("portal.v1.view.main.global.upload.CardAttach")
        if (readOnlyCause === false) {
            if (!this.uploadfileAltrocause) {
                this.uploadfileAltrocause = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestAttachCause");
            }
            this.cardAttachAltrocause.down("#updfile").add(this.uploadfileAltrocause);
            this.uploadfileAltrocause.fireEvent("updateInfo", {
                url: "", src: "", thumb: false, descrizione: "", readOnly: false, updimage: false, rif: "altrocause", type: [],
            })
        }
        this.gridAttachAltrocause = Ext.create("gnc.view.forms.scheda.attach.cause.GridAttachAltrocause")
        let store = this.gridAttachAltrocause.getStore()
        store.loadData(record.data.allegati.filter(obj=>obj.campo==='altrocause'))
        this.cardAttachAltrocause.down("#updgrid").add(this.gridAttachAltrocause);
        this.cardCause.down("#altrocausefld").add(this.cardAttachAltrocause);
    },
    obbInoltroCause: function (btn) {
        let me = this, vm = me.getViewModel(), record = vm.get('record'), error=''
        if (record.data.dcausa === '' || record.data.dcausa === '0000-00-00'){
            error += Locale.t('gnc.forms.scheda.cause.fields.dcausa')+': '+Locale.t('global.form.inserirevalore')+'<br>';
        }
        if ((!record.data.materiale || record.data.materiale===0) && (!record.data.man || record.data.man===0) && (!record.data.machine || record.data.machine===0) && (!record.data.strumenti || record.data.strumenti===0)
            && (!record.data.metodo || record.data.metodo===0) && (!record.data.progetto || record.data.progetto===0) && (!record.data.altrocause || record.data.altrocause===0)){
            error += Locale.t('gnc.forms.scheda.cause.obbsel')+'<br>';
        }
        if ((record.data.altrocause || record.data.altrocause===1) && (!record.data.notealtrocause || record.data.notealtrocause==='')) {
            error += Locale.t('gnc.forms.scheda.cause.fields.notealtrocause')+': '+Locale.t('global.form.inserirevalore')+'<br>';
        }
        if (!record.data.notecausa || record.data.notecausa === ''){
            error += Locale.t('gnc.forms.scheda.cause.fields.notecausa')+': '+Locale.t('global.form.inserirevalore')+'<br>';
        }
        if (error!==''){
            Ext.Msg.show({title: Locale.t('global.attenzione'), msg: error, buttons: Ext.Msg.OK, icon: Ext.MessageBox.ERROR});
            return
        }
        this.onInoltra(btn);
    },
    //ritorno caricamento allegato
    onReturnRequestAttachCause: function (res) {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        let store
        switch (res.valori.rif) {
            case 'materiale':
                store = this.gridAttachMateriale.getStore()
                break
            case 'man':
                store = this.gridAttachMan.getStore()
                break
            case 'machine':
                store = this.gridAttachMachine.getStore()
                break
            case 'strumenti':
                store = this.gridAttachStrumenti.getStore()
                break
            case 'metodo':
                store = this.gridAttachMetodo.getStore()
                break
            case 'progetto':
                store = this.gridAttachProgetto.getStore()
                break
            case 'altrocause':
                store = this.gridAttachAltrocause.getStore()
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