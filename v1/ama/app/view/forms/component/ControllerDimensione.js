/**
 * Created by luke on 25/03/22.
 */
Ext.define('ama.view.forms.component.ControllerDimensione', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dimensione',
    requires: [
        'ama.view.forms.scheda.attach.GridAttachDimensione',
        'portal.v1.view.main.global.upload.Attach',
        'portal.v1.view.main.global.upload.CardAttach',
        'portal.v1.view.main.global.upload.GridAttachModel'
    ],
    onCreateAttachDimensione:function(record,readOnly) {
        this.cardAttachDimensione = Ext.create("portal.v1.view.main.global.upload.CardAttach")
        if (readOnly === false) {
            if (!this.uploadfileDimensione) {
                this.uploadfileDimensione = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestAttachDimensione");
            }
            this.cardAttachDimensione.down("#updfile").add(this.uploadfileDimensione);
            this.uploadfileDimensione.fireEvent("updateInfo", {
                url: "", src: "", thumb: false, descrizione: "", readOnly: false, updimage: false, rif: 1, type: [],
            })
        }
        this.gridAttachDimensione = Ext.create("ama.view.forms.scheda.attach.GridAttachDimensione")
        let store = this.gridAttachDimensione.getStore()
        store.loadData(record.data.allegati.filter(obj=>obj.sezione===1))
        this.cardAttachDimensione.down("#updgrid").add(this.gridAttachDimensione);
        this.cardDimensioni.down("#dimensionefld").add(this.cardAttachDimensione);
    },
    //ritorno caricamento allegato
    onReturnRequestAttachDimensione: function (res) {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        let store = this.gridAttachDimensione.getStore()
        res.valori.idautore = Ext.global.Vars.infoUser.id //imposto autore frontend
        res.valori.autore = Ext.global.Vars.infoUser.cognomenome //imposto autore frontend
        res.valori.hideDownload = "true" //il nuovo non lo posso scaricare
        let newrec=Ext.create("portal.v1.view.main.global.upload.GridAttachModel", res.valori) //creo oggetto
        store.add(newrec) //aggiungo nello store front-end
        newrec.data.sezione=res.valori.rif //imposto campo
        record.data.allegati.push(newrec.data) //lo metto nel record backend
    }
});