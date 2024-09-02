/**
 * Created by luca on 16/07/2018.
 */
Ext.define('sting.view.forms.ingresso.Controller', {
    extend: "portal.v1.view.forms.singleForm.Controller",
    mixins: ["portal.v1.global.Util",'sting.view.forms.ingresso.components.ControllerFiltri'],
    alias: "controller.v1-sting-ingresso",
    requires: [
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.layout.container.HBox',
        'Ext.util.Format',
        'sting.view.forms.ingresso.cards.Andamento',
        'sting.view.forms.ingresso.cards.GridIngressi',
        'sting.view.forms.ingresso.filtri.Articolo',
        'sting.view.forms.ingresso.filtri.Fornitore',
        'sting.view.forms.ingresso.grafici.GraficoIng'
    ],
    init: function () {
        let vm = this.getViewModel()
        //imposto valori dei filtri x l'esportazione e grafico
        vm.set("cdfor", '');
        vm.set("cdart", '');
        vm.set("tipo", '');
        vm.set("mese", ''); //x etichette
        //filtri tab
        vm.set("tabattivo", 0); //tab attivo
        this.callParent(arguments);

    },
    onAfterRender: function () {
        let me = this;
        me.getView().setActiveItem(me.form);
        me.managerView();
    },
    managerView: function () {
        let me=this,vm = this.getViewModel()
        this.callParent(arguments);
        //filtri
        this.fornitore=Ext.create('sting.view.forms.ingresso.filtri.Fornitore')
        this.articolo=Ext.create('sting.view.forms.ingresso.filtri.Articolo')
        this.checkattach=Ext.create({xtype: 'checkbox',width:120, fieldLabel:'Tipo', boxLabel: Locale.t('sting.forms.filtri.ko'), checked:false,
            listeners:{
                change:'onChangeTipo'
            }
        })
       // this.excel=Ext.create('stcom.view.forms.vendite.components.espExcel')
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
                                this.fornitore,this.articolo,this.checkattach
                            ]
                        }
                    ]
                },
            ]
        });
        if (this.checkRuoli(['99','20'])){
         //   this.toolbar.add(this.excel)
        }
        //creo tabs
        this.cardAndamento = Ext.create("sting.view.forms.ingresso.cards.Andamento",{
            nometab:'andamentoingressi'
        });
        this.gridIngressi = Ext.create("sting.view.forms.ingresso.cards.GridIngressi", {
            region: "center",
            flex: 1,
        });
        //assegno nomi alla grid
        let giorno = new Date()
        let anno=giorno.getFullYear(),annoprec=giorno.getFullYear()-1,mese=giorno.getMonth()+1; //recupero mese e anno attuale attuale
        //imposto titoli colonna principale
        let numcol=1
        for (let i = mese+1, l=12; i <= l; i++) {
            vm.set("mese"+numcol.toString(), i.toString().padStart(2, "0")+'/'+annoprec.toString());
            numcol=numcol+1
        }
        for (let i = 1, l=mese; i <= l; i++) {
            vm.set("mese"+numcol.toString(), i.toString().padStart(2, "0")+'/'+anno.toString());
            numcol=numcol+1
        }
        this.cardAndamento.add(this.gridIngressi);
        vm.set('title',Locale.t('sting.forms.ingresso.title'))
        //grafico
        this.cardGraficoIng = Ext.create("sting.view.forms.ingresso.grafici.GraficoIng",{
            nometab:'graficoing'
        });
        this.form.on("tabchange", "onTabChange");
        this.form.add(this.cardAndamento);
        this.form.add(this.cardGraficoIng);
        this.form.addDocked(this.toolbar);
        this.form.setActiveTab(0) //attivo il tab x colore tasto
        this.getView().setActiveItem(this.form);
    },
    //cambio tab
    onTabChange:function(tabpanel,newcard) {
        let me = this, vm = this.getViewModel()
        vm.set("tabattivo", 0) //imposto tab attivo il primo
        if (newcard.nometab==='graficoing') {
            vm.set("tabattivo", 1) //imposto tab attivo il secondo
            me.reloadChartIng()
        } else {
            let store=this.gridIngressi.getStore()
            if (store && store.getProxy().extraParams) {
                //recupero i filtri
                store.getProxy().extraParams.cdart = vm.get('cdart')
                store.getProxy().extraParams.cdfor = vm.get('cdfor')
                store.getProxy().extraParams.mese = vm.get('mese')
                store.reload()
            }
        }
    },
    reloadGrid: function () {
        let vm = this.getViewModel()
        if (vm.get("tabattivo")===1) {
            this.reloadChartIng()
        } else {
            this.gridIngressi.getStore().reload();
        }
    },
    reloadChartIng:function() {
        let me = this,vm = this.getViewModel()
        //recupero i filtri
        let cdfor=vm.get('cdfor')
        let cdart= vm.get('cdart')
        let tipo= vm.get('tipo')
        me.view.el.mask(Locale.t('global.actions.incorso'));
        Ext.Ajax.request({
            method: 'GET',
            params: {cdfor:cdfor,cdart:cdart,tipo:tipo},
            url: Backend.REST_API  + 'grids/ingressi/getgraficoing/',
            success: function (record) {
                let datibackend = Ext.decode(record.responseText);
                me.view.el.unmask()
                me.loadChartIng(datibackend.data)
            },
            failure: function () {
                me.loadChartIng(null)
            }
        });
    },
    //grafico
    loadChartIng: function (rec) {
        let me = this,vm = this.getViewModel()
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
                    line['month'] = vm.get("mese"+y.toString())+"\n"+rec[2]['qta' +pos]+"%";
                    line['data' + i] = parseFloat(rec[i]['qta' + pos]).toFixed(2);
                }
            }
            if (me.cardGraficoIng.items.items[0].series) {
                me.cardGraficoIng.items.items[0].series[0].setTitle('Ingressi')
                me.cardGraficoIng.items.items[0].series[1].setTitle('Incidenti')
            }
            let store = me.cardGraficoIng.items.items[0].getStore();
            store.setData(store.generateData(chartStore));
            me.cardGraficoIng.items.items[0].redraw();
        }
        me.cardGraficoIng.items.items[0].setLegend({
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
            Ext.util.Format.number(l,'0,000'));
    },
    // -----------------------------------------------
    onafterrendergrid: function (grid) { },
    onLoadStore: function (store, records, success) {

    },
    onBeforeLoad: function (store) {
        if (store.isLoading()) return false;
    }
})