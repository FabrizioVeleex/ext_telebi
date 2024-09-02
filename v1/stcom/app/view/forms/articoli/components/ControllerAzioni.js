/**
 * Created by luke on 25/03/22.
 */
Ext.define('stcom.view.forms.articoli.components.ControllerAzioni', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Ext.button.Button',
        'Ext.form.Panel',
        'Ext.form.RadioGroup',
        'Ext.window.Window'
    ],
    onEsportaExcel:function() {
        let me = this,vm = this.getViewModel(),hideopzione=true
        let cdart=vm.get('cdart')
        let clm=vm.get('clm')
        let cdcli=vm.get('cdcli')
        let tipocli= vm.get('tipocli')
        let capoarea= vm.get('capoarea')
        let nazione=  vm.get('nazione')
        let regione=  vm.get('regione')
        let mese=  vm.get('mese')
        let storedettaglio=vm.get('storeClientiDettaglio')
        let dettaglio =[]
        for (let i = 0; i < storedettaglio.data.items.length; i++) {
            dettaglio.push(storedettaglio.data.items[i].data)
        }
        let rowExpander = this.gridArticoli.getPlugin('clientiDettaglio');
        let expandedRecords = rowExpander.recordsExpanded;
        for(let prop in expandedRecords) {
            hideopzione=false
        }
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
                    method: 'PUT',timeout : 900000,
                    params: {selezione: selezione,cdart:cdart,clm:clm,cdcli:cdcli,tipocli:tipocli,capoarea:capoarea,nazione:nazione,regione:regione,mese:mese,dettaglio:Ext.encode(dettaglio)},
                    url: Backend.REST_API  + 'grids/articoli/esportaanno/',
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
                {xtype: "radiogroup", hideLabel: true, name: "selezione", columns: 3, flex: 1, simpleValue: true,
                    items: [
                        {boxLabel: Locale.t("stcom.forms.esporta.tutti"), inputValue: "T", checked: true},
                        {boxLabel: Locale.t("stcom.forms.esporta.filtri"), inputValue: "F"},
                        {boxLabel: Locale.t("stcom.forms.esporta.riga"), hidden:hideopzione,inputValue: "R"}
                    ]
                }
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title: Locale.t('stcom.forms.esporta.title'),
            width: 600, autoHeight: true, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();
    }

});