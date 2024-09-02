/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.wver.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.v1-widgetwver',

    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'Ext.form.Panel',
        'Ext.form.field.Date',
        'Ext.form.field.Text',
        'Ext.layout.container.HBox',
        'Ext.panel.Panel',
        'Ext.toolbar.Fill',
        'Ext.toolbar.Toolbar',
        'Ext.util.Format',
        'Ext.window.Window',
        'home.view.dashboard.widgets.wver.view.main.Grid',
        'home.view.dashboard.widgets.wver.view.main.fields.RadioProdotto',
        'home.view.dashboard.widgets.wver.view.main.fields.RadioStabilimento',
        'home.view.dashboard.widgets.wver.view.main.fields.SearchDate',
        'home.view.dashboard.widgets.wver.view.main.fields.SearchDateTo',
        'home.view.dashboard.widgets.wver.view.main.fields.SearchFooter',
        'home.view.dashboard.widgets.wver.view.main.fields.btnExcel'
    ],
    mixins: ['portal.v1.global.Util'],
    init: function () {
        let vm = this.getViewModel()
        this.firstLoad = true
        this.totminuti=Ext.create('Ext.form.TextField',{
            readOnly:true,fieldLabel: Locale.t('wver.minuti')
        })
        this.media=Ext.create('Ext.form.TextField',{
            readOnly:true,fieldLabel: Locale.t('wver.media')
        })
        this.mainPanel = Ext.create('Ext.panel.Panel', {
            layout: {type: "hbox", align: "stretch"},
        })
        this.toolBar = Ext.create('Ext.Toolbar', {
            items: [
                {iconCls: 'pictos pictos-refresh', handler: 'onReloadGrid'},
                {xtype: 'v1-wver-datefrom'},
                {xtype: 'v1-wver-dateto'},
                this.totminuti,
                this.media,
                {xtype: 'tbfill'},
                {xtype: 'v1-wver-btnexcel'}
            ]
        })
        this.toolbarFooter = Ext.create('Ext.Toolbar',{dock: 'bottom',
            items: [{xtype: 'v1-wver-searchfooter'}]
        })
        this.columns = [
            {text: Locale.t('wver.grid.columns.data'), width: Ext.global.Vars.infoUser.theme === 'big' ? 120 : 110,
                dataIndex: 'TRNDT', draggable: false,
                renderer: Ext.util.Format.dateRenderer('d/m/Y')
            },
            {text: Locale.t('wver.grid.columns.codice'), width: Ext.global.Vars.infoUser.theme === 'big' ? 220 : 200,
                dataIndex: 'ITNBR', draggable: false
            },
            {text: Locale.t('wver.grid.columns.descrizione'), minWidth: 150, flex: 1,
                width: Ext.global.Vars.infoUser.theme === 'big' ? 170 : 160, dataIndex: 'ITDSC', draggable: false
            },
            {text: Locale.t('wver.grid.columns.qta'),summaryType: 'sum',align: 'right',
                width: Ext.global.Vars.infoUser.theme === 'big' ? 170 : 160, dataIndex: 'TRQTY', draggable: false,
                renderer: function (v) {
                    return Ext.util.Format.number(v, '0,000');
                },
                summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.number(value,'0,000');
                    return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
                }
            }
        ];
    },
    onAfterRender: function () {
        let vm = this.getViewModel(),hidestabilimento=true, hideradioprod=false
        //stabilimento
        if ((this.checkRuoliWidget(['1'], this.getView().widget)) && (this.checkRuoliWidget(['2'], this.getView().widget))) {
            hidestabilimento=false
        }
        //imposto stabilimento default
        if ((this.checkRuoliWidget(['2'], this.getView().widget)) && (!this.checkRuoliWidget(['1'], this.getView().widget))) {
            vm.set('stabilimento','2')
        }
        if ((this.checkRuoliWidget(['1'], this.getView().widget)) && (!this.checkRuoliWidget(['2'], this.getView().widget))) {
            vm.set('stabilimento','1')
        }
        //se ruolo 'commerciale' nascondo scelta prodotto e statistiche ore/pezzi
        if ((this.checkRuoliWidget(['4'], this.getView().widget))) {
            hideradioprod=true
            this.totminuti.hide()
            this.media.hide()
        }
        //tipo prodotto default 'Finito'
        vm.set('prodotto','1')
        this.toolbar2=Ext.create('Ext.Toolbar', {
            items: [
                {xtype: 'fieldset', collapsible: false, collapsed: false, title: '',hidden:hidestabilimento,
                    style: {'background-color': "transparent;"},
                    padding:'1 1 1 1',
                    items: [
                        {xtype:'v1-wverradiostab'} //stabilimento
                    ]
                },
                {xtype: 'fieldset', collapsible: false, collapsed: false, title: '',
                    style: {'background-color': "transparent;"},hidden:hideradioprod,
                    padding:'1 1 1 1',
                    items: [
                        {xtype:'v1-wverradioprodotto'} //tipo prodotto
                    ]
                }
            ]
        })
        //esportazione excel
        let hidexcel = true
        if (this.checkRuoliWidget(['10', '99'], this.getView().widget)) {
            hidexcel=false
        }
        vm.set('widget', this.getView().widget);
        vm.set('hideexcel', hidexcel)
        this.grid = Ext.create('home.view.dashboard.widgets.wver.view.main.Grid', {flex: 1,
            bind: {store: '{store}'},
            dockedItems: [this.toolBar,this.toolbar2],
            columns: this.columns
        })
        this.mainPanel.add(this.grid)
        this.getView().add(this.mainPanel)
        this.onReloadGrid()
    },
    //ricarica vista
    onReloadGrid: function () {
        let me = this, vm = this.getViewModel()
        let store = vm.getStore('store') //storeChart = vm.getStore('storeChart')
        let stabilimento =' ('+Locale.t('wver.grid.toolbar.stabilimento.cicagna')+') '
        if (vm.get('stabilimento')==='2') {
            stabilimento =' ('+Locale.t('wver.grid.toolbar.stabilimento.tunisia')+') '
        }
        //visualizzo grid differente
        let colonne = this.grid.getColumns()
        for (let i = 0, l = colonne.length; i < l; i++) {
            if (colonne[i].dataIndex === 'TRNDT') {
                if (vm.get('prodotto')==='2') {
                    colonne[i].hide();
                } else {
                    colonne[i].show();
                }
            }
            if (colonne[i].dataIndex === 'ITNBR') {
                if (vm.get('prodotto')==='2') {
                    colonne[i].setText(Locale.t('wver.grid.columns.gruppo'))
                } else {
                    colonne[i].setText(Locale.t('wver.grid.columns.codice'))
                }
            }
        }
        //carico store
        Ext.Function.defer(function () {
            store.getProxy().extraParams.giorno = vm.get('data')
            store.getProxy().extraParams.giornoend = vm.get('datato')
            store.getProxy().extraParams.stabilimento = vm.get('stabilimento')
            store.getProxy().extraParams.prodotto = vm.get('prodotto')
            store.load({
                callback: function () {
                    let totminuti=0,media=0
                    if (store.data.length>0) {
                        let rec=store.data.getAt(0)
                        totminuti=rec.data.TOTMINUTI
                        media=rec.data.MEDIA
                    }
                    me.totminuti.setValue(Ext.util.Format.number(totminuti,'0,000'))
                    me.media.setValue(Ext.util.Format.number(media,'0,000.00'))
                    me.getView().setTitle(Locale.t('wver.title') + stabilimento +', <i><u>' + Locale.t('wver.titleupd') + ' ' + Ext.util.Format.date(new Date(), ' H:i:s') + '</i></u>')
                }
            });
        }, 250, store);
    },
    onChangeData: function (btn, newValue, oldValue) {
        let vm = this.getViewModel(),
            store = vm.getStore('store')
        if (store.isLoading() || oldValue === null) {
            return
        }
        this.onReloadGrid()
    },
    onChangeStabilimento:function(rdg,newval) {
        let vm = this.getViewModel(),
            store = vm.getStore('store')
        vm.set('stabilimento',newval)
        if (store.isLoading()) {
            return
        }
        this.onReloadGrid()
    },
    onChangeProdotto:function(rdg,newval) {
        let vm = this.getViewModel(),
            store = vm.getStore('store')
        vm.set('prodotto',newval)
        if (store.isLoading()) {
            return
        }
        this.onReloadGrid()
    },
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
    onEsportaVer: function () {
        let me = this,vm = me.getViewModel(), today = new Date()
        let stabilimento = vm.get('stabilimento')
        let prodotto = vm.get('prodotto')
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
                        msg: Locale.t('wver.esporta.filtri.dalobb'),
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                    return;
                }
                if (!al) {
                    Ext.Msg.show({
                        title: Locale.t('global.errore'),
                        msg: Locale.t('wver.esporta.filtri.alobb'),
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
                        msg: Locale.t('wver.esporta.filtri.period'),
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                    return;
                }
                wndw.hide();
                let myMask = new Ext.LoadMask({ //maschera attesa
                    msg: Locale.t('wver.esporta.esecuzione'),
                    target: me.grid
                });
                myMask.show();
                Ext.Ajax.request({
                    method: 'GET', timeout: 900000,
                    params: {'_fn': 'esporta', 'dal': dal, 'al': al,'stabilimento':stabilimento,'prodotto':prodotto},
                    url: Backend.REST_VERSION + 'widgets/wver/esporta',
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
                        {xtype: 'datefield', fieldLabel: Locale.t('wver.esporta.filtri.dal'), labelWidth: 60,startDay:1,
                            allowBlank: false, width: 200, format: 'd/m/Y', submitFormat: 'Y-m-d', name: 'dal', value: today, maxValue: today},
                        {xtype: 'datefield', fieldLabel: Locale.t('wver.esporta.filtri.al'), labelWidth: 60,startDay:1,
                            allowBlank: false, width: 200, format: 'd/m/Y', submitFormat: 'Y-m-d', name: 'al', value: today, maxValue: today}
                    ]
                }
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title: Locale.t('wver.esporta.titolo'),
            width: 550, autoHeight: true, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();
    },
    //dettaglio semilavorati
    onOpenProdotto:function(view, record) {
        let me = this,vm = me.getViewModel()
        if (vm.get('prodotto')==='1') {
            return
        }
        // console.log(record)
    }
})
