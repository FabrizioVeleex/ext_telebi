/**
 * Created by luca on 16/07/2018.
 */
Ext.define('webord.view.forms.ordine.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.v1-ordine',
    requires: [
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'Ext.form.Panel',
        'Ext.form.RadioGroup',
        'Ext.window.Window',
        'webord.model.forms.ordine.Model',
        'webord.view.forms.ordine.cards.GridArticoli',
        'webord.view.forms.ordine.cards.Ordine',
        'webord.view.forms.ordine.cards.Spedizione',
        'webord.view.forms.ordine.cards.Testata'
    ],
    init: function () {
        let vm = this.getViewModel();
        //tasti flusso
        this.onAssociaCliente = {xtype: 'button', ui: 'blue', text: Locale.t('webord.forms.ordine.btn.associacliente.text'), tooltip: Locale.t('webord.forms.ordine.btn.associacliente.tooltip'), iconCls: 'fas fa-hand-point-right', handler: 'onAssociaCli'}
        this.annulla = {xtype: 'button', ui: 'orange', text: Locale.t('webord.forms.ordine.btn.annulla.text'), tooltip: Locale.t('webord.forms.ordine.btn.annulla.tooltip'), iconCls: 'fas x-fas fa-trash', handler: 'onAnnulla'}
        vm.set('isnew', this.getView().valori.isnew);
        vm.set('id', this.getView().valori.id);
        vm.set('idpadre', this.getView().valori.idpadre);
        vm.set('record', Ext.create('webord.model.forms.ordine.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },
    managerView: function () {
        this.callParent(arguments)
        let me = this, vm = me.getViewModel(), record = vm.get('record'),readOnly = true
        let storeArticoli = vm.getStore('storeArticoli')
        switch (record.data.stato){
            case 5: //bloccato
                if (this.checkRuoli(['99', '1', '10'])) {
                    this.toolBar.add(this.onAssociaCliente)
                    this.toolBar.add(this.annulla)
                    readOnly = false
                }
                break
        }
        //gestione tasti default
        vm.set('btn.close', true)
        vm.set('readOnly', readOnly); //modifica campi scheda
        //titolo tab
        vm.set('title',record.data.id_ordine.toString() || 'n.d.')
        vm.set('label',Locale.t('webord.forms.ordine.title'))
        this.cardOrdine = Ext.create('webord.view.forms.ordine.cards.Ordine'); //form ordine
        //testata
        this.cardTestata = Ext.create('webord.view.forms.ordine.cards.Testata');
        this.testata=Ext.create('Ext.form.FieldSet',{
            collapsible: true, collapsed: false,
            title: '<span style="color: black;font-weight:bold">'+Locale.t('webord.forms.ordine.testata')+'</span>',
            style: {'background-color': "transparent;"},
            items: [this.cardTestata]
        })
        this.cardOrdine.add(this.testata)
        //spedizione alternativa
        this.cardSpedizione = Ext.create('webord.view.forms.ordine.cards.Spedizione'); //info scheda
        this.spedizione=Ext.create('Ext.form.FieldSet',{
            collapsible: true, collapsed: false,
            title: '<span style="color: black;font-weight:bold">'+Locale.t('webord.forms.ordine.spedizione')+'</span>',
            style: {'background-color': "transparent;"},
            items: [this.cardSpedizione]
        })
        this.cardOrdine.add(this.spedizione)
        //Articoli
        this.gridarticioli = Ext.create('webord.view.forms.ordine.cards.GridArticoli');
        storeArticoli.loadData(record.data['storearticoli'])
        this.articoli=Ext.create('Ext.form.FieldSet',{
            collapsible: true, collapsed: false,
            title: '<span style="color: black;font-weight:bold">'+Locale.t('webord.forms.ordine.dettaglio')+'</span>',
            style: {'background-color': "transparent;"},
            items: [this.gridarticioli]
        })
        this.cardOrdine.add(this.articoli)
        this.form.add(this.cardOrdine);
        this.getView().setActiveItem(this.form);
    },
    obbOpzioni: function () {
        let record = this.getViewModel().get('record');
        let error = '';
        if (record.data.acqportiera === 0 || record.data.acqoe === 0 || record.data.acqoe === 0) {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('snp.forms.scheda.obbopzioni'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return false;
        }
        if (record.data.acqportiera !== 1 && record.data.acqoe !== 1 && record.data.acqoe !== 1) {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('snp.forms.scheda.obbopzione'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return false;
        }
        return true
    },
    //associa cliente
    onAssociaCli:function() {
        let me = this, vm = me.getViewModel(), record = vm.get("record");
       if (record.data.codice_cliente==='') {
           Ext.Msg.show({
               title: Locale.t("global.errore"),
               msg: Locale.t('webord.forms.ordine.btn.associacliente.error'),
               buttons: Ext.Msg.OK,
               icon: Ext.MessageBox.ERROR,
           });
           return
       }
        let btnX = new Ext.Button({text: Locale.t("global.btn.annulla"), iconCls: "x-fas fa-ban", handler: function () {wndw.destroy();}});
        let btnConfirm = Ext.create("Ext.Button", {
            text: Locale.t("global.btn.conferma"), iconCls: "x-fas fa-check",
            handler: function () {
                let ff=wdwpanel.getForm();
                let creauser=ff.findField('creauser').getValue();
                wndw.destroy();
                me.getView().el.mask(Locale.t("global.actions.incorso"));
                Ext.Ajax.request({
                    method: "POST", jsonData: {data: record.data,creauser:creauser},
                    url: Backend.REST_API + "forms/ordine/associacliente", //azione backend
                    success: function () {
                        me.getView().el.unmask();
                        me.refreshGrid = true;
                        me.onClose();
                    },
                    failure: function (response) {
                        me.getView().el.unmask();
                        let resp = Ext.decode(response.responseText);
                        Ext.Msg.show({
                            title: Locale.t("global.errore"),
                            msg: resp["msg"],
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR,
                        });
                    }
                });
            }
        });
        let wdwpanel = Ext.create("Ext.form.Panel", {border: false,
            items: [
                {xtype: 'radiogroup',fieldLabel:Locale.t('webord.forms.ordine.btn.associacliente.creauser'),name:'creauser',
                    columns: 2,width:380,simpleValue: true,labelWidth: 250,
                    items: [
                        {boxLabel:Locale.t('webord.forms.ordine.btn.associacliente.si'),inputValue:1},
                        {boxLabel:Locale.t('webord.forms.ordine.btn.associacliente.no'),inputValue:0,checked:true}
                    ]
                },
                {xtype: "container", style: { padding: "5px" }, html: '<span style="font-weight:bold;color:blue">' + Locale.t('webord.forms.ordine.btn.associacliente.msg') + "</span>",}
            ]
        });
        let wndw = Ext.create("Ext.Window", {
            tbar: [btnX, btnConfirm], title: Locale.t('webord.forms.ordine.btn.associacliente.text'),
            height: 200, scrollable: true, width: 700, closable: true,
            bodyStyle: { padding: "10px", "background-color": "#ffffff" }, modal: true, border: false, resizable: false,
            draggable: false, items: [wdwpanel]
        });
        wndw.show();
    },
    onAnnulla: function (btn) {
        let me = this, vm = me.getViewModel(), record = vm.get("record")
        let btnX = new Ext.Button({text: Locale.t("global.btn.annulla"), iconCls: "x-fas fa-ban", handler: function () {wndw.destroy();}});
        let btnConfirm = Ext.create("Ext.Button", {
            text: Locale.t("global.btn.conferma"), iconCls: "x-fas fa-check",
            handler: function () {
                wndw.destroy();
                me.getView().el.mask(Locale.t("global.actions.incorso"));
                Ext.Ajax.request({
                    method: "PUT", jsonData: { data: record.data},
                    url: Backend.REST_API + "forms/ordine/annulla", //azione backend
                    success: function () {
                        me.getView().el.unmask();
                        me.refreshGrid = true;
                        me.onClose();
                    },
                    failure: function (response) {
                        me.getView().el.unmask();
                        let resp = Ext.decode(response.responseText);
                        Ext.Msg.show({
                            title: Locale.t("global.errore"),
                            msg: resp["msg"],
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }
                });
            }
        });
        let wdwpanel = Ext.create("Ext.form.Panel", {
            border: false, items: [
                {xtype: "container", style: { padding: "5px" },
                    html: '<span style="font-weight:bold;color:blue">' +Locale.t('webord.forms.ordine.btn.annulla.msg') + "</span>"
                }
            ]
        });
        let wndw = Ext.create("Ext.Window", {
            tbar: [btnX, btnConfirm], title: btn.text, height: 150, scrollable: true, width: 600, closable: true,
            bodyStyle: { padding: "10px", "background-color": "#ffffff" }, modal: true, border: false, resizable: false,
            draggable: false, items: [wdwpanel]
        });
        wndw.show();
    }
})