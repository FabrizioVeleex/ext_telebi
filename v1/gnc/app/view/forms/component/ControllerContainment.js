/**
 * Created by luke on 25/03/22.
 */
Ext.define('gnc.view.forms.component.ControllerContainment', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.containment',

    requires: [
        'gnc.view.forms.scheda.attach.containment.GridAttachAltro',
        'gnc.view.forms.scheda.attach.containment.GridAttachBlocco',
        'gnc.view.forms.scheda.attach.containment.GridAttachLotto',
        'gnc.view.forms.scheda.attach.containment.GridAttachStock',
        'portal.v1.view.main.global.upload.Attach',
        'portal.v1.view.main.global.upload.CardAttach',
        'portal.v1.view.main.global.upload.GridAttachModel'
    ],
    //sezioni allegati
    onCreateAttachLotto:function(record,readOnlyContainment) {
        this.cardAttachLotto = Ext.create("portal.v1.view.main.global.upload.CardAttach")
        if (readOnlyContainment === false) {
            if (!this.uploadfileLotto) {
                this.uploadfileLotto = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestAttachContainment");
            }
            this.cardAttachLotto.down("#updfile").add(this.uploadfileLotto);
            this.uploadfileLotto.fireEvent("updateInfo", {
                url: "", src: "", thumb: false, descrizione: "", readOnly: false, updimage: false, rif: "lotto", type: [],
            })
        }
        this.gridAttachLotto = Ext.create("gnc.view.forms.scheda.attach.containment.GridAttachLotto")
        let store = this.gridAttachLotto.getStore()
        store.loadData(record.data.allegati.filter(obj=>obj.campo==='lotto'))
        this.cardAttachLotto.down("#updgrid").add(this.gridAttachLotto);
        this.cardContaiment.down("#lottofld").add(this.cardAttachLotto);
    },
    onCreateAttachBlocco:function(record,readOnlyContainment) {
        this.cardAttachBlocco = Ext.create("portal.v1.view.main.global.upload.CardAttach")
        if (readOnlyContainment === false) {
            if (!this.uploadfileBlocco) {
                this.uploadfileBlocco = Ext.create(
                    "portal.v1.view.main.global.upload.Attach"
                ).on("returnRequest", "onReturnRequestAttachContainment");
            }
            this.cardAttachBlocco.down("#updfile").add(this.uploadfileBlocco);
            this.uploadfileBlocco.fireEvent("updateInfo", {
                url: "", src: "", thumb: false, descrizione: "", readOnly: false, updimage: false, rif: "blocco", type: [],
            })
        }
        this.gridAttachBlocco = Ext.create("gnc.view.forms.scheda.attach.containment.GridAttachBlocco")
        let store =this.gridAttachBlocco.getStore()
        store.loadData(record.data.allegati.filter(obj=>obj.campo==='blocco'))
        this.cardAttachBlocco.down("#updgrid").add(this.gridAttachBlocco);
        this.cardContaiment.down("#bloccofld").add(this.cardAttachBlocco);
    },
    onCreateAttachStock:function(record,readOnlyContainment) {
        this.cardAttachStock = Ext.create("portal.v1.view.main.global.upload.CardAttach")
        if (readOnlyContainment === false) {
            if (!this.uploadfileStock) {
                this.uploadfileStock = Ext.create(
                    "portal.v1.view.main.global.upload.Attach"
                ).on("returnRequest", "onReturnRequestAttachContainment");
            }
            this.cardAttachStock.down("#updfile").add(this.uploadfileStock);
            this.uploadfileStock.fireEvent("updateInfo", {
                url: "", src: "", thumb: false, descrizione: "", readOnly: false, updimage: false, rif: "stock", type: [],
            })
        }
        this.gridAttachStock = Ext.create("gnc.view.forms.scheda.attach.containment.GridAttachStock")
        let store = this.gridAttachStock.getStore()
        store.loadData(record.data.allegati.filter(obj=>obj.campo==='stock'))
        this.cardAttachStock.down("#updgrid").add(this.gridAttachStock);
        this.cardContaiment.down("#stockfld").add(this.cardAttachStock);
    },
    onCreateAttachAltro:function(record,readOnlyContainment) {
        this.cardAttachAltro = Ext.create("portal.v1.view.main.global.upload.CardAttach")
        if (readOnlyContainment === false) {
            if (!this.uploadfileAltro) {
                this.uploadfileAltro = Ext.create(
                    "portal.v1.view.main.global.upload.Attach"
                ).on("returnRequest", "onReturnRequestAttachContainment");
            }
            this.cardAttachAltro.down("#updfile").add(this.uploadfileAltro);
            this.uploadfileAltro.fireEvent("updateInfo", {
                url: "", src: "", thumb: false, descrizione: "", readOnly: false, updimage: false, rif: "altro", type: [],
            })
        }
        this.gridAttachAltro = Ext.create("gnc.view.forms.scheda.attach.containment.GridAttachAltro")
        let store = this.gridAttachAltro.getStore()
        store.loadData(record.data.allegati.filter(obj=>obj.campo==='altro'))
        this.cardAttachAltro.down("#updgrid").add(this.gridAttachAltro);
        this.cardContaiment.down("#altrofld").add(this.cardAttachAltro);
    },
    obbInoltroContainment: function (btn) {
        let me = this, vm = me.getViewModel(), record = vm.get('record'), error=''
        if ((!record.data.lotto || record.data.lotto===0) && (!record.data.blocco || record.data.blocco===0) && (!record.data.stock || record.data.stock===0) && (!record.data.altrocontainment || record.data.altrocontainment===0)){
            error += Locale.t('gnc.forms.scheda.containment.obbsel')+'<br>';
        }
        if ((record.data.lotto || record.data.lotto===1) && (!record.data.lotto_resp || record.data.lotto_resp==='')) {
            error += Locale.t('gnc.forms.scheda.containment.obb.lotto_resp')+'<br>';
        }
        if ((record.data.lotto || record.data.lotto===1) && (!record.data.driclotto || record.data.driclotto==='')) {
            error += Locale.t('gnc.forms.scheda.containment.obb.driclotto')+'<br>';
        }
        if ((record.data.lotto || record.data.lotto===1) && (!record.data.dcomlotto || record.data.dcomlotto==='')) {
            error += Locale.t('gnc.forms.scheda.containment.obb.dcomlotto')+'<br>';
        }
        if ((record.data.blocco || record.data.blocco===1) && (!record.data.blocco_resp || record.data.blocco_resp==='')) {
            error += Locale.t('gnc.forms.scheda.containment.obb.blocco_resp')+'<br>';
        }
        if ((record.data.blocco || record.data.blocco===1) && (!record.data.dricblocco || record.data.dricblocco==='')) {
            error += Locale.t('gnc.forms.scheda.containment.obb.dricblocco')+'<br>';
        }
        if ((record.data.blocco || record.data.blocco===1) && (!record.data.dcomblocco || record.data.dcomblocco==='')) {
            error += Locale.t('gnc.forms.scheda.containment.obb.dcomblocco')+'<br>';
        }
        if ((record.data.stock || record.data.stock===1) && (!record.data.stock_resp || record.data.stock_resp==='')) {
            error += Locale.t('gnc.forms.scheda.containment.obb.stock_resp')+'<br>';
        }
        if ((record.data.stock || record.data.stock===1) && (!record.data.dricstock || record.data.dricstock==='')) {
            error += Locale.t('gnc.forms.scheda.containment.obb.dricstock')+'<br>';
        }
        if ((record.data.stock || record.data.stock===1) && (!record.data.dcomstock || record.data.dcomstock==='')) {
            error += Locale.t('gnc.forms.scheda.containment.obb.dcomstock')+'<br>';
        }
        if ((record.data.altrocontainment || record.data.altrocontainment===1) && (!record.data.altrocontainment_resp || record.data.altrocontainment_resp==='')) {
            error += Locale.t('gnc.forms.scheda.containment.obb.altrocontainment_resp')+'<br>';
        }
        if ((record.data.altrocontainment || record.data.altrocontainment===1) && (!record.data.notecontainment || record.data.notecontainment==='')) {
            error += Locale.t('gnc.forms.scheda.containment.fields.notecontainment')+': '+Locale.t('global.form.inserirevalore')+'<br>';
        }
        if ((record.data.altrocontainment || record.data.altrocontainment===1) && (!record.data.dricaltrocont || record.data.dricaltrocont==='')) {
            error += Locale.t('gnc.forms.scheda.containment.obb.dricaltrocont')+'<br>';
        }
        if ((record.data.altrocontainment || record.data.altrocontainment===1) && (!record.data.dcomaltrocont || record.data.dcomaltrocont==='')) {
            error += Locale.t('gnc.forms.scheda.containment.obb.dcomaltrocont')+'<br>';
        }
        if (error!==''){
            Ext.Msg.show({title: Locale.t('global.attenzione'), msg: error, buttons: Ext.Msg.OK, icon: Ext.MessageBox.ERROR});
            return
        }
        this.onInoltra(btn);
    },
    //ritorno caricamento allegato
    onReturnRequestAttachContainment: function (res) {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        let store
        switch (res.valori.rif) {
            case 'lotto':
                store = this.gridAttachLotto.getStore()
                break
            case 'blocco':
                store = this.gridAttachBlocco.getStore()
                break
            case 'stock':
                store = this.gridAttachStock.getStore()
                break
            case 'altro':
                store = this.gridAttachAltro.getStore()
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