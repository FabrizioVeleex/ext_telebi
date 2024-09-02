/**
 * Created by luca on 16/07/2018.
 */
Ext.define('fmc.view.forms.scheda.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.v1-scheda',
    requires: [
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.window.Window',
        'fmc.model.forms.scheda.AltreMansioniCombo',
        'fmc.model.forms.scheda.CompetenzeCombo',
        'fmc.model.forms.scheda.Model',
        'fmc.store.forms.scheda.AltreMansioniCombo',
        'fmc.view.forms.corso.Panel',
        'fmc.view.forms.scheda.cards.CorsiEffettuati',
        'fmc.view.forms.scheda.cards.CorsiPrevisti',
        'fmc.view.forms.scheda.cards.GridCheck',
        'fmc.view.forms.scheda.cards.GridCompetenze',
        'fmc.view.forms.scheda.cards.GridMansioni',
        'fmc.view.forms.scheda.cards.Scheda',
        'fmc.view.forms.verifica.Panel',
        'portal.v1.view.main.global.upload.Attach',
        'portal.v1.view.main.global.upload.CardAttach',
        'portal.v1.view.main.global.upload.GridAttachModel',
        'portal.v1.view.main.global.upload.GridAttachs'
    ],
    init: function () {
        //tasti azioni
        this.btnMansione= {xtype: 'button',ui:'blue', text: Locale.t('fmc.forms.scheda.btn.mansione.text'), tooltip: Locale.t('fmc.forms.scheda.btn.mansione.tooltip'), iconCls: 'x-fas fa-user-times', handler: 'onMansione'};
        this.btnSposta= {xtype: 'button',ui:'red', text: Locale.t('fmc.forms.scheda.btn.sposta.text'), tooltip: Locale.t('fmc.forms.scheda.btn.sposta.tooltip'), iconCls: 'x-fas fa-user-times', handler: 'onSposta'};
        this.btnGenerapdf= {xtype: 'button',ui:'blue', text: Locale.t('fmc.forms.scheda.btn.generapdf.text'), tooltip: Locale.t('fmc.forms.scheda.btn.generapdf.tooltip'), iconCls: 'icon-pdf', handler: 'onGeneraPdf'};
        //creo form
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('fmc.model.forms.scheda.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },

    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(), record = vm.get('record'),readOnly=true, readOnlyAttach = true,readOnlyMansione=true
        let storeMansioni  = vm.getStore('storeMansioni') //store x la combo mansioni
        let storeSedi = vm.getStore('storeSedi') //store x la combo sedi
        let storeAltreMansioni= vm.getStore('storeAltreMansioni'),storeCompetenze= vm.getStore('storeCompetenze')
        let storePrevisti =  vm.getStore('storePrevisti'),storeEffettuati=  vm.getStore('storeEffettuati'),storeCheck=vm.getStore('storeCheck')
        if (record.data.attivo===1) {
            if (this.checkRuoli(['99','10','1'])) {
                vm.set('btn.save', true)
                readOnly=false
                readOnlyAttach = false
                if (record.data.idmansione!=='') {
                    this.toolBar.add(this.btnMansione);
                }
                if (vm.get('isnew')===1) {
                    readOnlyMansione=false
                } else {
                    this.toolBar.add(this.btnSposta)
                }
            }
        }
        if (this.checkRuoli(['99','10','1'])) {
            vm.set("btn.cronology", true)
        }
        if (vm.get('isnew')===0) {
            this.toolBar.add(this.btnGenerapdf)
        }
        vm.set('btn.close', true)
        vm.set('readOnly', readOnly)
        vm.set('readOnlyMansione', readOnlyMansione);
        //titolo tab
        vm.set('title',record.data['cognome'] || 'n.d.')
        vm.set('label',Locale.t('fmc.forms.scheda.title'))
        storeMansioni.loadData(record.data['storeMansioni'])
        storeSedi.loadData(record.data['storeSedi'])
        this.cardScheda = Ext.create('fmc.view.forms.scheda.cards.Scheda');
        //grid altre mansioni
        this.gridMansioni = Ext.create('fmc.view.forms.scheda.cards.GridMansioni');
        storeAltreMansioni.loadData(record.data.storeAltreMansioni)
        if (readOnly === false) {
            storeAltreMansioni.add(Ext.create('fmc.model.forms.scheda.AltreMansioniCombo', {
                action: 1, isnew: 1, id: bdFunctions.bpRandomString(32),
                descrizione:'',idmansione:''
            }))
        }
        this.cardMansioni=Ext.create('Ext.form.FieldSet',{
            collapsible: true, collapsed: false,
            title: '<span style="color: black;font-weight:bold">'+Locale.t('fmc.forms.scheda.mansioni')+'</span>',
            style: {'background-color': "transparent;"},
            items: [this.gridMansioni]
        })
        this.cardScheda.add(this.cardMansioni);
        //grids competenze
        this.gridCompetenze = Ext.create('fmc.view.forms.scheda.cards.GridCompetenze');
        storeCompetenze.loadData(record.data.storeCompetenze)
        if (readOnly === false) {
            storeCompetenze.add(Ext.create('fmc.model.forms.scheda.CompetenzeCombo', {
                action: 1, isnew: 1, id: bdFunctions.bpRandomString(32),
                descrizione:'',idcompetenza:''
            }))
        }
        this.cardCompetenze=Ext.create('Ext.form.FieldSet',{
            collapsible: true, collapsed: false,
            title: '<span style="color: black;font-weight:bold">'+Locale.t('fmc.forms.scheda.competenze')+'</span>',
            style: {'background-color': "transparent;"},
            items: [this.gridCompetenze]
        })
        this.cardScheda.add(this.cardCompetenze);
        //corsi
        storePrevisti.loadData(record.data['storePrevisti'])
        if (vm.get('isnew')===0) {
            this.gridprevisti = Ext.create("fmc.view.forms.scheda.cards.CorsiPrevisti")
            this.cardPrevisti=Ext.create('Ext.form.FieldSet',{
                collapsible: true, collapsed: false,
                title: '<span style="color: black;font-weight:bold">'+Locale.t('fmc.forms.scheda.corsiattivi')+'</span>',
                style: {'background-color': "transparent;"},
                items: [this.gridprevisti]
            })
            this.cardScheda.add(this.cardPrevisti)
        }
        storeEffettuati.loadData(record.data['storeEffettuati'])
        if (vm.get('isnew')===0) {
            this.grideffettuati = Ext.create("fmc.view.forms.scheda.cards.CorsiEffettuati")
            this.cardEffettuati=Ext.create('Ext.form.FieldSet',{
                collapsible: true, collapsed: false,
                title: '<span style="color: black;font-weight:bold">'+Locale.t('fmc.forms.scheda.corsipassivi')+'</span>',
                style: {'background-color': "transparent;"},
                items: [this.grideffettuati]
            })
            this.cardScheda.add(this.cardEffettuati)
        }
        //verifiche
        storeCheck.loadData(record.data['storeCheck'])
        if (vm.get('isnew')===0) {
            this.gridcheck = Ext.create("fmc.view.forms.scheda.cards.GridCheck")
            this.cardCheck=Ext.create('Ext.form.FieldSet',{
                collapsible: true, collapsed: false,
                title: '<span style="color: black;font-weight:bold">'+Locale.t('fmc.forms.scheda.corsicheck')+'</span>',
                style: {'background-color': "transparent;"},
                items: [this.gridcheck]
            })
            this.cardScheda.add(this.cardCheck)
        }
        //allegati
        this.cardAllegati = Ext.create("portal.v1.view.main.global.upload.CardAttach");
        if (readOnlyAttach === false) {
            //inserisco tasto allegati
            if (!this.uploadfile) {
                this.uploadfile = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestScheda");
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
        this.cardScheda.add(this.cardAllegati);
        this.form.add(this.cardScheda);
        this.getView().setActiveItem(this.form);
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
    //azioni allegati
    onReturnRequestScheda: function (res) {
        let me = this, vm = me.getViewModel(),
            store = vm.getStore("storeAllegati");
        res.valori.idautore = Ext.global.Vars.infoUser.id; //imposto autore frontend
        res.valori.autore = Ext.global.Vars.infoUser.cognomenome; //imposto autore frontend
        res.valori.hideDownload = "true"; //il nuovo non lo posso scaricare
        store.add(
            Ext.create("portal.v1.view.main.global.upload.GridAttachModel", res.valori)
        );
    },
    //azioni form
    onMansione:function() {
        let me = this,vm = this.getViewModel();
        let record = vm.get('record');
        let btnX = new Ext.Button({
            text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
                wndw.destroy();
            }
        });
        let btnConfirm = new Ext.Button({
            text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
                let ff=wdwpanel.getForm();
                let newmansione=ff.findField('newmansione').getValue();
                if (!newmansione) {//verifico che sia stato assegnato un esito
                    Ext.Msg.show({
                        title: Locale.t('global.attenzione'),
                        msg: Locale.t('fmc.forms.scheda.btn.mansione.obbmansione'),
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                    return;
                }
                me.getView().el.mask(Locale.t("global.actions.incorso"));
                Ext.Ajax.request({
                    method: "POST",
                    jsonData: {data: record.data,'idmansione':newmansione},
                    url: Backend.REST_API + "forms/scheda/mansione",
                    success: function () {
                        me.view.el.unmask()
                        wndw.destroy();
                        me.cardScheda.down('#fld_mansione').setValue(newmansione)
                        me.refreshGrid=true
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
        });
        let wdwpanel = Ext.create('Ext.form.Panel', {
            border: false, items: [
                {xtype: 'combo',editable:false,width:600, labelWidth:150,fieldLabel: Locale.t('fmc.forms.scheda.btn.mansione.mansione'),
                    name:'newmansione', displayField:'descrizione',valueField:'id',value:'',
                    store: Ext.create('fmc.store.forms.scheda.AltreMansioniCombo')
                },
                //{xtype:'hidden'}
                {xtype: 'container',
                    style: {'padding': '5px'},
                    html: '<span style="font-weight:bold;color:red;font-size:12px;" >'+Locale.t('fmc.forms.scheda.btn.mansione.msg')+'</span>'
                }
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title: Locale.t('fmc.forms.scheda.btn.mansione.text'),
            width: 650, autoHeight: true, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();
    },
    onSposta:function() {
        let me = this,record = this.getViewModel().get('record');
        let btnX = new Ext.Button({
            text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
                wndw.destroy();
            }
        });
        let btnConfirm = new Ext.Button({
            text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
                let ff=wdwpanel.getForm();
                let cessazione=ff.findField('cessazione').getValue();
                if (!cessazione) {
                    Ext.Msg.show({
                        title: Locale.t('global.btn.attenzione'), msg: Locale.t('fmc.forms.scheda.btn.sposta.obbcessazione'),
                        buttons: Ext.Msg.OK, icon: Ext.MessageBox.ERROR
                    });
                    return;
                }
                me.getView().el.mask(Locale.t("global.actions.incorso"));
                Ext.Ajax.request({
                    method: "POST",
                    jsonData: {data: record.data,'cessazione':cessazione},
                    url: Backend.REST_API + "forms/scheda/sposta",
                    success: function () {
                        me.view.el.unmask()
                        wndw.destroy();
                        me.refreshGrid=true
                        me.onClose()
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
        });
        let wdwpanel = Ext.create('Ext.form.Panel', {
            border: false, items: [
                {xtype: 'datefield', fieldLabel: Locale.t('fmc.forms.scheda.btn.sposta.cessazione'),labelWidth:250,width: 400, format: 'd/m/Y',submitFormat:'Y-m-d', name:'cessazione'},
                {xtype: 'container',
                    style: {'padding': '5px'},
                    html: '<span style="font-weight:bold;color:red;font-size:12px;" >'+Locale.t('fmc.forms.scheda.btn.sposta.msg')+'</span>'
                }
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title: Locale.t('fmc.forms.scheda.btn.sposta.text'),
            width: 650, autoHeight: true, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();
    },
    onGeneraPdf:function() {
        let me = this, record = this.getViewModel().get('record');
        me.getView().el.mask(Locale.t("global.actions.incorso"));
        Ext.Ajax.request({
            method: "POST",
            params: {id: record.data.id},
            url: Backend.REST_API + "forms/scheda/generapdf",
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
    },
    //azioni grids
    onOpenCorso:function(view, rowIndex, colIndex, item, event, record) {
        let center = this.getView().up();
        let utente=''
        if (item.iduser) {
            utente=record.data.iduser
        }
        let itemId = 'f' + record.data['id'];
        let form  = center.child('#'+itemId);
        if (!form) {
            form = Ext.create('fmc.view.forms.corso.Panel', {
                itemId: 'f' + record.data['id'],
                record: record,
                storeForm:view.getStore(),
                valori:{
                    id:record.data['id'],
                    isnew:0,
                    iduser:utente
                }
            });
            center.add(form);
        }
        center.setActiveItem(form);
    },
    onOpenCheck:function(view, rowIndex, colIndex, item, event, record) {
        let center = this.getView().up();
        let utente=''
        if (item.iduser) {
            utente=record.data.iduser
        }
        let itemId = 'f' + record.data['id'];
        let form  = center.child('#'+itemId);
        if (!form) {
            form = Ext.create('fmc.view.forms.verifica.Panel', {
                itemId: 'f' + record.data['id'],
                record: record,
                storeForm:view.getStore(),
                valori:{
                    id:record.data['id'],
                    isnew:0,
                    iduser:utente
                }
            });
            center.add(form);
        }
        center.setActiveItem(form);
    }
})