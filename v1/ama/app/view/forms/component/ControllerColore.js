/**
 * Created by luke on 25/03/22.
 */
Ext.define('ama.view.forms.component.ControllerColore', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.colore',
    requires: [
        'portal.v1.view.main.global.upload.Attach',
        'portal.v1.view.main.global.upload.CardAttach',
        'portal.v1.view.main.global.upload.GridAttachModel',
        'ama.view.forms.scheda.attach.GridAttachColore'
    ],
    onCreateAttachColore:function(record,readOnly) {
        this.cardAttachColore = Ext.create("portal.v1.view.main.global.upload.CardAttach")
        if (readOnly === false) {
            if (!this.uploadfileColore) {
                this.uploadfileColore = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestAttachColore");
            }
            this.cardAttachColore.down("#updfile").add(this.uploadfileColore);
            this.uploadfileColore.fireEvent("updateInfo", {
                url: "", src: "", thumb: false, descrizione: "", readOnly: false, updimage: false, rif: 4, type: [],
            })
        }
        this.gridAttachColore = Ext.create("ama.view.forms.scheda.attach.GridAttachColore")
        let store = this.gridAttachColore.getStore()
        store.loadData(record.data.allegati.filter(obj=>obj.sezione===4))
        this.cardAttachColore.down("#updgrid").add(this.gridAttachColore);
        this.cardColore.down("#colorefld").add(this.cardAttachColore);
    },
    //ritorno caricamento allegato
    onReturnRequestAttachColore: function (res) {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        let store = this.gridAttachColore.getStore()
        res.valori.idautore = Ext.global.Vars.infoUser.id //imposto autore frontend
        res.valori.autore = Ext.global.Vars.infoUser.cognomenome //imposto autore frontend
        res.valori.hideDownload = "true" //il nuovo non lo posso scaricare
        let newrec=Ext.create("portal.v1.view.main.global.upload.GridAttachModel", res.valori) //creo oggetto
        store.add(newrec) //aggiungo nello store front-end
        newrec.data.sezione=res.valori.rif //imposto campo
        record.data.allegati.push(newrec.data) //lo metto nel record backend
    }
});