/**
 * Created by luke on 25/03/22.
 */
Ext.define('gnc.view.forms.component.ControllerValidation', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.validation',

    requires: [
        'Ext.form.FieldSet',
        'gnc.model.forms.scheda.ComboCollaudo',
        'gnc.view.forms.scheda.attach.validation.GridAttachAltrocause_val',
        'gnc.view.forms.scheda.attach.validation.GridAttachMachine_val',
        'gnc.view.forms.scheda.attach.validation.GridAttachMan_val',
        'gnc.view.forms.scheda.attach.validation.GridAttachMateriale_val',
        'gnc.view.forms.scheda.attach.validation.GridAttachMetodo_val',
        'gnc.view.forms.scheda.attach.validation.GridAttachProgetto_val',
        'gnc.view.forms.scheda.attach.validation.GridAttachStrumenti_val',
        'gnc.view.forms.scheda.grids.GridCollaudo',
        'portal.util.Functions',
        'portal.v1.view.main.global.upload.Attach',
        'portal.v1.view.main.global.upload.CardAttach',
        'portal.v1.view.main.global.upload.GridAttachModel'
    ],
    //grid collaudo
    onCreateGridCollaudo:function(record,readOnlyValidation) {
        this.gridCollaudo = Ext.create('gnc.view.forms.scheda.grids.GridCollaudo');
        let store = this.gridCollaudo.getStore()
        store.loadData(record.data.collaudo)
        if (readOnlyValidation === false) {
            this.gridCollaudo.getStore().add(Ext.create('gnc.model.forms.scheda.ComboCollaudo', {
                action: 1, isnew: 1, id: bdFunctions.bpRandomString(32),
                numero: '', tipologia: '', codacr: '', articolo: '', fornitore: '',stato:'',idscheda:''
            }))
        }
        this.cardCollaudo=Ext.create('Ext.form.FieldSet',{
            collapsible: true, collapsed: false,
            title: '<span style="color: black;font-weight:bold">'+Locale.t('gnc.forms.scheda.grids.collaudo.title')+'</span>',
            style: {'background-color': "transparent;"},
            items: [this.gridCollaudo]
        })
        this.cardValidation.down("#collaudofld").add(this.cardCollaudo);
    },
    //sezioni allegati
    onCreateAttachMateriale_val:function(record,readOnlyValidation) {
        this.cardAttachMateriale_val = Ext.create("portal.v1.view.main.global.upload.CardAttach")
        if (readOnlyValidation === false) {
            if (!this.uploadfileMateriale_val) {
                this.uploadfileMateriale_val = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestAttachValidation");
            }
            this.cardAttachMateriale_val.down("#updfile").add(this.uploadfileMateriale_val);
            this.uploadfileMateriale_val.fireEvent("updateInfo", {
                url: "", src: "", thumb: false, descrizione: "", readOnly: false, updimage: false, rif: "materiale_val", type: [],
            })
        }
        this.gridAttachMateriale_val = Ext.create("gnc.view.forms.scheda.attach.validation.GridAttachMateriale_val")
        let store = this.gridAttachMateriale_val.getStore()
        store.loadData(record.data.allegati.filter(obj=>obj.campo==='materiale_val'))
        this.cardAttachMateriale_val.down("#updgrid").add(this.gridAttachMateriale_val);
        this.cardValidation.down("#materiale_valfld").add(this.cardAttachMateriale_val);
    },
    onCreateAttachMan_val:function(record,readOnlyValidation) {
        this.cardAttachMan_val = Ext.create("portal.v1.view.main.global.upload.CardAttach")
        if (readOnlyValidation === false) {
            if (!this.uploadfileMan_val) {
                this.uploadfileMan_val = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestAttachValidation");
            }
            this.cardAttachMan_val.down("#updfile").add(this.uploadfileMan_val);
            this.uploadfileMan_val.fireEvent("updateInfo", {
                url: "", src: "", thumb: false, descrizione: "", readOnly: false, updimage: false, rif: "man_val", type: [],
            })
        }
        this.gridAttachMan_val = Ext.create("gnc.view.forms.scheda.attach.validation.GridAttachMan_val")
        let store = this.gridAttachMan_val.getStore()
        store.loadData(record.data.allegati.filter(obj=>obj.campo==='man_val'))
        this.cardAttachMan_val.down("#updgrid").add(this.gridAttachMan_val);
        this.cardValidation.down("#man_valfld").add(this.cardAttachMan_val);
    },
    onCreateAttachMachine_val:function(record,readOnlyValidation) {
        this.cardAttachMachine_val = Ext.create("portal.v1.view.main.global.upload.CardAttach")
        if (readOnlyValidation === false) {
            if (!this.uploadfileMachine_val) {
                this.uploadfileMachine_val = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestAttachValidation");
            }
            this.cardAttachMachine_val.down("#updfile").add(this.uploadfileMachine_val);
            this.uploadfileMachine_val.fireEvent("updateInfo", {
                url: "", src: "", thumb: false, descrizione: "", readOnly: false, updimage: false, rif: "machine_val", type: [],
            })
        }
        this.gridAttachMachine_val = Ext.create("gnc.view.forms.scheda.attach.validation.GridAttachMachine_val")
        let store = this.gridAttachMachine_val.getStore()
        store.loadData(record.data.allegati.filter(obj=>obj.campo==='machine_val'))
        this.cardAttachMachine_val.down("#updgrid").add(this.gridAttachMachine_val);
        this.cardValidation.down("#machine_valfld").add(this.cardAttachMachine_val);
    },
    onCreateAttachStrumenti_val:function(record,readOnlyValidation) {
        this.cardAttachStrumenti_val = Ext.create("portal.v1.view.main.global.upload.CardAttach")
        if (readOnlyValidation === false) {
            if (!this.uploadfileStrumenti_val) {
                this.uploadfileStrumenti_val = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestAttachValidation");
            }
            this.cardAttachStrumenti_val.down("#updfile").add(this.uploadfileStrumenti_val);
            this.uploadfileStrumenti_val.fireEvent("updateInfo", {
                url: "", src: "", thumb: false, descrizione: "", readOnly: false, updimage: false, rif: "strumenti_val", type: [],
            })
        }
        this.gridAttachStrumenti_val = Ext.create("gnc.view.forms.scheda.attach.validation.GridAttachStrumenti_val")
        let store = this.gridAttachStrumenti_val.getStore()
        store.loadData(record.data.allegati.filter(obj=>obj.campo==='strumenti_val'))
        this.cardAttachStrumenti_val.down("#updgrid").add(this.gridAttachStrumenti_val);
        this.cardValidation.down("#strumenti_valfld").add(this.cardAttachStrumenti_val);
    },
    onCreateAttachMetodo_val:function(record,readOnlyValidation) {
        this.cardAttachMetodo_val = Ext.create("portal.v1.view.main.global.upload.CardAttach")
        if (readOnlyValidation === false) {
            if (!this.uploadfileMetodo_val) {
                this.uploadfileMetodo_val = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestAttachValidation");
            }
            this.cardAttachMetodo_val.down("#updfile").add(this.uploadfileMetodo_val);
            this.uploadfileMetodo_val.fireEvent("updateInfo", {
                url: "", src: "", thumb: false, descrizione: "", readOnly: false, updimage: false, rif: "metodo_val", type: [],
            })
        }
        this.gridAttachMetodo_val = Ext.create("gnc.view.forms.scheda.attach.validation.GridAttachMetodo_val")
        let store = this.gridAttachMetodo_val.getStore()
        store.loadData(record.data.allegati.filter(obj=>obj.campo==='metodo_val'))
        this.cardAttachMetodo_val.down("#updgrid").add(this.gridAttachMetodo_val);
        this.cardValidation.down("#metodo_valfld").add(this.cardAttachMetodo_val);
    },
    onCreateAttachProgetto_val:function(record,readOnlyValidation) {
        this.cardAttachProgetto_val = Ext.create("portal.v1.view.main.global.upload.CardAttach")
        if (readOnlyValidation === false) {
            if (!this.uploadfileProgetto_val) {
                this.uploadfileProgetto_val = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestAttachValidation");
            }
            this.cardAttachProgetto_val.down("#updfile").add(this.uploadfileProgetto_val);
            this.uploadfileProgetto_val.fireEvent("updateInfo", {
                url: "", src: "", thumb: false, descrizione: "", readOnly: false, updimage: false, rif: "progetto_val", type: [],
            })
        }
        this.gridAttachProgetto_val = Ext.create("gnc.view.forms.scheda.attach.validation.GridAttachProgetto_val")
        let store = this.gridAttachProgetto_val.getStore()
        store.loadData(record.data.allegati.filter(obj=>obj.campo==='progetto_val'))
        this.cardAttachProgetto_val.down("#updgrid").add(this.gridAttachProgetto_val);
        this.cardValidation.down("#progetto_valfld").add(this.cardAttachProgetto_val);
    },
    onCreateAttachAltrocause_val:function(record,readOnlyValidation) {
        this.cardAttachAltrocause_val = Ext.create("portal.v1.view.main.global.upload.CardAttach")
        if (readOnlyValidation === false) {
            if (!this.uploadfileAltrocause_val) {
                this.uploadfileAltrocause_val = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestAttachValidation");
            }
            this.cardAttachAltrocause_val.down("#updfile").add(this.uploadfileAltrocause_val);
            this.uploadfileAltrocause_val.fireEvent("updateInfo", {
                url: "", src: "", thumb: false, descrizione: "", readOnly: false, updimage: false, rif: "altrocause_val", type: [],
            })
        }
        this.gridAttachAltrocause_val = Ext.create("gnc.view.forms.scheda.attach.validation.GridAttachAltrocause_val")
        let store = this.gridAttachAltrocause_val.getStore()
        store.loadData(record.data.allegati.filter(obj=>obj.campo==='altrocause_val'))
        this.cardAttachAltrocause_val.down("#updgrid").add(this.gridAttachAltrocause_val);
        this.cardValidation.down("#altrocause_valfld").add(this.cardAttachAltrocause_val);
    },
    obbInoltroValidation: function (btn) {
        let me = this, vm = me.getViewModel(), record = vm.get('record'), error=''
        //obb materiale
        if ((record.data.materiale_val || record.data.materiale_val===1) && (!record.data.notemateriale_val || record.data.notemateriale_val==='')) {
            error += Locale.t('gnc.forms.scheda.validation.obb.notemateriale')+'<br>';
        }
        if ((record.data.materiale_val || record.data.materiale_val===1) && this.gridAttachMateriale_val && this.gridAttachMateriale_val.getStore().data.length===0) {
            error += Locale.t('gnc.forms.scheda.validation.obb.attach_materiale')+'<br>';
        }
        if ((record.data.materiale_val || record.data.materiale_val===1) && (!record.data.dricmatval || record.data.dricmatval==='')) {
            error += Locale.t('gnc.forms.scheda.validation.obb.dricmatval')+'<br>';
        }
        if ((record.data.materiale_val || record.data.materiale_val===1) && (!record.data.dcommatval || record.data.dcommatval==='')) {
            error += Locale.t('gnc.forms.scheda.validation.obb.dcommatval')+'<br>';
        }
        //obb man
        if ((record.data.man_val || record.data.man_val===1) && (!record.data.noteman_val || record.data.noteman_val==='')) {
            error += Locale.t('gnc.forms.scheda.validation.obb.noteman')+'<br>';
        }
        if ((record.data.man_val || record.data.man_val===1) && this.gridAttachMan_val && this.gridAttachMan_val.getStore().data.length===0) {
            error += Locale.t('gnc.forms.scheda.validation.obb.attach_man')+'<br>';
        }
        if ((record.data.man_val || record.data.man_val===1) && (!record.data.dricmanval || record.data.dricmanval==='')) {
            error += Locale.t('gnc.forms.scheda.validation.obb.dricmanval')+'<br>';
        }
        if ((record.data.man_val || record.data.man_val===1) && (!record.data.dcommanval || record.data.dcommanval==='')) {
            error += Locale.t('gnc.forms.scheda.validation.obb.dcommanval')+'<br>';
        }
        //obb machine
        if ((record.data.machine_val || record.data.machine_val===1) && (!record.data.notemachine_val || record.data.notemachine_val==='')) {
            error += Locale.t('gnc.forms.scheda.validation.obb.notemachine')+'<br>';
        }
        if ((record.data.machine_val || record.data.machine_val===1) && this.gridAttachMachine_val && this.gridAttachMachine_val.getStore().data.length===0) {
            error += Locale.t('gnc.forms.scheda.validation.obb.attach_machine')+'<br>';
        }
        if ((record.data.machine_val || record.data.machine_val===1) && (!record.data.dricmacval || record.data.dricmacval==='')) {
            error += Locale.t('gnc.forms.scheda.validation.obb.dricmacval')+'<br>';
        }
        if ((record.data.machine_val || record.data.machine_val===1) && (!record.data.dcommacval || record.data.dcommacval==='')) {
            error += Locale.t('gnc.forms.scheda.validation.obb.dcommacval')+'<br>';
        }
        //obb strumenti
        if ((record.data.strumenti_val || record.data.strumenti_val===1) && (!record.data.notestrumenti_val || record.data.notestrumenti_val==='')) {
            error += Locale.t('gnc.forms.scheda.validation.obb.notestrumenti')+'<br>';
        }
        if ((record.data.strumenti_val || record.data.strumenti_val===1) && this.gridAttachStrumenti_val && this.gridAttachStrumenti_val.getStore().data.length===0) {
            error += Locale.t('gnc.forms.scheda.validation.obb.attach_strumenti')+'<br>';
        }
        if ((record.data.strumenti_val || record.data.strumenti_val===1) && (!record.data.dricstrval || record.data.dricstrval==='')) {
            error += Locale.t('gnc.forms.scheda.validation.obb.dricstrval')+'<br>';
        }
        if ((record.data.strumenti_val || record.data.strumenti_val===1) && (!record.data.dcomstrval || record.data.dcomstrval==='')) {
            error += Locale.t('gnc.forms.scheda.validation.obb.dcomstrval')+'<br>';
        }
        //obb metodo
        if ((record.data.metodo_val || record.data.metodo_val===1) && (!record.data.notemetodo_val || record.data.notemetodo_val==='')) {
            error += Locale.t('gnc.forms.scheda.validation.obb.notemetodo')+'<br>';
        }
        if ((record.data.metodo_val || record.data.metodo_val===1) && this.gridAttachMetodo_val && this.gridAttachMetodo_val.getStore().data.length===0) {
            error += Locale.t('gnc.forms.scheda.validation.obb.attach_metodo')+'<br>';
        }
        if ((record.data.metodo_val || record.data.metodo_val===1) && (!record.data.dricmetval || record.data.dricmetval==='')) {
            error += Locale.t('gnc.forms.scheda.validation.obb.dricmetval')+'<br>';
        }
        if ((record.data.metodo_val || record.data.metodo_val===1) && (!record.data.dcommetval || record.data.dcommetval==='')) {
            error += Locale.t('gnc.forms.scheda.validation.obb.dcommetval')+'<br>';
        }
        //obb progetto
        if ((record.data.progetto_val || record.data.progetto_val===1) && (!record.data.noteprogetto_val || record.data.noteprogetto_val==='')) {
            error += Locale.t('gnc.forms.scheda.validation.obb.noteprogetto')+'<br>';
        }
        if ((record.data.progetto_val || record.data.progetto_val===1) && this.gridAttachProgetto_val&& this.gridAttachProgetto_val.getStore().data.length===0) {
            error += Locale.t('gnc.forms.scheda.validation.obb.attach_progetto')+'<br>';
        }
        if ((record.data.progetto_val || record.data.progetto_val===1) && (!record.data.dricproval || record.data.dricproval==='')) {
            error += Locale.t('gnc.forms.scheda.validation.obb.dricproval')+'<br>';
        }
        if ((record.data.progetto_val || record.data.progetto_val===1) && (!record.data.dcomproval || record.data.dcomproval==='')) {
            error += Locale.t('gnc.forms.scheda.validation.obb.dcomproval')+'<br>';
        }
        //obb altro
        if ((record.data.altrocause_val || record.data.altrocause_val===1) && (!record.data.notealtrocause_val || record.data.notealtrocause_val==='')) {
            error += Locale.t('gnc.forms.scheda.validation.obb.notealtro')+'<br>';
        }
        if ((record.data.altrocause_val || record.data.altrocause_val===1) && this.gridAttachAltrocause_val && this.gridAttachAltrocause_val.getStore().data.length===0) {
            error += Locale.t('gnc.forms.scheda.validation.obb.attach_altro')+'<br>';
        }
        if ((record.data.altrocause_val || record.data.altrocause_val===1) && (!record.data.dricaltval || record.data.dricaltval==='')) {
            error += Locale.t('gnc.forms.scheda.validation.obb.dricaltval')+'<br>';
        }
        if ((record.data.altrocause_val || record.data.altrocause_val===1) && (!record.data.dcomaltval || record.data.dcomaltval==='')) {
            error += Locale.t('gnc.forms.scheda.validation.obb.dcomaltval')+'<br>';
        }
        //esito
        if (record.data.esito === '' || record.data.esito === 0){
            error += Locale.t('gnc.forms.scheda.validation.obbesito')+'<br>';
        }
        if (error!==''){
            Ext.Msg.show({title: Locale.t('global.attenzione'), msg: error, buttons: Ext.Msg.OK, icon: Ext.MessageBox.ERROR});
            return
        }
        this.onInoltra(btn);
    },
    //ritorno caricamento allegato
    onReturnRequestAttachValidation: function (res) {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        let store
        switch (res.valori.rif) {
            case 'materiale_val':
                store = this.gridAttachMateriale_val.getStore()
                break
            case 'man_val':
                store = this.gridAttachMan_val.getStore()
                break
            case 'machine_val':
                store = this.gridAttachMachine_val.getStore()
                break
            case 'strumenti_val':
                store = this.gridAttachStrumenti_val.getStore()
                break
            case 'metodo_val':
                store = this.gridAttachMetodo_val.getStore()
                break
            case 'progetto_val':
                store = this.gridAttachProgetto_val.getStore()
                break
            case 'altrocause_val':
                store = this.gridAttachAltrocause_val.getStore()
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