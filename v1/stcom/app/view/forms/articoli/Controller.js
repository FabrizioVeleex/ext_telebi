/**
 * Created by luca on 16/07/2018.
 */
Ext.define('stcom.view.forms.articoli.Controller', {
    extend: "portal.v1.view.forms.singleForm.Controller",
    mixins: ["portal.v1.global.Util",'stcom.view.forms.articoli.components.ControllerAzioni','stcom.view.forms.articoli.components.ControllerFiltri'],
    alias: "controller.v1-stcom-articoli",
    requires: [
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'Ext.layout.container.HBox',
        'Ext.util.Format',
        'stcom.view.forms.articoli.cards.Andamento',
        'stcom.view.forms.articoli.cards.GridArticoli',
        'stcom.view.forms.articoli.components.espExcel',
        'stcom.view.forms.articoli.filtri.Articolo',
        'stcom.view.forms.articoli.filtri.Capoarea',
        'stcom.view.forms.articoli.filtri.Classe',
        'stcom.view.forms.articoli.filtri.Cliente',
        'stcom.view.forms.articoli.filtri.Mese',
        'stcom.view.forms.articoli.filtri.Nazione',
        'stcom.view.forms.articoli.filtri.Regione',
        'stcom.view.forms.articoli.filtri.Tipocli',
        'stcom.view.forms.articoli.grafici.GraficoArt'
    ],
    init: function () {
        let vm = this.getViewModel()
        //imposto valori dei filtri x l'esportazione e grafico
        vm.set("cdart", '');
        vm.set("clm", '');
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
    beforeloadArticoli:function(s) {
        let view = this.getView()
        if (view.infoNode) {
            //s.proxy.extraParams.stabilimento =vm.get('stabilimento')
           // s.proxy.extraParams.tipo =vm.get('tipo')
        }
    },
    managerView: function () {
        let me=this,vm = this.getViewModel()
        this.callParent(arguments);
        //filtri
        this.classe=Ext.create('stcom.view.forms.articoli.filtri.Classe')
        this.articolo=Ext.create('stcom.view.forms.articoli.filtri.Articolo')
        this.cliente=Ext.create('stcom.view.forms.articoli.filtri.Cliente')
        this.tipocli=Ext.create('stcom.view.forms.articoli.filtri.Tipocli')
        this.capoarea=Ext.create('stcom.view.forms.articoli.filtri.Capoarea')
        this.nazione=Ext.create('stcom.view.forms.articoli.filtri.Nazione')
        this.regione=Ext.create('stcom.view.forms.articoli.filtri.Regione')
        this.mese=Ext.create('stcom.view.forms.articoli.filtri.Mese')
        this.excel=Ext.create('stcom.view.forms.articoli.components.espExcel')
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
                                this.classe,this.articolo,this.cliente,this.tipocli
                            ]
                        },
                        {xtype: 'container', flex: 1,
                            layout: {
                                type: "hbox"
                            },
                            defaults: {margin: 2,labelAlign:'top'},
                            items: [
                               this.capoarea,this.nazione,this.regione,this.mese
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
        this.cardAndamento = Ext.create("stcom.view.forms.articoli.cards.Andamento",{
            nometab:'andamentoarticoli'
        });
        this.gridArticoli = Ext.create("stcom.view.forms.articoli.cards.GridArticoli", {
            region: "center",
            flex: 1,
        });
        //assegno nomi alla grid
        let giorno = new Date()
        let anno=giorno.getFullYear(),annoprec=giorno.getFullYear()-1,annoold=giorno.getFullYear()-2; //recupero mese e anno attuale attuale
        let columns = this.gridArticoli.getColumns()
        for (let i = 0, l = columns.length; i < l; i++) {
            if (columns[i].dataIndex === 'vendcorso') {
                columns[i].text=Locale.t("stcom.grids.articoli.columns.vendite")+anno
                vm.set('vendcorso',Locale.t("stcom.grids.articoli.columns.vendite")+anno)
            }
            if (columns[i].dataIndex === 'vendprec') {
                columns[i].text=Locale.t("stcom.grids.articoli.columns.vendite")+annoprec
                vm.set('vendprec',Locale.t("stcom.grids.articoli.columns.vendite")+annoprec)
            }
            if (columns[i].dataIndex === 'vendold') {
                columns[i].text=Locale.t("stcom.grids.articoli.columns.vendite")+annoold
                vm.set('vendold',Locale.t("stcom.grids.articoli.columns.vendite")+annoold)
            }
        }
        this.cardAndamento.add(this.gridArticoli);
        vm.set('title',Locale.t('stcom.forms.articoli.title'))
        //grafico
        this.cardGraficoArt = Ext.create("stcom.view.forms.articoli.grafici.GraficoArt",{
            nometab:'graficoart'
        });
        this.form.on("tabchange", "onTabChange");
        this.form.add(this.cardAndamento);
        this.form.add(this.cardGraficoArt);
        this.form.addDocked(this.toolbar);
        this.form.setActiveTab(0) //attivo il tab x colore tasto
        this.getView().setActiveItem(this.form);
    },
    //cambio tab
    onTabChange:function(tabpanel,newcard) {
        let me = this, vm = this.getViewModel()
        vm.set("tabattivo", 0) //imposto tab attivo il primo
        if (newcard.nometab==='graficoart') {
            vm.set("tabattivo", 1) //imposto tab attivo il secondo
            me.reloadChartArt()
        } else {
            let store=this.gridArticoli.getStore()
            if (store && store.getProxy().extraParams) {
                //recupero i filtri
                store.getProxy().extraParams.cdart = vm.get('cdart')
                store.getProxy().extraParams.clm = vm.get('clm')
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
            this.reloadChartArt()
        } else {
            this.gridArticoli.getStore().reload();
        }
    },
    reloadChartArt:function() {
        let me = this,vm = this.getViewModel()
        //recupero i filtri
        let cdart=vm.get('cdart')
        let clm=vm.get('clm')
        let cdcli=vm.get('cdcli')
        let tipocli= vm.get('tipocli')
        let capoarea= vm.get('capoarea')
        let nazione=  vm.get('nazione')
        let regione=  vm.get('regione')
        let mese=  vm.get('mese')
        me.view.el.mask(Locale.t('global.actions.incorso'));
        Ext.Ajax.request({
            method: 'GET',
            params: {cdart:cdart,clm:clm,cdcli:cdcli,tipocli:tipocli,capoarea:capoarea,nazione:nazione,regione:regione,mese:mese},
            url: Backend.REST_API  + 'grids/articoli/getgrafico/',
            success: function (record) {
                let datibackend = Ext.decode(record.responseText);
                me.view.el.unmask()
                me.loadChartArt(datibackend.data)
            },
            failure: function () {
                me.loadChartArt(null)
            }
        });
    },
    //grafico
    loadChartArt: function (rec) {
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
            if (me.cardGraficoArt.items.items[0].series) {
                me.cardGraficoArt.items.items[0].series[0].setTitle(anno)
                me.cardGraficoArt.items.items[0].series[1].setTitle(annoprec)
            }
            let store = me.cardGraficoArt.items.items[0].getStore();
            store.setData(store.generateData(chartStore));
            me.cardGraficoArt.items.items[0].redraw();
        }
        me.cardGraficoArt.items.items[0].setLegend({
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
            Ext.util.Format.number(l, '0,000'));
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
            let totalCount = this.gridArticoli.down("#totalCount");
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