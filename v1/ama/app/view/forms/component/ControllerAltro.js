/**
 * Created by luke on 25/03/22.
 */
Ext.define('ama.view.forms.component.ControllerAltro', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.altro',
    requires: [
        'ama.view.forms.scheda.attach.GridAttachAltro',
        'portal.v1.view.main.global.upload.Attach',
        'portal.v1.view.main.global.upload.CardAttach',
        'portal.v1.view.main.global.upload.GridAttachModel'
    ],
    onCreateAttachAltro:function(record,readOnly) {
        this.cardAttachAltro = Ext.create("portal.v1.view.main.global.upload.CardAttach")
        if (readOnly === false) {
            if (!this.uploadfileAltro) {
                this.uploadfileAltro = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestAttachAltro");
            }
            this.cardAttachAltro.down("#updfile").add(this.uploadfileAltro);
            this.uploadfileAltro.fireEvent("updateInfo", {
                url: "", src: "", thumb: false, descrizione: "", readOnly: false, updimage: false, rif: 0, type: [],
            })
        }
        this.gridAttachAltro = Ext.create("ama.view.forms.scheda.attach.GridAttachAltro")
        let store = this.gridAttachAltro.getStore()
        store.loadData(record.data.allegati.filter(obj=>obj.sezione===0))
        this.cardAttachAltro.down("#updgrid").add(this.gridAttachAltro);
        this.cardAltro.down("#altrofld").add(this.cardAttachAltro);
    },
    //ritorno caricamento allegato
    onReturnRequestAttachAltro: function (res) {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        let store = this.gridAttachAltro.getStore()
        res.valori.idautore = Ext.global.Vars.infoUser.id //imposto autore frontend
        res.valori.autore = Ext.global.Vars.infoUser.cognomenome //imposto autore frontend
        res.valori.hideDownload = "true" //il nuovo non lo posso scaricare
        let newrec=Ext.create("portal.v1.view.main.global.upload.GridAttachModel", res.valori) //creo oggetto
        store.add(newrec) //aggiungo nello store front-end
        newrec.data.sezione=res.valori.rif //imposto campo
        record.data.allegati.push(newrec.data) //lo metto nel record backend
    }
});