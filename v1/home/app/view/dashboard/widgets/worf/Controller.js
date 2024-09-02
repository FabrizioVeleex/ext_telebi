/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.worf.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.v1-worf',

    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.Panel',
        'Ext.form.RadioGroup',
        'Ext.grid.column.Action',
        'Ext.layout.container.HBox',
        'Ext.panel.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.util.Format',
        'Ext.window.Window',
        'home.view.dashboard.widgets.worf.view.articoli.Grid',
        'home.view.dashboard.widgets.worf.view.articoli.SearchTop',
        'home.view.dashboard.widgets.worf.view.main.Grid',
        'home.view.dashboard.widgets.worf.view.note.Panel',
        'home.view.dashboard.widgets.worf.view.ordini.Grid'
    ],
    mixins: ['portal.v1.global.Util'],
    init: function () {
        this.firstLoad = true
        this.mainPanel = Ext.create('Ext.panel.Panel', {
            layout: {type: "hbox", align: "stretch"},
        })
        this.toolBar = Ext.create('Ext.Toolbar', {
            items: [
                {iconCls: 'pictos pictos-refresh', handler: 'onReloadGrid'},
            ]
        })
        this.columns = [
            {text: Locale.t('worf.grid.columns.stabilimento'), width: Ext.global.Vars.infoUser.theme === 'big' ? 210 : 200,
                dataIndex: 'stabilimento', draggable: false,sortable:false,
            },
            {text: Locale.t('worf.grid.columns.qtord'), width: Ext.global.Vars.infoUser.theme === 'big' ? 150 : 130,
                dataIndex: 'qtord', align: 'right', draggable: false,sortable:false,
                renderer: function (v) {
                    return Ext.util.Format.number(v,'0,000');
                },
                summaryRenderer: function (value) {
                    let tmpqta = Ext.util.Format.number(value,'0,000');
                    return '<span style=\"font-weight:bold;\">' + tmpqta + '</span>'
                }
            },
            {text: Locale.t('worf.grid.columns.qtcons'), width: Ext.global.Vars.infoUser.theme === 'big' ? 150 : 130,
                dataIndex: 'qtcon', align: 'right', draggable: false,sortable:false,hidden:true,
                renderer: function (v) {
                    return Ext.util.Format.number(v,'0,000');
                }
            },
            {text: Locale.t('worf.grid.columns.qtrit'), width: Ext.global.Vars.infoUser.theme === 'big' ? 150 : 130,
                dataIndex: 'qtrit', align: 'right', draggable: false,sortable:false,
                renderer: function (v) {
                    return Ext.util.Format.number(v,'0,000');
                }
            }
        ];
    },
    onAfterRender: function () {
        let vm = this.getViewModel()
        vm.set('widget', this.getView().widget);
        let hidexcel = true
        //esportazione excel
        if (this.checkRuoliWidget(['10', '99'], this.getView().widget)) {
            hidexcel=false
        }
        if (this.checkRuoliWidget(['11', '99'], this.getView().widget)) {
            this.toolBar.add( {tooltip: Locale.t('worf.btn.sottoscorta.tooltip'), text: Locale.t('worf.btn.sottoscorta.text'),
                ui: 'blue',
                iconCls: 'x-fas fa-file-excel', handler: 'onSottoscorta'
            })
        }
        vm.set('hideexcel', hidexcel)
        this.columns.splice(0, 0, {
            width: 30, align: 'center', sortable: false, menuDisabled: true, draggable: false, groupable: false,
            xtype: 'actioncolumn',
            items: [
                {getClass: function () {
                        return 'x-fas fa-eye';
                    },
                    handler: 'onOpenArticoli'
                }
            ]
        })
        //ciclo mesi a partire da oggi
        let oggi = new Date(), mese = oggi.getMonth()+1,anno=oggi.getFullYear()+1; //recupero mese attuale
        for (let i = mese; i < 13; i++) {
            let colmese = {
                text:i.toString().padStart(2,'00'), width: 80,
                dataIndex: 'mese'+i, align: 'right', draggable: false,sortable:false,
                renderer: function (v) {
                    return Ext.util.Format.number(v, '0,000');
                },
                filter: {type: 'numeric'}
            }
            this.columns.push(colmese)
        }
        this.columns.push({
            text:anno.toString(), width: 80,
            dataIndex: 'altro', align: 'right', draggable: false, sortable:false,
            renderer: function (v) {
                return Ext.util.Format.number(v, '0,000');
            },
            filter: {type: 'numeric'}
        })
        //grid principale
        this.grid = Ext.create('home.view.dashboard.widgets.worf.view.main.Grid', {flex: 2,
            bind: {store: '{store}'},
            dockedItems: [this.toolBar,this.toolbarFooter],
            columns: this.columns
        })
        this.mainPanel.add(this.grid)
        this.getView().add(this.mainPanel) //grid principale
        this.onReloadGrid()
    },
    //ricarica vista
    onReloadGrid: function () {
        let me = this, vm = this.getViewModel(),aggiornamento='',
            store = vm.getStore('store')
        Ext.Function.defer(function () {
            //  store.getProxy().extraParams.giorno = vm.get('data')
            store.load({
                callback: function (rec) {
                    if (rec.length>0) {
                        aggiornamento=Ext.util.Format.date(rec[0].data.dcreazione, 'd/m/Y H:i:s')
                    }
                    me.getView().setTitle(Locale.t('worf.title') + ', <i><u>' + Locale.t('worf.titleupd') + ' ' +aggiornamento + '</i></u>')
                }
            });
        }, 250, store);
    },
    //esportazione sottoscorta
    onSottoscorta: function (btn) {
        let me = this
        Ext.Msg.show({
            title:  Locale.t('worf.btn.sottoscorta.title'),
            msg:Locale.t('worf.btn.sottoscorta.msg'),
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.INFO,
            fn: function (btn) {
                if (btn === 'yes') {
                    me.view.el.mask(Locale.t("global.actions.incorso"));
                    Ext.Ajax.request({
                        method: 'GET',timeout : 900000,
                        url: Backend.REST_VERSION + 'widgets/worf/sottoscorta',
                        success: function (response) {
                            me.view.el.unmask()
                            let rest = Ext.decode(response.responseText);
                            me.onDownloadFile(rest['token'])
                        },
                        failure: function (a) {
                            me.view.el.unmask()
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
            }
        });
    },
    //articoli
    onOpenArticoli:function(view, rowIndex, colIndex, item, opt, rec) {
        let me=this,vm = this.getViewModel()
        if (this.artgrid){
            this.artgrid.destroy()
        }
        let titolo=Locale.t('worf.articoli.title')+' '+rec.data.stabilimento
        this.artToolbar = Ext.create('Ext.Toolbar', {
            items: [
                {tooltip: Locale.t('worf.esporta.tooltip'), text: Locale.t('worf.esporta.text'),
                    ui: 'blue', cdfor:rec.data.cdfor,cdpar:'',tipo:'A', //articoli
                    iconCls: 'x-fas fa-file-excel', handler: 'onEsporta',
                    bind: {hidden: '{hideexcel}'}
                },
                {xtype: 'v1-worf-searchtop'}
            ]
        })
        //colonne base
        this.colonne = [
            {width: 30, align: 'center', sortable: false, menuDisabled: true, draggable: false, groupable: false,
                xtype: 'actioncolumn',
                items: [
                    {getClass: function () {
                            return 'x-fas fa-eye';
                        },
                        handler: 'onOpenOrdini'
                    }
                ]
            },
            {width: 30, align: 'center', sortable: false, menuDisabled: true, draggable: false, groupable: false,
                xtype: 'actioncolumn',
                items: [
                    {getClass: function (v, metadata, r) {
                            switch(r.data.stato) {
                                case '10':
                                    metadata.tdAttr = `data-qtip="${Locale.t("worf.ordini.statodettaglio.parziale")}"`;
                                    return 'bd-action-null x-fas fa-info-circle bd-color-yellow';
                                case '40':
                                    metadata.tdAttr = `data-qtip="${Locale.t("worf.ordini.statodettaglio.completo")}"`;
                                    return 'bd-action-null x-fas fa-check-circle bd-color-green';
                                case '0':
                                    metadata.tdAttr = `data-qtip="${Locale.t("worf.ordini.statodettaglio.nessuna")}"`;
                                    return 'bd-action-null x-fas fa-exclamation-triangle bd-color-red';
                                default:
                                    return 'bd-action-null';
                            }
                        }
                    }
                ]
            },
            {text: Locale.t('worf.articoli.columns.cdpar'), width: 100,
                dataIndex: 'cdpar',summaryType: 'count', draggable: false,filter: {type: 'string'},
                summaryRenderer: function (value) {
                    return '<span style=\"font-weight:bold;float:right\">' + value + '</span>'
                }
            },
            {text: Locale.t('worf.articoli.columns.depar'),
                flex: 1, minWidth:130,dataIndex: 'depar', draggable: false,filter: {type: 'string'}
            },
            {text: Locale.t('worf.articoli.columns.cdind'), width: 100,
                dataIndex: 'cdind',filter: {type: 'string'}, draggable: false
            },
            {text: Locale.t('worf.articoli.columns.pianif'), width: 100,
                dataIndex: 'pianificatore',filter: {type: 'string'}, draggable: false
            },
            {text: Locale.t('worf.articoli.columns.qtord'),
                width: 100,
                dataIndex: 'qtord', align: 'right', draggable: false, summaryType: 'sum',
                renderer: function (v) {
                    return Ext.util.Format.number(v, '0,000');
                },
                summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.number(value,'0,000');
                    return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
                },
                filter: {type: 'numeric'}
            },
            {text: Locale.t('worf.articoli.columns.qtrit'),
                width: 100,
                dataIndex: 'qtrit', align: 'right', draggable: false, summaryType: 'sum',
                renderer: function (v) {
                    return Ext.util.Format.number(v, '0,000');
                },
                summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.number(value,'0,000');
                    return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
                },
                filter: {type: 'numeric'}
            },
            {text: Locale.t('worf.articoli.columns.residuo'),
                width: 100,
                dataIndex: 'residuo', align: 'right', draggable: false, summaryType: 'sum',
                renderer: function (v) {
                    return Ext.util.Format.number(v, '0,000');
                },
                summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.number(value,'0,000');
                    return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
                },
                filter: {type: 'numeric'}
            },
            {text: Locale.t('worf.articoli.columns.transito'),
                width: 100,
                dataIndex: 'transito', align: 'right', draggable: false, summaryType: 'sum',
                renderer: function (v) {
                    return Ext.util.Format.number(v, '0,000');
                },
                summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.number(value,'0,000');
                    return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
                },
                filter: {type: 'numeric'}
            },
            {text: Locale.t('worf.articoli.columns.giacenza'),
                width: 100,
                dataIndex: 'giacenza', align: 'right', draggable: false, summaryType: 'sum',
                renderer: function (v) {
                    return Ext.util.Format.number(v, '0,000');
                },
                summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.number(value,'0,000');
                    return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
                },
                filter: {type: 'numeric'}
            },
            {text: Locale.t('worf.articoli.columns.disavanzo'),
                width: 100,
                dataIndex: 'disavanzo', align: 'right', draggable: false, summaryType: 'sum',
                renderer: function (v) {
                    return Ext.util.Format.number(v, '0,000');
                },
                summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.number(value,'0,000');
                    return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
                },
                filter: {type: 'numeric'}
            },
            {text: Locale.t('worf.articoli.columns.delta'),
                width: 100,
                dataIndex: 'delta', align: 'right', draggable: false, summaryType: 'sum',
                renderer: function (v) {
                    return Ext.util.Format.number(v, '0,000');
                },
                summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.number(value,'0,000');
                    return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
                },
                filter: {type: 'numeric'}
            },
            {width: 30, align: 'center', sortable: false, menuDisabled: true, draggable: false, groupable: false,
                xtype: 'actioncolumn',
                items: [
                    {getClass: function (v, metadata, r) {
                            if (r.data.nota==='') {
                                if (me.checkRuoliWidget(['12'], me.getView().widget)) {
                                    metadata.tdAttr = `data-qtip="${Locale.t("wcon.note.inserisci")}"`;
                                    return 'bd-action-null x-fas fa-plus-circle bd-color-green';
                                } else {
                                    return ''
                                }
                            } else {
                                if (me.checkRuoliWidget(['12'], me.getView().widget)) {
                                    metadata.tdAttr = `data-qtip="${r.data.nota}"`;
                                    return 'bd-action-null x-fas fa-edit';
                                } else {
                                    metadata.tdAttr = `data-qtip="${r.data.nota}"`;
                                    return 'bd-action-null x-fas fa-info-circle';
                                }
                            }
                        },
                        handler: 'onOpenNota'
                    }
                ]
            },
            {text: Locale.t('worf.articoli.columns.giacstab'),
                width: 100,
                dataIndex: 'giacstab', align: 'right', draggable: false, summaryType: 'sum',
                renderer: function (v) {
                    return Ext.util.Format.number(v, '0,000');
                },
                summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.number(value,'0,000');
                    return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
                },
                filter: {type: 'numeric'}
            }
        ]
        //ciclo mesi a partire da oggi
        let oggi = new Date(), mese = oggi.getMonth()+1,anno=oggi.getFullYear()+1; //recupero mese attuale
        for (let i = mese; i < 13; i++) {
            let colmese = {
                text:i.toString().padStart(2,'00'), width: 80,
                dataIndex: 'mese'+i, align: 'right', draggable: false, summaryType: 'sum',
                renderer: function (v) {
                    return Ext.util.Format.number(v, '0,000');
                },
                summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.number(value,'0,000');
                    return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
                },
                filter: {type: 'numeric'}
            }
            this.colonne.push(colmese)
        }
        this.colonne.push({
            text:anno.toString(), width: 80,
            dataIndex: 'altro', align: 'right', draggable: false, summaryType: 'sum',
            renderer: function (v) {
                return Ext.util.Format.number(v, '0,000');
            },
            summaryRenderer: function (value) {
                let tmp = Ext.util.Format.number(value,'0,000');
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
            },
            filter: {type: 'numeric'}
        })
        this.artgrid = Ext.create('home.view.dashboard.widgets.worf.view.articoli.Grid',{
            flex:1,title: titolo,
            viewConfig: {
                preserveScrollOnRefresh: true,
                preserveScrollOnReload: true,
            },
            dockedItems: [this.artToolbar],
            columns: this.colonne
        })

        let storeArticoli = vm.getStore('storeArticoli')
        storeArticoli.getProxy().extraParams.cdfor = rec.data.cdfor
        storeArticoli.load()
        this.artgrid.on('close', this.onCloseArticoli, this);
        this.mainPanel.add(this.artgrid)
        this.getView().setActiveItem(this.artgrid)
    },
    //apertura nota articolo
    onOpenNota:function(view, rowIndex, colIndex, item, event, record) {
        let hidesavenote=true,readonlynote=true, vm = this.getViewModel()
        if (!this.checkRuoliWidget(['12'], this.getView().widget) && record.data.nota==='') {
            return false
        }
        if (this.checkRuoliWidget(['12'], this.getView().widget)) {
            hidesavenote=false
            readonlynote=false
        }
        vm.set('hidesavenote',hidesavenote)
        if (this.notepanel){
            this.notepanel.destroy()
        }
        this.notepanel = Ext.create('home.view.dashboard.widgets.worf.view.note.Panel', {
            flex:1,
            title: Locale.t('worf.note.title')+record.data.cdpar,
            note:record.data.nota,
            cdpar:record.data.cdpar,
            cdfor:record.data.cdfor,
            readOnlyNote:readonlynote
        })
        this.notepanel.on('close', this.onCloseNote, this);
        this.mainPanel.add(this.notepanel)
        this.getView().setActiveItem(this.notepanel) //imposto attivo
    },
    onCloseNote:function() {
        this.getView().setActiveItem(this.artgrid) //imposto attiva la grid
        if (this.checkRuoliWidget(['12'], this.getView().widget)) {
            this.artgrid.getStore().reload()
        }
    },
    onCloseArticoli:function() {
        this.getView().setActiveItem(this.mainPanel)
    },
    onOpenOrdini:function(view, rowIndex, colIndex, item, opt, rec) {
        let vm = this.getViewModel()
        if (this.artord){
            this.artord.destroy()
        }
        this.ordToolbar = Ext.create('Ext.Toolbar', {
            items: [
                {tooltip: Locale.t('worf.esporta.tooltip'), text: Locale.t('worf.esporta.text'),
                    ui: 'blue', cdfor:rec.data.cdfor,cdpar:rec.data.cdpar,tipo:'O', //ordini
                    iconCls: 'x-fas fa-file-excel', handler: 'onEsporta',
                    bind: {hidden: '{hideexcel}'}
                }
            ]
        })
        let codind=' '
        if (rec.data.cdind!=='') {codind=' ('+rec.data.cdind+') '}
        let titolo=Locale.t('worf.ordini.title')+' '+rec.data.stabilimento+' '+Locale.t('worf.ordini.title1')+' '+rec.data.cdpar+codind+rec.data.depar
        this.artord = Ext.create('home.view.dashboard.widgets.worf.view.ordini.Grid',{
            flex:1,title: titolo,
            dockedItems: [this.ordToolbar]
        })
        let storeOrdini = vm.getStore('storeOrdini')
        storeOrdini.getProxy().extraParams.cdfor = rec.data.cdfor
        storeOrdini.getProxy().extraParams.cdpar = rec.data.cdpar
        storeOrdini.load()
        this.artord.on('close', this.onCloseOrdini, this);
        this.mainPanel.add(this.artord)
        this.getView().setActiveItem(this.artord)
    },
    onCloseOrdini:function() {
        this.getView().setActiveItem(this.artgrid)
    },
    onEsporta: function (btn) {
        let me = this, hidesel=true
        if (btn.tipo==='A') {
            hidesel=false
        }
        let btnX = Ext.create('Ext.Button', {
            text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
                wndw.destroy();
            }
        });
        let btnConfirm = Ext.create('Ext.Button', {
            text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
                me.view.el.mask(Locale.t("global.actions.incorso"));
                let ff = wdwpanel.getForm();
                let selezione = ff.findField('selezione').getValue();
                wndw.hide();
                Ext.Ajax.request({
                    method: 'GET',timeout : 900000,
                    params: {tipo:btn.tipo,cdfor:btn.cdfor,cdpar:btn.cdpar,selezione:selezione},
                    url: Backend.REST_VERSION + 'widgets/worf/esporta',
                    success: function (response) {
                        me.view.el.unmask()
                        let rest = Ext.decode(response.responseText);
                        wndw.destroy();
                        me.onDownloadFile(rest['token'])
                    },
                    failure: function (a) {
                        me.view.el.unmask()
                        wndw.destroy();
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
                {xtype: 'container', layout: 'hbox', hidden:hidesel,defaults: {margin: 5}, items: [
                        {xtype: 'radiogroup', name: 'selezione', hideLabel:true,
                            columns: 2, width:450, simpleValue: true,
                            items: [
                                {boxLabel: Locale.t('worf.esporta.tutti'), inputValue: 0, checked: true},
                                {boxLabel: Locale.t('worf.esporta.disavanzo'), inputValue: 1}
                            ]
                        }
                    ]
                }
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title: Locale.t('worf.esporta.title'),
            width: 550, autoHeight: true, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();
    },
    //ricerca footer articoli
    onSearchTriggetSearchArticoli: function (item) {
        let grid = item.up('grid');
        let store = grid.getStore();
        let proxy = store.getProxy();
        let value = item.getValue();
        if (value.length < 1) {
            if (item.hasSearch) {
                this.onClearTriggetSearchArticoli(item);
            }
            return;
        }
        item.getTrigger('clear').show();
        proxy.extraParams.q = value;
        store.load();
    },
    onSpecialkeySearchArticoli: function (item, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearchTriggetSearchArticoli(item);
        }
    },
    onClearTriggetSearchArticoli: function (item) {
        let grid = item.up('grid');
        let store = grid.getStore();
        let proxy = store.getProxy();
        //if (item.hasSearch) {
        item.setValue('');
        proxy.extraParams.q = '';
        item.hasSearch = false;
        item.getTrigger('clear').hide();
        store.load();
        //}
    }
})
