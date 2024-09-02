/**
 * Created by luca on 16/07/2018.
 */
Ext.define('stres.view.forms.globale.Controller', {
    extend: "portal.v1.view.forms.singleForm.Controller",
    mixins: ["portal.v1.global.Util",'stres.view.forms.globale.components.ControllerFiltri'],
    alias: "controller.v1-stres-globale",
    requires: [
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'Ext.layout.container.HBox',
        'Ext.util.Format',
        'stres.view.forms.globale.cards.Andamento',
        'stres.view.forms.globale.cards.GridGlobale',
        'stres.view.forms.globale.filtri.Articolo',
        'stres.view.forms.globale.filtri.Cliente',
        'stres.view.forms.globale.grafici.GraficoGlo'
    ],
    init: function () {
        let vm = this.getViewModel()
        //filtri tab
        vm.set("cdcli", '');
        vm.set("cdart", '');
        vm.set("tabattivo", 0); //tab attivo
        this.callParent(arguments);

    },
    onAfterRender: function () {
        let me = this;
        me.getView().setActiveItem(me.form);
        me.managerView();
    },
    beforeloadVendite:function(s) {
        let view = this.getView()
        if (view.infoNode) {
            //s.proxy.extraParams.stabilimento =vm.get('stabilimento')
           // s.proxy.extraParams.tipo =vm.get('tipo')
        }
    },
    managerView: function () {
        let me=this,vm = this.getViewModel()
        this.callParent(arguments);
        this.cliente=Ext.create('stres.view.forms.globale.filtri.Cliente')
        this.articolo=Ext.create('stres.view.forms.globale.filtri.Articolo')
        //this.excel=Ext.create('stcom.view.forms.articolo.components.espExcel')
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
                                this.cliente, this.articolo
                            ]
                        }
                    ]
                },
            ]
        });
        if (this.checkRuoli(['99','20'])){
            //this.toolbar.add(this.excel)
        }
        //creo tabs
        this.cardAndamento = Ext.create("stres.view.forms.globale.cards.Andamento",{
            nometab:'andamentoglo'
        });
        this.gridVendite = Ext.create("stres.view.forms.globale.cards.GridGlobale", {
            region: "center",
            flex: 1,
        });
        this.cardAndamento.add(this.gridVendite);
        vm.set('title',Locale.t('stres.forms.globale.title'))
        //grafico
        this.cardGraficoGlo = Ext.create("stres.view.forms.globale.grafici.GraficoGlo",{
            nometab:'graficoglo'
        });
        this.form.on("tabchange", "onTabChange");
        this.form.add(this.cardAndamento);
        this.form.add(this.cardGraficoGlo);
        this.form.addDocked(this.toolbar);
        this.form.setActiveTab(0) //attivo il tab x colore tasto
        this.getView().setActiveItem(this.form);
    },
    //cambio tab
    onTabChange:function(tabpanel,newcard) {
        let me = this, vm = this.getViewModel()
        vm.set("tabattivo", 0) //imposto tab attivo il primo
        if (newcard.nometab==='graficoglo') {
            vm.set("tabattivo", 1) //imposto tab attivo il secondo
            me.reloadChartGlo()
        } else {
            let store=this.gridVendite.getStore()
            if (store && store.getProxy().extraParams) {
                store.getProxy().extraParams.cdcli = vm.get('cdcli')
                store.getProxy().extraParams.cdart = vm.get('cdart')
                store.reload()
            }
        }
    },
    reloadGrid: function () {
        let vm = this.getViewModel()
        if (vm.get("tabattivo")===1) {
            this.reloadChartGlo()
        } else {
            this.gridVendite.getStore().reload();
        }
    },
    reloadChartGlo:function() {
        let me = this,vm = this.getViewModel()
        //recupero i filtri
        let cdcli=vm.get('cdcli')
        let cdart=vm.get('cdart')
        me.view.el.mask(Locale.t('global.actions.incorso'));
        Ext.Ajax.request({
            method: 'GET',
            params: {cdcli:cdcli,cdart:cdart},
            url: Backend.REST_API  + 'grids/globale/getgrafico/',
            success: function (record) {
                let datibackend = Ext.decode(record.responseText);
                me.view.el.unmask()
                me.loadChartGlo(datibackend.data)
            },
            failure: function () {
                me.loadChartGlo(null)
            }
        });
    },
    //grafico
    loadChartGlo: function (rec) {
        let me = this
        let giorno = new Date()
        let anno=giorno.getFullYear()-5
        let chartStore = [],line,pos;
        //carico lo store con info
        if (rec && rec.length>0) {
            for (let i = 0; i < 1; i++) {
                for (let y = 1; y < 7; y++) {
                    if (i === 0) {
                        chartStore[y] = {};
                    }
                    line = chartStore[y];
                    pos = this.zeroPad(y, '00');
                    line['month'] = anno+"\n"+Ext.util.Format.number(rec[0]['qta' +pos],'0,000')+' ('+rec[1]['qta' +pos]+"%)";
                    line['data' + i] = parseFloat(rec[i]['qta' + pos]).toFixed(2);
                    anno=anno+1
                }
            }
            if (me.cardGraficoGlo.items.items[0].series) {
                me.cardGraficoGlo.items.items[0].series[0].setTitle('Reso')
            }
            let store = me.cardGraficoGlo.items.items[0].getStore();
            store.setData(store.generateData(chartStore));
            me.cardGraficoGlo.items.items[0].redraw();
        }
        me.cardGraficoGlo.items.items[0].setLegend({
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
            Ext.util.Format.number(l,'0,000')+ ' articoli');
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