/**
 * Created by luke on 25/03/22.
 */
Ext.define('ama.view.forms.component.ControllerGrafica', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.grafica',
    requires: [
        'ama.view.forms.scheda.attach.GridAttachGrafica',
        'portal.v1.view.main.global.upload.Attach',
        'portal.v1.view.main.global.upload.CardAttach',
        'portal.v1.view.main.global.upload.GridAttachModel'
    ],
    onCreateAttachGrafica:function(record,readOnly) {
        this.cardAttachGrafica = Ext.create("portal.v1.view.main.global.upload.CardAttach")
        if (readOnly === false) {
            if (!this.uploadfileGrafica) {
                this.uploadfileGrafica = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestAttachGrafica");
            }
            this.cardAttachGrafica.down("#updfile").add(this.uploadfileGrafica);
            this.uploadfileGrafica.fireEvent("updateInfo", {
                url: "", src: "", thumb: false, descrizione: "", readOnly: false, updimage: false, rif: 3, type: [],
            })
        }
        this.gridAttachGrafica = Ext.create("ama.view.forms.scheda.attach.GridAttachGrafica")
        let store = this.gridAttachGrafica.getStore()
        store.loadData(record.data.allegati.filter(obj=>obj.sezione===3))
        this.cardAttachGrafica.down("#updgrid").add(this.gridAttachGrafica);
        this.cardGrafica.down("#graficafld").add(this.cardAttachGrafica);
    },
    //ritorno caricamento allegato
    onReturnRequestAttachGrafica: function (res) {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        let store = this.gridAttachGrafica.getStore()
        res.valori.idautore = Ext.global.Vars.infoUser.id //imposto autore frontend
        res.valori.autore = Ext.global.Vars.infoUser.cognomenome //imposto autore frontend
        res.valori.hideDownload = "true" //il nuovo non lo posso scaricare
        let newrec=Ext.create("portal.v1.view.main.global.upload.GridAttachModel", res.valori) //creo oggetto
        store.add(newrec) //aggiungo nello store front-end
        newrec.data.sezione=res.valori.rif //imposto campo
        record.data.allegati.push(newrec.data) //lo metto nel record backend
    }
});