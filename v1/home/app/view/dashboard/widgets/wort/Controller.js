/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.wort.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.v1-widgetort',

    requires: [
        'Ext.button.Button',
        'Ext.button.Split',
        'Ext.container.Container',
        'Ext.form.Panel',
        'Ext.form.RadioGroup',
        'Ext.form.field.Date',
        'Ext.grid.column.Action',
        'Ext.layout.container.HBox',
        'Ext.panel.Panel',
        'Ext.toolbar.Fill',
        'Ext.toolbar.Toolbar',
        'Ext.util.Format',
        'Ext.window.Window',
        'home.view.dashboard.widgets.wort.view.articoli.Famiglia',
        'home.view.dashboard.widgets.wort.view.articoli.Grid',
        'home.view.dashboard.widgets.wort.view.articoli.Raggruppamento',
        'home.view.dashboard.widgets.wort.view.dettaglio.Grid',
        'home.view.dashboard.widgets.wort.view.dettaglio.Panel',
        'home.view.dashboard.widgets.wort.view.main.Chart',
        'home.view.dashboard.widgets.wort.view.main.Grid',
        'home.view.dashboard.widgets.wort.view.main.fields.FiltroPaese',
        'home.view.dashboard.widgets.wort.view.main.fields.FiltroRegione',
        'home.view.dashboard.widgets.wort.view.main.fields.SearchDate',
        'home.view.dashboard.widgets.wort.view.main.fields.SearchDateTo',
        'home.view.dashboard.widgets.wort.view.main.fields.SearchNaz',
        'home.view.dashboard.widgets.wort.view.main.fields.SearchSogg',
        'home.view.dashboard.widgets.wort.view.main.fields.btnArticoli',
        'home.view.dashboard.widgets.wort.view.main.fields.btnExcel',
        'home.view.dashboard.widgets.wort.view.main.fields.btnExcelArticoli'
    ],
    mixins: ['portal.v1.global.Util'],
    init: function () {
        this.firstLoad = true
        this.mainPanel = Ext.create('Ext.panel.Panel', {
            layout: {type: "hbox", align: "stretch"},
        })
        this.dettPanel = Ext.create('Ext.panel.Panel', {
            layout: {type: "hbox", align: "stretch"},
            header: {itemPosition: 1,
                items: [{tooltip: Locale.t('global.btn.close.text'), iconCls: 'x-fas fa-window-close', handler: 'onCloseDett'}]
            },
            listeners: {show: 'onShowDettaglio'}
        })
        this.dettArticoli = Ext.create('Ext.panel.Panel', {
            layout: {type: "hbox", align: "stretch"},
            header: {itemPosition: 2,
                items: [{tooltip: Locale.t('global.btn.close.text'), iconCls: 'x-fas fa-window-close', handler: 'onCloseArticoli'}]
            }
        })
        this.infopanel = Ext.create('home.view.dashboard.widgets.wort.view.main.Chart', {flex: 1});
        this.dettInfo = Ext.create('home.view.dashboard.widgets.wort.view.dettaglio.Panel', {flex: 1});
        this.toolBar = Ext.create('Ext.Toolbar', {
            items: [
                {iconCls: 'pictos pictos-refresh', handler: 'onReloadGrid'},
                {xtype: 'v1-wort-searchdate'},
                {xtype: 'v1-wort-searchdateto'},
                {xtype: 'v1-wort-searchnaz'},
                {xtype: 'v1-wort-filtropaese'},
                {xtype: 'v1-wort-filtroregione'},
                {xtype: 'tbfill'},
                {xtype: 'v1-wort-btnarticoli'},
                {xtype: 'v1-wort-btnexcel'},
            ]
        })
        this.toolbarFooter = Ext.create('Ext.Toolbar',{dock: 'bottom',
            items: [{xtype: 'v1-wort-searchsogg'}]
        })
        this.columns = [
            {width: 30, sortable: false, menuDisabled: true, draggable: false, groupable: false, xtype: 'actioncolumn',
                items: [
                    {getClass: function (view, meta, record) {
                            //TODO messo x togliere la colonna su XA (non esiste data consegna)
                            if (record.data.CONSEGNA===0) {
                                return 'null';
                            } else {
                                meta.tdAttr = 'data-qtip="' + record.data.DTCCO  + '"';
                                if (record.data.CONS===true){
                                    return 'x-fas fa-truck bd-color-green bd-action-null';
                                }
                                return 'x-fas fa-clock bd-color-orange bd-action-null';
                            }
                        }
                    }
                ]
            },
            {text: Locale.t('wort.grid.columns.progressivo'), width: Ext.global.Vars.infoUser.theme === 'big' ? 70 : 60,
                align: 'right', summaryType: 'count', dataIndex: 'PROG', draggable: false,
                summaryRenderer: function (value) {
                    return '<span style=\"font-weight:bold;\">' + value + '</span>'
                }
            },
            {text: Locale.t('wort.grid.columns.numero'), width: Ext.global.Vars.infoUser.theme === 'big' ? 100 : 90,
                dataIndex: 'NRREO', draggable: false
            },
            {text: Locale.t('wort.grid.columns.codice'), width: Ext.global.Vars.infoUser.theme === 'big' ? 100 : 90,
                dataIndex: 'CDCFO', draggable: false
            },
            {text: Locale.t('wort.grid.columns.ragsoc'), minWidth: 150,flex: 1,
                //width: Ext.global.Vars.infoUser.theme === 'big' ? 170 : 160,
                dataIndex: 'RAGSOC', draggable: false
            },
            {text: Locale.t('wort.grid.columns.quantita'), width: Ext.global.Vars.infoUser.theme === 'big' ? 130 : 120,
                dataIndex: 'TOTQTA', align: 'right', summaryType: 'sum', draggable: false,
                renderer: function (v) {
                    return Ext.util.Format.number(v,'0,000');
                },
                summaryRenderer: function (value) {
                    let tmpqta = Ext.util.Format.number(value,'0,000');
                    return '<span style=\"font-weight:bold;\">' + tmpqta + '</span>'
                }
            },
            {text: Locale.t('wort.grid.columns.altro'), width: Ext.global.Vars.infoUser.theme === 'big' ? 130 : 120,
                dataIndex: 'TOTALTRO', align: 'right', summaryType: 'sum', draggable: false,
                renderer: function (v) {
                    return Ext.util.Format.number(v,'0,000');
                },
                summaryRenderer: function (value) {
                    let tmpqta = Ext.util.Format.number(value,'0,000');
                    return '<span style=\"font-weight:bold;\">' + tmpqta + '</span>'
                }
            },
            {text: Locale.t('wort.grid.columns.metri'), width: Ext.global.Vars.infoUser.theme === 'big' ? 130 : 120,
                dataIndex: 'TOTMET', align: 'right', summaryType: 'sum', draggable: false,
                renderer: function (v) {
                    return Ext.util.Format.number(v,'0,000');
                },
                summaryRenderer: function (value) {
                    let tmpqta = Ext.util.Format.number(value,'0,000');
                    return '<span style=\"font-weight:bold;\">' + tmpqta + '</span>'
                }
            },
            {text: Locale.t('wort.grid.columns.importo'), width: Ext.global.Vars.infoUser.theme === 'big' ? 150 : 130,
                dataIndex: 'VLORO', align: 'right', summaryType: 'sum', draggable: false,
                renderer: function (v) {
                    return Ext.util.Format.currency(v, '€ ', 2);
                },
                summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.currency(value, '€ ', 2);
                    return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
                }
            }
        ];
    },
    onAfterRender: function () {
        let vm = this.getViewModel()
        vm.set('widget', this.getView().widget);
        vm.set('direzione', false);
        let hidexcel = true, hidefiltri = true,hidearticoli = true
        let ita = this.checkRuoliWidget(['1'], this.getView().widget)
        let estero = this.checkRuoliWidget(['2'], this.getView().widget)
        if (ita ===true && estero===true) {
            vm.set('hideNaz',false)
        }else{
            if (ita ===false || estero===false) {
                vm.set('hideNaz',true)
                if (ita ===true){
                    vm.set('naz','I')}
                else if (estero ===true){
                    vm.set('naz','E')
                }
            }
        }
        //esportazione excel
        if (this.checkRuoliWidget(['10', '99'], this.getView().widget)) {
            hidexcel=false
        }
        //filtri direzione
        if (this.checkRuoliWidget(['5', '99'], this.getView().widget)) {
            hidexcel=false
            hidefiltri = false
            vm.set('direzione', true);
        }
        //dettaglio articoli
        if (this.checkRuoliWidget(['6', '99'], this.getView().widget)) {
            hidearticoli=false
        }
        vm.set('hideexcel', hidexcel)
        vm.set('hidefiltri', hidefiltri)
        vm.set('hidearticoli', hidearticoli)
        vm.set('hidepaesi', true)
        vm.set('hideregioni', true)
        vm.set('paese','')
        vm.set('regione','')
        this.columns.splice(0, 0, {
            width: 30, align: 'center', sortable: false, menuDisabled: true, draggable: false, groupable: false,
            xtype: 'actioncolumn',
            items: [
                {getClass: function () {
                        return 'x-fas fa-eye';
                    },
                    handler: 'onOpenDettaglio'
                }
            ]
        })
        //grid principale, dettaglio ordine e dettaglio articoli
        this.grid = Ext.create('home.view.dashboard.widgets.wort.view.main.Grid', {flex: 2,
            bind: {store: '{store}'},
            dockedItems: [this.toolBar,this.toolbarFooter],
            columns: this.columns
        })
        this.dettgrid = Ext.create('home.view.dashboard.widgets.wort.view.dettaglio.Grid', {flex: 2,
            bind: {store: '{storeDettaglio}'},
            dockedItems: []
        });
        //this.infopanel.setCollapsed(true)
        this.mainPanel.add(this.grid)
        this.mainPanel.add(this.infopanel)
        this.dettPanel.add({
            xtype:'panel', width: 300, height: 300, items:[this.dettInfo]
        })
        this.dettPanel.add(this.dettgrid)
        //aggiunto i 3 pannelli
        this.getView().add(this.mainPanel) //grid principale
        this.getView().add(this.dettPanel) //pannello dettaglio ordine
        this.onReloadGrid()
    },
    //ricarica vista
    onReloadGrid: function () {
        this.infopanel.collapse()
        let me = this, vm = this.getViewModel(),
            store = vm.getStore('store')
        store.proxy.setTimeout(900000);
        Ext.Function.defer(function () {
            store.getProxy().extraParams.giorno = vm.get('data')
            store.getProxy().extraParams.giornoend = vm.get('datato')
            store.getProxy().extraParams.naz = vm.get('naz')
            store.getProxy().extraParams.paese = vm.get('paese')
            store.getProxy().extraParams.regione = vm.get('regione')
            store.load({
                callback: function () {
                    me.getView().setTitle(Locale.t('wort.title') + ', <i><u>' + Locale.t('wort.titleupd') + ' ' + Ext.util.Format.date(new Date(), ' H:i:s') + '</i></u>')
                }
            });
        }, 250, store);
    },
    onExpand:function() {
        let me = this,vm = this.getViewModel(),storeChart = vm.getStore('storeChart')
        me.getView().el.mask(Locale.t('wort.caricagrafico'))
        storeChart.getProxy().extraParams.giorno = vm.get('data')
        storeChart.getProxy().extraParams.naz = vm.get('naz')
        storeChart.load({
            callback: function () {
                me.generateChart()
                me.getView().el.unmask()
            }
        });
    },
    generateChart: function (){
        this.infopanel.down('cartesian').redraw()
    },
    onChangeData: function (btn, newValue, oldValue) {
        //Commentato x priblemi tempistiche
        /*
        let vm = this.getViewModel(),
            store = vm.getStore('store')
        if (store.isLoading() || oldValue === null) {
            return
        }
        this.onReloadGrid()

         */
    },
    onChangeNaz: function (btn, newValue, oldValue) {
        let vm = this.getViewModel(),
            store = vm.getStore('store')
        if (vm.get('direzione')) {
            switch(newValue) {
                case 'I': //italia
                    vm.set('hidepaesi',true);
                    vm.set('hideregioni',false);
                    break;
                case 'E': //estero
                    vm.set('hidepaesi',false);
                    vm.set('hideregioni',true);
                    break;
                default: //tutti
                    vm.set('hidepaesi',true);
                    vm.set('hideregioni',true);
                    break;
            }
        }
        if (store.isLoading() || oldValue === null) {
            return
        }
        this.onReloadGrid()
    },
    onSearchPaese: function(cmb) {
        let vm = this.getViewModel()
        vm.set('paese',cmb.value);
        this.onReloadGrid()
    },
    onSpecialkeyPaese: function (item, e) {
        let vm = this.getViewModel()
        if (e.getKey() === e.ENTER) {
            if (!item.getValue()) {
                vm.set('paese','');
                this.onReloadGrid()
            }
        }
    },
    onFiltroRegione: function(cmb) {
        let vm = this.getViewModel()
        vm.set('regione',cmb.value);
        this.onReloadGrid()
    },
    onSpecialkeyRegione: function (item, e) {
        let vm = this.getViewModel()
        if (e.getKey() === e.ENTER) {
            if (!item.getValue()) {
                vm.set('regione','');
                this.onReloadGrid()
            }
        }
    },
    //Dettaglio ordine
    onOpenDettaglio: function (grid, rowIndex) {
        let vm = this.getViewModel(),
            storeDettaglio = vm.getStore('storeDettaglio'),
            record = grid.getStore().getAt(rowIndex).data
        storeDettaglio.loadData([])
        vm.set('record', record)
        vm.set('recordDettaglio ', [])
        this.dettPanel.setTitle(' [' + record['NRREO'] + '] ' + record['RAGSOC'])
        this.getView().setActiveItem(this.dettPanel)
    },
    onShowDettaglio: function () {
        let me = this, vm = me.getViewModel(),
            storeDettaglio = vm.getStore('storeDettaglio'),
            myMask = new Ext.LoadMask({ //maschera attesa
                msg: Locale.t('wort.dettaglio.caricamento'),
                target: me.getView()
            });
        myMask.show();
        Ext.Ajax.request({
            method: 'POST', timeout: 900000,
            jsonData: vm.get('record'),
            url: Backend.REST_VERSION + 'widgets/wort/getdett',
            success: function (esito) {
                myMask.hide()
                let rest = Ext.decode(esito.responseText);
                vm.set('recordDettaglio', rest.data)
                storeDettaglio.loadData(rest.store.data)
            },
            failure: function (a) {
                myMask.hide()
                let rest = Ext.decode(a.responseText);
                Ext.Msg.show({
                    title: Locale.t('global.errore'),
                    msg: rest['msg'],
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        })
    },
    onCloseDett: function () {
        this.getView().setActiveItem(this.mainPanel)
    },
    //dettaglio articoli
    onArticoli:function() {
        let vm = this.getViewModel(), hideExcelArt=true
        if (this.artgrid){
            this.artgrid.destroy()
        }
        if (this.checkRuoliWidget(['11', '99'], this.getView().widget)) {
            hideExcelArt=false
        }
        vm.set('hideExcelArt',hideExcelArt)
        //toolbar
        this.artToolbar = Ext.create('Ext.Toolbar', {
            items: [{xtype: 'v1-wort-famiglia'},
                {text: '', width: 25, height: 30, arrowVisible:false,iconCls: 'icon-cross',
                    xtype: 'splitbutton', handler : 'onClearFamiglia'},
                {xtype: 'v1-wort-raggruppamento'},
                {xtype: 'v1-wort-btnexcelarticoli'}
            ]
        })
        let filtro=Locale.t('wort.tutti')
        if (vm.get('naz')==='I') {
            filtro=Locale.t('wort.italia')
        }
        if (vm.get('naz')==='E') {
            filtro=Locale.t('wort.estero')
        }
        let nofiltro=Locale.t('wort.articoli.nofiltro')
        let titolo=Locale.t('wort.articoli.title')+': '+filtro+', '+Ext.util.Format.date(vm.get('data'), 'd/m/Y')+' - '+Ext.util.Format.date(vm.get('datato'), 'd/m/Y')+' - '+nofiltro
        this.artgrid = Ext.create('home.view.dashboard.widgets.wort.view.articoli.Grid',{
            flex:1,title: titolo,
            dockedItems: [this.artToolbar],
        })
        let storeArticoli = vm.getStore('storeArticoli')
        storeArticoli.getProxy().extraParams.giorno = vm.get('data')
        storeArticoli.getProxy().extraParams.giornoend = vm.get('datato')
        storeArticoli.getProxy().extraParams.naz = vm.get('naz')
        storeArticoli.load()
        this.artgrid.on('close', this.onCloseArticoli, this);
        this.mainPanel.add(this.artgrid)
        this.getView().setActiveItem(this.artgrid)
    },
    onCloseArticoli:function() {
        this.getView().setActiveItem(this.mainPanel)
    },
    onSelectFamiglia:function(combo) {
        let vm = this.getViewModel()
        let storeArticoli = vm.getStore('storeArticoli')
        this.artToolbar.items.items[2].setValue(0)
        storeArticoli.getProxy().extraParams.famiglia = combo.value
        storeArticoli.getProxy().extraParams.brand='0'
        storeArticoli.load()
    },
    onClearFamiglia:function() {
        let vm = this.getViewModel()
        let storeArticoli = vm.getStore('storeArticoli')
        storeArticoli.getProxy().extraParams.famiglia = ''
        this.artToolbar.items.items[0].setValue('')
        storeArticoli.load()
    },
    onChangeBrand:function(rdg, newval) {
        let vm = this.getViewModel()
        let storeArticoli = vm.getStore('storeArticoli')
        if (newval!==0) {
            this.artToolbar.items.items[0].setValue('')
            storeArticoli.getProxy().extraParams.famiglia = ''
        }
        storeArticoli.getProxy().extraParams.brand=newval
        storeArticoli.load()
    },
    onEsportaArticoli:function() {
        let me = this, vm = me.getViewModel(),
            today = new Date()
        let btnX = Ext.create('Ext.Button', {
            text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
                wndw.destroy();
            }
        });
        let btnConfirm = Ext.create('Ext.Button', {
            text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
                let ff = wdwpanel.getForm();
                let dal = ff.findField('dal').getValue();
                let al = ff.findField('al').getValue();
                if (!dal) {
                    Ext.Msg.show({
                        title: Locale.t('global.errore'),
                        msg: Locale.t('wort.esporta.validation.dal'),
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                    return;
                }
                if (!al) {
                    Ext.Msg.show({
                        title: Locale.t('global.errore'),
                        msg: Locale.t('wort.esporta.validation.al'),
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                    return;
                }
                let dataDal = new Date(dal)
                let dataAl = new Date(al)
                if (dataAl.getTime()<dataDal.getTime()){
                    Ext.Msg.show({
                        title: Locale.t('global.errore'),
                        msg: Locale.t('wort.esporta.validation.period'),
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                    return;
                }
                wndw.hide();
                me.getView().el.mask(Locale.t('global.actions.incorso'))
                Ext.Ajax.request({
                    method: 'GET', timeout: 900000,
                    params: {dal: dal, al: al},
                    url: Backend.REST_VERSION + 'widgets/wort/esportaarticoli',
                    success: function (response) {
                        let rest = Ext.decode(response.responseText);
                        me.getView().el.unmask()
                        wndw.destroy();
                        me.onDownloadFile(rest['token'])
                    },
                    failure: function (a) {
                        wndw.destroy();
                        me.getView().el.unmask()
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
                {xtype: 'container', layout: 'hbox', defaults: {margin: 5}, items: [
                        {xtype: 'datefield', fieldLabel: Locale.t('wort.esporta.dal'), labelWidth: 60,startDay:1,
                            allowBlank: false, width: 200, format: 'd/m/Y', submitFormat: 'Y-m-d', name: 'dal', value: today, maxValue: today},
                        {xtype: 'datefield', fieldLabel: Locale.t('wort.esporta.al'), labelWidth: 60,startDay:1,
                            allowBlank: false, width: 200, format: 'd/m/Y', submitFormat: 'Y-m-d', name: 'al', value: today, maxValue: today}
                    ]
                }
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title: Locale.t('wort.grid.toolbar.excelarticoli.text'),
            width: 550, autoHeight: true, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();
    },
    //azioni vista
    onSearchTriggetSearch: function (item) {
        let me = this, vm = me.getViewModel()
        let grid = item.up('grid');
        let store = grid.getStore();
        let proxy = store.getProxy();
        let value = item.getValue();
        if (value.length < 1) {
            if (item.hasSearch) {
                this.onClearTriggetSearch(item);
            }
            return;
        }
        item.getTrigger('clear').show();
        proxy.extraParams.q = value;
        // store.load();
        let storeChart = vm.getStore('storeChart')
        if (storeChart) {
            storeChart.getProxy().extraParams.q = value;
        }
        item.hasSearch = true;
        this.onReloadGrid()
    },
    onSpecialkeySearch: function (item, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearchTriggetSearch(item);
        }
    },
    onClearTriggetSearch: function (item) {
        let me = this, vm = me.getViewModel()
        let grid = item.up('grid');
        let store = grid.getStore();
        let proxy = store.getProxy();
        if (item.hasSearch) {
            item.setValue('');
            proxy.extraParams.q = '';
            item.hasSearch = false;
            item.getTrigger('clear').hide();
            let storeChart = vm.getStore('storeChart')
            if (storeChart) {
                storeChart.getProxy().extraParams.q = '';
            }
            this.onReloadGrid()
        }
    },
    onEsporta: function () {
        let me = this, vm = me.getViewModel(),
            today = new Date(), hidenaz = vm.get('hideNaz');
        let btnX = Ext.create('Ext.Button', {
            text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
                wndw.destroy();
            }
        });
        let btnConfirm = Ext.create('Ext.Button', {
            text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
                let ff = wdwpanel.getForm();
                let dal = ff.findField('dal').getValue();
                let al = ff.findField('al').getValue();
                if (!dal) {
                    Ext.Msg.show({
                        title: Locale.t('global.errore'),
                        msg: Locale.t('wort.esporta.validation.dal'),
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                    return;
                }
                if (!al) {
                    Ext.Msg.show({
                        title: Locale.t('global.errore'),
                        msg: Locale.t('wort.esporta.validation.al'),
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                    return;
                }
                let dataDal = new Date(dal)
                let dataAl = new Date(al)
                if (dataAl.getTime()<dataDal.getTime()){
                    Ext.Msg.show({
                        title: Locale.t('global.errore'),
                        msg: Locale.t('wort.esporta.validation.period'),
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                    return;
                }
                let naz = ff.findField('selnaz').getValue();
                let tipo = ff.findField('seltipo').getValue();
                wndw.hide();
                let myMask = new Ext.LoadMask({ //maschera attesa
                    msg: Locale.t('wort.dettaglio.caricamento'),
                    target: me.grid
                });
                myMask.show();
                Ext.Ajax.request({
                    method: 'GET', timeout: 900000,
                    params: {'_fn': 'esporta', dal: dal, al: al, naz: naz, tipo: tipo},
                    url: Backend.REST_VERSION + 'widgets/wort/esporta',
                    success: function (response) {
                        let rest = Ext.decode(response.responseText);
                        myMask.hide()
                        wndw.destroy();
                        me.onDownloadFile(rest['token'])
                    },
                    failure: function (a) {
                        wndw.destroy();
                        myMask.hide()
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
                {xtype: 'container', layout: 'hbox', defaults: {margin: 5}, items: [
                        {xtype: 'datefield', fieldLabel: Locale.t('wort.esporta.dal'), labelWidth: 60,startDay:1,
                            allowBlank: false, width: 200, format: 'd/m/Y', submitFormat: 'Y-m-d', name: 'dal', value: today, maxValue: today},
                        {xtype: 'datefield', fieldLabel: Locale.t('wort.esporta.al'), labelWidth: 60,startDay:1,
                            allowBlank: false, width: 200, format: 'd/m/Y', submitFormat: 'Y-m-d', name: 'al', value: today, maxValue: today}
                    ]
                },
                {xtype: 'container', layout: 'hbox', defaults: {margin: 5},
                    hidden: hidenaz, items: [
                        {xtype: 'radiogroup', name: 'selnaz', fieldLabel: Locale.t('wort.esporta.naz'),
                            columns: 3, flex: 1, simpleValue: true,
                            items: [
                                {boxLabel: Locale.t('wort.esporta.tutti'), inputValue: 2, checked: true},
                                {boxLabel: Locale.t('wort.esporta.ita'), inputValue: 0},
                                {boxLabel: Locale.t('wort.esporta.ee'), inputValue: 1}
                            ]
                        }
                    ]
                },
                {xtype: 'container', layout: 'hbox', defaults: {margin: 5}, items: [
                        {xtype: 'radiogroup', name: 'seltipo', fieldLabel: Locale.t('wort.esporta.tipo'),
                            columns: 2, flex: 1, simpleValue: true,
                            items: [
                                {boxLabel: Locale.t('wort.esporta.testata'), inputValue: 0, checked: true},
                                {boxLabel: Locale.t('wort.esporta.dettaglio'), inputValue: 1}
                            ]
                        }
                    ]
                }
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title: Locale.t('wort.esporta.text'),
            width: 550, autoHeight: true, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();
    }
})
