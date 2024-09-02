/**
 * Created by luca on 16/07/2018.
 */
Ext.define('vms.view.forms.intervento.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.v1-intervento',
    requires: [
        'Ext.button.Split',
        'Ext.container.Container',
        'Ext.form.Panel',
        'Ext.layout.container.Absolute',
        'Ext.layout.container.Fit',
        'Ext.menu.Menu',
        'Ext.window.Window',
        'portal.v1.view.main.global.upload.Attach',
        'portal.v1.view.main.global.upload.CardAttach',
        'portal.v1.view.main.global.upload.GridAttachModel',
        'portal.v1.view.main.global.upload.GridAttachs',
        'vms.model.forms.intervento.Model',
        'vms.view.forms.intervento.cards.Intervento'
    ],
    init: function () {
        let vm = this.getViewModel();
        //tasti extra
        this.btnGeneraPdf = {xtype: "button", ui: "blue", text: Locale.t("vms.forms.intervento.btn.generapdf"),
            tooltip: Locale.t("vms.forms.intervento.btn.generapdftooltip"), iconCls: "icon-pdf", handler: "onGeneraPdf"
        };
        this.btnRigeneraPdf = {xtype: "button", ui: "blue", text: Locale.t("vms.forms.intervento.btn.rigenerapdf"),
            tooltip: Locale.t("vms.forms.intervento.btn.rigenerapdftooltip"), iconCls: "icon-pdf", handler: "onRigeneraPdf"
        };
        this.btnArchivia = {xtype: "button", ui: "blue", text: Locale.t("vms.forms.intervento.btn.archivia"),
            tooltip: Locale.t("vms.forms.intervento.btn.archiviatooltip"), iconCls: "x-fas fa-archive", handler: "onArchivia",
        };
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('vms.model.forms.intervento.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },

    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(), record = vm.get('record'),readOnly = true,readOnlyAttach = true, readOnlyProd=true, hideClasse=true
        let storeProdotti = vm.getStore('storeProdotti')
        vm.set('btn.close', true)
        if (record.data.stato === 0) {
            if (this.checkRuoli(['99', '2', '10'])) {
                readOnly = false;
                readOnlyAttach = false;
                vm.set('btn.save', true)
                if (vm.get('isnew')===0) {
                    vm.set('btn.delete', true)
                    vm.set("btn.cronology", true)
                    this.toolBar.add(this.btnGeneraPdf)
                    this.toolBar.add(this.btnArchivia)
                }
            }
            //modulo in corso
            if (vm.get('isnew')===1) {
                readOnlyProd=false
            }
            if (record.data.tipo==='02') { //strumento visualizzo la classe
                hideClasse=false;
            }
            //gestione tasti default
            vm.set('readOnly', readOnly);
            vm.set('readOnlyProd',  readOnlyProd);
            vm.set('hideClasse', hideClasse);
            //titolo tab
            vm.set('title',record.data['numero'] || 'n.d.')
            vm.set('label',Locale.t('vms.forms.intervento.title'))
            storeProdotti.loadData(record.data['storeProdotti'])
            //creo cards
            this.cardIntervento = Ext.create('vms.view.forms.intervento.cards.Intervento');
            //allegati
            this.cardAllegati = Ext.create("portal.v1.view.main.global.upload.CardAttach");
            if (readOnlyAttach === false) {
                //inserisco tasto allegati
                if (!this.uploadfile) {
                    this.uploadfile = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestIntervento");
                }
                this.cardAllegati.down("#updfile").add(this.uploadfile);
                this.uploadfile.fireEvent("updateInfo", {
                    url: "", src: "", thumb: false, descrizione: "",
                    readOnly: readOnly, updimage: false, rif: "", type: []
                });
            }
            //allegati
            this.gridAllegati = Ext.create("portal.v1.view.main.global.upload.GridAttachs");
            this.cardAllegati.down("#updgrid").add(this.gridAllegati);
            let storeAllegati = this.getViewModel().get("storeAllegati");
            storeAllegati.removeAll();
            record.data.allegati.forEach(function (rec) {
                rec["readOnlyAttach"] = readOnlyAttach;
                rec["hideDownload"] = "false";
                storeAllegati.add(Ext.create("portal.v1.view.main.global.upload.GridAttachModel", rec));
            });
            this.cardIntervento.add(this.cardAllegati);
            this.form.add(this.cardIntervento);
            //aggiorno firma
            if (record.data.firma !== "") {
                this.updateFirmaEsecutore();
            }
        } else {
            if (this.checkRuoli(['99', '2', '10'])) {
                vm.set("btn.cronology", true)
            }
            if (this.checkRuoli(['99'])) {
                this.toolBar.add(this.btnRigeneraPdf)
            }
            //eventuali allegati
            if (record.data.allegati.length > 0) {
                let menu = Ext.create("Ext.menu.Menu");
                record.data.allegati.forEach(function (rec) {
                    //creo elenco menù
                    let icona='icon-'+rec.estensione.substring(1);
                    menu.add({
                        text: rec.file,
                        iconCls: icona,
                        idattach: rec.id,
                        handler: 'onDownlodAllegato',
                    });
                });
                this.toolBar.add({
                    xtype: "splitbutton",
                    ui: "blue",
                    text: Locale.t("vms.forms.intervento.attach"),
                    menu: menu,
                });
            }
            //carico pdf
            let percorso='app/vms/verbali/'+record.data['id']+'/'+record.data['id']+'.pdf'
            Ext.Ajax.request({
                url: Backend.REST_API + 'forms/intervento/getpdf/', method: 'POST', binary:true,
                params: {
                    'id': record.data['id'],
                    'percorso': percorso, //path file fisico completo
                    'nomefile': record.data['id']
                },
                success: function (response) {
                    let headers = response.getAllResponseHeaders()
                    let blob = new Blob([response.responseBytes], {type: headers['content-type']})
                    let binarypdf = window.URL.createObjectURL(blob)
                    let docpdf=Ext.create(
                        {xtype: 'component',layout:'fit',
                            autoEl: {
                                tag: 'iframe',
                                style: 'border: none',
                                src:binarypdf
                            }}
                    )
                    me.form.add(docpdf);
                },
                failure: function (response) {
                    let errore = Locale.t('vms.forms.intervento.errorepdf')+': '+response.statusText
                    let errorpdf=Ext.create(
                        {xtype: 'box',html:errore}
                    )
                    me.form.add(errorpdf);
                }
            })
        }
        this.getView().setActiveItem(this.form);
    },
    //gestione firma
    updateFirmaEsecutore: function () {
        let me = this,
            vm = me.getViewModel(),
            record = vm.get("record");
        let firmaesecutore=this.cardIntervento.down("#fldfirma")
        if (firmaesecutore) {
            Ext.Ajax.request({
                url: Backend.REST_API + 'forms/intervento/getfirma/'+record.data.firma,
                method: 'GET',
                binary:true,
                success: function (response) {
                    let headers = response.getAllResponseHeaders()
                    let blob = new Blob([response.responseBytes], {type: headers['content-type']})
                    this.binaryImg = window.URL.createObjectURL(blob)
                    firmaesecutore.setSrc(this.binaryImg)
                },
                failure: function () {
                   alert('Errore caricamento firma esecutore')
                }
            })
        }
    },
    onFirmaEsecutore: function () {
        let me = this;
        if (!this.obb()) {
            return false;
        }
        let btnX = new Ext.Button({text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban',
            handler: function () {
                me.winfirma.destroy();
            }
        });
        let btnConfirm = Ext.create('Ext.Button',{
            text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
                let dataFirma = me.signaturePad.toDataURL(),
                    signatureData = dataFirma.replace(/^data:image\/(png|jpg);base64,/, "");
                me.onSalvaFirma(signatureData);
                me.winfirma.destroy();
            }
        });
        this.winfirma = Ext.create('Ext.Window', {
            title:Locale.t('vms.forms.intervento.winfirma.title'),
            tbar: [btnX,btnConfirm],
            bodyPadding: 15, modal:true, width: 800, height: 530, layout:'fit',
            items: [
                {xtype: 'container', cls:'bd-bgfirma',
                    layout: {type: 'absolute'},
                    items:[
                        {x:80, y:55, xtype:'component',
                            cls:'bd-spl-textfirma',
                            html:'<h2>'+Locale.t('vms.forms.intervento.winfirma.digitare')+'</h2>'
                        },
                        {x:0, y:55,
                            xtype:'component',
                            html:'<div id="signature-pad" class="m-signature-pad"> ' +
                                '<div  class="mm-signature-pad--body">' +
                                '   <canvas style="background-color:white;width: 600px;height: 250px;"></canvas>' +
                                '</div></div>'
                        }
                    ]
                }
            ]
        });
        this.winfirma.show();
        let wrapper = document.getElementById("signature-pad");
        canvas = wrapper.querySelector("canvas");
        this.resizeCanvas();
        this.signaturePad = new SignaturePad(canvas);
    },
    resizeCanvas: function () {
        let ratio =  Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d").scale(ratio, ratio);
    },
    onSalvaFirma:function(signatureData) {
        let me = this, vm = me.getViewModel(),record = vm.get('record')
        me.view.el.mask(Locale.t('global.intervento.incorso'));
        Ext.Ajax.request({
            url: Backend.REST_API + 'forms/intervento/savefirma/',method:'PUT',
            params: {id: record.data.id, signatureData:signatureData},
            success: function(){
                me.view.el.unmask();
                record.data.firma=record.data.id+'.png' //setto valore nel campo
                me.updateFirmaEsecutore()
            },
            failure: function(response){
                me.view.el.unmask();
                let resp = Ext.decode(response.responseText);
                Ext.Msg.show({
                    title: Locale.t('global.errore'),
                    msg: resp['msg'],
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        })
    },
    //salvataggio modulo
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
        let modulo = this.cardIntervento.getForm()
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
    onReturnRequestIntervento: function (res) {
        let me = this, vm = me.getViewModel(),
            store = vm.getStore("storeAllegati");
        res.valori.idautore = Ext.global.Vars.infoUser.id; //imposto autore frontend
        res.valori.autore = Ext.global.Vars.infoUser.cognomenome; //imposto autore frontend
        res.valori.hideDownload = "true"; //il nuovo non lo posso scaricare
        store.add(
            Ext.create("portal.v1.view.main.global.upload.GridAttachModel", res.valori)
        );
    },
    onGeneraPdf:function() {
        let me = this, record = this.getViewModel().get('record');
        me.getView().el.mask(Locale.t("global.actions.incorso"));
        Ext.Ajax.request({
            method: "POST",
            params: {id: record.data.id},
            url: Backend.REST_API + "forms/intervento/stampapdf",
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
    obbArchivia:function() {
        let me = this, vm = me.getViewModel(), record = vm.get("record")
        let error = "";
        if (record.data.idprodotto === "") {
            error += Locale.t("vms.forms.intervento.fields.prodotto") + ": " + Locale.t("global.form.inserirevalore") + "<br>";
        }
        if (!record.data.datac || record.data.datac === "" || record.data.datac === "0000-00-00") {
            error += Locale.t("vms.forms.intervento.fields.datac") + ": " + Locale.t("global.form.inserirevalore") + "<br>";
        }
        if (record.data.esito === 0) {
            error += Locale.t("vms.forms.intervento.fields.esito") + ": " + Locale.t("global.form.inserirevalore") + "<br>";
        }
        if (record.data.problema.length > 3000) {
            error += Locale.t("vms.forms.intervento.fields.problema") + ": " + Locale.t("global.form.lunghezzamassima") + " 3.000<br>";
        }
        if (record.data.attivita.length > 3000) {
            error += Locale.t("vms.forms.intervento.fields.attivita") + ": " + Locale.t("global.form.lunghezzamassima") + " 3.000<br>";
        }
        if (record.data.esecutore === "") {
            error += Locale.t("vms.forms.intervento.fields.esecutore") + ": " + Locale.t("global.form.inserirevalore") + "<br>";
        } else if (record.data.esecutore.length > 250) {
            error += Locale.t("vms.forms.intervento.fields.esecutore") + ": " + Locale.t("global.form.lunghezzamassima") + " 250<br>";
        }
        if (record.data.compilatore.length > 250) {
            error += Locale.t("vms.forms.intervento.fields.compilatore") + ": " + Locale.t("global.form.lunghezzamassima") + " 250<br>";
        }
        if (error !== "") {
            Ext.Msg.show({
                title: Locale.t("global.attenzione"),
                msg: error,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR,
            });
            return false;
        }
        return true
    },
    onArchivia:function() {
        let me = this, vm = me.getViewModel(), record = vm.get("record")
        //check campi
        if (!this.obbArchivia()) {
            return false
        }
        //carico allegati nel record
        let storeallegati = vm.getStore("storeAllegati");
        record.data["allegati"] = [];
        storeallegati.each(function (rec) {
            record.data["allegati"].push(rec.data);
        });
        let btnX = new Ext.Button({
            text: Locale.t("global.btn.annulla"), iconCls: "x-fas fa-ban",
            handler: function () {wndw.destroy();}
        });
        let btnConfirm = Ext.create("Ext.Button", {
            text: Locale.t("global.btn.conferma"), iconCls: "x-fas fa-check",
            handler: function () {
                wndw.destroy();
                me.getView().el.mask(Locale.t("global.actions.incorso"));
                Ext.Ajax.request({
                    method: "POST",
                    jsonData: {data: record.data},
                    url: Backend.REST_API + "forms/intervento/archivia",
                    success: function () {
                        me.getView().el.unmask()
                        me.refreshGrid = true
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
        let wdwpanel = Ext.create("Ext.form.Panel", {border: false,
            items: [{ xtype: "box", html: Locale.t("vms.forms.intervento.btn.archiviamsg") }],
        });
        let wndw = Ext.create("Ext.Window", {
            tbar: [btnX, btnConfirm], title: Locale.t("vms.forms.intervento.btn.archivia"),
            width: 550, scrollable: true, closable: true, bodyStyle: { padding: "10px", "background-color": "#ffffff" },
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();
    },
    onRigeneraPdf:function() {
        let me = this, record = this.getViewModel().get('record');
        me.getView().el.mask(Locale.t("global.actions.incorso"));
        Ext.Ajax.request({
            method: "POST",
            params: {id: record.data.id},
            url: Backend.REST_API + "forms/intervento/rigenerapdf",
            success: function (resp) {
                me.getView().el.unmask()
                me.refreshGrid = true
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
    },
    onDownlodAllegato:function(btn) {
        let me = this
        Ext.Ajax.request({
            url: Backend.REST_API + 'forms/intervento/getfile/', method: 'POST',
            params: {'id': btn.idattach, 'idrecord': btn.idattach, 'tabella': 'TBVMSDOC01'},//id=id file da scaricare, idrecord=record principale x log, tabella=tabella da recuperare
            success: function (response) {
                let resp = Ext.decode(response.responseText);
                me.onDownloadFile(resp['token'])
            },
            failure: function (response) {
                let resp = Ext.decode(response.responseText);
                let errore = Locale.t('fat.forms.documento.errore') + ': ' + resp['msg']
                Ext.Msg.show({
                    title: Locale.t('global.errore'),
                    msg: errore,
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        })
    }
})