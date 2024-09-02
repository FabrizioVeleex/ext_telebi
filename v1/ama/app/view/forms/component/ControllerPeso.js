/**
 * Created by luke on 25/03/22.
 */
Ext.define('ama.view.forms.component.ControllerPeso', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.peso',
    requires: [
        'ama.view.forms.scheda.attach.GridAttachPeso',
        'portal.v1.view.main.global.upload.Attach',
        'portal.v1.view.main.global.upload.CardAttach',
        'portal.v1.view.main.global.upload.GridAttachModel'
    ],
    onCreateAttachPeso:function(record,readOnly) {
        this.cardAttachPeso = Ext.create("portal.v1.view.main.global.upload.CardAttach")
        if (readOnly === false) {
            if (!this.uploadfilePeso) {
                this.uploadfilePeso = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestAttachPeso");
            }
            this.cardAttachPeso.down("#updfile").add(this.uploadfilePeso);
            this.uploadfilePeso.fireEvent("updateInfo", {
                url: "", src: "", thumb: false, descrizione: "", readOnly: false, updimage: false, rif: 2, type: [],
            })
        }
        this.gridAttachPeso = Ext.create("ama.view.forms.scheda.attach.GridAttachPeso")
        let store = this.gridAttachPeso.getStore()
        store.loadData(record.data.allegati.filter(obj=>obj.sezione===2))
        this.cardAttachPeso.down("#updgrid").add(this.gridAttachPeso);
        this.cardPeso.down("#pesofld").add(this.cardAttachPeso);
    },
    //ritorno caricamento allegato
    onReturnRequestAttachPeso: function (res) {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        let store = this.gridAttachPeso.getStore()
        res.valori.idautore = Ext.global.Vars.infoUser.id //imposto autore frontend
        res.valori.autore = Ext.global.Vars.infoUser.cognomenome //imposto autore frontend
        res.valori.hideDownload = "true" //il nuovo non lo posso scaricare
        let newrec=Ext.create("portal.v1.view.main.global.upload.GridAttachModel", res.valori) //creo oggetto
        store.add(newrec) //aggiungo nello store front-end
        newrec.data.sezione=res.valori.rif //imposto campo
        record.data.allegati.push(newrec.data) //lo metto nel record backend
    }
});