/**
 * Created by luca on 16/07/2018.
 */
Ext.define('stver.view.forms.mese.Controller', {
    extend: "portal.v1.view.forms.singleForm.Controller",
    mixins: ["portal.v1.global.Util",'stver.view.forms.mese.components.ControllerFiltri'],
    alias: "controller.v1-andamentomese",
    requires: [
        'Ext.form.FieldSet',
        'Ext.util.Format',
        'stver.view.forms.filtri.Anno',
        'stver.view.forms.filtri.RadioSemi',
        'stver.view.forms.filtri.RadioStabilimento',
        'stver.view.forms.filtri.RadioTipo',
        'stver.view.forms.mese.cards.Andamento',
        'stver.view.forms.mese.cards.Grafico',
        'stver.view.forms.mese.cards.GridMese'
    ],
    init: function () {
        let vm = this.getViewModel()
        let giorno = new Date(),anno=giorno.getFullYear() //default anno in corso
        vm.set("tabattivo", 0);
        vm.set("anno", anno);
        vm.set("hidesemi", true); //default nascondo radio semi/famiglie
        this.callParent(arguments);
        this.columns =[
            {text: Locale.t('stver.grids.mese.columns.codart'), width: 100,dataIndex: 'codart', draggable: false},
            {text: Locale.t("stver.grids.mese.columns.descrizione"), flex:1,minWidth:120, dataIndex: "descrizione", draggable: false},
            {text: Locale.t("stver.grids.mese.columns.pianif"), width: 120, dataIndex: "pianificatore", draggable: false}
        ]
    },
    onAfterRender: function () {
        let me = this;
        me.getView().setActiveItem(me.form);
        me.managerView();
    },
    beforeloadMese:function(s) {
        let view = this.getView()
        let vm = this.getViewModel()
        if (view.infoNode) {
            s.proxy.extraParams.stabilimento =vm.get('stabilimento')
            s.proxy.extraParams.tipo =vm.get('tipo')
            s.proxy.extraParams.semi =vm.get('semi')
            s.proxy.extraParams.anno =vm.get('anno')
        }
    },
    managerView: function () {
        let vm = this.getViewModel(), hidefiltrostab=true, stabilimento = 'C01',tipo=1,semi=1
        this.callParent(arguments);
        if (this.checkRuoli(['1']) && this.checkRuoli(['2'])) {
            hidefiltrostab=false
        }
        if (this.checkRuoli(['1']) && !this.checkRuoli(['2'])) {
            stabilimento = 'C01'
        }
        if (this.checkRuoli(['2']) && !this.checkRuoli(['1'])) {
            stabilimento = 'T01'
        }
        vm.set("stabilimento", stabilimento);
        vm.set("hidefiltrostab", hidefiltrostab);
        vm.set("tipo", tipo);
        vm.set("semi", semi);
        //creo toolbar con filtri
        this.stabilimentomese=Ext.create('stver.view.forms.filtri.RadioStabilimento')
        this.tipomese=Ext.create('stver.view.forms.filtri.RadioTipo')
        this.semimese=Ext.create('stver.view.forms.filtri.RadioSemi')
        this.anno=Ext.create('stver.view.forms.filtri.Anno',{value:vm.get('anno')})
        this.toolbar = Ext.create("Ext.Toolbar", {
            items: [
                { handler: "reloadGrid", iconCls: " pictos pictos-refresh" },
                {xtype: 'fieldset', collapsible: false, collapsed: false, title: '',
                    style: {'background-color': "transparent;"}, padding:'1 1 1 1',
                    items: [ this.stabilimentomese]
                },
                {xtype: 'fieldset', collapsible: false, collapsed: false, title: '',
                    style: {'background-color': "transparent;"}, padding:'1 1 1 1',
                    items: [this.tipomese]
                },
                {xtype: 'fieldset', collapsible: false, collapsed: false, title: '',
                    style: {'background-color': "transparent;"}, padding:'1 1 1 1',
                    items: [this.semimese]
                },
                {xtype: 'fieldset', collapsible: false, collapsed: false, title: '',
                    style: {'background-color': "transparent;"}, padding:'1 1 1 1',
                    items: [this.anno]
                }
            ]
        });
        //ciclo i giorni del mese x escludere sabato e domenica
        let giorno = new Date()
        let mese = giorno.getMonth()+1,anno=giorno.getFullYear(); //recupero mese e anno attuale attuale
        let giorniMese = new Date(anno, mese, 0).getDate() //recupero i giorni del mese
        for (let i = 1; i <= giorniMese; i++) {
            giorno.setDate(i)
            //if (giorno.getDay()!==6 && giorno.getDay()!==0) {
                let colgiorno = {
                    text:i.toString().padStart(2,'00'), width: Ext.global.Vars.infoUser.theme==='default'?60:80,
                    dataIndex: 'g'+i, align: 'right', draggable: false,sortable: false,summaryType: 'sum',
                    renderer: function (v) {
                        return Ext.util.Format.number(v, '0,000');
                    },
                    summaryRenderer: function (value) {
                        let tmp = Ext.util.Format.number(value, '0,000 ');
                        return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
                    }
                }
                this.columns.push(colgiorno)
           // }
        }
        this.columns.push({
            text:Locale.t("stver.grids.mese.columns.totmese"), width: 100,
            dataIndex: 'totmese', align: 'right', draggable: false, sortable:false,summaryType: 'sum',
            renderer: function (v) {
                return Ext.util.Format.number(v, '0,000');
            },
            summaryRenderer: function (value) {
                let tmp = Ext.util.Format.number(value, '0,000 ');
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
            }
        })

        //creo tabs
        this.cardAndamentoMese = Ext.create("stver.view.forms.mese.cards.Andamento",{
            nometab:'andamento'
        });
        this.gridAndamentoMese = Ext.create("stver.view.forms.mese.cards.GridMese", {
            region: "center",
            flex: 1,
            columns: this.columns
        });
        this.cardAndamentoMese.add(this.gridAndamentoMese);
        vm.set('title',Locale.t('stver.forms.andamento.titlemese'))
        //grafico andamento
        this.cardGraficoMese = Ext.create("stver.view.forms.mese.cards.Grafico",{
            nometab:'grafico'
        });
        //grafico progressivo
        this.cardGraficoprog = Ext.create("stver.view.forms.mese.cards.GraficoProg",{
            nometab:'graficoprog'
        });
        this.form.on("tabchange", "onTabChangeMese");
        this.form.add(this.cardAndamentoMese);
        this.form.add(this.cardGraficoMese);
        this.form.add(this.cardGraficoprog);
        this.form.addDocked(this.toolbar);
        this.form.setActiveTab(0) //attivo il tab x colore tasto
        this.getView().setActiveItem(this.form);
    },
    //cambio tab
    onTabChangeMese:function(tabpanel,newcard) {
        let me = this, vm = this.getViewModel()
        vm.set("tabattivo", 0) //imposto tab attivo il primo
        if (newcard.nometab==='grafico') {
            vm.set("tabattivo", 1) //imposto tab attivo il secondo
            me.reloadChartMese()
        } else {
            if (newcard.nometab==='graficoprog') {
                vm.set("tabattivo", 2) //imposto tab attivo il secondo
                me.reloadChartMeseProg()
            } else {
                let store=this.gridAndamentoMese.getStore()
                if (store && store.getProxy().extraParams) {
                    store.getProxy().extraParams.stabilimento = vm.get("stabilimento")
                    store.getProxy().extraParams.tipo =vm.get('tipo')
                    store.getProxy().extraParams.semi =vm.get('semi')
                    store.getProxy().extraParams.anno =vm.get('anno')
                    store.reload()
                }
            }
        }
    },
    reloadGrid: function () {
        let vm = this.getViewModel()
        if (vm.get("tabattivo")===1) {
            this.reloadChartMese()
        } else {
            if (vm.get("tabattivo")===2) {
                this.reloadChartMeseProg()
            } else {
                this.gridAndamentoMese.getStore().reload();
            }
        }
    },
    //grafico mese
    reloadChartMese:function() {
        let me = this,vm = this.getViewModel()
        me.view.el.mask(Locale.t('global.actions.incorso'));
        Ext.Ajax.request({
            method: 'GET',
            params: {stabilimento: vm.get("stabilimento"),tipo:vm.get("tipo"),semi:vm.get("semi"),anno:vm.get("anno")},
            url: Backend.REST_API  + 'grids/mese/getgrafico/',
            success: function (record) {
                let datibackend = Ext.decode(record.responseText);
                me.view.el.unmask()
                me.loadChartMese(datibackend.data)
            },
            failure: function () {
                me.loadChartMese(null)
            }
        });
    },
    loadChartMese: function (rec) {
        let me = this,vm = this.getViewModel()
        let chartStore = [],line;
        //ciclo i giorni del mese x escludere sabato e domenica
        let giorno = new Date(), oggi = new Date()
        let mese = giorno.getMonth()+1,anno=giorno.getFullYear(); //recupero mese e anno attuale attuale
        let giorniMese = new Date(anno, mese, 0).getDate() //recupero i giorni del mese
        //carico lo store con info
        if (rec && rec.length>0) {
            for (let i = 0; i < 4; i++) {
                for (let y = 1; y <= giorniMese; y++) {
                    giorno.setDate(y)
                    //escludo sabato e domenica
                    if (giorno.getDay()!==6 && giorno.getDay()!==0) {
                        if (i === 0) {
                            chartStore[y] = {};
                        }
                        line = chartStore[y];
                        if (vm.get("tipo")===2) {
                            line['day'] =y
                        } else {
                            line['day'] =y+"\n"+rec[3]['qta' +y]+"%";
                        }
                        line['data' + i] = parseInt(rec[i]['qta' + y]);
                    }
                }
            }
            if (me.cardGraficoMese.series) {
                me.cardGraficoMese.series[0].setTitle('1')
            }
            let store = me.cardGraficoMese.items.items[0].getStore();
            store.setData(store.generateData(chartStore));
            me.cardGraficoMese.items.items[0].redraw();
        }
        me.cardGraficoMese.items.items[0].setLegend({
            docked: 'right'
        })
    },
    onAxisLabelRenderMese: function (axis, label) {
        let l =  label.toFixed(label < 10 ? 1: 0);
        return Ext.util.Format.number(l,'0,000');
    },
    onSeriesTooltipRenderMese: function (tooltip, record, item) {
        let title = item.series.getTitle();
        let l =  record.get(item.series.getYField());
        let voce=record.get('day')
        if (item.field!=='data0') {
            voce=voce.substring(0, voce.indexOf("\n"))
        }
        tooltip.setHtml(title + ' on ' + voce + ': ' +
            Ext.util.Format.number(l,'0,000'));
    },
    //grafico progressivo
    reloadChartMeseProg:function() {
        let me = this,vm = this.getViewModel()
        me.view.el.mask(Locale.t('global.actions.incorso'));
        Ext.Ajax.request({
            method: 'GET',
            params: {stabilimento: vm.get("stabilimento"),tipo:vm.get("tipo"),semi:vm.get("semi"),anno:vm.get("anno")},
            url: Backend.REST_API  + 'grids/mese/getgraficoprog/',
            success: function (record) {
                let datibackend = Ext.decode(record.responseText);
                me.view.el.unmask()
                me.loadChartmeseProg(datibackend.data)
            },
            failure: function () {
                me.loadChartmeseProg(null)
            }
        });
    },
    loadChartmeseProg: function (rec) {
        let me = this,vm = this.getViewModel()
        let chartStore = [],line;
        //ciclo i giorni del mese x escludere sabato e domenica
        let giorno = new Date(), oggi = new Date()
        let mese = giorno.getMonth()+1,anno=giorno.getFullYear(); //recupero mese e anno attuale attuale
        let giorniMese = new Date(anno, mese, 0).getDate() //recupero i giorni del mese
        //carico lo store con info
        if (rec && rec.length>0) {
            for (let i = 0; i < 1; i++) {
                for (let y = 1; y <= giorniMese; y++) {
                    giorno.setDate(y)
                    //escludo sabato e domenica
                    if (giorno.getDay()!==6 && giorno.getDay()!==0) {
                        if (i === 0) {
                            chartStore[y] = {};
                        }
                        line = chartStore[y];
                        if (vm.get("tipo")===2) {
                            line['day'] =y
                        } else {
                            line['day'] =y//+"\n"+rec[1]['qta' +y]+"%";
                        }
                        line['data' + i] = parseInt(rec[i]['qta' + y]);
                    }
                }
            }
            if (me.cardGraficoprog.series) {
                me.cardGraficoprog.series[0].setTitle('1')
            }
            let store = me.cardGraficoprog.items.items[0].getStore();
            store.setData(store.generateData(chartStore));
            me.cardGraficoprog.items.items[0].redraw();
        }
        me.cardGraficoprog.items.items[0].setLegend({
            docked: 'right'
        })
    },
    onAxisLabelRenderProg: function (axis, label) {
        let l =  label.toFixed(label < 10 ? 1: 0);
        return Ext.util.Format.number(l,'0,000');
    },
    onSeriesTooltipRenderProg: function (tooltip, record, item) {
        let title = item.series.getTitle();
        let l =  record.get(item.series.getYField());
        let voce=record.get('day')
        if (item.field!=='data0') {
            voce=voce.substring(0, voce.indexOf("\n"))
        }
        tooltip.setHtml(title + ' on ' + voce + ': ' +
            Ext.util.Format.number(l,'0,000'));
    },
    //filtri
    onChangeStabilimento:function(rdg,newval) {
        let vm = this.getViewModel()
        vm.set("stabilimento",newval)
        if (vm.get("tabattivo")===1) {
            this.reloadChartMese()
        } else {
            if (vm.get("tabattivo")===2) {
                this.reloadChartMeseProg()
            } else {
                let store=this.gridAndamentoMese.getStore()
                if (store) {
                    store.getProxy().extraParams.stabilimento = newval
                    store.load()
                }
            }
        }
    },
    onChangeTipo:function(rdg,newval) {
        let vm = this.getViewModel()
        vm.set("tipo",newval)
        if (newval===2) {
            vm.set("hidesemi", false) //radio articolo/famiglie
        } else {
            vm.set("hidesemi", true) //radio articolo/famiglie
        }
        if (vm.get("tabattivo")===1) {
            this.reloadChartMese()
        } else {
            if (vm.get("tabattivo")===2) {
                this.reloadChartMeseProg()
            } else {
                let store=this.gridAndamentoMese.getStore()
                if (store) {
                    store.getProxy().extraParams.tipo = newval
                    store.load()
                }
            }
        }
    },
    onChangeSemi:function(rdg,newval) {
        let vm = this.getViewModel()
        vm.set("semi",newval)
        if (vm.get("tabattivo")===1) {
            this.reloadChartMese()
        } else {
            if (vm.get("tabattivo")===1) {
                this.reloadChartMeseProg()
            } else {
                let store=this.gridAndamentoMese.getStore()
                if (store) {
                    store.getProxy().extraParams.semi = newval
                    store.load()
                }
            }
        }
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
            let totalCount = this.gridAndamentoMese.down("#totalCount");
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