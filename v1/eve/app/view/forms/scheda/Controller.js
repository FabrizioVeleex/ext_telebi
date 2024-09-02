/**
 * Created by luca on 16/07/2018.
 */
Ext.define('eve.view.forms.scheda.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.v1-scheda',
    requires: [
        'Ext.form.FieldSet',
        'eve.model.forms.scheda.GridContatti',
        'eve.model.forms.scheda.Model',
        'eve.view.forms.scheda.cards.GridContatti',
        'eve.view.forms.scheda.cards.Scheda',
        'eve.view.forms.scheda.cards.Struttura',
        'portal.v1.view.main.global.upload.Attach',
        'portal.v1.view.main.global.upload.CardAttach',
        'portal.v1.view.main.global.upload.GridAttachModel',
        'portal.v1.view.main.global.upload.GridAttachs'
    ],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('idpadre', this.getView().valori.idpadre);
        vm.set('record', Ext.create('eve.model.forms.scheda.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },

    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(), record = vm.get('record'), readOnly = true
        //stores x le combo
        let storeZone = vm.getStore('storeZone'),storeContatti= vm.getStore('storeContatti'),storeMansioni =  vm.getStore('storeMansioni')
        if (record.data.modifica==='S' && this.checkRuoli(['99','1'])) {
            vm.set('btn.save', true)
            vm.set('btn.delete', true)
            readOnly = false
        }
        if (this.checkRuoli(['99','1'])) {
            vm.set("btn.cronology", true)
        }
        vm.set('btn.close', true)
        vm.set('readOnly', readOnly);
        //titolo tab
        vm.set('title',record.data['ragsoc'] || 'n.d.')
        vm.set('label',Locale.t('eve.forms.scheda.title'))
        //carico store
        storeZone.loadData(record.data['storeZone'])
        storeMansioni.loadData(record.data['storeMansioni'])
        this.cardScheda = Ext.create('eve.view.forms.scheda.cards.Scheda');
        //grid contatti
        this.gridContatti = Ext.create('eve.view.forms.scheda.cards.GridContatti');
        storeContatti.loadData(record.data['storeContatti'])
        if (readOnly === false) {
            storeContatti.add(Ext.create('eve.model.forms.scheda.GridContatti', {
                action: 1, isnew: 1, id: bdFunctions.bpRandomString(32),
                idrecord: record.data.id, idmansione:'',suffisso: '', nominativo: '',  email: ''
            }))
        }
        this.cardContatti=Ext.create('Ext.form.FieldSet',{
            collapsible: true, collapsed: false,
            title: '<span style="color: black;font-weight:bold">'+Locale.t('eve.forms.scheda.gridcontatti.title')+'</span>',
            style: {'background-color': "transparent;"},
            items: [this.gridContatti]
        })
        this.cardScheda.add(this.cardContatti);
        //struttura
        this.cardStruttura= Ext.create('eve.view.forms.scheda.cards.Struttura');
        this.cardScheda.add(this.cardStruttura)
        //allegati
        this.cardAllegati = Ext.create("portal.v1.view.main.global.upload.CardAttach");
        if (readOnly === false) {
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
            rec["hideDownload"] = "false";
            storeAllegati.add(Ext.create("portal.v1.view.main.global.upload.GridAttachModel", rec));
        });
        this.cardScheda.add(this.cardAllegati);
        //scheda completa
        this.form.add(this.cardScheda);
        this.getView().setActiveItem(this.form);
    },
    onSave: function () {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        if (!this.obb()) {
            return false;
        }
        //formatto campi check tipologia
        if (record.data.distnaz===true) {record.data.distnaz=1}
        if (record.data.distnaz===false) {record.data.distnaz=0}
        if (record.data.distreg===true) {record.data.distreg=1}
        if (record.data.distreg===false) {record.data.distreg=0}
        if (record.data.negozio===true) {record.data.negozio=1}
        if (record.data.negozio===false) {record.data.negozio=0}
        if (record.data.officina===true) {record.data.officina=1}
        if (record.data.officina===false) {record.data.officina=0}
        if (record.data.web===true) {record.data.web=1}
        if (record.data.web===false) {record.data.web=0}
        //formatto campi check target vendita
        if (record.data.vende01===true) {record.data.vende01=1}
        if (record.data.vende01===false) {record.data.vende01=0}
        if (record.data.vende02===true) {record.data.vende02=1}
        if (record.data.vende02===false) {record.data.vende02=0}
        if (record.data.vende03===true) {record.data.vende03=1}
        if (record.data.vende03===false) {record.data.vende03=0}
        if (record.data.vende04===true) {record.data.vende04=1}
        if (record.data.vende04===false) {record.data.vende04=0}
        if (record.data.vende04===1 && record.data.altro==='') {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('eve.forms.scheda.obbaltro'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return false;
        }
        //formatto campi check tipo cliente
        if (record.data.tipo01===true) {record.data.tipo01=1}
        if (record.data.tipo01===false) {record.data.tipo01=0}
        if (record.data.tipo02===true) {record.data.tipo02=1}
        if (record.data.tipo02===false) {record.data.tipo02=0}
        if (record.data.tipo03===true) {record.data.tipo03=1}
        if (record.data.tipo03===false) {record.data.tipo03=0}
        //formatto campi check tipologia distributiva
        if (record.data.tipdist01===true) {record.data.tipdist01=1}
        if (record.data.tipdist01===false) {record.data.tipdist01=0}
        if (record.data.tipdist02===true) {record.data.tipdist02=1}
        if (record.data.tipdist02===false) {record.data.tipdist02=0}
        if (record.data.tipdist03===true) {record.data.tipdist03=1}
        if (record.data.tipdist03===false) {record.data.tipdist03=0}
        //formatto campi check materiale preso
        if (record.data.cat01===true) {record.data.cat01=1}
        if (record.data.cat01===false) {record.data.cat01=0}
        if (record.data.cat02===true) {record.data.cat02=1}
        if (record.data.cat02===false) {record.data.cat02=0}
        if (record.data.cat03===true) {record.data.cat03=1}
        if (record.data.cat03===false) {record.data.cat03=0}
        if (record.data.cat04===true) {record.data.cat04=1}
        if (record.data.cat04===false) {record.data.cat04=0}
        if (record.data.cat01===1 && record.data.brand01==='') {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('eve.forms.scheda.obbpreso'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return false;
        }
        //formatto campi check materiale da spedire
        if (record.data.cat11===true) {record.data.cat11=1}
        if (record.data.cat11===false) {record.data.cat11=0}
        if (record.data.cat12===true) {record.data.cat12=1}
        if (record.data.cat12===false) {record.data.cat12=0}
        if (record.data.cat13===true) {record.data.cat13=1}
        if (record.data.cat13===false) {record.data.cat13=0}
        if (record.data.cat14===true) {record.data.cat14=1}
        if (record.data.cat14===false) {record.data.cat14=0}
        if (record.data.cat11===1 && record.data.brand11==='') {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('eve.forms.scheda.obbspedire'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return false;
        }
        let storeallegati = vm.getStore("storeAllegati");
        record.data["allegati"] = [];
        storeallegati.each(function (rec) {
            record.data["allegati"].push(rec.data);
        });
        //recupero i campi Html x distruggerli e farli ricreare
        let htmlfield=this.cardStruttura.down('#notehtml')
        if (htmlfield) {
            htmlfield.destroy()
        }
        let htmlfieldtodo=this.cardStruttura.down('#notetodohtml')
        if (htmlfieldtodo) {
            htmlfieldtodo.destroy()
        }
        this.callParent(arguments)
    },
    obb:function() {
        let modulo = this.cardScheda.getForm()
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