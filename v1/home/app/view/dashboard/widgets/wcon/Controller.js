/**
 * Created by luke on 26/08/21.
 */
Ext.define('home.view.dashboard.widgets.wcon.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.v1-wcon',
    mixins: ['portal.v1.global.Util'],

    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'Ext.form.Panel',
        'Ext.grid.column.Action',
        'Ext.layout.container.HBox',
        'Ext.panel.Panel',
        'Ext.toolbar.Fill',
        'Ext.toolbar.Toolbar',
        'Ext.util.Format',
        'Ext.window.Window',
        'home.view.dashboard.widgets.wcon.view.component.espExcel',
        'home.view.dashboard.widgets.wcon.view.config.Grid',
        'home.view.dashboard.widgets.wcon.view.dettaglio.Panel',
        'home.view.dashboard.widgets.wcon.view.main.Grid',
        'home.view.dashboard.widgets.wcon.view.main.fields.Radionazione',
        'home.view.dashboard.widgets.wcon.view.main.fields.Search',
        'home.view.dashboard.widgets.wcon.view.main.fields.Selnazione',
        'home.view.dashboard.widgets.wcon.view.main.fields.Selregione',
        'home.view.dashboard.widgets.wcon.view.note.Panel',
        'home.view.dashboard.widgets.wcon.view.riservati.Grid'
    ],
    init: function () {
        this.firstLoad =true
        this.hideFido = true
        this.mainPanel = Ext.create('Ext.panel.Panel', {
            layout: {
                type: "hbox", align: "stretch"
            }
        })
        this.toolBar = Ext.create('Ext.Toolbar', {
            items: [
                {iconCls: 'pictos pictos-refresh', handler: 'onReloadGrid'},
                {xtype: 'v1-wconsearch'},
                {xtype: 'v1-wconnazione'},
                {xtype: 'v1-wconregione'},
                {xtype: 'fieldset', collapsible: false, collapsed: false, title: '',
                    style: {'background-color': "transparent;"},
                    padding:'1 1 1 1',
                    items: [
                        {xtype: 'v1-wconradionaz'}
                    ]
                }
            ]
        })
        //colonne grid
        this.columns = [
            {text: Locale.t('wcon.column.codice'),
                width: Ext.global.Vars.infoUser.theme==='big'?120:100,
                dataIndex: 'codice'},
            {text: Locale.t('wcon.column.ragsoc'),
                width: Ext.global.Vars.infoUser.theme==='big'?300:280,
                dataIndex: 'ragsoc'
            },
            {text: Locale.t('wcon.column.esposto'),
                width:Ext.global.Vars.infoUser.theme==='big'?200:150,
                dataIndex: 'ascadere', align: 'right',summaryType: 'sum',
                renderer: function (v) {
                    return Ext.util.Format.currency(v, '€ ', 2);
                }, summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.currency(value, '€ ', 2);
                    return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
                }
            }
        ]
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
        let me=this,vm = this.getViewModel()
        vm.set('widget', this.getView().widget);
        //se è abilitato visualizzo dettaglio
        if (this.checkRuoliWidget(['1'], this.getView().widget)) {
            this.columns.splice(0, 0,{
                width: 25, align: 'center', sortable: false, hideable: false, menuDisabled: true, draggable: false, groupable: false,
                xtype: 'actioncolumn',
                items: [{getClass: function () {
                        return 'x-fas fa-eye';
                    },
                    handler: 'onOpenDettaglio'
                }
                ]
            })
            this.columns.splice(3, 0,{
                text: Locale.t('wcon.column.scaduto'),
                width:Ext.global.Vars.infoUser.theme==='big'?180:150,
                dataIndex: 'scaduto', align: 'right',summaryType: 'sum',
                renderer: function (v) {
                    return Ext.util.Format.currency(v, '€ ', 2);
                },
                summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.currency(value, '€ ', 2);
                    return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
                }
            })
            this.columns.splice(4, 0,{
                text: Locale.t('wcon.column.insoluto'), dataIndex: 'insoluto', align: 'right',summaryType: 'sum',
                width:Ext.global.Vars.infoUser.theme==='big'?180:150,
                renderer: function (v) {
                    return Ext.util.Format.currency(v, '€ ', 2);
                },
                summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.currency(value, '€ ', 2);
                    return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
                }
            })
            this.columns.splice(6, 0,{
                text: Locale.t('wcon.column.totale'), dataIndex: 'totale', align: 'right',summaryType: 'sum',
                width:Ext.global.Vars.infoUser.theme==='big'?200:150,
                renderer: function (v) {
                    let tmptotal = Ext.util.Format.currency(v, '€ ', 2);
                    return '<span style=\"font-weight:bold;\">' + tmptotal + '</span>'
                }, summaryRenderer: function (value) {
                    let tmp = Ext.util.Format.currency(value, '€ ', 2);
                    return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
                }
            })
        }
        //fido
        if (this.checkRuoliWidget(['6'], this.getView().widget)) {
            me.hideFido = false
            this.columns.splice(7, 0,{
                text: Locale.t('wcon.column.fido'), dataIndex: 'fido', align: 'right',
                width:Ext.global.Vars.infoUser.theme==='big'?200:150,
                renderer: function (v,m,r) {
                    if (v!==0) {
                        if(r.get('oltrefido')==='S'){
                            m.tdAttr = 'data-qtip="' + Locale.t('wcon.column.oltrefido') + '"';
                            let tmp=Ext.util.Format.currency(v, '€ ', 2);
                            return '<span style=\"color:red;font-weight:bold;\">' + tmp + '</span>'
                        } else {
                            return Ext.util.Format.currency(v, '€ ', 2);
                        }
                    } else {
                        return ''
                    }
                }
            })
        }
        //note
        if (this.checkRuoliWidget(['11','12'], this.getView().widget)) {
            this.columns.splice(8, 0,{
                text: Locale.t('wcon.column.note'), dataIndex: 'nota', align: 'left',
                width: Ext.global.Vars.infoUser.theme==='big'?300:280
            })
        }
        if (this.checkRuoliWidget(['11'], this.getView().widget)) {
            this.columns.splice(9, 0,{
                width: 25, align: 'center', sortable: false, hideable: false, menuDisabled: true, draggable: false, groupable: false,
                xtype: 'actioncolumn',
                items: [{getClass: function (v, metadata, r) {
                        if (r.data.nota==='') {
                            metadata.tdAttr = `data-qtip="${Locale.t("wcon.note.inserisci")}"`;
                            return 'bd-action-null x-fas fa-plus-circle bd-color-green';
                        } else {
                            metadata.tdAttr = `data-qtip="${Locale.t("wcon.note.modifica")}"`;
                            return 'bd-action-null x-fas fa-edit';
                        }
                    },
                    handler: 'onOpenNota'
                }
                ]
            })
        }
        //lettura note
        if (this.checkRuoliWidget(['12'], this.getView().widget)) {
            this.columns.splice(9, 0,{
                width: 25, align: 'center', sortable: false, hideable: false, menuDisabled: true, draggable: false, groupable: false,
                xtype: 'actioncolumn',
                items: [
                    {getClass: function (v,metadata,r) {
                            if (r.data.nota!=='') {
                                metadata.tdAttr = `data-qtip="${Locale.t("wcon.note.leggi")}"`;
                                return 'bd-action-null x-fas fa-info-circle bd-color-blue';
                            }
                        },
                        handler: 'onOpenNota'
                    }
                ]
            })
        }
        //verifico visualizzazione filtro tipo ita/ee
        if (this.checkRuoliWidget(['3'], this.getView().widget)) {
            this.toolBar.items.items[2].show()
        } else {
            this.toolBar.items.items[2].hide()
        }
        //verifico visualizzazione filtro tipo ita/ee
        if (this.checkRuoliWidget(['2'], this.getView().widget) && !this.checkRuoliWidget(['3'], this.getView().widget)) {
            this.toolBar.items.items[3].show()
        }
        //verifico visualizzazione filtro tipo ita/ee
        if (this.checkRuoliWidget(['2'], this.getView().widget) && this.checkRuoliWidget(['3'], this.getView().widget)) {
            this.toolBar.items.items[4].show()
        } else {
            this.toolBar.items.items[4].hide()
        }
        this.grid = Ext.create('home.view.dashboard.widgets.wcon.view.main.Grid', {
            flex:1,
            bind: {
                store: '{store}'
            },
            dockedItems: [
                this.toolBar
            ],
            columns: this.columns,
            listeners:{
                afterRender: 'onActivate'
            }
        })
        if (this.checkRuoliWidget(['20'], this.getView().widget)) {
            this.espexcel= Ext.create('home.view.dashboard.widgets.wcon.view.component.espExcel')
            this.toolBar.add(this.espexcel);
        }
        if (this.checkRuoliWidget(['10'], this.getView().widget)) {
            this.toolBar.add({xtype: 'tbfill'});
            this.toolBar.add({
                iconCls: 'fas fa-cog',
                handler: 'onOpenConfig'
            });
            this.toolBar.add({
                iconCls: 'fas fa-lock',
                handler: 'onOpenRiservati'
            });
        }
        this.mainPanel.add(this.grid)
        this.getView().add(this.mainPanel)
    },
    //pannello
    loadElenco: function () {
        let me = this,
            vm = me.getViewModel(),
            ricerca = vm.get('ricerca'), nazione = vm.get('nazione'), regione = vm.get('regione'), radionaz = vm.get('radionaz')
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
            params: {ricerca: ricerca,nazione:nazione,regione:regione,radionaz:radionaz},
            url: Backend.REST_VERSION + 'widgets/wcon/getstore',
            success: function (record) {
                let rec = Ext.decode(record.responseText);
                me.grid.reconfigure(rec.store, me.columns)
                me.getView().setTitle(Locale.t('wcon.title') + rec.updata)
                if (me.myMask) {
                    me.myMask.hide();
                }
            },
            failure: function () {
                Ext.Msg.show({
                    title: Locale.t('global.attenzione'),
                    msg: rec['msg'],
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        });
    },
    //refresh grid e filtri
    onReloadGrid: function () {
        this.loadElenco()
    },
    onSearchTriggetSearch: function (item) {
        let vm = this.getViewModel()
        let value = item.getValue();
        vm.set('ricerca', item.getValue())
        if (value.length < 1) {
            if (item.hasSearch) {
                this.onClearTriggetSearch(item);
            }
            return;
        }
        item.getTrigger('clear').show();
        this.loadElenco()
        item.hasSearch = true;
    },
    onSpecialkeySearch: function (item, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearchTriggetSearch(item);
        }
    },
    onClearTriggetSearch: function (item) {
        let vm = this.getViewModel()
        if (item.hasSearch) {
            vm.set('ricerca', '')
            item.setValue('');
            this.loadElenco()
            item.hasSearch = false;
            item.getTrigger('clear').hide();
        }
    },
    onSearchNazione: function(cmb) {
        let vm = this.getViewModel()
        vm.set('nazione', cmb.getValue())
        if (cmb.getValue()==='IT') {
            this.toolBar.items.items[3].show()
        } else {
            vm.set('regione', '')
            this.toolBar.items.items[3].setValue('')
            this.toolBar.items.items[3].hide()
        }
        this.loadElenco()
    },
    onSpecialkeyNazione: function (item, e) {
        let vm = this.getViewModel()
        if (e.getKey() === e.ENTER) {
            if (!item.getValue()) {
                vm.set('nazione', '')
                vm.set('regione', '')
                this.toolBar.items.items[3].hide()
                this.toolBar.items.items[3].setValue('')
                this.loadElenco()
            }
        }
    },
    onSearchRegione: function(cmb) {
        let vm = this.getViewModel()
        vm.set('regione', cmb.getValue())
        this.loadElenco()
    },
    onSpecialkeyRegione: function (item, e) {
        let vm = this.getViewModel()
        if (e.getKey() === e.ENTER) {
            if (!item.getValue()) {
                vm.set('regione', '')
                this.loadElenco()
            }
        }
    },
    onChangeTiponazione: function(rdg,newval) {
        let vm = this.getViewModel()
        vm.set('radionaz',newval)
        this.loadElenco()
        //imposto colore sull'oggetto della toolbar
        let fldsettipo = this.toolBar.items.items[4]
        if (fldsettipo) { //coloro sfondo fieldset
            if (newval!==0) {
                fldsettipo.setStyle({
                    backgroundColor: '#84fffd'
                })
            } else {
                fldsettipo.setStyle({
                    backgroundColor: 'transparent'
                })
            }
        }
    },
    //dettaglio
    onOpenDettaglio:function(view, rowIndex, colIndex, item, event, record) {
        let me = this
        this.getView().el.mask(Locale.t('global.form.caricamento'))
        //se presente distruggo panl dettaglio e lo ricreo
        if (this.dettaglio){
            this.dettaglio.destroy()
        }
        this.getView().setHeight(600) //setto altezza panel
        let cliente=record.data.codice+' - '+record.data.ragsoc
        this.dettaglio = Ext.create('home.view.dashboard.widgets.wcon.view.dettaglio.Panel', {
            flex:1,
            valori: {
                cdcli: record.data.codice,
                hidefido:me.hideFido,
                titolo: cliente
            }
        })
        this.dettaglio.on('close', this.onCloseDettaglio, this);
        this.mainPanel.add(this.dettaglio)
        this.getView().setActiveItem(this.dettaglio) //imposto attivo dettaglio
        this.getView().el.unmask()
    },
    onCloseDettaglio:function() {
        this.getView().setHeight(400) //reimposto altezza
        this.getView().setActiveItem(this.grid) //imposto attiva la grid
    },
    //gestione esclusi
    onOpenConfig:function() {
        if (this.configurazione){
            this.configurazione.destroy()
        }
        this.configurazione = Ext.create('home.view.dashboard.widgets.wcon.view.config.Grid', {
            flex:1,
            title: Locale.t('wcon.gridconfig.title'),
        })
        this.configurazione.on('close', this.onCloseConfig, this);
        this.mainPanel.add(this.configurazione)
        this.getView().setActiveItem(this.configurazione) //imposto attivo
    },
    onCloseConfig:function() {
        this.getView().setActiveItem(this.grid) //imposto attiva la grid
    },
    //gestione riservati
    onOpenRiservati:function() {
        if (this.riservati){
            this.riservati.destroy()
        }
        this.riservati = Ext.create('home.view.dashboard.widgets.wcon.view.riservati.Grid', {
            flex:1,
            title: Locale.t('wcon.riservati.title'),
        })
        this.riservati.on('close', this.onCloseRiservati, this);
        this.mainPanel.add(this.riservati)
        this.getView().setActiveItem(this.riservati) //imposto attivo
    },
    onCloseRiservati:function() {
        this.getView().setActiveItem(this.grid) //imposto attiva la grid
    },
    //note
    onOpenNota:function(view, rowIndex, colIndex, item, event, record) {
        let me=this, hidesavenote=true, vm = this.getViewModel()
        if (this.checkRuoliWidget(['12'], this.getView().widget) && record.data.nota==='') {
            return false
        }
        if (this.checkRuoliWidget(['11'], this.getView().widget)) {
            hidesavenote=false
        }
        vm.set('hidesavenote',hidesavenote)
        if (this.notepanel){
            this.notepanel.destroy()
        }
        let cliente=record.data.codice+' - '+record.data.ragsoc
        this.notepanel = Ext.create('home.view.dashboard.widgets.wcon.view.note.Panel', {
            flex:1,
            title: Locale.t('wcon.note.title')+cliente,
            note:record.data.nota,
            cdcli:record.data.codice,
            readOnlyNote:!me.checkRuoliWidget(['11'], me.getView().widget)
        })
        this.notepanel.on('close', this.onCloseNote, this);
        this.mainPanel.add(this.notepanel)
        this.getView().setActiveItem(this.notepanel) //imposto attivo
    },
    onCloseNote:function() {
        this.getView().setActiveItem(this.grid) //imposto attiva la grid
        this.onReloadGrid()
    },
    //esportazione excel grid
    onEsporta:function() {
        let me = this
        //recupero filtri attuali
        let btnX = Ext.create('Ext.Button', {
            text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
                wndw.destroy();
            }
        });
        let btnConfirm = Ext.create('Ext.Button', {
            text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
                me.view.el.mask(Locale.t("global.actions.incorso"));
                wndw.hide();
                Ext.Ajax.request({
                    method: 'POST',timeout : 900000,
                    url: Backend.REST_VERSION + 'widgets/wcon/esportalista',
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
                {xtype: "container", style: { padding: "5px" }, html: '<span style="font-weight:bold;color:blue">' + Locale.t('wcon.esporta.msg') + "</span>"}
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title: Locale.t('wcon.esporta.title'),
            width: 550, autoHeight: true, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();
    }
});