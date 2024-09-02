/**
 * Created by luca on 16/07/2018.
 */
Ext.define('stcom.view.forms.vendite.Controller', {
    extend: "portal.v1.view.forms.singleForm.Controller",
    mixins: ["portal.v1.global.Util",'stcom.view.forms.vendite.components.ControllerFiltri','stcom.view.forms.vendite.components.ControllerAzioni'],
    alias: "controller.v1-stcom-vendite",
    requires: [
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'Ext.layout.container.HBox',
        'Ext.util.Format',
        'stcom.view.forms.vendite.cards.Andamento',
        'stcom.view.forms.vendite.cards.GridVendite',
        'stcom.view.forms.vendite.components.espExcel',
        'stcom.view.forms.vendite.filtri.Capoarea',
        'stcom.view.forms.vendite.filtri.Cliente',
        'stcom.view.forms.vendite.filtri.Mese',
        'stcom.view.forms.vendite.filtri.Nazione',
        'stcom.view.forms.vendite.filtri.Regione',
        'stcom.view.forms.vendite.filtri.Tipocli',
        'stcom.view.forms.vendite.grafici.GraficoFat'
    ],
    init: function () {
        let vm = this.getViewModel()
        //imposto valori dei filtri x l'esportazione e grafico
        vm.set("cdcli", '');
        vm.set("tipocli", '');
        vm.set("capoarea", '');
        vm.set("nazione", '');
        vm.set("regione", '');
        vm.set("mese", '');
        //filtri tab e campo regione
        vm.set("tabattivo", 0); //tab attivo
        vm.set('hideRegione',true) //filtro regione
        this.callParent(arguments);

    },
    onAfterRender: function () {
        let me = this;
        me.getView().setActiveItem(me.form);
        me.managerView();
    },
    beforeloadVendite:function(s) {
        let view = this.getView()
        let vm = this.getViewModel()
        if (view.infoNode) {
            //s.proxy.extraParams.stabilimento =vm.get('stabilimento')
           // s.proxy.extraParams.tipo =vm.get('tipo')
        }
    },
    managerView: function () {
        let me=this,vm = this.getViewModel()
        this.callParent(arguments);
        //filtri
        this.cliente=Ext.create('stcom.view.forms.vendite.filtri.Cliente')
        this.tipocli=Ext.create('stcom.view.forms.vendite.filtri.Tipocli')
        this.capoarea=Ext.create('stcom.view.forms.vendite.filtri.Capoarea')
        this.nazione=Ext.create('stcom.view.forms.vendite.filtri.Nazione')
        this.regione=Ext.create('stcom.view.forms.vendite.filtri.Regione')
        this.mese=Ext.create('stcom.view.forms.vendite.filtri.Mese')
        this.excel=Ext.create('stcom.view.forms.vendite.components.espExcel')
        this.toolbar = Ext.create("Ext.Toolbar", {
            items: [
                {xtype: 'fieldset', collapsible: true, collapsed: false, title: 'Filtri',flex:1,
                    style: {'background-color': "transparent;"},
                    items: [
                        {xtype: 'container', flex: 1,
                            layout: {
                                type: "hbox"
                            },
                            defaults: {margin: 2,labelAlign:'top'},
                            items: [
                                this.cliente,this.tipocli, this.capoarea,this.nazione,this.regione,this.mese
                            ]
                        }
                    ]
                },
            ]
        });
        if (this.checkRuoli(['99','20'])){
            this.toolbar.add(this.excel)
        }
        //creo tabs
        this.cardAndamento = Ext.create("stcom.view.forms.vendite.cards.Andamento",{
            nometab:'andamentovendite'
        });
        this.gridVendite = Ext.create("stcom.view.forms.vendite.cards.GridVendite", {
            region: "center",
            flex: 1,
        });
        //assegno nomi alla grid
        let giorno = new Date()
        let anno=giorno.getFullYear(),annoprec=giorno.getFullYear()-1,annoold=giorno.getFullYear()-2; //recupero mese e anno attuale attuale
        let columns = this.gridVendite.getColumns()
        for (let i = 0, l = columns.length; i < l; i++) {
            if (columns[i].dataIndex === 'fattincorso') {
                columns[i].text=Locale.t("stcom.grids.vendite.columns.fatturato")+anno
            }
            if (columns[i].dataIndex === 'fattprec') {
                columns[i].text=Locale.t("stcom.grids.vendite.columns.fatturato")+annoprec
            }
            if (columns[i].dataIndex === 'fattold') {
                columns[i].text=Locale.t("stcom.grids.vendite.columns.fatturato")+annoold
            }
        }
        this.cardAndamento.add(this.gridVendite);
        vm.set('title',Locale.t('stcom.forms.vendite.title'))
        //grafico
        this.cardGraficoFat = Ext.create("stcom.view.forms.vendite.grafici.GraficoFat",{
            nometab:'graficofat'
        });
        this.form.on("tabchange", "onTabChange");
        this.form.add(this.cardAndamento);
        this.form.add(this.cardGraficoFat);
        this.form.addDocked(this.toolbar);
        this.form.setActiveTab(0) //attivo il tab x colore tasto
        this.getView().setActiveItem(this.form);
    },
    //cambio tab
    onTabChange:function(tabpanel,newcard) {
        let me = this, vm = this.getViewModel()
        vm.set("tabattivo", 0) //imposto tab attivo il primo
        if (newcard.nometab==='graficofat') {
            vm.set("tabattivo", 1) //imposto tab attivo il secondo
            me.reloadChartFat()
        } else {
            let store=this.gridVendite.getStore()
            if (store && store.getProxy().extraParams) {
                //recupero i filtri
                store.getProxy().extraParams.cdcli = vm.get('cdcli')
                store.getProxy().extraParams.tipocli = vm.get('tipocli')
                store.getProxy().extraParams.capoarea = vm.get('capoarea')
                store.getProxy().extraParams.nazione = vm.get('nazione')
                store.getProxy().extraParams.regione =  vm.get('regione')
                store.getProxy().extraParams.mese = vm.get('mese')
                store.reload()
            }
        }
    },
    reloadGrid: function () {
        let vm = this.getViewModel()
        if (vm.get("tabattivo")===1) {
            this.reloadChartFat()
        } else {
            this.gridVendite.getStore().reload();
        }
    },
    reloadChartFat:function() {
        let me = this,vm = this.getViewModel()
        //recupero i filtri
        let cdcli=vm.get('cdcli')
        let tipocli= vm.get('tipocli')
        let capoarea= vm.get('capoarea')
        let nazione=  vm.get('nazione')
        let regione=  vm.get('regione')
        let mese=  vm.get('mese')
        me.view.el.mask(Locale.t('global.actions.incorso'));
        Ext.Ajax.request({
            method: 'GET',
            params: {cdcli:cdcli,tipocli:tipocli,capoarea:capoarea,nazione:nazione,regione:regione,mese:mese},
            url: Backend.REST_API  + 'grids/vendite/getgrafico/',
            success: function (record) {
                let datibackend = Ext.decode(record.responseText);
                me.view.el.unmask()
                me.loadChartFat(datibackend.data)
            },
            failure: function () {
                me.loadChartFat(null)
            }
        });
    },
    //grafico
    loadChartFat: function (rec) {
        let me = this,vm = this.getViewModel()
        let giorno = new Date()
        let anno=giorno.getFullYear(),annoprec=giorno.getFullYear()-1
        let chartStore = [],line,pos;
        //carico lo store con info
        if (rec && rec.length>0) {
            for (let i = 0; i < 2; i++) {
                for (let y = 1; y < 13; y++) {
                    if (i === 0) {
                        chartStore[y] = {};
                    }
                    line = chartStore[y];
                    pos = this.zeroPad(y, '00');
                    line['month'] = this.checkMounth(y)+"\n"+rec[2]['qta' +pos]+"%";
                    line['data' + i] = parseFloat(rec[i]['qta' + pos]).toFixed(2);
                }
            }
            if (me.cardGraficoFat.items.items[0].series) {
                me.cardGraficoFat.items.items[0].series[0].setTitle(anno)
                me.cardGraficoFat.items.items[0].series[1].setTitle(annoprec)
            }
            let store = me.cardGraficoFat.items.items[0].getStore();
            store.setData(store.generateData(chartStore));
            me.cardGraficoFat.items.items[0].redraw();
        }
        me.cardGraficoFat.items.items[0].setLegend({
            docked: 'right'
        })
    },
    onAxisLabelRender: function (axis, label) {
        let l =  label.toFixed(label < 10 ? 1: 0);
        return Ext.util.Format.number(l,'0,000');
    },
    onSeriesTooltipRender: function (tooltip, record, item) {
        let title = item.series.getTitle();
        let l =  record.get(item.series.getYField());
        let voce=record.get('month')
        tooltip.setHtml(title + ' a ' + voce + ': ' +
            Ext.util.Format.currency(l,'€ ', 2));
    },
    // -----------------------------------------------
    onafterrendergrid: function (grid) { },
    onSearchTriggetSearch: function (item) {
        let grid = item.up("grid");
        if (!grid) grid = this.grid;
        let store = grid.getStore();
        let proxy = store.getProxy();
        let value = item.getValue();
        if (value.length < 1) {
            if (item.hasSearch) {
                this.onClearTriggetSearch(item);
            }
            return;
        }
        item.getTrigger("clear").show();
        proxy.extraParams.pattern = value;
        store.load();
        item.hasSearch = true;
    },
    onSpecialkeySearch: function (item, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearchTriggetSearch(item);
        }
    },
    onClearTriggetSearch: function (item) {
        let grid = item.up("grid");
        if (!grid) grid = this.grid;
        let store = grid.getStore();
        let proxy = store.getProxy();
        if (item.hasSearch) {
            item.setValue("");
            proxy.extraParams.pattern = "";
            store.load();
            item.hasSearch = false;
            item.getTrigger("clear").hide();
        }
    },
    onLoadStore: function (store, records, success) {
        this.listRecords = records;
        if (success) {
            let totalCount = this.gridVendite.down("#totalCount");
            if (totalCount) {
                if (store.totalCount) {
                    totalCount.setValue(Locale.t("global.grid.total") + " " + Ext.util.Format.number(store.totalCount, "0,000"));
                } else {
                    totalCount.setValue(Locale.t("global.grid.total") + " 0");
                }
            }
        }
    },
    onBeforeLoad: function (store) {
        if (store.isLoading()) return false;
    }
})