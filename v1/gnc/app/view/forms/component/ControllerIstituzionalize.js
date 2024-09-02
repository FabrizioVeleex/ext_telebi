/**
 * Created by luke on 25/03/22.
 */
Ext.define('gnc.view.forms.component.ControllerIstituzionalize', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.istituzionalize',

    requires: [
        'Ext.form.FieldSet',
        'gnc.model.forms.scheda.ComboCorrelati',
        'gnc.view.forms.scheda.attach.istituzionalize.GridAttachIstituzionalize',
        'gnc.view.forms.scheda.grids.GridCorrelati',
        'gnc.view.forms.scheda.upload.Attach',
        'portal.util.Functions',
        'portal.v1.view.main.global.upload.Attach',
        'portal.v1.view.main.global.upload.CardAttach',
        'portal.v1.view.main.global.upload.GridAttachModel'
    ],
    //grid correlati
    onCreateGridCorrelati:function(record,readOnlyIstituzionalize) {
        this.gridCorrelati = Ext.create('gnc.view.forms.scheda.grids.GridCorrelati');
        let store = this.gridCorrelati.getStore()
        store.loadData(record.data.correlati)
        if (readOnlyIstituzionalize === false) {
            this.gridCorrelati.getStore().add(Ext.create('gnc.model.forms.scheda.ComboCorrelati', {
                action: 1, isnew: 1, id: bdFunctions.bpRandomString(32),
                codice: '', cdcom1: '', depar: '',notecorr:''
            }))
        }
        this.cardCorrelati=Ext.create('Ext.form.FieldSet',{
            collapsible: true, collapsed: false,
            title: '<span style="color: black;font-weight:bold">'+Locale.t('gnc.forms.scheda.grids.correlati.title')+'</span>',
            style: {'background-color': "transparent;"},
            items: [this.gridCorrelati]
        })
        this.cardIstituzionalize.down("#correlatifld").add(this.cardCorrelati);
    },
    //allegati
    onCreateAttachIstituzionalize:function(record,readOnlyIstituzionalize) {
        this.cardAttachIstituzionalize = Ext.create("portal.v1.view.main.global.upload.CardAttach")
        if (readOnlyIstituzionalize === false) {
            if (!this.uploadfileIstituzionalize) {
                this.uploadfileIstituzionalize = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestAttachIstituzionalize");
            }
            this.cardAttachIstituzionalize.down("#updfile").add(this.uploadfileIstituzionalize);
            this.uploadfileIstituzionalize.fireEvent("updateInfo", {
                url: "", src: "", thumb: false, descrizione: "", readOnly: false, updimage: false, rif: "istituzionalize", type: [],
            })
        }
        this.gridAttachIstituzionalize = Ext.create("gnc.view.forms.scheda.attach.istituzionalize.GridAttachIstituzionalize")
        let store = this.gridAttachIstituzionalize.getStore()
        store.loadData(record.data.allegati.filter(obj=>obj.campo==='istituzionalize'))
        this.cardAttachIstituzionalize.down("#updgrid").add(this.gridAttachIstituzionalize);
        this.cardIstituzionalize.down("#istituzionalizefld").add(this.cardAttachIstituzionalize);
    },
    //ritorno caricamento allegato
    onReturnRequestAttachIstituzionalize: function (res) {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        let store = this.gridAttachIstituzionalize.getStore()
        res.valori.idautore = Ext.global.Vars.infoUser.id //imposto autore frontend
        res.valori.autore = Ext.global.Vars.infoUser.cognomenome //imposto autore frontend
        res.valori.hideDownload = "true" //il nuovo non lo posso scaricare
        let newrec=Ext.create("portal.v1.view.main.global.upload.GridAttachModel", res.valori) //creo oggetto
        store.add(newrec) //aggiungo nello store front-end
        newrec.data.campo=res.valori.rif //imposto campo
        record.data.allegati.push(newrec.data) //lo metto nel record backend
    },
    obbChiusura: function (btn) {
        let me = this, vm = me.getViewModel(), record = vm.get('record'), error=''
        if ((!record.data.dfmea || record.data.dfmea===0) && (!record.data.pfmea || record.data.pfmea===0) && (!record.data.cplan || record.data.cplan===0) && (!record.data.istruzioni || record.data.istruzioni===0) && (!record.data.proc || record.data.proc===0) && (!record.data.altroist || record.data.altroist===0)){
            error += Locale.t('gnc.forms.scheda.istituzionalize.obbsel')+'<br>';
        }
        if ((record.data.dfmea || record.data.dfmea===1) && (!record.data.dfmeanote || record.data.dfmeanote==='' || !record.data.dfmeadoc || record.data.dfmeadoc==='')) {
            error += Locale.t('gnc.forms.scheda.istituzionalize.obb.dfmea')+'<br>';
        }
        if ((record.data.pfmea || record.data.pfmea===1) && (!record.data.pfmeanote || record.data.pfmeanote==='' || !record.data.pfmeadoc || record.data.pfmeadoc==='')) {
            error += Locale.t('gnc.forms.scheda.istituzionalize.obb.pfmea')+'<br>';
        }
        if (!record.data.notechiusura || record.data.notechiusura === ''){
            error += Locale.t('gnc.forms.scheda.istituzionalize.fields.notechiusura')+': '+Locale.t('global.form.inserirevalore')+'<br>';
        }
        if (this.gridAttachIstituzionalize.getStore().data.length===0) {
            error += Locale.t('gnc.forms.scheda.istituzionalize.obbattach')+'<br>';
        }
        if (error!==''){
            Ext.Msg.show({title: Locale.t('global.attenzione'), msg: error, buttons: Ext.Msg.OK, icon: Ext.MessageBox.ERROR});
            return
        }
        this.onInoltra(btn);
    },
    //allegati dfmea, etc.
    onCreateAttachDfmea:function() {
        this.uploadfileDfmea = Ext.create("gnc.view.forms.scheda.upload.Attach").on("returnRequest", "onReturnRequestAttachDfmea");
        this.cardIstituzionalize.down("#dfmeafld").add(this.uploadfileDfmea);
    },
    onReturnRequestAttachDfmea:function(res) {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        vm.set('hideUpdDfmea',true)
        vm.set('hideUpdDfmeaNew',false)
        record.data.dfmeadoc=res.valori.id+res.valori.estensione //lo metto nel record backend
    },
    onCreateAttachPfmea:function() {
        this.uploadfilePfmea = Ext.create("gnc.view.forms.scheda.upload.Attach").on("returnRequest", "onReturnRequestAttachPfmea");
        this.cardIstituzionalize.down("#pfmeafld").add(this.uploadfilePfmea);
    },
    onReturnRequestAttachPfmea:function(res) {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        vm.set('hideUpdPfmea',true)
        vm.set('hideUpdPfmeaNew',false)
        record.data.pfmeadoc=res.valori.id+res.valori.estensione //lo metto nel record backend
    },
    onCreateAttachCplan:function() {
        this.uploadfileCplan = Ext.create("gnc.view.forms.scheda.upload.Attach").on("returnRequest", "onReturnRequestAttachCplan");
        this.cardIstituzionalize.down("#cplanfld").add(this.uploadfileCplan);
    },
    onReturnRequestAttachCplan:function(res) {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        vm.set('hideUpdCplan',true)
        vm.set('hideUpdCplanNew',false)
        record.data.cplandoc=res.valori.id+res.valori.estensione //lo metto nel record backend
    },
    onCreateAttachIst:function() {
        this.uploadfileIst = Ext.create("gnc.view.forms.scheda.upload.Attach").on("returnRequest", "onReturnRequestAttachIst");
        this.cardIstituzionalize.down("#istfld").add(this.uploadfileIst);
    },
    onReturnRequestAttachIst:function(res) {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        vm.set('hideUpdIst',true)
        vm.set('hideUpdIstNew',false)
        record.data.istdoc=res.valori.id+res.valori.estensione //lo metto nel record backend
    },
    onCreateAttachProc:function() {
        this.uploadfileProc = Ext.create("gnc.view.forms.scheda.upload.Attach").on("returnRequest", "onReturnRequestAttachProc");
        this.cardIstituzionalize.down("#procfld").add(this.uploadfileProc);
    },
    onReturnRequestAttachProc:function(res) {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        vm.set('hideUpdProc',true)
        vm.set('hideUpdProcNew',false)
        record.data.procdoc=res.valori.id+res.valori.estensione //lo metto nel record backend
    },
    onCreateAttachAltroist:function() {
        this.uploadfileAltroist = Ext.create("gnc.view.forms.scheda.upload.Attach").on("returnRequest", "onReturnRequestAttachAltroist");
        this.cardIstituzionalize.down("#altroistfld").add(this.uploadfileAltroist);
    },
    onReturnRequestAttachAltroist:function(res) {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        vm.set('hideUpdAltro',true)
        vm.set('hideUpdAltroNew',false)
        record.data.altrodoc=res.valori.id+res.valori.estensione //lo metto nel record backend
    },
    //download documento dfmea, etc..
    onDwnAttach:function(e,t) {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        let documento, nomefile
        switch (t.getAttribute("about")) {
            case 'dfmea':
                documento = record.data.dfmeadoc
                nomefile = record.data.numero.replace("/", "_")+'_DFMEA_documento'
                break
            case 'pfmea':
                documento = record.data.pfmeadoc
                nomefile = record.data.numero.replace("/", "_")+'_PFMEA_documento'
                break
            case 'cplan':
                documento = record.data.cplandoc
                nomefile = record.data.numero.replace("/", "_")+'_Control_Plan_documento'
                break
            case 'istruzioni':
                documento = record.data.istdoc
                nomefile = record.data.numero.replace("/", "_")+'_Istruzioni_documento'
                break
            case 'proc':
                documento = record.data.procdoc
                nomefile = record.data.numero.replace("/", "_")+'_Procedure_documento'
                break
            case 'altro':
                documento = record.data.altrodoc
                nomefile = record.data.numero.replace("/", "_")+'_Altro_documento'
                break
        }
        Ext.Ajax.request({
            method:'GET',binary:true,
            url: Backend.REST_API + "forms/scheda/getdocumento",
            params: {documento: documento,nomefile: nomefile,id:record.data.id},
            success: function (response) {
                let headers = response.getAllResponseHeaders()
                let filename=token //default
                //recupero filename dalla risposta
                let disposition = response.getResponseHeader('Content-Disposition');
                if (disposition && disposition.indexOf('attachment') !== -1) {
                    let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                    let matches = filenameRegex.exec(disposition);
                    if (matches != null && matches[1]) {
                        filename = matches[1].replace(/['"]/g, '');
                    }
                }
                let blob = new Blob([response.responseBytes], {type: headers['content-type']})
                //creo area temporale per il download
                let a = document.createElement('a')
                document.body.appendChild(a)
                let url = window.URL.createObjectURL(blob)
                a.href = url
                a.download = filename
                a.click();
                setTimeout(() => {
                    window.URL.revokeObjectURL(url)
                    document.body.removeChild(a)
                }, 0)
            },
            failure: function (response) {
                let msg = response.getResponseHeader('messaggio');
                if (msg) {
                    Ext.Msg.show({
                        title: Locale.t('global.errore'),
                        msg: 'Error: '+msg,
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            }
        })
    },
    //rimozione allegato
    onDelAttach:function(e,t) {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        switch (t.getAttribute("about")) {
            case 'dfmea':
                record.data.dfmeadoc=''
                vm.set('hideUpdDfmeaDoc',true)
                break
            case 'pfmea':
                record.data.pfmeadoc=''
                vm.set('hideUpdPfmeaDoc',true)
                break
            case 'cplan':
                record.data.cplandoc=''
                vm.set('hideUpdCplanDoc',true)
                break
            case 'istruzioni':
                record.data.istdoc=''
                vm.set('hideUpdIstDoc',true)
                break
            case 'proc':
                record.data.procdoc=''
                vm.set('hideUpdProcDoc',true)
                break
            case 'altro':
                record.data.altrodoc=''
                vm.set('hideUpdAltroDoc',true)
                break
        }
    }
});