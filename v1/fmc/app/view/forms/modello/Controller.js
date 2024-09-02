/**
 * Created by luca on 16/07/2018.
 */
Ext.define('fmc.view.forms.modello.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.v1-modello',
    requires: [
        'fmc.model.forms.modello.Model',
        'fmc.view.forms.modello.cards.Modello',
        'portal.v1.view.main.global.upload.Attach',
        'portal.v1.view.main.global.upload.CardAttach',
        'portal.v1.view.main.global.upload.GridAttachModel',
        'portal.v1.view.main.global.upload.GridAttachs'
    ],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('fmc.model.forms.modello.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },

    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(), record = vm.get('record'),readOnly=true,readOnlyAttach = true
        let storeTipologie = vm.getStore('storeTipologie')
        if (this.checkRuoli(['99','10'])) {
            vm.set('btn.save', true)
            vm.set('btn.delete', true)
            readOnly=false
            readOnlyAttach = false
        }
        vm.set('btn.close', true)
        vm.set('readOnly', readOnly)
        //titolo tab
        vm.set('title',record.data['titolo'] || 'n.d.')
        vm.set('label',Locale.t('fmc.forms.modello.title'))
        this.cardModello = Ext.create('fmc.view.forms.modello.cards.Modello');
        //allegati
        this.cardAllegati = Ext.create("portal.v1.view.main.global.upload.CardAttach");
        if (readOnlyAttach === false) {
            //inserisco tasto allegati
            if (!this.uploadfile) {
                this.uploadfile = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequest");
            }
            this.cardAllegati.down("#updfile").add(this.uploadfile);
            this.uploadfile.fireEvent("updateInfo", {
                url: "", src: "", thumb: false, descrizione: "",
                readOnly: readOnly, updimage: false, rif: "", type: []
            });
        }
        this.gridAllegati = Ext.create("portal.v1.view.main.global.upload.GridAttachs");
        this.cardAllegati.down("#updgrid").add(this.gridAllegati);
        //carico allegati presenti
        let storeAllegati = this.getViewModel().get("storeAllegati");
        storeAllegati.removeAll();
        record.data.allegati.forEach(function (rec) {
            rec["readOnlyAttach"] = readOnlyAttach;
            rec["hideDownload"] = "false";
            storeAllegati.add(Ext.create("portal.v1.view.main.global.upload.GridAttachModel", rec));
        });
        storeTipologie.loadData(record.data['storeTipologie']) //store combo tipologia corso

        this.cardModello.add(this.cardAllegati);
        this.form.add(this.cardModello);
        this.getView().setActiveItem(this.form);
    },
    onSave: function () {
        let me = this, vm = me.getViewModel(), record = vm.get("record");
        let storeallegati = vm.getStore("storeAllegati");
        record.data["allegati"] = [];
        storeallegati.each(function (rec) {
            record.data["allegati"].push(rec.data);
        });
        if (!this.obb()) {
            return false;
        }
        this.callParent(arguments)
    },
    obb: function () {
        let modulo = this.cardModello.getForm()
        if (!modulo.isValid()) {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('global.form.validation.modulo'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return false;
        }
        return true;
    },
    //azioni allegati
    onReturnRequest: function (res) {
        let me = this, vm = me.getViewModel(),
            store = vm.getStore("storeAllegati");
        res.valori.idautore = Ext.global.Vars.infoUser.id; //imposto autore frontend
        res.valori.autore = Ext.global.Vars.infoUser.cognomenome; //imposto autore frontend
        res.valori.hideDownload = "true"; //il nuovo non lo posso scaricare
        store.add(
            Ext.create("portal.v1.view.main.global.upload.GridAttachModel", res.valori)
        );
    }
})