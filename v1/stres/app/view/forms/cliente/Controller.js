/**
 * Created by luca on 16/07/2018.
 */
Ext.define('stres.view.forms.cliente.Controller', {
    extend: "portal.v1.view.forms.singleForm.Controller",
    mixins: ["portal.v1.global.Util",'stres.view.forms.cliente.components.ControllerFiltri','stres.view.forms.cliente.components.ControllerAzioni'],
    alias: "controller.v1-stres-cliente",
    requires: [
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'Ext.layout.container.HBox',
        'Ext.util.Format',
        'stres.view.forms.cliente.cards.Andamento',
        'stres.view.forms.cliente.cards.GridClienti',
        'stres.view.forms.cliente.filtri.Articolo',
        'stres.view.forms.cliente.filtri.Cliente',
        'stres.view.forms.cliente.grafici.GraficoCli'
    ],
    init: function () {
        let vm = this.getViewModel()
        //imposto valori dei filtri x l'esportazione e grafico
        vm.set("cdcli", '');
        vm.set("cdart", '');
        vm.set("hideart",true)
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
    beforeloadCliente:function(s) {
        let view = this.getView()
        if (view.infoNode) {
            //s.proxy.extraParams.stabilimento =vm.get('stabilimento')
           // s.proxy.extraParams.tipo =vm.get('tipo')
        }
    },
    managerView: function () {
        let vm = this.getViewModel()
        this.callParent(arguments);
        //filtri
        this.cliente=Ext.create('stres.view.forms.cliente.filtri.Cliente')
        this.articolo=Ext.create('stres.view.forms.cliente.filtri.Articolo',{
            bind:{hidden:"{hideart}"}
        })
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
                                this.cliente,this.articolo
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
        this.cardAndamento = Ext.create("stres.view.forms.cliente.cards.Andamento",{
            nometab:'andamentocliente'
        });
        this.gridClienti = Ext.create("stres.view.forms.cliente.cards.GridClienti", {
            region: "center",
            flex: 1,
        });
        //assegno nomi alla grid
        let giorno = new Date()
        let anno1=giorno.getFullYear()-5,anno2=giorno.getFullYear()-4,anno3=giorno.getFullYear()-3
        let anno4=giorno.getFullYear()-2,anno5=giorno.getFullYear()-1,anno6=giorno.getFullYear()
        //imposto titoli colonna principale
        vm.set("anno1", anno1);
        vm.set("anno2", anno2);
        vm.set("anno3", anno3);
        vm.set("anno4", anno4);
        vm.set("anno5", anno5);
        vm.set("anno6", anno6);
        this.cardAndamento.add(this.gridClienti);
        vm.set('title',Locale.t('stres.forms.cliente.title'))
        //grafico
        this.cardGraficoCli = Ext.create("stres.view.forms.cliente.grafici.GraficoCli",{
            nometab:'graficocli'
        });
        this.form.on("tabchange", "onTabChange");
        this.form.add(this.cardAndamento);
        this.form.add(this.cardGraficoCli);
        this.form.addDocked(this.toolbar);
        this.form.setActiveTab(0) //attivo il tab x colore tasto
        this.getView().setActiveItem(this.form);
    },
    //cambio tab
    onTabChange:function(tabpanel,newcard) {
        let me = this, vm = this.getViewModel()
        vm.set("tabattivo", 0) //imposto tab attivo il primo
        if (newcard.nometab==='graficocli') {
            vm.set("tabattivo", 1) //imposto tab attivo il secondo
            me.reloadChartCli()
        } else {
            let store=this.gridClienti.getStore()
            if (store && store.getProxy().extraParams) {
                //recupero i filtri
                store.getProxy().extraParams.cdcli = vm.get('cdcli')
                store.getProxy().extraParams.cdart = vm.get('cdart')
                store.reload()
            }
        }
    },
    reloadGrid: function () {
        let vm = this.getViewModel()
        if (vm.get("tabattivo")===1) {
            this.reloadChartCli()
        } else {
            this.gridClienti.getStore().reload();
        }
    },
    reloadChartCli:function() {
        let me = this,vm = this.getViewModel()
        //recupero i filtri
        let cdcli=vm.get('cdcli')
        let cdart=vm.get('cdart')
        me.view.el.mask(Locale.t('global.actions.incorso'));
        Ext.Ajax.request({
            method: 'GET',
            params: {cdcli:cdcli,cdart:cdart},
            url: Backend.REST_API  + 'grids/cliente/getgrafico/',
            success: function (record) {
                let datibackend = Ext.decode(record.responseText);
                me.view.el.unmask()
                me.loadChartCli(datibackend.data)
            },
            failure: function () {
                me.loadChartCli(null)
            }
        });
    },
    //grafico
    loadChartCli: function (rec) {
        let me = this
        let giorno = new Date()
        let anno=giorno.getFullYear()-5
        let chartStore = [],line,pos;
        //carico lo store con info
        if (rec && rec.length>0) {
            for (let i = 0; i < 2; i++) {
                for (let y = 1; y < 7; y++) {
                    if (i === 0) {
                        chartStore[y] = {};
                    }
                    line = chartStore[y];
                    pos = this.zeroPad(y, '00');
                    line['month'] = anno+"\n"+Ext.util.Format.number(rec[1]['qta' +pos],'0,000')+' ('+rec[2]['qta' +pos]+"%)";
                    line['data' + i] = parseFloat(rec[i]['qta' + pos]).toFixed(2);
                    if (i===1) {
                        anno=anno+1
                    }
                }
            }
            let store = me.cardGraficoCli.items.items[0].getStore();
            store.setData(store.generateData(chartStore));
            me.cardGraficoCli.items.items[0].redraw();
        }
        me.cardGraficoCli.items.items[0].setLegend({
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
        tooltip.setHtml(title+': ' + Ext.util.Format.number(l,'0,000'));
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
            let totalCount = this.gridClienti.down("#totalCount");
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