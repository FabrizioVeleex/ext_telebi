/**
 * Created by luke on 05/03/21.
 */
Ext.define('mcd.view.forms.modulo.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.v1-modulo',

    requires: [
        'Ext.container.Container',
        'Ext.layout.container.Absolute',
        'Ext.layout.container.Fit',
        'Ext.window.Window',
        'mcd.model.forms.modulo.Model',
        'mcd.view.forms.modulo.cards.GridMateriali',
        'mcd.view.forms.modulo.cards.Modulo'
    ],

    init: function () {
        let vm = this.getViewModel();
        //tasti personalizzati
        this.btnAnnulla = {xtype: 'button', ui: 'blue', iconCls: 'x-fas fa-ban', text: Locale.t('mcd.forms.modulo.btn.annulla'), handler: 'onClose'};
        this.btnFirma = {xtype: 'button', ui: 'blue', text: Locale.t('mcd.forms.modulo.btn.firma'), tooltip: Locale.t('mcd.forms.modulo.btn.firmatooltip'), iconCls: 'icon-pdf', handler: 'onFirma'};
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('mcd.model.forms.modulo.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },

    managerView: function () {
        this.callParent(arguments)
        let me = this,
            vm = me.getViewModel(),
            isnew =  vm.get('isnew'),
            record = vm.get('record'),
            readOnly = false, //record solo in inserimento, mai in modifica (modulo chiuso è un pdf)
            gridmateriali = vm.getStore('gridMateriali'), combosede = vm.getStore('comboSede');
        if (isnew===1){
            this.toolBar.add(this.btnAnnulla);
            this.toolBar.add(this.btnFirma);
        } else {
            vm.set('btn.close', true);
        }
        //gestione tasti default
        vm.set('readOnly', readOnly);
        //titolo tab
        vm.set('title',record.data['dip_nome'] || 'n.d.')
        vm.set('label',Locale.t('mcd.forms.modulo.title'))
        if (isnew===1) {
            //carico store sede
            combosede.loadData(record.data['sedi'])
            //carico materiale
            gridmateriali.loadData(record.data['gridmateriali'])
            this.cardModulo = Ext.create('mcd.view.forms.modulo.cards.Modulo');
            this.cardMateriali = Ext.create('mcd.view.forms.modulo.cards.GridMateriali')
            this.cardModulo.add( this.cardMateriali)
            this.form.add(this.cardModulo);
        } else {
            //carico pdf
            let percorso=record.data['percorso']+record.data['id']+record.data['estensione']
            Ext.Ajax.request({
                url: Backend.REST_API + 'forms/modulo/getpdf/', method: 'POST', binary:true,
                params: {
                    'id': record.data['id'],
                    'percorso': percorso, //path file fisico completo
                    'nomefile': record.data['nomefile'] //nome da presentare
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
                    let errore = Locale.t('mcd.forms.modulo.pdf.errore')+': '+response.statusText
                    let errorpdf=Ext.create(
                        {xtype: 'box',html:errore}
                    )
                    me.form.add(errorpdf);
                }
            })
        }
        this.getView().setActiveItem(this.form);
    },
    obb: function () {
        let modulo = this.cardModulo.getForm()
        if (!modulo.isValid()) {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('global.form.validation.modulo'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return false;
        }
        //verifico lunghezza campo note
        let msgnote=''
        let storem= this.getViewModel().getStore('gridMateriali');
        storem.each(function (rec) {
            if (rec.data.note.length>60) {
                msgnote=msgnote+'<br>'+rec.data.descrizione
            }
        })
        if (msgnote!=='') {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('mcd.forms.modulo.gridmateriali.notelength')+msgnote,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return false;
        }
        return true;
    },
    onFirma: function () {
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
                me.onArchivia(signatureData);
                me.winfirma.destroy();
            }
        });
        this.winfirma = Ext.create('Ext.Window', {
            title:Locale.t('mcd.forms.modulo.winfirma.title'),
            tbar: [btnX,btnConfirm],
            //ui:'blue',
            bodyPadding: 15, modal:true, width: 800, height: 530,
            layout:'fit',
            items: [
                {xtype: 'container', reference: 'firmapad', cls:'bd-bgfirma',
                    layout: {
                        type: 'absolute'
                    },
                    items:[
                        {x:80, y:55, xtype:'component',
                            cls:'bd-spl-textfirma',
                            html:'<h2>'+Locale.t('mcd.forms.modulo.winfirma.digitare')+'</h2>'
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
    onArchivia: function (signatureData) {
        let me = this,
            vm = me.getViewModel(),
            record = vm.get('record')
        let valori = me.view.valori;
        this.gridReload = true; //imposto variabile x ricaricamento
        record.data.id = valori.id;
        record.data.isnew = valori.isnew;
        //recupero store materiali
        let storeMateriali = this.getViewModel().getStore('gridMateriali');
        let dataMat = [];
        storeMateriali.each(function (rec) {
            dataMat.push(rec.data);
        });
        me.view.el.mask(Locale.t('global.actions.incorso'));
        Ext.Ajax.request({
            url: Backend.REST_API + 'forms/modulo/archivia/',
            params: {
                'id': record.data.id,
                'consegna': record.data.consegna,
                'dip_id': record.data.dip_id,
                'dip_nome': record.data.dip_nome,
                'idsede': record.data.idsede,
                'idstabilimento': record.data.idstabilimento,
                'sede': record.data.sede,
                'dataMat':Ext.encode(dataMat),
                'signatureData':signatureData
            },
            success: function(response){
                me.view.el.unmask();
                let resp = Ext.decode(response.responseText);
                if (typeof resp.msg!=='undefined') {
                    Ext.Msg.show({
                        title: Locale.t('global.errore'),
                        msg: resp['msg'],
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
                me.refreshGrid = true;
                vm.set('isnew',0); //record non nuovo
                me.loadData(); //ricarico
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
    }
});