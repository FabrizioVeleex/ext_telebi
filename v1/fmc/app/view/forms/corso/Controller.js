/**
 * Created by luca on 16/07/2018.
 */
Ext.define('fmc.view.forms.corso.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.v1-corso',
    requires: [
        'Ext.button.Split',
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'Ext.form.Panel',
        'Ext.layout.container.Absolute',
        'Ext.layout.container.Fit',
        'Ext.menu.Menu',
        'Ext.window.Window',
        'fmc.model.forms.corso.GridUtenti',
        'fmc.model.forms.corso.Model',
        'fmc.view.forms.corso.cards.Corso',
        'fmc.view.forms.corso.cards.GridUtenti',
        'portal.v1.view.main.global.upload.Attach',
        'portal.v1.view.main.global.upload.CardAttach',
        'portal.v1.view.main.global.upload.GridAttachModel',
        'portal.v1.view.main.global.upload.GridAttachs'
    ],
    init: function () {
        let vm = this.getViewModel();
        //tasti extra
        this.btnGeneraPdf = {xtype: "button", ui: "blue", text: Locale.t("fmc.forms.corso.btn.generapdf"),
            tooltip: Locale.t("fmc.forms.corso.btn.generapdftooltip"), iconCls: "icon-pdf", handler: "onGeneraPdf"
        };
        this.btnRigeneraPdf = {xtype: "button", ui: "blue", text: Locale.t("fmc.forms.corso.btn.rigenerapdf"),
            tooltip: Locale.t("fmc.forms.corso.btn.rigenerapdftooltip"), iconCls: "icon-pdf", handler: "onRigeneraPdf"
        };
        this.btnArchivia = {xtype: "button", ui: "blue", text: Locale.t("fmc.forms.corso.btn.archivia"),
            tooltip: Locale.t("fmc.forms.corso.btn.archiviatooltip"), iconCls: "x-fas fa-archive", handler: "onArchivia",
        };
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('idpadre', this.getView().valori.idcorso);
        vm.set('record', Ext.create('fmc.model.forms.corso.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },

    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(), record = vm.get('record'),readOnly = true,readOnlyAttach = true,hideUpdate=true
        let storeTipologie = vm.getStore('storeTipologie'), storeSedi= vm.getStore('storeSedi')
        let storeUtenti= vm.getStore('storeUtenti')
        vm.set('btn.close', true)
        if (record.data.stato === 0) {
            if (this.checkRuoli(['99', '2', '10'])) {
                readOnly = false;
                readOnlyAttach = false;
                vm.set('btn.save', true)
                vm.set('btn.delete', true)
                vm.set("btn.cronology", true)
                if (vm.get('isnew')===0) {
                    this.toolBar.add(this.btnGeneraPdf)
                    this.toolBar.add(this.btnArchivia)
                }
            }
            if (record.data.idcorso!=='') {hideUpdate=false} //è un corso di aggiornamento
            //gestione tasti default
            vm.set('readOnly', readOnly)
            vm.set('hideUpdate', hideUpdate)
            //titolo tab
            vm.set('title',record.data['numero'] || 'n.d.')
            vm.set('label',Locale.t('fmc.forms.corso.title'))
            storeTipologie.loadData(record.data.storeTipologie)
            storeSedi.loadData(record.data.storeSedi)
            storeUtenti.loadData(record.data.gridutenti)
            if (readOnly===false) {
                storeUtenti.add(Ext.create('fmc.model.forms.corso.GridUtenti', {
                        action: 1, isnew: 1, id: bdFunctions.bpRandomString(32), idutente:'',nomecognome:'',firma:''
                    })
                )
            }
            //creo cards
            this.cardCorso = Ext.create('fmc.view.forms.corso.cards.Corso');
            //grid partecipanti
            this.gridutenti = Ext.create('fmc.view.forms.corso.cards.GridUtenti')
            this.cardPartecipanti=Ext.create('Ext.form.FieldSet',{
                collapsible: true, collapsed: false,
                title: '<span style="color: black;font-weight:bold">'+Locale.t('fmc.forms.corso.sezuser')+'</span>',
                style: {'background-color': "transparent;"},
                items: [this.gridutenti]
            })
            this.cardCorso.add(this.cardPartecipanti)
            //allegati
            this.cardAllegati = Ext.create("portal.v1.view.main.global.upload.CardAttach");
            if (readOnlyAttach === false) {
                //inserisco tasto allegati
                if (!this.uploadfile) {
                    this.uploadfile = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestCorso");
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
            this.cardCorso.add(this.cardAllegati);
            this.form.add(this.cardCorso);
            //aggiorno firma
            if (record.data.firma !== "") {
                this.updateFirmaDocente();
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
                    text: Locale.t("fmc.forms.corso.attach"),
                    menu: menu,
                });
            }
            //carico pdf (se è valorizzato l'id utente carico il suo)
            let percorso='app/fmc/verbali/'+record.data.id+'/'+record.data.id+'.pdf'
            if (this.getView().valori.iduser) {
                percorso='app/fmc/verbali/'+record.data.id+'/'+this.getView().valori.iduser+'.pdf'
            }
            Ext.Ajax.request({
                url: Backend.REST_API + 'forms/corso/getpdf/', method: 'POST', binary:true,
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
                    let errore = Locale.t('fmc.forms.corso.errorepdf')+': '+response.statusText
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
    updateFirmaDocente: function () {
        let me = this,
            vm = me.getViewModel(),
            record = vm.get("record");
        let firmadocente=this.cardCorso.down("#fldfirmadocente")
        if (firmadocente) {
            Ext.Ajax.request({
                url: Backend.REST_API + 'forms/corso/getfirmadocente/'+record.data.firma,
                method: 'GET',
                binary:true,
                success: function (response) {
                    let headers = response.getAllResponseHeaders()
                    let blob = new Blob([response.responseBytes], {type: headers['content-type']})
                    this.binaryImg = window.URL.createObjectURL(blob)
                    firmadocente.setSrc(this.binaryImg)
                },
                failure: function () {
                   alert('Errore caricamento firma esecutore')
                }
            })
        }
    },
    onFirmaDocente: function () {
        let me = this;
        let btnX = new Ext.Button({text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban',
            handler: function () {
                me.winfirma.destroy();
            }
        });
        let btnConfirm = Ext.create('Ext.Button',{
            text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
                let dataFirma = me.signaturePad.toDataURL(),
                    signatureData = dataFirma.replace(/^data:image\/(png|jpg);base64,/, "");
                me.onSalvaFirmaDocente(signatureData);
                me.winfirma.destroy();
            }
        });
        this.winfirma = Ext.create('Ext.Window', {
            title:Locale.t('fmc.forms.corso.winfirma.docente'),
            tbar: [btnX,btnConfirm],
            bodyPadding: 15, modal:true, width: 800, height: 530, layout:'fit',
            items: [
                {xtype: 'container', cls:'bd-bgfirma',
                    layout: {type: 'absolute'},
                    items:[
                        {x:80, y:55, xtype:'component',
                            cls:'bd-spl-textfirma',
                            html:'<h2>'+Locale.t('fmc.forms.corso.winfirma.digitare')+'</h2>'
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
    onSalvaFirmaDocente:function(signatureData) {
        let me = this, vm = me.getViewModel(),record = vm.get('record')
        me.view.el.mask(Locale.t('global.actions.incorso'));
        Ext.Ajax.request({
            url: Backend.REST_API + 'forms/corso/savefirmadocente/',method:'PUT',
            params: {id: record.data.id, signatureData:signatureData},
            success: function(){
                me.view.el.unmask();
                record.data.firma=record.data.id+'.png' //setto valore nel campo
                me.updateFirmaDocente()
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
    onChangeDurata:function() {
        let me = this,
            vm = me.getViewModel(),
            record = vm.get('record');
        if (record.data.datac!=='' && record.data.datac!=='0000-00-00') {
            if (record.data.datasca==='' || record.data.datasca==='0000-00-00' || !record.data.datasca) {
                let dt = Ext.Date.add(new Date(record.get('datac')), Ext.Date.MONTH, record.data.durata);
                record.set('datasca', dt); //setto data scadenza
            }
        }
    },
    onFirmaUtente: function (view, rowIndex, colIndex, item, event, record) {
        let me = this,vm = me.getViewModel(),
            rec = vm.get('record');
        if (rec.get('readOnly')===true) {
            return false;
        }
        if (record.get('idutente')==='') {
            Ext.Msg.show({
                title: Locale.t('fmc.forms.corso.avvisosalva'),
                msg: Locale.t('fmc.forms.corso.checknominativo'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return false;
        }
        if (record.get('isnew')===1) {
            Ext.Msg.show({
                title: Locale.t('fmc.forms.corso.avvisosalva'),
                msg: Locale.t('fmc.forms.corso.checkfirma'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return false;
        }
        let iduser=record.get('id');
        let nominativo=record.get('nomecognome');
        let btnX = new Ext.Button({text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban',
            handler: function () {
                me.winfirma.destroy();
            }
        });
        let btnConfirm = Ext.create('Ext.Button',{
            text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
                let dataFirma = me.signaturePad.toDataURL(),
                    signatureData = dataFirma.replace(/^data:image\/(png|jpg);base64,/, "");
                me.onSalvaFirmaUtente(signatureData,iduser,rowIndex);
                me.winfirma.destroy();
            }
        });
        this.winfirma = Ext.create('Ext.Window', {
            title:Locale.t('fmc.forms.corso.winfirma.title')+ nominativo,
            tbar: [btnX,btnConfirm],
            bodyPadding: 15, modal:true, width: 800, height: 530, layout:'fit',
            items: [
                {xtype: 'container', cls:'bd-bgfirma',
                    layout: {type: 'absolute'},
                    items:[
                        {x:80, y:55, xtype:'component',
                            cls:'bd-spl-textfirma',
                            html:'<h2>'+Locale.t('fmc.forms.corso.winfirma.digitare')+'</h2>'
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
    onSalvaFirmaUtente:function(signatureData,iduser,rowIndex) {
        let me = this, vm = me.getViewModel(),record = vm.get('record')
        me.view.el.mask(Locale.t('global.actions.incorso'));
        Ext.Ajax.request({
            url: Backend.REST_API + 'forms/corso/savefirmauser/',method:'PUT',
            params: {id: record.data.id, signatureData:signatureData,iduser:iduser},
            success: function(){
                me.view.el.unmask();
                let gridutenti = me.gridutenti
                let recupd = gridutenti.getStore().getAt(rowIndex);
                //aggiorno record grid
                recupd.data['firma'] = iduser;
                gridutenti.getView().refreshNode(recupd);
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
        if (!this.obb()) {
            return false;
        }
        let storeallegati = vm.getStore("storeAllegati");
        record.data["allegati"] = [];
        storeallegati.each(function (rec) {
            record.data["allegati"].push(rec.data);
        });
        //partecipanti
        let gridutenti = vm.getStore('storeUtenti')
        //aggiorno grid risorse
        record.data['gridutenti'] = []
        let loaduser = [];
        gridutenti.each(function (rec) {
            if (rec.data.idutente!=='' && !Ext.Array.contains(loaduser, rec.data.idutente)) {
                record.data['gridutenti'].push(rec.data)
                loaduser.push(rec.data.idutente);
            }
        })
        this.callParent(arguments)
    },
    obb: function () {
        let modulo = this.cardCorso.getForm()
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
    onReturnRequestCorso: function (res) {
        let me = this, vm = me.getViewModel(),
            store = vm.getStore("storeAllegati");
        res.valori.idautore = Ext.global.Vars.infoUser.id; //imposto autore frontend
        res.valori.autore = Ext.global.Vars.infoUser.cognomenome; //imposto autore frontend
        res.valori.hideDownload = "true"; //il nuovo non lo posso scaricare
        store.add(
            Ext.create("portal.v1.view.main.global.upload.GridAttachModel", res.valori)
        );
    },
    onGeneraPdf:function(view,rowIndex, colIndex, item, event, rec) {
        let idpartecipante=''
       if (view.xtype!=='button') {
           idpartecipante=rec.data.id
       }
        let me = this, record = this.getViewModel().get('record');
        me.getView().el.mask(Locale.t("global.actions.incorso"));
        Ext.Ajax.request({
            method: "POST",
            params: {'id': record.data.id,'idpartecipante':idpartecipante},
            url: Backend.REST_API + "forms/corso/stampapdf",
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
        let record = this.getViewModel().get('record').data;
        let error = '';
        if (record['datac'] === '' || record['datac'] === '0000-00-00' || !record['datac']) {
            error += Locale.t('fmc.forms.corso.fields.datac') + ': ' + Locale.t('global.form.inserirevalore') + '<br>';
        }
        if (record['durata'] === '') {
            error += Locale.t('fmc.forms.corso.fields.durata') + ': ' + Locale.t('global.form.inserirevalore') + '<br>';
        }
        if (record['datasca'] === '' || record['datasca'] === '0000-00-00' || !record['datasca']) {
            error += Locale.t('fmc.forms.corso.fields.datasca') + ': ' + Locale.t('global.form.inserirevalore') + '<br>';
        }
        if (record['idtipologia'] === '') {
            error += Locale.t('fmc.forms.corso.fields.idtipologia') + ': ' + Locale.t('global.form.inserirevalore') + '<br>';
        }
        if (record['idsede'] === ''){
            error +=Locale.t('fmc.forms.corso.fields.idsede')+': '+Locale.t('global.form.inserirevalore')+'<br>';
        }
        if (record['oggetto'].length>3000){
            error +=Locale.t('fmc.forms.corso.fields.oggetto')+': '+Locale.t('global.form.lunghezzamassima')+' 3.000<br>';
        }
        if (record['materiale'].length>3000){
            error +=Locale.t('fmc.forms.corso.fields.materiale')+': '+Locale.t('global.form.lunghezzamassima')+' 3.000<br>';
        }
        if (record['docente'] === ''){
            error +=Locale.t('fmc.forms.corso.fields.docente')+': '+Locale.t('global.form.inserirevalore')+'<br>';
        } else if (record['docente'].length>250){
            error +=Locale.t('fmc.forms.corso.fields.docente')+': '+Locale.t('global.form.lunghezzamassima')+' 250<br>';
        }
        if (record['esito']===0){
            error +=Locale.t('fmc.forms.corso.fields.esito')+': '+Locale.t('global.form.inserirevalore')+'<br>';
        }
        if (error !== '') {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: error,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return false;
        }
        return true;
    },
    onArchivia:function() {
        let me = this, vm = me.getViewModel(), record = vm.get("record")
        //check campi
        if (!this.obbArchivia()) {
            return false
        }
        record.data.datac.setTime(record.data.datac.getTime() + (2 * 60 * 60 * 1000));
        record.data.datasca.setTime(record.data.datasca.getTime() + (2 * 60 * 60 * 1000));
        let datacnew=Ext.Date.format(record.data.datasca,'Y-m-d')
        let annonew = Ext.Date.format(record.data.datasca,'Y')
        let dt = Ext.Date.add(
            new Date(record.data.datasca),
            Ext.Date.MONTH,
            record.data.durata
        );
        let datascanew = Ext.Date.format(dt,'Y-m-d')
        //carico allegati nel record
        let storeallegati = vm.getStore("storeAllegati");
        record.data["allegati"] = [];
        storeallegati.each(function (rec) {
            record.data["allegati"].push(rec.data);
        });
        //partecipanti
        let gridutenti = vm.getStore('storeUtenti')
        //aggiorno grid risorse
        record.data['gridutenti'] = []
        let loaduser = [];
        gridutenti.each(function (rec) {
            if (rec.data.idutente!=='' && !Ext.Array.contains(loaduser, rec.data.idutente)) {
                record.data['gridutenti'].push(rec.data)
                loaduser.push(rec.data.idutente);
            }
        })
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
                    jsonData: {data: record.data,datacnew: datacnew,annonew:annonew,datascanew:datascanew},
                    url: Backend.REST_API + "forms/corso/archivia",
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
            items: [{ xtype: "box", html: Locale.t("fmc.forms.corso.btn.archiviamsg") }],
        });
        let wndw = Ext.create("Ext.Window", {
            tbar: [btnX, btnConfirm], title: Locale.t("fmc.forms.corso.btn.archivia"),
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
            url: Backend.REST_API + "forms/corso/rigenerapdf",
            success: function () {
                me.getView().el.unmask()
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
            url: Backend.REST_API + 'forms/corso/getfile/', method: 'POST',
            params: {'id': btn.idattach, 'idrecord': btn.idattach, 'tabella': 'TBFMCDOC01'},//id=id file da scaricare, idrecord=record principale x log, tabella=tabella da recuperare
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