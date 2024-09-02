Ext.define('bolpas.view.forms.bolla.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins: [
        'portal.v1.global.Util',
    ],
    alias: 'controller.v1-bolla',

    requires: [
        'Ext.container.Container',
        'Ext.form.Panel',
        'Ext.form.RadioGroup',
        'Ext.form.field.Date',
        'Ext.form.field.HtmlEditor',
        'Ext.form.field.Text',
        'Ext.layout.container.Fit',
        'Ext.util.Filter',
        'Ext.window.Window',
        'bolpas.model.forms.bolla.Gridcodici',
        'bolpas.model.forms.bolla.Model',
        'bolpas.view.forms.bolla.cards.Dettaglio',
        'bolpas.view.forms.bolla.cards.Gridarticoli',
        'bolpas.view.forms.bolla.cards.Gridarticoliposi',
        'bolpas.view.forms.bolla.cards.Gridcodici',
        'bolpas.view.forms.bolla.cards.Gridresi',
        'bolpas.view.forms.bolla.cards.Info'
    ],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('bolpas.model.forms.bolla.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
        //tasti
        this.btnAssocia = {xtype: 'button',ui:'green', iconCls:'fa fa-check-circle',text: Locale.t('bolpas.forms.bolla.btn.associa.text'), tooltip:Locale.t('bolpas.forms.bolla.btn.associa.tooltip'), handler: 'onAssocia',step:1}
        this.btnCodifica = {xtype: 'button',ui:'green', iconCls:'fa fa-check-circle',text: Locale.t('bolpas.forms.bolla.btn.codifica.text'), tooltip:Locale.t('bolpas.forms.bolla.btn.codifica.tooltip'), handler: 'onAzione',step:7}
        this.btnPosiziona = {xtype: 'button',ui:'green', iconCls:'fa fa-check-circle',text: Locale.t('bolpas.forms.bolla.btn.posiziona.text'), tooltip:Locale.t('bolpas.forms.bolla.btn.posiziona.tooltip'), handler: 'onPosiziona',step:4}
        this.btnScheda = {xtype: 'button',ui:'green', iconCls:'fa fa-check-circle',text: Locale.t('bolpas.forms.bolla.btn.scheda.text'), tooltip:Locale.t('bolpas.forms.bolla.btn.scheda.tooltip'), handler: 'onSchede',step:-1} //salva solo le schede
        this.btnGestionale= {xtype: 'button',ui:'blue', text: Locale.t('bolpas.forms.bolla.btn.gestionale.text'), tooltip: Locale.t('bolpas.forms.bolla.btn.gestionale.tooltip'), iconCls: 'x-fas fa-check-circle', handler: 'onAzione',step:0}//non cambia step
        this.btnReso= {xtype: 'button',ui:'green', text: Locale.t('bolpas.forms.bolla.btn.reso.text'), tooltip: Locale.t('bolpas.forms.bolla.btn.reso.tooltip'), iconCls: 'x-fas fa-check-circle',handler: 'onAzione',step:5}
        this.btnInoltra= {xtype: 'button',ui:'blue', text: Locale.t('bolpas.forms.bolla.btn.inoltra.text'), tooltip: Locale.t('bolpas.forms.bolla.btn.inoltra.tooltip'), iconCls: 'x-fas fa-check-circle', handler: 'onAzione',step:3}
        this.btnInoltrachiudi= {xtype: 'button',ui:'green', text: Locale.t('bolpas.forms.bolla.btn.inoltrachiudi.text'), tooltip: Locale.t('bolpas.forms.bolla.btn.inoltrachiudi.tooltip'), iconCls: 'x-fas fa-check-circle', handler: 'onAzione',step:9}
        this.btnAnnulla= {xtype: 'button',ui:'red', text: Locale.t('bolpas.forms.bolla.btn.annulla.text'), tooltip: Locale.t('bolpas.forms.bolla.btn.annulla.tooltip'), iconCls: 'x-fas fa-window-close',handler: 'onAzione',step:8}
        this.btnRipristina= {xtype: 'button',ui:'blue', text: Locale.t('bolpas.forms.bolla.btn.ripristina.text'), tooltip: Locale.t('bolpas.forms.bolla.btn.ripristina.tooltip'), iconCls: 'x-fas fa-undo', handler: 'onAzione',step:88}
    },
    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel()
        try {
            let record = vm.get('record'),
                readOnly = true, hidedettaglio = true, hideSoggetto = false, hideResi=true, readOnlySogg = true,
                readOnlyCodici = true, cardattivo = 0, cardattivopos = 'info', //card default
                readArt=true,readArtq=true,readScheda=true
            //readOnlyResi = true,
            //store grids
            let gridcodici = vm.getStore('storeCodici')
            let storeprodotti = vm.getStore('storeArticoli')
            let storeresi = vm.getStore('storeResi')
            //gestione tasti default
            vm.set('btn.close', true)
            if (this.checkRuoli(['99','10'])){
                vm.set('btn.cronology', true)
            }
            //tasti in base a stato e ruolo
            switch(record.data.stato) {
                case 0: //appena scansionata
                    if (this.checkRuoli(['99','10'])){
                        readOnly = false; readOnlySogg = false;
                        //readOnlyResi=false
                        this.toolBar.add(this.btnAssocia)
                        vm.set('btn.delete', true)
                    }
                    break
                case 1: //da registrare/completare
                    if (this.checkRuoli(['99','2'])){
                        //readOnlyArticoli = false
                        if (record.data.numreg==='') {
                            if (record.data.tipo!==2) {
                                this.toolBar.add(this.btnGestionale) //da registrare numero
                            }
                            this.toolBar.add(this.btnInoltrachiudi) //completata con avviso contabilità
                        } else {
                            hidedettaglio = false; cardattivo=1; cardattivopos='dettaglio'
                            this.toolBar.add(this.btnInoltra) //inoltra a posizionamento
                        }
                        this.toolBar.add(this.btnAnnulla) //annulla bolla
                    } else {
                        if (record.data.numreg!=='') {
                            hidedettaglio = false; cardattivo=1; cardattivopos='dettaglio'
                        }
                    }
                    break
                case 4: //posizionamento
                    if (this.checkRuoli(['99','5','2','10','0','7'])){
                        hidedettaglio = false
                    }
                    if (this.checkRuoli(['99','4'])){
                        cardattivo=1; cardattivopos='dettaglio'; readArt=false;readArtq=false;
                        this.toolBar.add(this.btnPosiziona) //completa posizionamento
                    }
                    if (this.checkRuoli(['99','5'])){
                        readScheda = false
                        this.toolBar.add(this.btnScheda) //associazione scheda collaudo
                    }
                    break
                case 5: //reso cliente
                    if (this.checkRuoli(['99','6'])){
                        readOnlySogg = false;
                        //readOnlyResi=false
                        this.toolBar.add(this.btnAnnulla) //annulla bolla
                        this.toolBar.add(this.btnReso) //completa reso
                    }
                    break
                case 7: //codifica materiale
                    if (this.checkRuoli(['99','7'])){
                        readOnlyCodici = false
                        this.toolBar.add(this.btnCodifica) //completa codifica
                    }
                    break
                case 8: //annullata
                    if (this.checkRuoli(['99','2'])){
                        this.toolBar.add(this.btnRipristina)
                    }
                    break
                case 9: //completata
                    if (record.data.tipo===0 || record.data.tipo===3) {
                        if (this.checkRuoli(['99','5','2','10','0','7'])){
                            hidedettaglio = false
                        }
                        if (this.checkRuoli(['4'])){
                            cardattivo=1; cardattivopos='dettaglio'
                        }
                    }
            }
            //visualizzo grid resi x bolle completate e tipo=1
            if (record.data.tipo===1 && record.data.stato===9) {
                hideResi=false
            }
            //cancellazione solo supervisore
            if (record.data.stato!==9 && record.data.stato!==0) {
                if (this.checkRuoli(['99'])){
                    vm.set('btn.delete', true)
                }
            }
            vm.set('readOnly', readOnly)
            vm.set('readOnlySogg', readOnlySogg) //lettura/modifica soggetto associato
            vm.set('readOnlyCodici', readOnlyCodici) //lettura/modifica codici prodotti
            //vm.set('readOnlyResi', readOnlyResi) //lettura/modifica resi
            vm.set('hideSoggetto', hideSoggetto) //visualizza soggetto (no se versamento)
            vm.set('readArt',readArt);  //readonly posizionamento
            vm.set('readArtq',readArtq);  //readonly quarantena
            vm.set('readScheda',readScheda);  //readonly scheda collaudo
            //titolo tab
            vm.set('title', record.data['numero'] + '/' + record.data['anno'] || 'n.d.')
            vm.set('label', Locale.t('bolpas.forms.bolla.title'))
            vm.set('toolbar.hideCard', hidedettaglio)
            //cards
            if (!this.listForms) {
                this.listForms = [
                    {posizione: 'info', backgroundColor: 'LightBlue',
                        card: Ext.create('bolpas.view.forms.bolla.cards.Info'),
                        text: Locale.t('bolpas.forms.bolla.info')
                    },
                    {posizione: 'dettaglio', backgroundColor: '',
                        card: Ext.create('bolpas.view.forms.bolla.cards.Dettaglio'),
                        text: Locale.t('bolpas.forms.bolla.dettaglio')
                    }
                ]
            }
            //Aggiungo cards
            for (card of this.listForms) {
                this.toolBarCard.add({
                    text: card.text,
                    enableToggle: true,
                    style: {backgroundColor: card.backgroundColor},
                    posizione: card.posizione,
                    handler: 'onClickCard'
                })
                this.form.add(card.card);
            }
            this.getViewModel().set('cardactive',cardattivopos)
            this.form.setActiveItem(this.listForms[cardattivo].card)
            //carico store grids resi
            this.gridresi =  Ext.create('bolpas.view.forms.bolla.cards.Gridresi',{padding:'10 10 10 10', hidden:hideResi})
            if (record.data.tipo===1) {
                storeresi.loadData(record.data['gridresi'])
                /*
                if (record.data.stato!==9 && (this.checkRuoli(['99','6']))) {
                    storeresi.add(Ext.create('bolpas.model.forms.bolla.Gridresi', {
                            action: 1, isnew: 1, id: me.randomString(32),nreso:'',dreso:'',idreso:'',openReso:false
                        })
                    )
                }

                 */
            }
            let cardreso = me.listForms.filter(obj => { return obj.posizione ==='info'})
            if (cardreso.length===1) {
                cardreso[0].card.add(this.gridresi)
            }
            //carico store grids codifica
            if (record.data.tipo===3) {
                this.gridcodifica =  Ext.create('bolpas.view.forms.bolla.cards.Gridcodici',{padding:'10 10 10 10'})
                gridcodici.loadData(record.data['gridcodici'])
                if (record.data.stato===7 && (this.checkRuoli(['99','7']))) {
                    gridcodici.add(Ext.create('bolpas.model.forms.bolla.Gridcodici', {
                            action: 1, isnew: 1, id: me.randomString(32), codice:''
                        })
                    )
                }
                let cardcodici = me.listForms.filter(obj => { return obj.posizione ==='info'})
                if (cardcodici.length===1) {
                    cardcodici[0].card.add(this.gridcodifica)
                }
            }
            //carico store grid articoli
            if (record.data.stato!==0 && record.data.numreg!=='') {
                if (record.data.stato<4) {
                    this.gridprodotti =  Ext.create('bolpas.view.forms.bolla.cards.Gridarticoli',{padding:'10 10 10 10'})
                } else {
                    this.gridprodotti =  Ext.create('bolpas.view.forms.bolla.cards.Gridarticoliposi',{padding:'10 10 10 10'})
                }
                storeprodotti.loadData(record.data['gridprodotti'])
                let carddettaglio = me.listForms.filter(obj => { return obj.posizione ==='dettaglio'})
                if (carddettaglio.length===1) {
                    carddettaglio[0].card.add(this.gridprodotti)
                }
            }
            //carico pdf
            let percorso = record.data['percorso'] + record.data['id'] + record.data['estensione']
            Ext.Ajax.request({
                url: Backend.REST_API + 'forms/bolla/getpdf/', method: 'POST', binary: true,
                params: {
                    'id': record.data['id'],
                    'percorso': percorso, //path file fisico completo
                    'nomefile': record.data['nomefile'] //nome da presentare
                },
                success: function (response) {
                    let headers = response.getAllResponseHeaders()
                    let blob = new Blob([response.responseBytes], {type: headers['content-type']})
                    let binarypdf = window.URL.createObjectURL(blob)
                    let cardtmp = me.listForms.filter(obj => { return obj.posizione ==='info'})
                    if (cardtmp.length===1){
                        cardtmp[0].card.add(Ext.create(
                            {xtype: 'component', layout: 'fit',
                                autoEl: {
                                    tag: 'iframe', width: '100%', height: '100%', style: 'border: none',
                                    src: binarypdf //immagine binaria di ritorno
                                }
                            }
                        ))
                    }
                },
                failure: function (response) {
                    let cardtmp = me.listForms.filter(obj => { return obj.posizione ==='info'})
                    let errore = Locale.t('bolpas.forms.bolla.errore') + ': ' + response.statusText
                    if (cardtmp.length===1){
                        cardtmp[0].card.add(Ext.create(
                            {xtype: 'box', html: errore})
                        )
                    }
                }
            })
            this.onClickCard({
                posizione: vm.get('cardactive')
            })
        } catch (e) {
            //nascondo tutti i tasti
            vm.set('btn.delete', false)
            vm.set('btn.cronology', false)
            vm.set('btn.close', false)
            vm.set('btn.save', false)
            vm.set('panelinfo.consoleInfo', '<h3>' + Locale.t('global.form.openerror') + '</h3>')
            this.getView().setActiveItem(this.panelInfo)
            this.onAfterLoadFailure()
        }
    },
    //setto id record prima del caricamento grid mail
    onBeforeLoad: function (store) {
        if (store.isLoading()) return false
        let me = this,
            vm = me.getViewModel()
        let record = vm.get('record')
        store.getProxy().extraParams.idrecord = record.data.id
    },
    obb: function () {
        let cardinfo = this.listForms.filter(obj => { return obj.posizione ==='info'})
        let modulo =cardinfo[0].card.getForm()
        if (!modulo.isValid()) {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('global.form.validation.modulo'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return false
        }
        return true
    },
    //associazione bolla
    onAssocia:function(btn) {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        if (record.data.tipo!==2) {
            if (!this.obb()) {
                return false
            }
        }
        let btnX = new Ext.Button({text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban',
            handler: function () {
                wndw.destroy()
            }
        })
        let btnConfirm = Ext.create('Ext.Button',{
            text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
                wndw.destroy()
                me.getView().el.mask(Locale.t('global.actions.incorso'))
                Ext.Ajax.request({
                    method: 'POST',
                    jsonData: {data:record.data,step:btn.step},
                    url: Backend.REST_API + 'forms/bolla/flusso', //azione flusso generica passando lo step
                    success: function () {
                        me.getView().el.unmask()
                        me.refreshGrid=true
                        me.onClose()
                    },
                    failure: function (response) {
                        me.getView().el.unmask();
                        let resp = Ext.decode(response.responseText);
                        Ext.Msg.show({
                            title: Locale.t('global.errore'),
                            msg:resp['msg'],
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR
                        })
                    }
                })
            }
        })
        let wdwpanel = Ext.create('Ext.form.Panel', {
            border: false, items: [
                {xtype: 'container', style: {'padding': '5px'},
                    html: '<span style="font-weight:bold;color:blue">'+Locale.t('bolpas.forms.bolla.btn.associa.msg')+'</span>'
                }
            ]
        })
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX,btnConfirm], title:Locale.t('bolpas.forms.bolla.btn.associa.text'),
            height:150,scrollable:true, width: 600, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        })
        wndw.show()
    },
    //Flusso
    onAzione: function (btn) {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        let titolo,messaggio,hidereg = true, numreg = '',dataregit=''
        let oggi=new Date(), datareg = Ext.Date.format(oggi, 'd/m/Y') //data registrazione default
        record.data['gridcodici'] = []
        if (btn.step===7) { //codifica prodotto alimento campo codici (non necessario per altri casi)
            let storecodici = vm.getStore('storeCodici')
            storecodici.each(function (rec) {
                if (rec.data.codice!=='') {
                    record.data['gridcodici'].push(rec.data)
                }
            })
        }
        record.data['gridarticoli'] = []
        if (record.data.tipo===0 || record.data.tipo===3) { //ciclo articoli
            let storearticoli = vm.getStore('storeArticoli')
            storearticoli.each(function (rec) {
                record.data['gridarticoli'].push(rec.data)
            })
        }
        /* i resi sono associati da Overlog
        record.data['gridresi'] = []
        if (record.data.tipo===1) { //ciclo resi
            let storeresi = vm.getStore('storeResi')
            storeresi.each(function (rec) {
                if (rec.data.nreso!=='') {
                    record.data['gridresi'].push(rec.data)
                }
            })
        }
         */
        switch(btn.step) {
            case 0: //registrazione e recupero articoli da gestionale
                hidereg = false
                titolo = Locale.t('bolpas.forms.bolla.btn.gestionale.text')
                messaggio = Locale.t('bolpas.forms.bolla.btn.gestionale.msg')
                break
            case 4: //inoltro posizionamento
                titolo = Locale.t('bolpas.forms.bolla.btn.inoltra.text')
                messaggio = Locale.t('bolpas.forms.bolla.btn.inoltra.msg')
                break
            case 5: //resi cliente
                titolo = Locale.t('bolpas.forms.bolla.btn.reso.text')
                messaggio = Locale.t('bolpas.forms.bolla.btn.reso.msg')
                break
            case 7: //codifica prodotti
                titolo = Locale.t('bolpas.forms.bolla.btn.codifica.text')
                messaggio = Locale.t('bolpas.forms.bolla.btn.codifica.msg')
                break
            case 8: //annulla
                titolo = Locale.t('bolpas.forms.bolla.btn.annulla.text')
                messaggio = Locale.t('bolpas.forms.bolla.btn.annulla.msg')
                break
            case 88: //ripristina
                titolo = Locale.t('bolpas.forms.bolla.btn.ripristina.text')
                messaggio = Locale.t('bolpas.forms.bolla.btn.ripristina.msg')
                break
            default: //completata
                titolo = Locale.t('bolpas.forms.bolla.btn.inoltrachiudi.text')
                messaggio = Locale.t('bolpas.forms.bolla.btn.inoltrachiudi.msg')
        }
        let btnX = new Ext.Button({
            text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
                wndw.destroy();
            }
        });
        let btnConfirm = new Ext.Button({
            text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
                let ff=wdwpanel.getForm();
                numreg=ff.findField('numreg').getValue()
                datareg=ff.findField('datareg').getValue()
                if (btn.step===0) {
                    if (!numreg || numreg.trim()==='') {
                        Ext.Msg.show({title: Locale.t('global.attenzione'), msg: Locale.t('bolpas.forms.bolla.btn.gestionale.obbnumreg'), buttons: Ext.Msg.OK, icon: Ext.MessageBox.ERROR});
                        return false;
                    }
                    if (!datareg) {
                        Ext.Msg.show({title: Locale.t('global.attenzione'), msg: Locale.t('bolpas.forms.bolla.btn.gestionale.obbdatareg'), buttons: Ext.Msg.OK, icon: Ext.MessageBox.ERROR});
                        return false;
                    }
                    //imposto la data sulla timezone del pc
                    let zona = Intl.DateTimeFormat().resolvedOptions().timeZone
                    let intlDateObj = new Intl.DateTimeFormat('en-IT', {
                        timeZone: zona,dateStyle: 'full'
                    });
                    dataregit = intlDateObj.format(datareg)
                }
                wndw.destroy();
                me.getView().el.mask(Locale.t('global.actions.incorso'));
                Ext.Ajax.request({
                    method: 'POST',
                    jsonData: {data:record.data,step:btn.step,numreg:numreg,datareg:dataregit},
                    url: Backend.REST_API + 'forms/bolla/flusso', //azione flusso generica passando lo step
                    success: function () {
                        me.getView().el.unmask()
                        if (btn.step!==0) { //tutte le azioni eccetto registrazione gestionale chiudono
                            me.refreshGrid = true
                            me.onClose()
                        } else {
                            me.isReoladdata = true
                            me.onAfterSave()
                        }
                    },
                    failure: function (response) {
                        me.getView().el.unmask();
                        let resp = Ext.decode(response.responseText);
                        Ext.Msg.show({
                            title: Locale.t('global.errore'),
                            msg: resp['msg'],
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }
                })
            }
        });
        let wdwpanel = Ext.create('Ext.form.Panel', {
            border: false, items: [
                {xtype:'textfield',labelWidth:150,fieldLabel: Locale.t('bolpas.forms.bolla.fields.numreg'), width:500,name:'numreg'
                    ,value:'',hidden:hidereg},
                {xtype:'datefield',labelWidth:150,fieldLabel: Locale.t('bolpas.forms.bolla.fields.datareg'), width:300,name:'datareg'
                    ,value:datareg, format: 'd/m/Y', submitFormat:'Y-m-d', hidden:hidereg},
                {
                    xtype: 'container',
                    style: {'padding': '5px'},
                    html: '<span style="font-weight:bold;color:red;font-size:12px;" >' + messaggio + '</span>'
                }
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title: titolo,
            width: 650, autoHeight: true, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();
    },
    onPosiziona: function (btn) {//salvataggio richiamato da tutte le funzioni
        let me=this, record=this.getViewModel().get('record')
        let chiudi=1
        let noteok=1, notetxt=''
        let storeart= this.getViewModel().getStore('storeArticoli')
        storeart.clearFilter() //pulisco eventuali filtri
        let barra=this.gridprodotti.getDockedItems('toolbar[dock="top"]')
        if (barra[0]) {
            barra[0].items.each(function(item) {
                if (item.xtype==='textfield') {
                    item.setValue('');
                    item.hasSearch = false;
                    item.getTrigger('clear').hide();
                }
            });
        }
        record.data['gridprodotti'] = []; //inizializzo
        storeart.each(function (rec) {
            if (rec.data.note.length>100) { //verifico che le note non superino 100 caratteri
                notetxt=notetxt+rec.data.cdpar+notetxt+' '+rec.data.depar+'<br>'
                noteok=0
            }
            if (rec.data.stato===true) {rec.data.stato=1;} //cambio valori da boolean a tynint
            if (rec.data.stato===false) {rec.data.stato=0;}
            if (rec.data.statoq===true) {rec.data.statoq=1;}
            if (rec.data.statoq===false) {rec.data.statoq=0;}
            if ((rec.data.stato===false || rec.data.stato===0) && (rec.data.statoq===false || rec.data.statoq===0)) {
                chiudi=0 //ancora ho prodotti da posizionare
            }
            record.data['gridprodotti'].push(rec.data);
        });
        if (noteok===0) {
            Ext.Msg.show({title: Locale.t('global.errore'), msg: Locale.t('bolpas.forms.bolla.btn.posiziona.notelen')+notetxt, buttons: Ext.Msg.OK, icon: Ext.MessageBox.ERROR});
            return false;
        }
        if (chiudi===1) {
            Ext.Msg.show({ //chiedo conferma x eseguire la cancellazione
                title: Locale.t('bolpas.forms.bolla.btn.posiziona.chiudi'), iconCls: 'x-fas fa-trash', msg: Locale.t('bolpas.forms.bolla.btn.posiziona.chiuditext'),
                buttons: Ext.Msg.YESNO, icon: Ext.MessageBox.QUESTION, fn: function (b) {
                    if (b === 'yes') {
                        record.data.stato=9;
                        me.view.el.mask(Locale.t('global.actions.incorso'));
                        Ext.Ajax.request({
                            method: 'POST',
                            jsonData: {data:record.data,step:btn.step,chiudi:1},
                            url: Backend.REST_API + 'forms/bolla/flusso', //azione flusso generica passando lo step
                            success: function () {
                                me.getView().el.unmask();
                                me.refreshGrid=true
                                me.onClose()
                            },
                            failure: function (response) {
                                me.getView().el.unmask();
                                let resp = Ext.decode(response.responseText)
                                Ext.Msg.show({title: Locale.t('global.errore'), msg: resp['msg'], buttons: Ext.Msg.OK, icon: Ext.MessageBox.ERROR});
                            }
                        })
                    }
                }
            });
        } else {
            me.view.el.mask(Locale.t('global.actions.incorso'));
            Ext.Ajax.request({
                method: 'POST',
                jsonData: {data:record.data,step:btn.step,chiudi:0},
                url: Backend.REST_API + 'forms/bolla/flusso', //azione flusso generica passando lo step
                success: function () {
                    me.getView().el.unmask();
                    bdFunctions.bdTips.msg(Locale.t('bolpas.forms.bolla.btn.posiziona.savetitle'), Locale.t('bolpas.forms.bolla.btn.posiziona.savetips'), 'fa fa-home fa-size-64');
                },
                failure: function (response) {
                    me.getView().el.unmask();
                    let resp = Ext.decode(response.responseText)
                    Ext.Msg.show({title: Locale.t('global.errore'), msg: resp['msg'], buttons: Ext.Msg.OK, icon: Ext.MessageBox.ERROR});
                }
            })
        }
    },
    onSchede: function (btn) {//salvataggio schede collaudo associate
        let me = this;
        let record=this.getViewModel().get('record');
        //pulisco eventuali filtri
        let storeart= this.getViewModel().getStore('storeArticoli')
        storeart.clearFilter();
        let barra=this.gridprodotti.getDockedItems('toolbar[dock="top"]')
        if (barra[0]) {
            barra[0].items.each(function(item) {
                if (item.xtype==='textfield') {
                    item.setValue('');
                    item.hasSearch = false;
                    item.getTrigger('clear').hide();
                }
            });
        }
        //grid articoli
        me.view.el.mask(Locale.t('global.actions.incorso'));
        Ext.Ajax.request({
            method: 'POST',
            jsonData: {data:record.data,step:btn.step},
            url: Backend.REST_API + 'forms/bolla/flusso', //azione flusso generica passando lo step
            success: function () {
                me.getView().el.unmask();
                bdFunctions.bdTips.msg(Locale.t('bolpas.forms.bolla.btn.posiziona.savetitle'), Locale.t('bolpas.forms.bolla.btn.posiziona.savetips'), 'fa fa-home fa-size-64');
            },
            failure: function (response) {
                me.getView().el.unmask();
                let resp = Ext.decode(response.responseText)
                Ext.Msg.show({title: Locale.t('global.errore'), msg: resp['msg'], buttons: Ext.Msg.OK, icon: Ext.MessageBox.ERROR});
            }
        })
    },
    onSbloccaScheda:function (view, rowIndex, colIndex, item, opt, record){
        if (record.data.idscheda!=='') {return false;}
        if (record.data.tipo===0) {return false;}
        let readsblocco=true; //default editabile
        let conforme=true, nonconforme=false;
        if (record.data.conforme===0) {
            conforme=false; nonconforme=true;
        }
        let titolo=Locale.t('bolpas.forms.bolla.gridarticoli.sblocca');
        if (record.data.bloccata===0) {
            titolo=Locale.t('bolpas.forms.bolla.gridarticoli.sbloccainfo');
        } else {
            if (this.checkRuoli(['99','5'])){
                readsblocco=false;
            }
        }
        let logsblocco=record.data.cdpfo+' '+record.data.depar;
        let me = this;
        let btnX = new Ext.Button({text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban', handler: function () {wndw.destroy();}});
        let btnConfirm = Ext.create('Ext.Button',{
            text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check',hidden:readsblocco, handler: function () {
                let ff=wdwpanel.getForm();
                let esito=ff.findField('esito').getValue();
                let noteaz=ff.findField('noteaz').getValue();
                if (noteaz.length>500) {
                    Ext.Msg.show({title: Locale.t('global.attenzione'), msg: Locale.t('bolpas.forms.bolla.gridarticoli.notelen')+noteaz.length, buttons: Ext.Msg.OK, icon: Ext.MessageBox.ERROR});
                    return;
                }
                me.view.el.mask(Locale.t('bolle.bolla.esecuzione'));
                wndw.destroy();
                Ext.Ajax.request({
                    method: 'POST',
                    jsonData: {data:record.data,esito:esito,notesblocco:noteaz,logsblocco:logsblocco},
                    url: Backend.REST_API + 'forms/bolla/sblocca',
                    success: function(){
                        me.getView().el.unmask()
                        bdFunctions.bdTips.msg(Locale.t('bolpas.forms.bolla.btn.posiziona.savetitle'), Locale.t('bolpas.forms.bolla.btn.posiziona.savetips'), 'fa fa-home fa-size-64')
                        record.data.bloccata=0
                        record.data.conforme=esito
                        view.refreshNode(record);
                    },
                    failure: function(){
                        me.getView().el.unmask()
                        Ext.Msg.show({title: Locale.t('global.errore'), msg: resp['msg'], buttons: Ext.Msg.OK, icon: Ext.MessageBox.ERROR});
                    }
                });
            }
        });
        let wdwpanel = Ext.create('Ext.form.Panel', {defaults: {margin: 5},
            border: false, items: [
                {xtype: 'radiogroup',hideLabel:true,name:'esito',
                    columns: 2,flex:1,simpleValue: true,
                    items: [
                        {boxLabel:Locale.t('bolpas.forms.bolla.gridarticoli.conforme'),inputValue:1,checked:conforme,disabled:readsblocco},
                        {boxLabel:Locale.t('bolpas.forms.bolla.gridarticoli.nonconforme'),inputValue:0,checked:nonconforme,disabled:readsblocco}
                    ]
                },
                {xtype: 'htmleditor', hideLabel: true, scrollable: true, style: 'font-size:14px;', name:'noteaz',readOnly:readsblocco,value:record.data.notesblocco}
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX,btnConfirm], title:titolo,
            width: 550,scrollable:true,closable: true, bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();
    },
    //filtri righe prodotti
    onSearchTriggetSearch: function (item) {
        let store = this.getViewModel().getStore('storeArticoli')
        store.clearFilter();
        let valore =item.getValue().toLowerCase(); //ricerca in minuscolo
        let filtri = new Ext.util.Filter({
            filterFn: function(item1) {
                let descrizione =item1.get('depar').toLowerCase()
                let cdpar=item1.get('cdpar').toLowerCase();
                let cdpfo=item1.get('cdpfo').toLowerCase();
                return cdpar.match(valore) || cdpfo.match(valore) || descrizione.match(valore);
            }
        });
        store.filter(filtri)
        item.getTrigger('clear').show()
        item.hasSearch = true
    },
    onSpecialkeySearch:function(item,e){
        if(e.getKey() === e.ENTER) {this.onSearchTriggetSearch(item);}
    },
    onClearTriggetSearch: function (item) {
        let store = this.getViewModel().getStore('storeArticoli')
        store.clearFilter()
        if (item.hasSearch) {
            item.setValue('');item.hasSearch = false;item.getTrigger('clear').hide()
        }
    }
})