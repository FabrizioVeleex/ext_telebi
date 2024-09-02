/**
 * Created by luke on 25/03/22.
 */
Ext.define('stres.view.forms.articolo.components.ControllerAzioni', {
    extend: 'Ext.app.ViewController',
    //alias: 'controller.v1-stres-articoli-azioni',
    requires: [
        'Ext.button.Button',
        'Ext.form.Panel',
        'Ext.form.RadioGroup',
        'Ext.window.Window'
    ],
    onEsportaExcel:function() {
        let me = this,vm = this.getViewModel()
        let cdcli=vm.get('cdcli')
        let tipocli= vm.get('tipocli')
        let capoarea= vm.get('capoarea')
        let nazione=  vm.get('nazione')
        let regione=  vm.get('regione')
        let mese=  vm.get('mese')
        //recupero filtri attuali
        let btnX = Ext.create('Ext.Button', {
            text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
                wndw.destroy();
            }
        });
        let btnConfirm = Ext.create('Ext.Button', {
            text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
                me.view.el.mask(Locale.t("global.actions.incorso"));
                let ff = wdwpanel.getForm();
                let selezione = ff.findField("selezione").getValue(); //nome
                wndw.hide();
                Ext.Ajax.request({
                    method: 'GET',timeout : 900000,
                    params: {selezione: selezione,cdcli:cdcli,tipocli:tipocli,capoarea:capoarea,nazione:nazione,regione:regione,mese:mese},
                    url: Backend.REST_API  + 'grids/articolo/esportaanno/',
                    success: function (response) {
                        me.view.el.unmask()
                        let rest = Ext.decode(response.responseText);
                        wndw.destroy();
                        me.onDownloadFile(rest['token'])
                    },
                    failure: function (a) {
                        me.view.el.unmask()
                        wndw.destroy();
                        let rest = Ext.decode(a.responseText);
                        Ext.Msg.show({
                            title: Locale.t('global.errore'),
                            msg: rest['msg'],
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }
                })
            }
        });
        let wdwpanel = Ext.create('Ext.form.Panel', {
            border: false, items: [
                {xtype: "radiogroup", hideLabel: true, name: "selezione", columns: 2, flex: 1, simpleValue: true,
                    items: [
                        {boxLabel: Locale.t("stcom.forms.esporta.tutti"), inputValue: "T", checked: true},
                        {boxLabel: Locale.t("stcom.forms.esporta.filtri"), inputValue: "F"}
                    ],
                },
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title: Locale.t('stcom.forms.esporta.title'),
            width: 550, autoHeight: true, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();
    }

});