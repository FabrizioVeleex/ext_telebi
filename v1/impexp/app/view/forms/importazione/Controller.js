/**
 * Created by luca on 16/07/2018.
 */
Ext.define('impexp.view.forms.importazione.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.v1-importazione',
    requires: [
        'Ext.container.Container',
        'Ext.form.Panel',
        'Ext.window.Window',
        'impexp.model.forms.importazione.Model',
        'impexp.view.forms.importazione.cards.CardAllegati',
        'impexp.view.forms.importazione.cards.GridAllegati',
        'impexp.view.forms.importazione.cards.Importazione',
        'portal.v1.view.main.global.upload.Attach',
        'portal.v1.view.main.global.upload.GridAttachModel'
    ],
    init: function () {
        let vm = this.getViewModel();
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('impexp.model.forms.importazione.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew,
            idmodulo:this.getView().valori.idmodulo
        }))
        this.btnImport = {
            ui: "green", text: Locale.t("impexp.forms.importazione.btn.text") + "...", tooltip: Locale.t("impexp.forms.importazione.btn.tooltip"),
            iconCls: "x-fas fa-check-square", handler: "onImport"
        };
        this.callParent(arguments)
    },
    //caricamento personalizzato per passare idmodulo
    loadData: function () {
        let me = this,
            vm = this.getViewModel(),
            record = vm.get('record');

        let consoleInfo = '<h3>' + Locale.t('global.form.caricamento') + '</h3>';
        vm.set('panelinfo.consoleInfo', consoleInfo);
        record.getProxy().setExtraParams({...record.getProxy().extraParams,isnew: vm.get('isnew'),idmodulo: me.getView().valori.idmodulo});

        record.load({
            success: function (record) {
                vm.set('panelinfo.consoleInfo', Locale.t('global.form.caricamento'));
                me.getView().setActiveItem(me.form);
                me.managerView();
            },
            failure(record, esito) {

                let consoleInfo;
                try {
                    let rest = esito.error.response.responseJson;
                    consoleInfo = '<h3><span style="color:red">' + rest['msg'] + '</span></h3>';
                } catch (e) {
                    consoleInfo = '<h3><span style="color:red">' + Locale.t('global.error.server') + '</span></h3>';
                }
                vm.set('panelinfo.consoleInfo', consoleInfo);
                me.onAfterLoadFailure();
            }
        });
    },
    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        vm.set('btn.close', true)
        this.toolBar.add(this.btnImport)
        vm.set('readOnly', false)
        //titolo tab
        vm.set('title',record.data['autore'] || 'n.d.')
        vm.set('label',Locale.t('impexp.forms.importazione.title'))
        this.cardImportazione = Ext.create('impexp.view.forms.importazione.cards.Importazione');
        //caricamento files
        let storeAllegati = this.getViewModel().get("storeAllegati");
        this.cardAllegati = Ext.create("impexp.view.forms.importazione.cards.CardAllegati");
        //inserisco tasto allegati
        if (!this.uploadfile) {
            this.uploadfile = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestAttach");
        }
        this.cardAllegati.down("#updfile").add(this.uploadfile);
        this.uploadfile.fireEvent("updateInfo", {
            url: "", src: "", thumb: false, descrizione: "", readOnly: false, rif: "", type: ['xls','xlsx']
        });
        this.gridAllegati = Ext.create("impexp.view.forms.importazione.cards.GridAllegati");
        this.cardAllegati.down("#updgrid").add(this.gridAllegati);

        this.cardImportazione.add(this.cardAllegati);
        this.form.add(this.cardImportazione);
        this.getView().setActiveItem(this.form);
    },
    onImport: function () {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        let storeAllegati = this.getViewModel().getStore("storeAllegati");
        if (storeAllegati.data.length!==1) {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('impexp.forms.importazione.btn.obbfile'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            })
            return false
        }
        record.data['allegato'] = []
        storeAllegati.each(function (rec) {
            record.data['allegato'].push(rec.data)
        })
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
                    method: 'POST',timeout:900000,
                    jsonData: {data:record.data},
                    url: Backend.REST_API + 'forms/importazione/importa',
                    success: function () {
                        me.getView().el.unmask()
                        me.refreshGrid = true
                        me.onClose();
                    },
                    failure: function (response) {
                        me.getView().el.unmask()
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
                    html: '<span style="font-weight:bold;color:blue">'+Locale.t('impexp.forms.importazione.btn.msg')+'</span>'
                }
            ]
        })
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX,btnConfirm], title:Locale.t('impexp.forms.importazione.btn.text'),
            height:150,scrollable:true, width: 600, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        })
        wndw.show()
    },
    onReturnRequestAttach: function (res) {
        let me = this, vm = me.getViewModel(),
            store = vm.getStore("storeAllegati");
        res.valori.idautore = Ext.global.Vars.infoUser.id; //imposto autore frontend
        res.valori.autore = Ext.global.Vars.infoUser.cognomenome; //imposto autore frontend
        store.add(
            Ext.create("portal.v1.view.main.global.upload.GridAttachModel", res.valori)
        );
        //nascondo upload
        this.uploadfile.hide()
    }
})