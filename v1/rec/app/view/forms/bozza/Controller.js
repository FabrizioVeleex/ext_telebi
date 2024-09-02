/**
 * Created by luca on 16/07/2018.
 */
Ext.define('rec.view.forms.bozza.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.v1-bozza',
    requires: [
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'Ext.form.Panel',
        'Ext.window.Window',
        'rec.model.forms.bozza.Model',
        'rec.model.forms.reso.GridArticoli',
        'rec.view.forms.bozza.cards.Bozza',
        'rec.view.forms.bozza.cards.GridArticoli'
    ],
    init: function () {
        let vm = this.getViewModel()
        this.btnInoltra = {xtype: 'button', ui: 'blue', text: Locale.t('rec.forms.reso.btn.inoltra.text'), msg: Locale.t("rec.forms.reso.btn.inoltra.msg"),
            tooltip: Locale.t('rec.forms.reso.btn.inoltra.tooltip'),iconCls: 'fas fa-arrow-circle-right',step:20, handler: 'onInoltra'}
        this.btnResoCliente = {xtype: "button", ui: "blue", text: Locale.t("rec.forms.reso.btn.resocliente.text"), msg: Locale.t("rec.forms.reso.btn.resocliente.msg"),
            tooltip: Locale.t("rec.forms.reso.btn.resocliente.tooltip"), iconCls: "fas fa-arrow-circle-right", step: 21, handler: "onInoltra"
        };
        this.btnImporta = {xtype: "button", ui: "green", text: Locale.t("rec.forms.reso.btn.importa.text"), msg: Locale.t("rec.forms.reso.btn.importa.msg"),
            tooltip: Locale.t("rec.forms.reso.btn.importa.tooltip"), iconCls: "x-fas fa-file-excel", handler: "onImporta"
        };
        vm.set('isnew', this.getView().valori.isnew)
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('rec.model.forms.bozza.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },

    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(), record = vm.get('record'), readOnly = true,gestore = false
        let  gridarticoli = vm.getStore('gridArticoli')

        if (this.checkRuoli(['99','3'])){
            readOnly = false
            gestore = true
            vm.set('btn.cronology', true)
            vm.set('btn.save', true)
            if (record.data.isnew===0) {
                vm.set('btn.delete', true)
            }
            this.toolBar.add(this.btnInoltra)
            this.toolBar.add(this.btnResoCliente);
        }
        vm.set('gestore', gestore)
        //gestione tasti default
        vm.set('btn.close', true)
        vm.set('readOnly', readOnly)
        //titolo tab
        let datadoc = Ext.Date.format(record.data['creationdate'], 'd/m/Y')
        vm.set('title','Bozza' || 'n.d.')
        vm.set('label',Locale.t('rec.forms.bozza.title'))
        gridarticoli.loadData(record.data['gridarticoli']) //carico grid articoli
        if (gestore===true) {
            gridarticoli.add(Ext.create('rec.model.forms.reso.GridArticoli', {
                id: this.randomString(32),idtestata:'',idrecord:'',codcaus:'',pcdos:'',qta:1, action: 1, isnew: 1
            }))
        }
        this.cardBozza = Ext.create('rec.view.forms.bozza.cards.Bozza');
        this.cardArticoli = Ext.create('rec.view.forms.bozza.cards.GridArticoli')
        this.articoli=Ext.create('Ext.form.FieldSet',{
            title:'<span style="color: black;font-weight: bold">'+Locale.t('rec.forms.reso.gridarticoli.titolo')+'</span>',
            collapsible: true, collapsed: false, style: {'background-color': "transparent;"},
            items:[
                this.cardArticoli
            ]
        })
        this.cardBozza.add(this.articoli)
        this.form.add(this.cardBozza)
        this.getView().setActiveItem(this.form)
    },
    onSave: function () {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        if (!this.obb()) {
            return false
        }
        if (record.data.traspselect==='' && record.data.traspcli==='') {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('rec.forms.bozza.fields.trasporto'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            })
            return false
        }
        //recupero store articoli
        let griderr='', j = 1
        let storeprodotti = vm.getStore('gridArticoli')
        record.data['gridarticoli'] = []
        storeprodotti.each(function (rec) {
            if (rec.data.cdars!=='') {
                record.data['gridarticoli'].push(rec.data)
                if (rec.data.idrecord==='' || rec.data.codcaus==='') {
                    griderr=griderr+'<br>'+j
                }
            }
            j+=1
        })
        if (griderr!=='') {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('rec.forms.bozza.gridarticoli.obbdati')+griderr,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return false
        }
        this.callParent(arguments)
    },
    obb: function () {
        let modulo = this.cardBozza.getForm()
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
    //inoltro tecnici
    onInoltra:function(btn) {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        if (!this.obb()) {
            return false
        }
        if (record.data.traspselect==='' && record.data.traspcli==='') {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('rec.forms.bozza.fields.trasporto'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            })
            return false
        }
        //recupero store articoli
        let griderr='', j = 1
        let storeprodotti = vm.getStore('gridArticoli')
        record.data['gridarticoli'] = []
        storeprodotti.each(function (rec) {
            if (rec.data.cdars!=='') {
                record.data['gridarticoli'].push(rec.data)
                if (rec.data.idrecord==='' || rec.data.codcaus==='') {
                    griderr=griderr+'<br>'+j
                }
            }
            j+=1
        })
        if (record.data.gridarticoli.length<1) {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('rec.forms.bozza.gridarticoli.obbriga')+griderr,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return false
        }
        if (griderr!=='') {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('rec.forms.bozza.gridarticoli.obbdati')+griderr,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return false
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
                me.closeForm = true
                me.onSave()
                Ext.Ajax.request({
                    method: 'POST',timeout:900000,
                    jsonData: {data:record.data,step:btn.step},
                    url: Backend.REST_API + 'forms/reso/flusso', //azione flusso generica passando lo step
                    success: function () {
                      //la chiusura form è già eseguita dal save
                    },
                    failure: function (response) {
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
                    html: '<span style="font-weight:bold;color:blue">'+btn.msg+'</span>'
                }
            ]
        })
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX,btnConfirm], title:btn.text,
            height:150,scrollable:true, width: 600, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        })
        wndw.show()
    },
    //importazione articoli excel
    onImporta:function() {

    }
})