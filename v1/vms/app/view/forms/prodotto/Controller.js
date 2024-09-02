/**
 * Created by luca on 16/07/2018.
 */
Ext.define('vms.view.forms.prodotto.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.v1-prodotto',
    requires: [
        'Ext.form.FieldSet',
        'portal.v1.view.main.global.upload.Attach',
        'portal.v1.view.main.global.upload.CardAttach',
        'portal.v1.view.main.global.upload.GridAttachModel',
        'portal.v1.view.main.global.upload.GridAttachs',
        'vms.model.forms.prodotto.Model',
        'vms.view.forms.controllo.Panel',
        'vms.view.forms.prodotto.cards.GridControlli',
        'vms.view.forms.prodotto.cards.GridControlliChiusi',
        'vms.view.forms.prodotto.cards.GridInterventi',
        'vms.view.forms.prodotto.cards.Prodotto'
    ],
    init: function () {
        let vm = this.getViewModel();
        //tasti extra
        this.btnGenerapdf= {xtype: 'button',ui:'blue', text: Locale.t('vms.forms.prodotto.btn.stampapdf.text'), tooltip: Locale.t('vms.forms.prodotto.btn.stampapdf.tooltip'), iconCls: 'icon-pdf', handler: 'onStampaPdf'};
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('vms.model.forms.prodotto.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },

    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(), record = vm.get('record'),readOnly = true,readOnlyAttach = true, readOnlyTipo=true,hideClasse=true
        let storeSedi = vm.getStore('storeSedi'),storeTipi = vm.getStore('storeTipi'),
            storeCostruttori = vm.getStore('storeCostruttori')
        let storeControlli = vm.getStore('storeControlli'),storeControlliChiusi = vm.getStore('storeControlliChiusi'),storeInterventi = vm.getStore('storeInterventi')
        if (this.checkRuoli(['99', '1', '10'])) {
            readOnly = false;
            readOnlyAttach = false;
            vm.set('btn.save', true)
            vm.set('btn.delete', true)
            vm.set("btn.cronology", true)
        }
        if (vm.get('isnew')===1) {
            readOnlyTipo=false
        } else {
            this.toolBar.add(this.btnGenerapdf)
        }
        if (record.data.tipo==='02') { //strumento visualizzo la classe
            hideClasse=false;
        }
        //gestione tasti default
        vm.set('btn.close', true)
        vm.set('readOnly', readOnly);
        vm.set('readOnlyTipo', readOnlyTipo);
        vm.set('hideClasse', hideClasse);
        //titolo tab
        vm.set('title',record.data['descrizione'] || 'n.d.')
        vm.set('label',Locale.t('vms.forms.prodotto.title'))
        //carico store da dati backend
        storeSedi.loadData(record.data['storeSedi'])
        storeTipi.loadData(record.data['storeTipi'])
        storeCostruttori.loadData(record.data['storeCostruttori'])
        storeControlli.loadData(record.data['storeControlli'])
        storeControlliChiusi.loadData(record.data['storeControlliChiusi'])
        storeInterventi.loadData(record.data['storeInterventi'])
        //creo cards
        this.cardProdotto = Ext.create('vms.view.forms.prodotto.cards.Prodotto');
        //controlli previsti
        this.gridcontrolli = Ext.create("vms.view.forms.prodotto.cards.GridControlli")
        if (vm.get('isnew')===0) {
            this.cardControlli=Ext.create('Ext.form.FieldSet',{
                collapsible: true, collapsed: false,
                title: '<span style="color: black;font-weight:bold">'+Locale.t('vms.forms.prodotto.grids.controlli.title')+'</span>',
                style: {'background-color': "transparent;"},
                items: [this.gridcontrolli]
            })
            this.cardProdotto.add(this.cardControlli)
        }
        //controlli effettuati
        this.gridcontrollichiusi = Ext.create("vms.view.forms.prodotto.cards.GridControlliChiusi")
        if (vm.get('isnew')===0) {
            this.cardControlliChiusi=Ext.create('Ext.form.FieldSet',{
                collapsible: true, collapsed: false,
                title: '<span style="color: black;font-weight:bold">'+Locale.t('vms.forms.prodotto.grids.controlli.titlechiusi')+'</span>',
                style: {'background-color': "transparent;"},
                items: [this.gridcontrollichiusi]
            })
            this.cardProdotto.add(this.cardControlliChiusi)
        }
        //interventi straordinari
        this.gridinterventi = Ext.create("vms.view.forms.prodotto.cards.GridInterventi")
        if (vm.get('isnew')===0) {
            this.cardInterventi=Ext.create('Ext.form.FieldSet',{
                collapsible: true, collapsed: false,
                title: '<span style="color: black;font-weight:bold">'+Locale.t('vms.forms.prodotto.grids.interventi.title')+'</span>',
                style: {'background-color': "transparent;"},
                items: [this.gridinterventi]
            })
            this.cardProdotto.add(this.cardInterventi)
        }
        //allegati
        this.cardAllegati = Ext.create("portal.v1.view.main.global.upload.CardAttach");
        if (readOnlyAttach === false) {
            //inserisco tasto allegati
            if (!this.uploadfile) {
                this.uploadfile = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestProdotto");
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
        this.cardProdotto.add(this.cardAllegati);
        this.form.add(this.cardProdotto);
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
        let modulo = this.cardProdotto.getForm()
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
    //azioni su grid controlli
    onOpenControllo: function (view, rowIndex, colIndex, item, event, record) {
        let center = this.getView().up();
        let itemId = 'f' + record.data['id'];
        let form  = center.child('#'+itemId);
        if (!form) {
            form = Ext.create('vms.view.forms.controllo.Panel', {
                itemId: 'f' + record.data['id'],
                record: record,
                storeForm:view.getStore(),
                valori:{
                    id:record.data['id'],
                    isnew:0
                }
            });
            center.add(form);
        }
        center.setActiveItem(form);
    },
    //azioni allegati
    onReturnRequestProdotto: function (res) {
        let me = this, vm = me.getViewModel(),
            store = vm.getStore("storeAllegati");
        res.valori.idautore = Ext.global.Vars.infoUser.id; //imposto autore frontend
        res.valori.autore = Ext.global.Vars.infoUser.cognomenome; //imposto autore frontend
        res.valori.hideDownload = "true"; //il nuovo non lo posso scaricare
        store.add(
            Ext.create("portal.v1.view.main.global.upload.GridAttachModel", res.valori)
        );
    },
    //stampa pdf
    onStampaPdf:function() {
        let me = this, record = this.getViewModel().get('record');
        me.getView().el.mask(Locale.t("global.actions.incorso"));
        Ext.Ajax.request({
            method: "POST",
            params: {id: record.data.id},
            url: Backend.REST_API + "forms/prodotto/stampapdf",
            success: function (resp) {
                let rest = Ext.decode(resp.responseText);
                me.view.el.unmask()
                me.onDownloadFile(rest['token'])
            },
            failure: function (response) {
                me.getView().el.unmask();
                let resp = Ext.decode(response.responseText);
                Ext.Msg.show({
                    title: Locale.t("global.errore"),
                    msg: resp["msg"],
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR
                })
            }
        })
    }
})