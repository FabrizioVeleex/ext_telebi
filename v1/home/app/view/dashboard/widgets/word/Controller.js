/**
 * Created by luke on 08/09/21.
 */
Ext.define('home.view.dashboard.widgets.word.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.v1-word',
    mixins: ['portal.v1.global.Util'],

    requires: [
        'Ext.button.Button',
        'Ext.form.FieldSet',
        'Ext.grid.column.Template',
        'Ext.layout.container.VBox',
        'Ext.panel.Panel',
        'Ext.tab.Panel',
        'Ext.toolbar.Fill',
        'Ext.toolbar.Toolbar',
        'Ext.util.Format',
        'home.view.dashboard.widgets.word.view.fatturato.Grid',
        'home.view.dashboard.widgets.word.view.fatturatoanno.Grid',
        'home.view.dashboard.widgets.word.view.main.Chart',
        'home.view.dashboard.widgets.word.view.main.Grid',
        'home.view.dashboard.widgets.word.view.main.fields.Cliente',
        'home.view.dashboard.widgets.word.view.main.fields.Linea',
        'home.view.dashboard.widgets.word.view.main.fields.Tipo',
        'home.view.dashboard.widgets.word.view.ordinato.Grid',
        'home.view.dashboard.widgets.word.view.parametri.Panel',
        'home.view.dashboard.widgets.word.view.residuo.Grid'
    ],
    /**
     * Called when the view is created
     */
    init: function() {
        this.firstLoad =true
        this.mainPanel = Ext.create('Ext.panel.Panel', {
            layout: {
                type: "vbox", align: "stretch"
            },
        })
        this.toolBar = Ext.create('Ext.Toolbar', {
            items: [
                {iconCls: 'pictos pictos-refresh', handler: 'onReloadGrid'},
                {xtype: 'v1-word-cliente'}, //ricerca cliente
                {xtype: 'button', iconCls: 'fas fa-times',defaultType: 'splitbutton',handler: 'onClearCli'},
                {xtype: 'fieldset', collapsible: false, collapsed: false, title: '',
                    style: {'background-color': "transparent;"},
                    padding:'1 1 1 1',
                    items: [
                        {xtype: 'v1-word-tipo'}//tipo
                    ]
                },
                /*
                {xtype: 'fieldset', collapsible: false, collapsed: false, title: '',
                    style: {'background-color': "transparent;"},
                    padding:'1 1 1 1',
                    items: [
                        {xtype: 'v1-word-linea'}//radio linea vendita
                    ]
                }
                 */
            ]
        })
        //colonne grid
    },
    //primo caricamento store grid quando è visibile
    onActivate: function (){
        if (this.firstLoad ===false){
            this.loadElenco()
            this.firstLoad = true
        }
    },
    //creazione pannello
    onAfterRender: function () {
        this.firstLoad = false
        let vm = this.getViewModel()
        vm.set('widget', this.getView().widget);
        //se ha siccom e rolcar gli dò scelta
        if (this.checkRuoliWidget(['4'], this.getView().widget) && this.checkRuoliWidget(['5'], this.getView().widget)) {
            this.toolBar.add( {xtype: 'fieldset', collapsible: false, collapsed: false, title: '',
                style: {'background-color': "transparent;"},
                padding:'1 1 1 1',
                items: [
                    {xtype: 'v1-word-linea'}//radio linea vendita
                ]
            })
        } else {
            //imposto la linea
            let linea = 4 //non vedo nulla
            if (this.checkRuoliWidget(['4'], this.getView().widget)) {
                linea=2
            }
            if (this.checkRuoliWidget(['5'], this.getView().widget)) {
                linea=1
            }
            vm.set('linea',linea)
        }
        if (this.checkRuoliWidget(['0'], this.getView().widget) && this.checkRuoliWidget(['1'], this.getView().widget)) {
            //Italia/estero
            this.columns = [
                {text: Locale.t('word.column.anno'), width: 60, dataIndex: 'wfanno',resizable: false, draggable: false},
                {text: Locale.t('word.column.tot'),columns:[
                        {text: Locale.t('word.column.italia'),width:Ext.global.Vars.infoUser.theme==='default'?120:150,xtype: 'templatecolumn', tpl: '{totIT}',resizable:true,draggable:false,sortable:false,align:'right'},
                        {text: Locale.t('word.column.estero'),width:Ext.global.Vars.infoUser.theme==='default'?120:150,xtype: 'templatecolumn', tpl: '{totEE}',resizable:true,draggable:false,sortable:false,align:'right'},
                        {text: Locale.t('word.column.totale'),width:Ext.global.Vars.infoUser.theme==='default'?130:160,xtype: 'templatecolumn', tpl: '{fattglobale}',resizable:true,draggable:false,sortable:false,align:'right'}
                    ]},
                {text: Locale.t('word.column.ultimi'),columns:[
                        {text: Locale.t('word.column.italia'),width:Ext.global.Vars.infoUser.theme==='default'?120:150,xtype: 'templatecolumn', tpl: '{ultimiIT}',resizable:true,draggable:false,sortable:false,align:'right'},
                        {text: Locale.t('word.column.estero'),width:Ext.global.Vars.infoUser.theme==='default'?120:150,xtype: 'templatecolumn', tpl: '{ultimiEE}',resizable:true,draggable:false,sortable:false,align:'right'},
                        {text: Locale.t('word.column.totale'),width:Ext.global.Vars.infoUser.theme==='default'?130:160,xtype: 'templatecolumn', tpl: '{ultimiglobale}',resizable:true,draggable:false,sortable:false,align:'right'}
                    ]},
                {text: Locale.t('word.column.attuale'),columns:[
                        {text: Locale.t('word.column.italia'),width:Ext.global.Vars.infoUser.theme==='default'?120:150,xtype: 'templatecolumn', tpl: '{attualeIT}',resizable:true,draggable:false,sortable:false,align:'right'},
                        {text: Locale.t('word.column.estero'),width:Ext.global.Vars.infoUser.theme==='default'?120:150,xtype: 'templatecolumn', tpl: '{attualeEE}',resizable:true,draggable:false,sortable:false,align:'right'},
                        {text: Locale.t('word.column.totale'),width:Ext.global.Vars.infoUser.theme==='default'?130:160,xtype: 'templatecolumn', tpl: '{meseglobale}',resizable:true,draggable:false,sortable:false,align:'right'}
                    ]},
                {text: Locale.t('word.column.ordinato'),columns:[
                        {text: Locale.t('word.column.italia'),width:Ext.global.Vars.infoUser.theme==='default'?120:150,xtype: 'templatecolumn', tpl: '{ordIT}',resizable:true,draggable:false,sortable:false,align:'right'},
                        {text: Locale.t('word.column.estero'),width:Ext.global.Vars.infoUser.theme==='default'?120:150,xtype: 'templatecolumn', tpl: '{ordEE}',resizable:true,draggable:false,sortable:false,align:'right'},
                        {text: Locale.t('word.column.totale'),width:Ext.global.Vars.infoUser.theme==='default'?130:160,xtype: 'templatecolumn', tpl: '{ordglobale}',resizable:true,draggable:false,sortable:false,align:'right'}
                    ]},
                {text: Locale.t('word.column.ordinatosucc'),columns:[
                        {text: Locale.t('word.column.italia'),width:Ext.global.Vars.infoUser.theme==='default'?120:150,xtype: 'templatecolumn', tpl: '{ordsuccIT}',resizable:true,draggable:false,sortable:false,align:'right'},
                        {text: Locale.t('word.column.estero'),width:Ext.global.Vars.infoUser.theme==='default'?120:150,xtype: 'templatecolumn', tpl: '{ordsuccEE}',resizable:true,draggable:false,sortable:false,align:'right'},
                        {text: Locale.t('word.column.totale'),width:Ext.global.Vars.infoUser.theme==='default'?130:160,xtype: 'templatecolumn', tpl: '{ordsuccglobale}',resizable:true,draggable:false,sortable:false,align:'right'}
                    ]}
            ]

        } else if (this.checkRuoliWidget(['0'], this.getView().widget)) {
            //Italia
            this.columns = [
                {text: Locale.t('word.column.anno'), width: 60, dataIndex: 'wfanno',resizable: false, draggable: false},
                {text: Locale.t('word.column.tot'),width:Ext.global.Vars.infoUser.theme==='default'?120:150,dataIndex: 'totIT',resizable:true,draggable:false,sortable:false,align:'right'},
                {text: Locale.t('word.column.ultimi'),width:Ext.global.Vars.infoUser.theme==='default'?120:150,dataIndex: 'ultimiIT',resizable:true,draggable:false,sortable:false,align:'right'},
                {text: Locale.t('word.column.attuale'),width:Ext.global.Vars.infoUser.theme==='default'?120:150,dataIndex: 'attualeIT',resizable:true,draggable:false,sortable:false,align:'right'},
                {text: Locale.t('word.column.ordinato'),width:Ext.global.Vars.infoUser.theme==='default'?120:150,dataIndex: 'ordIT',resizable:true,draggable:false,sortable:false,align:'right'},
                {text: Locale.t('word.column.ordinatosucc'),width:Ext.global.Vars.infoUser.theme==='default'?120:150,dataIndex: 'ordsuccIT',resizable:true,draggable:false,sortable:false,align:'right'}
            ]
        } else {
            //Estero
            this.columns= [
                {text: Locale.t('word.column.anno'), width: 60, dataIndex: 'wfanno',resizable: false, draggable: false},
                {text: Locale.t('word.column.tot'),width:Ext.global.Vars.infoUser.theme==='default'?120:150,dataIndex: 'totEE',resizable:true,draggable:false,sortable:false,align:'right'},
                {text: Locale.t('word.column.ultimi'),width:Ext.global.Vars.infoUser.theme==='default'?120:150,dataIndex: 'ultimiEE',resizable:true,draggable:false,sortable:false,align:'right'},
                {text: Locale.t('word.column.attuale'),width:Ext.global.Vars.infoUser.theme==='default'?120:150,dataIndex: 'attualeEE',resizable:true,draggable:false,sortable:false,align:'right'},
                {text: Locale.t('word.column.ordinato'),width:Ext.global.Vars.infoUser.theme==='default'?120:150,dataIndex: 'ordEE',resizable:true,draggable:false,sortable:false,align:'right'},
                {text: Locale.t('word.column.ordinatosucc'),width:Ext.global.Vars.infoUser.theme==='default'?120:150,dataIndex: 'ordsuccEE',resizable:true,draggable:false,sortable:false,align:'right'}
            ]
        }
        this.grid = Ext.create('home.view.dashboard.widgets.word.view.main.Grid', {
            height:300,
            bind: {
                store: '{store}'
            },
            dockedItems: [
                this.toolBar
            ],
            columns: this.columns,
            listeners:{
                afterRender: 'onActivate',
                cellclick: 'onCellClick'
            }
        })
        //parametri
        if (this.checkRuoliWidget(['10'], this.getView().widget)) {
            this.toolBar.add({xtype: 'tbfill'});
            this.toolBar.add({
                iconCls: 'fas fa-cog',
                handler: 'onOpenParam'
            });
        }
        this.mainPanel.add(this.grid)
        this.getView().add(this.mainPanel)
    },
    //pannello
    loadElenco: function () {
        let me = this,vm = this.getViewModel()
        let cdcli = vm.get('cdcli'), linea = vm.get('linea'), tipo = vm.get('tipo')
        if (this.firstLoad === false){
            this.myMask = new Ext.LoadMask({
                msg    : 'Please wait...',
                target : me.grid
            });
            this.myMask.show();
        }else{
            this.firstLoad=false
        }
        Ext.Ajax.request({
            method: 'POST',
            params: {cdcli: cdcli,tipo:tipo,linea:linea},
            url: Backend.REST_VERSION + 'widgets/word/getstore',
            success: function (record) {
                let rec = Ext.decode(record.responseText);
                me.grid.reconfigure(rec.store, me.columns)
                me.getView().setTitle(Locale.t('word.title') + rec.updata)
                if (me.myMask) {
                    me.myMask.hide();
                }
                me.loadChart(rec.store)
            },
            failure: function () {
                Ext.Msg.show({
                    title: Locale.t('global.attenzione'),
                    msg: rec['msg'],
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR
                })
                me.loadChart(null)
            }
        });
    },
    //refresh grid e filtri
    onReloadGrid: function () {
        this.loadElenco()
    },
    //grafico
    loadChart: function (rec) {
        let chartStore = [],chartStoreIt = [],chartStoreEe = [], line,lineIt,lineEe, pos,  widget = this.getView().widget;
        //carico lo store con info
        if (rec && rec.length>0) {
            //imposto di default i 3 anni x escludere il residuo
            for (let i = 0; i < 3; i++) {
                for (let y = 1; y < 13; y++) {
                    if (i === 0) {
                        chartStore[y] = {};
                        chartStoreIt[y] = {};
                        chartStoreEe[y] = {};
                    }

                    line = chartStore[y];
                    lineIt = chartStoreIt[y];
                    lineEe = chartStoreEe[y];
                    pos = this.zeroPad(y, '00');

                    line['month'] = this.checkMounth(y);
                    line['data' + i] = parseInt(rec[i]['wffm' + pos]) + parseInt(rec[i]['wffm' + pos + 'e']);

                    lineIt['month'] = this.checkMounth(y);
                    lineIt['data' + i] = parseInt(rec[i]['wffm' + pos]);

                    lineEe['month'] = this.checkMounth(y);
                    lineEe['data' + i] = parseInt(rec[i]['wffm' + pos + 'e']);
                }
            }
            if (widget && this.checkRuoliWidget(['0'],widget) && this.checkRuoliWidget(['1'],widget)){
                if (!this.wordchart) {
                    this.wordchart = Ext.create('home.view.dashboard.widgets.word.view.main.Chart', {
                        title:Locale.t('word.italiaestero'),
                        iconCls:'fas fa-chart-line bd-word-color'
                    });
                    this.wordchartIt = Ext.create('home.view.dashboard.widgets.word.view.main.Chart', {
                        title:Locale.t('word.italia'),
                        iconCls:'fas fa-chart-line bd-word-color'
                    });
                    this.wordchartEe = Ext.create('home.view.dashboard.widgets.word.view.main.Chart', {
                        title:Locale.t('word.estero'),
                        iconCls:'fas fa-chart-line bd-word-color'
                    });
                    this.tabchart = Ext.create('Ext.tab.Panel', {
                        flex:1,
                        ui:'viola',
                        items:[
                            this.wordchart,
                            this.wordchartIt,
                            this.wordchartEe
                        ]
                    });
                    this.mainPanel.add(this.tabchart)
                }
                //setto in automatico anno della legenda
                if (this.wordchart.series) {
                    this.wordchart.series[0].setTitle(rec[0].wfanno);
                    this.wordchart.series[1].setTitle(rec[1].wfanno);
                    this.wordchart.series[2].setTitle(rec[2].wfanno);
                }
                if (this.wordchartIt.series) {
                    this.wordchartIt.series[0].setTitle(rec[0].wfanno);
                    this.wordchartIt.series[1].setTitle(rec[1].wfanno);
                    this.wordchartIt.series[2].setTitle(rec[2].wfanno);
                }
                if (this.wordchartEe.series) {
                    this.wordchartEe.series[0].setTitle(rec[0].wfanno);
                    this.wordchartEe.series[1].setTitle(rec[1].wfanno);
                    this.wordchartEe.series[2].setTitle(rec[2].wfanno);
                }
                let store = this.wordchart.getStore();
                let storeIt = this.wordchartIt.getStore();
                let storeEe = this.wordchartEe.getStore();
                store.setData(store.generateData(chartStore));
                storeIt.setData(storeIt.generateData(chartStoreIt));
                storeEe.setData(storeEe.generateData(chartStoreEe));
                this.wordchart.redraw();
                this.wordchartIt.redraw();
                this.wordchartEe.redraw();

            } else if (widget && this.checkRuoliWidget(['0'],widget)) { //IT
                if (!this.wordchartIt) {
                    this.wordchartIt = Ext.create('home.view.dashboard.widgets.word.view.main.Chart', {
                        title:Locale.t('word.italia'),
                        iconCls:'fas fa-chart-line bd-word-color'
                    });
                    this.tabchart = Ext.create('Ext.tab.Panel', {
                        ui:'viola',
                        items:[
                            this.wordchartIt
                        ]
                    });
                    this.mainPanel.add(this.tabchart)
                }
                //setto in automatico anno della legenda
                if (this.wordchartIt.series) {
                    this.wordchartIt.series[0].setTitle(rec[0].wfanno);
                    this.wordchartIt.series[1].setTitle(rec[1].wfanno);
                    this.wordchartIt.series[2].setTitle(rec[2].wfanno);
                }
                let store2 = this.wordchartIt.getStore();
                store2.setData(store2.generateData(chartStoreIt));
                this.wordchartIt.redraw();
            } else { //EE
                if (!this.wordchartEe) {
                    this.wordchartEe = Ext.create('home.view.dashboard.widgets.word.view.main.Chart', {
                        title:Locale.t('word.estero'),
                        iconCls:'fas fa-chart-line bd-word-color'
                    });
                    this.tabchart = Ext.create('Ext.tab.Panel', {
                        reference: 'wordchart',
                        ui:'viola',
                        items:[
                            this.wordchartEe
                        ]
                    });
                    this.mainPanel.add(this.tabchart)
                }
                //setto in automatico anno della legenda
                if (this.wordchartEe.series) {
                    this.wordchartEe.series[0].setTitle(rec[0].wfanno);
                    this.wordchartEe.series[1].setTitle(rec[1].wfanno);
                    this.wordchartEe.series[2].setTitle(rec[2].wfanno);
                }
                let store3 = this.wordchartEe.getStore();
                store3.setData(store3.generateData(chartStoreEe));
                this.wordchartEe.redraw();
            }
        }
    },
    onAxisLabelRender: function (axis, label) {
        let l =  label.toFixed(label < 10 ? 1: 0);
        return Ext.util.Format.currency(l, '€', 0);
    },
    onSeriesTooltipRender: function (tooltip, record, item) {
        let title = item.series.getTitle();
        let l =  record.get(item.series.getYField());
        tooltip.setHtml(title + ' on ' + record.get('month') + ': ' +
            Ext.util.Format.currency(l, '€', 0));
    },
    //filtri widgets
    onSelectCliente:function(cmb,rec) {
        let vm = this.getViewModel()
        vm.set('cdcli',rec.data.codice)
        this.loadElenco()
    },
    onClearCli:function() {
        let vm = this.getViewModel()
        vm.set('cdcli','')
        this.toolBar.items.items[1].setValue('') //pulisco combo
        this.loadElenco()
    },
    onChangeLinea:function(rdg,newval) {
        let vm = this.getViewModel()
        vm.set('linea',newval)
        this.loadElenco()
        //imposto colore sull'oggetto della toolbar
        let fldsettipo = this.toolBar.items.items[4]
        if (fldsettipo) { //coloro sfondo fieldset
            if (newval!==0) {
                fldsettipo.setStyle({
                    backgroundColor: '#FFE116'
                })
            } else {
                fldsettipo.setStyle({
                    backgroundColor: 'transparent'
                })
            }
        }
    },
    onChangeTipo:function(rdg,newval) {
        let vm = this.getViewModel()
        vm.set('tipo',newval)
        this.loadElenco()
    },
    //apertura dettagli
    onCellClick: function (cella,td,cellIndex,record,tr,rowIndex){
        let me =this;

        let colonne = this.grid.getColumns()
        let colonna = colonne[cellIndex].dataIndex
        if (!colonna) {
            let col= colonne[cellIndex].tpl.html
            col = col.replace('{', '')
            col = col.replace('}', '')
            colonna=col
        }
        if (rowIndex===2) {

            switch(colonna) {
                case 'ultimiIT': //fatturato anno italiano
                case 'ultimiEE': //fatturato anno estero
                    me.onOpenFatturatoAnno(colonna)
                    break
                case 'attualeIT': //fatturato italiano
                case 'attualeEE': //fatturato estero
                    me.onOpenFatturato(colonna)
                    break
                case 'ordIT': //ordinato italiano
                case 'ordEE': //ordinato estero
                case 'ordsuccIT': //ordinato italiano mese successivo
                case 'ordsuccEE': //ordinato estero mese successivo
                    me.onOpenOrdinato(colonna)
                    break
            }
        } else {
            //residui
            if (rowIndex===3) {
                if (colonna==='ordIT' || colonna==='ordEE') {
                    me.onOpenResiduo(colonna)
                }
            }
        }
    },
    onOpenFatturatoAnno:function(colonna) {
        let vm = this.getViewModel()
        if (this.fatturatoanno){
            this.fatturatoanno.destroy()
        }
        let titolo = Locale.t('word.dettaglio.ultimitit')+' '+Locale.t('word.italia')+' - '
        if (colonna==='ultimiEE') {
            titolo = Locale.t('word.dettaglio.ultimitit')+' '+Locale.t('word.estero')+' - '
        }
        switch(vm.get('linea')) {
            case 0:
                titolo+=Locale.t('word.dettaglio.tutti')
                break
            case 1:
                titolo+=Locale.t('word.dettaglio.rolcar')
                break
            case 2:
                titolo+=Locale.t('word.dettaglio.siccom')
                break
            case 3:
                titolo+=Locale.t('word.dettaglio.triangolazione')
                break
        }
        titolo+='<br>'+Locale.t('word.dettaglio.fatturatoannotitolo')
        this.fatturatoanno = Ext.create('home.view.dashboard.widgets.word.view.fatturatoanno.Grid', {
            flex:1,
            valori: {
                linea:vm.get('linea'),
                cdcli:vm.get('cdcli'),
                colonna: colonna
            },
            title: titolo
        })
        this.fatturatoanno.on('close', this.onClosePannello, this);
        this.mainPanel.add(this.fatturatoanno)
        this.getView().setActiveItem(this.fatturatoanno) //imposto attivo
    },
    onOpenFatturato:function(colonna) {
        let vm = this.getViewModel()
        if (this.fatturato){
            this.fatturato.destroy()
        }
        let titolo = Locale.t('word.dettaglio.fatturatotit')+' '+Locale.t('word.italia')+' - '
        if (colonna==='attualeEE') {
            titolo = Locale.t('word.dettaglio.fatturatotit')+' '+Locale.t('word.estero')+' - '
        }
        switch(vm.get('linea')) {
            case 0:
                titolo+=Locale.t('word.dettaglio.tutti')
                break
            case 1:
                titolo+=Locale.t('word.dettaglio.rolcar')
                break
            case 2:
                titolo+=Locale.t('word.dettaglio.siccom')
                break
            case 3:
                titolo+=Locale.t('word.dettaglio.triangolazione')
                break
        }
        titolo+='<br>'+Locale.t('word.dettaglio.fatturatotitolo')
        this.fatturato = Ext.create('home.view.dashboard.widgets.word.view.fatturato.Grid', {
            flex:1,
            valori: {
                linea:vm.get('linea'),
                cdcli:vm.get('cdcli'),
                colonna: colonna
            },
            title: titolo
        })
        this.fatturato.on('close', this.onClosePannello, this);
        this.mainPanel.add(this.fatturato)
        this.getView().setActiveItem(this.fatturato) //imposto attivo
    },
    onOpenOrdinato:function(colonna) {
        let vm = this.getViewModel()
        if (this.ordinato){
            this.ordinato.destroy()
        }
        let titolo
        switch(colonna) {
            case 'ordIT':
                titolo=Locale.t('word.dettaglio.ordinato')+' '+Locale.t('word.italia')+' - '
                break
            case 'ordEE':
                titolo=Locale.t('word.dettaglio.ordinato')+' '+Locale.t('word.estero')+' - '
                break
            case 'ordsuccIT':
                titolo=Locale.t('word.dettaglio.ordinatosucc')+' '+Locale.t('word.italia')+' - '
                break
            case 'ordsuccEE':
                titolo=Locale.t('word.dettaglio.ordinatosucc')+' '+Locale.t('word.estero')+' - '
                break
        }
        switch(vm.get('linea')) {
            case 0:
                titolo+=Locale.t('word.dettaglio.tutti')
                break
            case 1:
                titolo+=Locale.t('word.dettaglio.rolcar')
                break
            case 2:
                titolo+=Locale.t('word.dettaglio.siccom')
                break
            case 3:
                titolo+=Locale.t('word.dettaglio.triangolazione')
                break
        }
        if (colonna==='ordIT' || colonna==='ordEE') {
            titolo+='<br>'+Locale.t('word.dettaglio.ordinatotitolo')
        } else {
            titolo+='<br>'+Locale.t('word.dettaglio.ordinatosucctitolo')
        }
        this.ordinato = Ext.create('home.view.dashboard.widgets.word.view.ordinato.Grid', {
            flex:1,
            valori: {
                linea:vm.get('linea'),
                cdcli:vm.get('cdcli'),
                colonna: colonna
            },
            title: titolo
        })
        this.ordinato.on('close', this.onClosePannello, this);
        this.mainPanel.add(this.ordinato)
        this.getView().setActiveItem(this.ordinato) //imposto attivo
    },
    onOpenResiduo:function(colonna) {
        let vm = this.getViewModel()
        if (this.residuo){
            this.residuo.destroy()
        }
        let titolo
        switch(colonna) {
            case 'ordIT':
                titolo=Locale.t('word.dettaglio.residuo')+' '+Locale.t('word.italia')+' - '
                break
            case 'ordEE':
                titolo=Locale.t('word.dettaglio.residuo')+' '+Locale.t('word.estero')+' - '
                break
        }
        switch(vm.get('linea')) {
            case 0:
                titolo+=Locale.t('word.dettaglio.tutti')
                break
            case 1:
                titolo+=Locale.t('word.dettaglio.rolcar')
                break
            case 2:
                titolo+=Locale.t('word.dettaglio.siccom')
                break
            case 3:
                titolo+=Locale.t('word.dettaglio.triangolazione')
                break
        }
        this.residuo = Ext.create('home.view.dashboard.widgets.word.view.residuo.Grid', {
            flex:1,
            valori: {
                linea:vm.get('linea'),
                cdcli:vm.get('cdcli'),
                colonna: colonna
            },
            title: titolo
        })
        this.residuo.on('close', this.onClosePannello, this);
        this.mainPanel.add(this.residuo)
        this.getView().setActiveItem(this.residuo) //imposto attivo
    },
    onOpenParam:function() {
        if (this.parametri){
            this.parametri.destroy()
        }
        this.parametri = Ext.create('home.view.dashboard.widgets.word.view.parametri.Panel', {
            flex:1,
            title: 'Parametri'
        })
        this.parametri.on('close', this.onClosePannello, this);
        this.mainPanel.add(this.parametri)
        this.getView().setActiveItem(this.parametri) //imposto attivo
    },
    //chiusura di tutti i pannelli
    onClosePannello:function() {
        this.getView().setActiveItem(this.mainPanel) //imposto attiva la grid
    }
});