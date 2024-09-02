Ext.define('rec.view.forms.documento.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins: [
        'portal.v1.global.Util',
    ],
    alias: 'controller.v1-documento',

    requires: [
        'Ext.container.Container',
        'Ext.form.Panel',
        'Ext.form.field.Display',
        'Ext.form.field.HtmlEditor',
        'Ext.form.field.Text',
        'Ext.layout.container.Fit',
        'Ext.window.Window',
        'rec.model.forms.documento.Model',
        'rec.view.forms.documento.cards.Anteprima',
        'rec.view.forms.documento.cards.GridMail',
        'rec.view.forms.documento.cards.Info'
    ],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('rec.model.forms.documento.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },
    managerView: function () {
        this.callParent(arguments)
        let me = this,
            vm = me.getViewModel()
        try {
            let record = vm.get('record'),
                readOnly = true
            //gestione tasti default
            vm.set('btn.close', true)
            vm.set('btn.cronology', true)
            if (this.checkRuoli(['99', '2'])) {
                if (this.toolBar) {
                    /*
                    this.toolBar.add({
                        tooltip: Locale.t('rec.forms.documento.btn.sendmail.tooltip'),
                        text: Locale.t('rec.forms.documento.btn.sendmail.text'),
                        ui: 'blue',
                        iconCls: 'x-fas fa-envelope',
                        handler: 'onSendMail'
                    })
                    if (record.data.x === 1) {
                        this.toolBar.add({
                            tooltip: Locale.t('rec.forms.documento.btn.ripristina.tooltip'),
                            text: Locale.t('rec.forms.documento.btn.ripristina.text'),
                            ui: 'green',
                            azione: 'R',
                            iconCls: 'x-fas fa-check-square',
                            handler: 'onAzione'
                        })
                    } else {
                        this.toolBar.add({
                            tooltip: Locale.t('rec.forms.documento.btn.annulla.tooltip'),
                            text: Locale.t('rec.forms.documento.btn.annulla.text'),
                            ui: 'red',
                            azione: 'A',
                            iconCls: 'x-fas fa-minus-circle',
                            handler: 'onAzione'
                        })
                    }

                     */
                }
            }
            vm.set('readOnly', readOnly)
            //titolo tab
            vm.set('title', record.data['anno'] + '/' + record.data['numero'] || 'n.d.')
            vm.set('label', Locale.t('rec.forms.documento.title'))
            vm.set('toolbar.hideCard', false)

            if (!this.listForms) {
                this.listForms = [
                    {
                        posizione: 'info',
                        backgroundColor: 'LightBlue',
                        card: Ext.create('rec.view.forms.documento.cards.Info'),
                        text: Locale.t('rec.forms.documento.info')
                    },
                    {
                        posizione: 'anteprima',
                        backgroundColor: '',
                        card: Ext.create('rec.view.forms.documento.cards.Anteprima'),
                        text: Locale.t('rec.forms.documento.anteprima')
                    },
                    {
                        posizione: 'gridmail',
                        backgroundColor: '',
                        card: Ext.create('rec.view.forms.documento.cards.GridMail'),
                        text: Locale.t('rec.forms.documento.mail')
                    }
                ]
            }
            //Aggiungo cards
            for (card of this.listForms) {
                let icona //icona pdf x l'anteprima
                if (card.posizione === 'anteprima') {
                    icona = 'x-fas fa-file-pdf'
                }
                this.toolBarCard.add({
                    text: card.text,
                    iconCls: icona,
                    enableToggle: true,
                    style: {backgroundColor: card.backgroundColor},
                    posizione: card.posizione,
                    handler: 'onClickCard'
                })
                this.form.add(card.card);
            }
            this.getView().setActiveItem(this.form);
            //carico anteprima pdf
            let percorso = record.data['percorso'] + record.data['id'] + record.data['estensione']
            Ext.Ajax.request({
                url: Backend.REST_API + 'forms/documento/getpdf/', method: 'POST', binary: true,
                params: {
                    'id': record.data['id'],
                    'percorso': percorso, //path file fisico completo
                    'nomefile': record.data['nomefile'] //nome da presentare
                },
                success: function (response) {
                    let headers = response.getAllResponseHeaders()
                    let blob = new Blob([response.responseBytes], {type: headers['content-type']})
                    let binarypdf = window.URL.createObjectURL(blob)
                    let cardtmp = me.listForms.filter(obj => { return obj.posizione ==='anteprima'})
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
                    let errore = Locale.t('rec.forms.documento.errore') + ': ' + response.statusText
                    me.listForms[1].card.add(Ext.create(
                        {xtype: 'box', html: errore})
                    )
                }
            })
            //aggiungo pdf al tab
            this.onClickCard({
                posizione: vm.get('cardactive')
            })
        } catch (e) {
            //nascondo tutti i tasti
            vm.set('btn.delete', false);
            vm.set('btn.cronology', false);
            vm.set('btn.close', false);
            vm.set('btn.save', false);
            vm.set('panelinfo.consoleInfo', '<h3>' + Locale.t('global.form.openerror') + '</h3>');
            this.getView().setActiveItem(this.panelInfo);
            this.onAfterLoadFailure()
        }
    },
    //setto id record prima del caricamento grid mail
    onBeforeLoad: function (store) {
        if (store.isLoading()) return false;
        let me = this,
            vm = me.getViewModel();
        let record = vm.get('record');
        store.getProxy().extraParams.idrecord = record.data.id
    },
    onOpenmail: function (view, rowIndex, colIndex, item, opt, record) {
        let me = this, autore
        let recpdf = this.getViewModel().get('record')
        let datamail = Ext.Date.format(record.data.creationdate, 'd/m/Y H:i:s');
        if (record.data.dataletto && record.data.dataletto !== '') {
            let dataletto = Ext.Date.format(record.data.dataletto, 'd/m/Y H:i:s');
            autore = Locale.t('rec.forms.documento.winmail.autore') + record.data.autore + Locale.t('rec.forms.documento.winmail.datamail') + datamail + Locale.t('rec.forms.documento.winmail.letto') + dataletto;
        } else {
            autore = Locale.t('rec.forms.documento.winmail.autore') + record.data.autore + Locale.t('rec.forms.documento.winmail.datamail') + datamail
        }
        //finestra log mail
        let btnX = new Ext.Button({
            text: Locale.t('global.btn.close.text'), iconCls: 'x-fas fa-ban', handler: function () {
                wndw.destroy()
            }
        });
        //allegati eventuali
        let allegati = '', allegato
        record.data.allegati.forEach(function (rec) {
            allegato = rec.id
            allegati = allegati + '<a style="color:blue;cursor:pointer;" class="' + allegato + '" >' + rec.nomefile + '</a><br>'
        })
        let wdwpanel = Ext.create('Ext.panel.Panel', {
            border: false, items: [
                {
                    xtype: 'textfield', readOnly: true, width: 700,
                    fieldLabel: Locale.t('rec.forms.documento.winmail.mittente'),
                    value: record.data.mailfrom
                },
                {
                    xtype: 'textfield', readOnly: true, width: 700, hidden: true,
                    fieldLabel: Locale.t('rec.forms.documento.winmail.replymail'),
                    value: record.data.replymail
                },
                {
                    xtype: 'textfield', readOnly: true, width: 700,
                    fieldLabel: Locale.t('rec.forms.documento.winmail.mailto'),
                    value: record.data.mailto
                },
                {
                    xtype: 'textfield', readOnly: true, width: 700,
                    fieldLabel: Locale.t('rec.forms.documento.winmail.subject'),
                    value: record.data.subject
                },
                {
                    xtype: 'htmleditor', hideLabel: true, scrollable: true, style: 'font-size:14px;',
                    readOnly: true, value: record.data.body
                },
                {
                    xtype: 'box', autoEl: {
                        tag: 'Div', //width: '100%',
                        html: Locale.t('global.principale')
                    }
                },
                {
                    xtype: 'component', scrollable: true,
                    html: '<a style="color:blue;cursor:pointer;">' + recpdf.data.anno + '_' + recpdf.data.numero + '.pdf</a>',
                    listeners: {
                        render: function (comp) {
                            Ext.each(comp.el.query('a'), function (a) {
                                comp.mon(Ext.get(a), 'mousedown', 'onPdfClicked', comp);
                            });
                        }
                    },
                    onPdfClicked: function () {
                        me.onGetFile(recpdf.data.id, recpdf.data.id, 'TBSPEREC01') //richiamo funzione x download
                    }
                },
                {
                    xtype: 'box', autoEl: {
                        tag: 'Div', width: '100%',
                        html: Locale.t('global.allegati')
                    }
                },
                {
                    xtype: 'component', scrollable: true,
                    html: allegati,
                    listeners: {
                        render: function (comp) {
                            Ext.each(comp.el.query('a'), function (a) {
                                comp.mon(Ext.get(a), 'mousedown', 'onAClicked', comp);
                            });
                        }
                    },
                    onAClicked: function (event, target) {
                        me.onGetFile(target.className, recpdf.data.id, 'TBRECMAIL02') //richiamo funzione x download
                    }
                }
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX], title: autore, height: 600, scrollable: true,
            width: 800, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();
    },
    onGetFile: function (id, idrecord, tabella) {
        let me = this
        Ext.Ajax.request({
            url: Backend.REST_API + 'forms/documento/getfile/', method: 'POST',
            params: {'id': id, 'idrecord': id, 'tabella': tabella},//id=id file da scaricare, idrecord=record principale x log, tabella=tabella da recuperare
            success: function (response) {
                let resp = Ext.decode(response.responseText);
                me.onDownloadFile(resp['token'])
            },
            failure: function (response) {
                let resp = Ext.decode(response.responseText);
                let errore = Locale.t('rec.forms.documento.errore') + ': ' + resp['msg']
                Ext.Msg.show({
                    title: Locale.t('global.errore'),
                    msg: errore,
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        })
    },
    onSendMail: function () {
        let me = this,vm = me.getViewModel()
        let record = this.getViewModel().get('record')
        //compongo destinatari
        let destinatari=''
        let mailto=Ext.decode(record.data.mailto)
        mailto.forEach(function(dest){
            if (destinatari!=='') {destinatari=destinatari+','}
            destinatari=destinatari+dest
        })
        //finestra log mail
        let btnX = new Ext.Button({
            text: Locale.t('global.btn.close.text'), iconCls: 'x-fas fa-ban', handler: function () {
                wndw.destroy();
            }
        });
        let btnConfirm = Ext.create('Ext.Button',{
            text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
                let ff=wdwpanel.getForm();
                let mittente= ff.findField('mittente').getValue(); //id evento
                let destinatario=ff.findField('destinatario').getValue().trim(); //id evento
                let subject=ff.findField('subject').getValue();
                if (mittente==='') {
                    Ext.Msg.show({
                        title: Locale.t('global.attenzione'),
                        msg: Locale.t('global.sendmail.mittenteobb'),
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                    return;
                }
                if (destinatario==='') {
                    Ext.Msg.show({
                        title: Locale.t('global.attenzione'),
                        msg: Locale.t('global.sendmail.destinatarioobb'),
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                    return;
                }
                if (!me.OnCheckAddress(destinatario)) {
                    Ext.Msg.show({
                        title: Locale.t('global.attenzione'),
                        msg: Locale.t('global.sendmail.wrongemail'),
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                    return;
                }
                wndw.destroy();
                me.getView().el.mask(Locale.t('global.actions.incorso'));
                Ext.Ajax.request({
                    method: 'POST',timeout : 900000,
                    jsonData: {data:record.data, mittente:mittente,destinatario:destinatario.trim(),subject:subject,tabella:'TBRECMAIL01'},
                    url: Backend.REST_API + 'forms/documento/sendmail',
                    success: function () {
                        me.getView().el.unmask();
                        Ext.Msg.show({
                            title: Locale.t('global.avviso'),
                            msg: Locale.t('global.sendmail.ok'),
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.INFO
                        })
                        vm.getStore('storemail').load() //ricarico store mail
                    },
                    failure: function (response) {
                        me.getView().el.unmask();
                        let resp = Ext.decode(response.responseText);
                        let errore=Locale.t('global.sendmail.ko')+resp['msg']
                        Ext.Msg.show({
                            title: Locale.t('global.errore'),
                            msg:errore,
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR
                        })
                    }
                })
            }
        })
        let wdwpanel = Ext.create('Ext.form.Panel', {
            border: false, items: [
                {xtype: 'displayfield',flex:1, value:Locale.t('rec.forms.documento.sendmail.destinatariotip')},
                {xtype: 'textfield',width:700,name:'mittente',
                    fieldLabel: Locale.t('global.sendmail.mittente'), value:Ext.global.Vars.infoUser.email},
                {xtype: 'textfield',width:700,name:'destinatario',
                    fieldLabel: Locale.t('global.sendmail.destinatario'), value:destinatari},
                {xtype: 'textfield',width:700,name:'subject',
                    fieldLabel: Locale.t('global.sendmail.subject'), value:record.data.subject},
                {xtype: 'container', hideLabel: true, scrollable: true, style: 'font-size:14px;',
                    readOnly:true, html:record.data.bodyemail
                }
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX,btnConfirm], title:Locale.t('global.sendmail.title'),height:550,scrollable:true,
            width: 800, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();
    },
    OnCheckAddress:function(email) {
        //ciclo le email x validarle in base a come sono state inserite
        let esito=true
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let elenco=email.split(',')
        elenco.forEach(function(emailck){
            if (!re.test(String(emailck).trim().toLowerCase())) {
                esito=false
            }
        })
        return esito
    },
    onAzione: function (btn) {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        //default annulla
        let titolo = Locale.t('rec.forms.documento.btn.annulla.text')
        let messaggio = Locale.t('rec.forms.documento.btn.annulla.messaggio')
        if (btn.azione === 'R') {
            //ripristina
            titolo = Locale.t('rec.forms.documento.btn.ripristina.text')
            messaggio = Locale.t('rec.forms.documento.btn.ripristina.messaggio')
        }
        let recordsGood = []; //array
        recordsGood.push(record.data.id); //inserisco record
        let btnX = new Ext.Button({
            text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
                wndw.destroy();
            }
        });
        let btnConfirm = new Ext.Button({
            text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
                wndw.destroy();
                me.getView().el.mask(Locale.t('global.actions.incorso'));
                Ext.Ajax.request({
                    method: 'PUT',
                    jsonData: {data: recordsGood, azione: btn.azione,tabella:'TBSPEREC01'},
                    url: Backend.REST_API + 'main/changestato',
                    success: function () {
                        me.getView().el.unmask();
                        me.refreshGrid = true;
                        me.onClose();
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
    }
})