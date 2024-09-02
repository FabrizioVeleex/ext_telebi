/**
 * Created by luca on 16/07/2018.
 */
Ext.define('cli.forms.cliente.ViewController', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins:['portal.v1.global.Util','cli.forms.cliente.contatto.ContattoController'],
    alias: 'controller.v1-cli-form-controller',
    requires: [
        'cli.forms.cliente.cards.Anagrafica',
        'cli.forms.cliente.cards.Contatti',
        'cli.forms.cliente.components.Model',
        'cli.forms.cliente.contatto.Contatto',
        'cli.forms.cliente.grids.Contatti',
        'portal.v1.view.main.global.upload.Attach',
        'portal.v1.view.main.global.upload.CardAttach',
        'portal.v1.view.main.global.upload.GridAttachModel',
        'portal.v1.view.main.global.upload.GridAttachs'
    ],
    init: function () {
        //creo form
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('cli.forms.cliente.components.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },
    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(), record = vm.get('record'),readOnly=true, readOnlyExtra=true, readOnlyAttach = true,addComponent=false
        let hideContatto=true, hideIta = false, hideEE = true //default è italiano
        let storeContatti  = vm.getStore('storeContatti') //store contatti
        if (this.checkRuoli(['99','2'])) {
            vm.set('btn.save', true)
            readOnlyExtra=false
            readOnlyAttach = false
            if (vm.get('isnew')===0) {
                vm.set("btn.cronology", true)
            }
        }
        //se non è importato abilito modifica di tutti i campi eccetto il codice (cliente potenziale)
        if (record.data.imported===0 && this.checkRuoli(['99','2'])) {
            readOnly=false
            vm.set("btn.delete", true)
        }
        if (record.data.estero===1) {
            hideIta = true
            hideEE = false
        }
        vm.set('btn.close', true)
        vm.set('readOnly', readOnly)
        vm.set('readOnlyExtra', readOnlyExtra)
        vm.set('toolbar.hideCard', false) //visualizzo tasti cards
        //visibilità card contatto e campi it/ee
        vm.set('hideContatto', hideContatto)
        vm.set('hideIta', hideIta)
        vm.set('hideEE', hideEE)
        //titolo tab
        vm.set('title',record.data['ragsoc'] || 'n.d.')
        vm.set('label',Locale.t('cli.forms.cliente.title'))
        if (!this.listForms) {
            addComponent=true //imposto true il caricamento allegati
            this.listForms = [
                {posizione: 'anagrafica', backgroundColor: 'LightBlue',
                    card: Ext.create('cli.forms.cliente.cards.Anagrafica'),
                    text: Locale.t('cli.forms.cliente.tabanagrafica')
                },
                {posizione: 'contatti', backgroundColor: '',
                    card: Ext.create('cli.forms.cliente.cards.Contatti'),
                    text: Locale.t('cli.forms.cliente.tabcontatti')
                }
            ]
        }
        //contatti
        if (addComponent) {
           // this.gridContatti = Ext.create("cli.forms.cliente.grids.Contatti")
        }
        storeContatti.load() //carico contatti
        //allegati
        let storeAllegati = this.getViewModel().get("storeAllegati");
        storeAllegati.removeAll();
        record.data.allegati.forEach(function (rec) {
            rec["readOnlyAttach"] = readOnlyAttach;
            rec["hideDownload"] = "false";
            storeAllegati.add(Ext.create("portal.v1.view.main.global.upload.GridAttachModel", rec));
        });
        if (addComponent) {
            this.cardAllegati = Ext.create("portal.v1.view.main.global.upload.CardAttach")
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
            this.listForms[0].card.add(this.cardAllegati); //aggiungo card al tab info
            //creo grid contatti
            this.gridContatti = Ext.create("cli.forms.cliente.grids.Contatti")
            this.listForms[1].card.add(this.gridContatti); //aggiungo card al tab info
            //creo card contatto
            this.schedaContatto=Ext.create('cli.forms.cliente.contatto.Contatto',{hidden:true})
            this.listForms[1].card.add(this.schedaContatto)

        }
        //Aggiungo cards
        for (card of this.listForms) {
            this.toolBarCard.add({
                text: card.text,
                enableToggle:true,
                hidden:false,
                style: {backgroundColor: card.backgroundColor},
                posizione: card.posizione,
                handler: 'onClickCard'
            })
            this.form.add(card.card);
        }
        this.getView().setActiveItem(this.form);
        this.onClickCard({posizione: vm.get('cardactive')})
    },
    onSave: function () {
        let me = this, vm = me.getViewModel(), record = vm.get("record");
        if (!this.obb()) {
            return false;
        }
        let storeallegati = vm.getStore("storeAllegati");
        record.data["allegati"] = [];
        storeallegati.each(function (rec) {
            record.data["allegati"].push(rec.data);
        });
        this.callParent(arguments)
    },
    obb: function () {
        let anagrafe = this.listForms[0].card.getForm()
        if (!anagrafe.isValid()) {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('global.form.validation.form') + ' ' + this.listForms[0].posizione,
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
    },
    //passaggio id x caricamento contatti
    onBeforeLoadContatti: function (store) {
        if (store.isLoading()) return false;
        let me = this,
            vm = me.getViewModel();
        let record = vm.get('record');
        store.getProxy().extraParams.idcli = record.data.id
    }
})