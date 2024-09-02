/**
 * Created by luca on 16/07/2018.
 */
Ext.define('stt.view.forms.vendite.Controller', {
    extend: "portal.v1.view.forms.singleForm.Controller",
    mixins: ["portal.v1.global.Util"],
    alias: "controller.v1-stt-vendite",
    requires: [
        'Ext.form.FieldSet',
        'Ext.util.Format'
    ],
    init: function () {
        let vm = this.getViewModel()
        vm.set("tabattivo", 0);
        vm.set("hidesemi", true); //default nascondo radio semi/famiglie
        this.callParent(arguments);

    },
    onAfterRender: function () {
        let me = this;
        me.getView().setActiveItem(me.form);
        me.managerView();
    },
    beforeloadAnno:function(s) {
        let view = this.getView()
        let vm = this.getViewModel()
        if (view.infoNode) {
           // s.proxy.extraParams.stabilimento =vm.get('stabilimento')
        }
    },
    managerView: function () {
        let vm = this.getViewModel()
        this.callParent(arguments);
        //if (this.checkRuoli(['1']) && this.checkRuoli(['2'])) {
          //  hidefiltrostab=false
        //}
        //creo toolbar con filtr
        this.toolbar = Ext.create("Ext.Toolbar", {
            items: [
                { handler: "reloadGrid", iconCls: " pictos pictos-refresh" }
            ]
        });
        //creo tabs
        this.cardAndamento = Ext.create("stt.view.forms.vendite.cards.Andamento",{
            nometab:'andamento'
        });
        this.gridAndamento = Ext.create("stt.view.forms.vendite.cards.GridAnno", {
            region: "center",
            flex: 1,
        });
        this.cardAndamento.add(this.gridAndamento);
        vm.set('title',Locale.t('stt.forms.vendite.title'))
        //grafico
        this.cardGrafico = Ext.create("stt.view.forms.vendite.cards.Grafico",{
            nometab:'grafico',hidden:true,
        });
        this.form.on("tabchange", "onTabChange");
        this.form.add(this.cardAndamento);
        this.form.add(this.cardGrafico);
        this.form.addDocked(this.toolbar);
        this.form.setActiveTab(0) //attivo il tab x colore tasto
        this.getView().setActiveItem(this.form);
    },
    //cambio tab
    onTabChange:function(tabpanel,newcard) {
        let me = this, vm = this.getViewModel()
        vm.set("tabattivo", 0) //imposto tab attivo il primo
        if (newcard.nometab==='grafico') {
            vm.set("tabattivo", 1) //imposto tab attivo il secondo
            //me.reloadChart()
        } else {
            /*
            let store=this.gridAndamento.getStore()
            if (store && store.getProxy().extraParams) {
                store.getProxy().extraParams.stabilimento = vm.get("stabilimento")
                store.getProxy().extraParams.tipo =vm.get('tipo')
                store.getProxy().extraParams.semi =vm.get('semi')
                store.reload()
            }

             */
        }
    },
    reloadGrid: function () {
        let vm = this.getViewModel()
        if (vm.get("tabattivo")===1) {
            this.reloadChart()
        } else {
            this.gridAndamento.getStore().reload();
        }
    },
    reloadChart:function() {
        let me = this,vm = this.getViewModel()
        me.view.el.mask(Locale.t('global.actions.incorso'));
        Ext.Ajax.request({
            method: 'GET',
            params: {stabilimento: vm.get("stabilimento"),tipo:vm.get("tipo"),semi:vm.get("semi")},
            url: Backend.REST_API  + 'grids/anno/getgrafico/',
            success: function (record) {
                let datibackend = Ext.decode(record.responseText);
                me.view.el.unmask()
                me.loadChart(datibackend.data)
            },
            failure: function () {
                me.loadChart(null)
            }
        });
    },
    //grafico
    loadChart: function (rec) {
        let me = this,vm = this.getViewModel()
        let chartStore = [],line,pos;
        //carico lo store con info
        if (rec && rec.length>0) {
            for (let i = 0; i < 3; i++) {
                for (let y = 1; y < 13; y++) {
                    if (i === 0) {
                        chartStore[y] = {};
                    }
                    line = chartStore[y];
                    pos = this.zeroPad(y, '00');
                    if (vm.get("tipo")===2) {
                        line['month'] = this.checkMounth(y)
                    } else {
                        line['month'] = this.checkMounth(y)+"\n"+rec[3]['qta' +pos]+"%";
                    }
                    line['data' + i] = parseInt(rec[i]['qta' + pos]);
                }
            }
            if (me.cardGrafico.series) {
                me.cardGrafico.series[0].setTitle('')
            }
            let store = me.cardGrafico.items.items[0].getStore();
            store.setData(store.generateData(chartStore));
            me.cardGrafico.items.items[0].redraw();
        }
        me.cardGrafico.items.items[0].setLegend({
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
        if (item.field!=='data0') {
            voce=voce.substring(0, voce.indexOf("\n"))
        }
        tooltip.setHtml(title + ' a ' + voce + ': ' +
            Ext.util.Format.number(l,'0,000'));
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
            this.reloadChart()
        } else {
            let store=this.gridAndamento.getStore()
            if (store) {
                store.getProxy().extraParams.tipo = newval
                store.load()
            }
        }
    },
    // -----------------------------------------------
    onafterrendergrid: function (grid) {
        //assegno titolo alla colonna
        let oggi = new Date(), anno=oggi.getFullYear()-1,annoprec=oggi.getFullYear()-2,oldanno=oggi.getFullYear()-3
        let colonne = grid.getColumns()
        colonne[4].setText(anno)
        colonne[5].setText(annoprec)
        colonne[8].setText(oldanno)
    },
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
            let totalCount = this.gridAndamento.down("#totalCount");
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