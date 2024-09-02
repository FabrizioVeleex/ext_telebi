/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wvoi.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.v1-widgetvoi',
    requires: [
        'Ext.button.Button',
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.container.Container',
        'Ext.form.Panel',
        'Ext.form.field.Date',
        'Ext.form.field.Display',
        'Ext.layout.container.HBox',
        'Ext.panel.Panel',
        'Ext.toolbar.Fill',
        'Ext.util.Format',
        'Ext.window.Window',
        'home.view.dashboard.widgets.wvoi.model.Chart',
        'home.view.dashboard.widgets.wvoi.store.GridStore',
        'home.view.dashboard.widgets.wvoi.GridAndamento',
        'home.view.dashboard.widgets.wvoi.WinDettaglio',
        'home.view.dashboard.widgets.wvoi.WindowUtenti'
    ],
    mixins:['portal.v1.global.Util'],
    init: function () {
        this.dataForm = null;
        this.wordchart = null;
        this.wvoichartuser = null;
        this.wvoiremdimento = null;
        this.firstload = true;
        this.gestione = false;
    },
    //creazione pannello
    onAfterRender: function () {
        let widget = this.getView().widget;
        this.getViewModel().set('widget', widget);
        //verifico se è gestore
        if (widget && this.checkRuoliWidget(['99'],widget) || this.checkRuoliWidget(['1'],widget)){
            this.gestione = true;
        }
        //recupero data
        this.loadChart();
    },
    /* --------------------------------------------
     gestione utenti
     */
    onOpenWinUtenti: function () {
        let me = this;
        this.wvoiwinutenti = Ext.create('home.view.dashboard.widgets.wvoi.WindowUtenti', {
            scope: me,
            winWidget: this,
            title: Locale.t('widgetvoice.utenti.title')
        });
        this.wvoiwinutenti.on('onCloseWinUtenti', this.onCloseWinUtenti, this);
        this.wvoiwinutenti.show();
    },
    onCloseWinUtenti: function (grid) {
        if (grid) {
            grid.getStore().load();
        }
    },
    /* --------------------------------------------
     GRAFICI
     */
    onloadChart: function () {
        let dinizio = this.getViewModel().get('dinizio'),
            days = this.getViewModel().get('days').selection.data.day,
            proxy = this.dataForm.getProxy();
        proxy.extraParams.start = Ext.Date.format(dinizio, 'Ymd');
        proxy.extraParams.days = days;
        this.loadChart();

    },
    loadChart: function () {
        //recupero info
        let me = this;
        let center = me.getView(); //pannello
        let myMask = new Ext.LoadMask({ //maschera attesa
            msg:Locale.t('widgetvoice.caricamento'),
            target:center
        });
        myMask.show();
        if (!this.dataForm) {
            this.dataForm = Ext.create('home.view.dashboard.widgets.wvoi.model.Chart');
        }
        this.dataForm.load({
            success: function (record) {
                me.renderChart(record);
                myMask.hide();
            },
            failure: function (a, o) {
                try {
                    if (o._response.responseText){
                        let rest = Ext.decode(o._response.responseText);
                        Ext.Msg.show({
                            title: Locale.t('global.errore'),
                            msg: rest['msg'],
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR,
                            fn: function () {
                                // me.onClose();//eseguo funzione x evento in attesa
                            }
                        });
                    }
                } catch (e) {
                    Ext.Msg.show({
                        title: Locale.t('global.errore'),
                        msg: e.message,
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR,
                        fn: function (b) {
                            // me.onClose();//eseguo funzione x evento in attesa
                        }
                    });
                }
            }
        });
    },
    renderChart: function (record) {
        let toolbar = this.lookupReference('widgetvoitoolbar');
        if (toolbar && this.firstload) {
            this.firstload=false; //imposto variabile x non caricare
            toolbar.add({xtype: 'displayfield',width:20});
            toolbar.add({
                xtype: 'displayfield',labelWidth:150,fieldLabel:Locale.t('widgetvoice.ynress'),value:record.data.ynress,reference:'ynpress'
            });
            toolbar.add({xtype: 'displayfield',width:20});
            toolbar.add({
                xtype: 'displayfield',labelWidth:170,fieldLabel:Locale.t('widgetvoice.ynresn'),value:record.data.ynresn,reference:'ynresn'
            });

            toolbar.add({xtype: 'tbfill'});
            if (this.gestione) {
                toolbar.add({
                        text: Locale.t('widgetvoice.esporta.text'),
                        ui: 'blue',
                        iconCls: 'x-fas fa-file-excel',
                        handler: 'onEsporta'
                    }
                );
                toolbar.add({
                    iconCls: 'fas fa-cog',
                    handler: 'onOpenWinUtenti'
                });
            }
        } else {
            //aggiorno valori
            if (toolbar) {
                let ynpress=this.lookupReference('ynpress');
                if (ynpress) {
                    ynpress.setValue(record.data.ynress);
                }
                let ynresn=this.lookupReference('ynresn');
                if (ynresn) {
                    ynresn.setValue(record.data.ynresn);
                }
            }
        }
        let aggiornamento =record.data.aggiornamento,
            chartRendimento = Ext.create('home.view.dashboard.widgets.wvoi.store.GridStore', {
                data: record.data.listgrid
            });
        //setto ultimo aggiornamento nel titolo
        let newtit = Locale.t('widgetvoice.title') + aggiornamento;
        this.getView().setTitle(newtit);
        if (!this.wvoiremdimento){
            this.wvoiremdimento = Ext.create('home.view.dashboard.widgets.wvoi.GridAndamento', {
                flex: 1,
                height: 230,
                store: chartRendimento
            });
            this.getView().add(this.wvoiremdimento);
        }

        if (!this.wvoichartuser) {
            this.wvoichartuser = Ext.create('Ext.chart.CartesianChart', {
                flex: 1,
                height: 250,
                lineWidth: 2,
                lineColor: '#00008B', // dark blue
                animation: !Ext.isIE8,
                axes: [{
                    type: 'numeric',
                    position: 'left',
                    titleMargin: 12,
                    title: {
                        text: 'Quantità giorno'
                    },
                    grid: {
                        odd: {
                            opacity: 2
                        },
                        even: {
                            opacity: 2,
                            fill: '#ddd'
                        }
                    }
                }, {
                    type: 'category',
                    position: 'bottom',
                    label: {
                        rotate: {
                            degrees: -45
                        }
                    }
                }]
            });

            this.panelBottom = Ext.create('Ext.panel.Panel', {
                layout: {
                    type: "hbox", align: "stretch"
                },
                items: [
                    this.wvoiremdimento
                ]
            });
            this.getView().add(this.panelBottom);
        }
        this.wvoiremdimento.getStore().loadData(record.data.listgrid);
    },
    onRenderUser:function (value) {
      return value;
    },
    onRenderOre:function (value) {
        return value;
    },
    onRenderPz:function (value) {
        return Ext.util.Format.number(value,'0,000');
    },
    onRenderMedia:function (value) {
        return Ext.util.Format.number(value,'0,000.0');
    },
    onSeriesTooltipRender: function (tooltip, record, item) {
        let title = item.series.getTitle();
        tooltip.setHtml(title + ': ' + record.get(item.series.getYField()));
    },
    onSearchDay: function (item,newval) {
        //formatto la data
        let giorno=Ext.Date.format(newval, 'Ymd');
        let dinizio = this.getViewModel().get('dinizio');
        //se è lo stesso giorno esco (apertura portale)
        if (giorno===Ext.Date.format(dinizio, 'Ymd')) {
            return;
        }
        let proxy = this.dataForm.getProxy();
        proxy.extraParams.start = giorno;
        this.loadChart();
    },
    onOpenWindowDettaglio:function(grid, rowIndex){
        let rec = grid.getStore().getAt(rowIndex);
        this.wvoiwindett = Ext.create('home.view.dashboard.widgets.wvoi.WinDettaglio',{
            rec:rec,
            title:Locale.t(rec.data['user'])
        });
        this.wvoiwindett.show();
    },
    //esportazione excel
    onEsporta:function() {
        let me=this;
        let btnX = Ext.create('Ext.Button',{
            text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
                wndw.destroy();
            }
        });
        let btnConfirm = Ext.create('Ext.Button',{
            text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
                let ff=wdwpanel.getForm();
                let dal= ff.findField('dal').getValue(); //nome
                let al= ff.findField('al').getValue(); //nome
                let center = me.getView(); //pannello
                let myMask = new Ext.LoadMask({ //maschera attesa
                    msg:Locale.t('widgetvoice.esporta.esecuzione'),
                    target:center
                });
                wndw.hide();
                myMask.show();
                Ext.Ajax.request({
                    method: 'GET',timeout : 900000,
                    params: {'_fn': 'esporta',dal:dal,al:al},
                    url: Backend.API_WIDGET + 'WVOI/Main.php',
                    success: function (esito) {
                        myMask.hide();
                        let rest = Ext.decode(esito.responseText);
                        if (rest['success']===true) {
                            wndw.destroy();
                            Ext.core.DomHelper.append(document.body, {
                                tag: 'iframe', id: 'downloadIframe', frameBorder: 0, width: 0, height: 0,
                                css: 'display:none;visibility:hidden;height:0px;',
                                src: rest['url']
                            });
                        } else {
                            wndw.show();
                            Ext.Msg.show({
                                title: Locale.t('global.errore'),
                                msg: rest['msg'],
                                buttons: Ext.Msg.OK,
                                icon: Ext.MessageBox.ERROR
                            });
                        }
                    },
                    failure: function (a, o) {
                        wndw.destroy();
                        myMask.hide();
                        let rest = Ext.decode(o._response.responseText);
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
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5},
                    items: [
                        {xtype:'box',html:Locale.t('widgetvoice.esporta.messaggio')}
                    ]
                },
                {xtype: 'container', flex: 1,
                    layout: {type: "hbox"},
                    defaults: {margin: 5},
                    items: [
                        {xtype:'datefield',fieldLabel: Locale.t('widgetvoice.esporta.dal'),labelWidth:60,startDay:1,
                            width: 200, format: 'd/m/Y',submitFormat:'Y-m-d',name:'dal'},
                        {xtype:'datefield',fieldLabel: Locale.t('widgetvoice.esporta.al'),labelWidth:60,startDay:1,
                            width: 200, format: 'd/m/Y',submitFormat:'Y-m-d',name:'al'}
                    ]
                }
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title:Locale.t('widgetvoice.esporta.text'),
            width: 650, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();
    }
});
