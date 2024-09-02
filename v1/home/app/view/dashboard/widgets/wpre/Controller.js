/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wpre.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.v1-widgetpre',
    requires: [
        'Ext.LoadMask',
        'Ext.grid.column.Action',
        'Ext.grid.filters.Filters',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'Ext.panel.Panel',
        'Ext.toolbar.Fill',
        'Ext.toolbar.Toolbar',
        'home.view.dashboard.widgets.wpre.view.giustificativo.Panel',
        'home.view.dashboard.widgets.wpre.view.main.Grid',
        'home.view.dashboard.widgets.wpre.view.main.Info',
        'home.view.dashboard.widgets.wpre.view.main.fields.SearchDate',
        'home.view.dashboard.widgets.wpre.view.main.fields.SearchDip',
        'home.view.dashboard.widgets.wpre.view.main.fields.SearchSede',
        'home.view.dashboard.widgets.wpre.view.note.Panel'
    ],
    mixins: ['portal.v1.global.Util'],
    init: function () {
        this.firstLoad =true
        this.mainPanel = Ext.create('Ext.panel.Panel', {
            layout: {
                type: "hbox", align: "stretch"
            },
        })
        this.panelFirst = Ext.create('Ext.panel.Panel', {
            flex: 2,
            layout: {
                type: "vbox", align: "stretch"
            },
        })
        this.infopanel = Ext.create('home.view.dashboard.widgets.wpre.view.main.Info', {
            flex: 1
        });

        this.toolBar = Ext.create('Ext.Toolbar', {
            items: [
                {iconCls: 'pictos pictos-refresh', handler: 'onReloadGrid'},
                {xtype: 'v1-wpre-searchdate'},
                {xtype: 'v1-wpre-searchdip'}
            ]
        })

        this.columns = [
            {text: Locale.t('wpre.column.dipendente'),
                width: Ext.global.Vars.infoUser.theme==='big'?200:180,
                dataIndex: 'dipendente'},
            {text: Locale.t('wpre.column.reparto'),
                width: Ext.global.Vars.infoUser.theme==='big'?220:200,
                dataIndex: 'reparto',filter: {type: 'string'}},
            {
                width: 25,
                align: 'center',
                menuDisabled: true,
                draggable: false,
                groupable: false,
                xtype: 'actioncolumn',
                items: [
                    {
                        getClass: function (v, meta, r) {
                            return r.data['giustificativo'];
                        }
                        , handler: 'onOpenGiustificativo'
                    }
                ]
            },

            {
                text: Locale.t('wpre.column.ing'),
                width: Ext.global.Vars.infoUser.theme==='big'?70:60,
                dataIndex: 'orapre1',
                resizable: false,
                draggable: false
            },
            {
                text: Locale.t('wpre.column.usc'),
                width: Ext.global.Vars.infoUser.theme==='big'?70:60,
                dataIndex: 'orapre2',
                resizable: false,
                draggable: false
            },
            {
                text: Locale.t('wpre.column.ing'),
                width: Ext.global.Vars.infoUser.theme==='big'?70:60,
                dataIndex: 'orapre3',
                resizable: false,
                draggable: false
            },
            {
                text: Locale.t('wpre.column.usc'),
                width: Ext.global.Vars.infoUser.theme==='big'?70:60,
                dataIndex: 'orapre4',
                resizable: false,
                draggable: false
            },
            {
                text: Locale.t('wpre.column.ing'),
                width: Ext.global.Vars.infoUser.theme==='big'?70:60,
                dataIndex: 'orapre5',
                resizable: false,
                draggable: false
            },
            {
                text: Locale.t('wpre.column.usc'),
                width: Ext.global.Vars.infoUser.theme==='big'?70:60,
                dataIndex: 'orapre6',
                resizable: false,
                draggable: false
            },
            {
                text: Locale.t('wpre.column.ing'),
                width: Ext.global.Vars.infoUser.theme==='big'?70:60,
                dataIndex: 'orapre7',
                resizable: false,
                draggable: false
            },
            {
                text: Locale.t('wpre.column.usc'),
                width: Ext.global.Vars.infoUser.theme==='big'?70:60,
                dataIndex: 'orapre8',
                resizable: false,
                draggable: false
            }
        ]
    },
    //creazione pannello
    onAfterRender: function () {
        let vm = this.getViewModel()
        vm.set('widget', this.getView().widget);
        let hideSede = true,hideMagazzino = true,hideCicagna = true,hideTunisia = true
        //se è abilitato visualizzo la gestione note
        if (this.checkRuoliWidget(['1'], this.getView().widget)) {
            this.columns.splice(3, 0,{
                width: 25,
                align: 'center',
                sortable: false,
                hideable: false,
                menuDisabled: true,
                draggable: false,
                groupable: false,
                xtype: 'actioncolumn',
                items: [
                    {
                        getClass: function () {
                            return 'x-fas fa-pencil-alt';
                        }
                        , handler: 'onOpenGiustificativoEdit'
                    }
                ]
            })
        }
        if (this.checkRuoliWidget(['5'], this.getView().widget)) {
            hideSede = false
        }
        if (this.checkRuoliWidget(['2'], this.getView().widget)) {
            hideMagazzino = false
        }
        if (this.checkRuoliWidget(['6'], this.getView().widget)) {
            hideCicagna = false
        }
        if (this.checkRuoliWidget(['7'], this.getView().widget)) {
            hideTunisia = false
        }
        //visibilità filtro
        vm.set('hideMagazzino',hideMagazzino)
        vm.set('hideSede',hideSede)
        vm.set('hideCicagna',hideCicagna)
        vm.set('hideTunisia',hideTunisia)
        this.grid = Ext.create('home.view.dashboard.widgets.wpre.view.main.Grid', {
            flex: 2,
            plugins: [{
                ptype: 'gridfilters',
                menuFilterText: 'Filtri'
            }],
            bind: {
                store: '{store}'
            },
            dockedItems: [
                this.toolBar
            ],
            columns: this.columns
        });
        if (this.checkRuoliWidget(['1'], this.getView().widget)) {
            this.toolBar.add({xtype: 'tbfill'});
            this.toolBar.add({
                iconCls: 'fas fa-cog',
                handler: 'onOpenNote'
            });
        }
        //verifico se visualizzare filtro sedi
        let elenco=[]
        for (let a of this.getView().widget.ruoli) {
            elenco.push(a.valore)
        }
        if ((elenco.includes('5') && elenco.includes('6')) || (elenco.includes('5') && elenco.includes('7')) || (elenco.includes('6') && elenco.includes('7'))) {
            //  if (this.getView().widget.ruoli && this.getView().widget.ruoli.length>1) {
            this.grid.addDocked(Ext.create('Ext.Toolbar', {
                items: [
                    {xtype: 'v1-wpre-sede'}
                ]
            }))
        }
        this.mainPanel.add(this.grid)
        this.mainPanel.add(this.infopanel);
        this.getView().add(this.mainPanel);

        //carico totali
        this.loadTotali()
    },

    //pannello
    loadTotali: function () {
        let me = this,
            vm = me.getViewModel(),
            ricerca = vm.get('ricerca'),
            data = vm.get('data'),
            sede = vm.get('sede')

        if (this.firstLoad === false){
            this.myMask = new Ext.LoadMask({
                msg    : Locale.t('global.form.caricamento'),
                target : me.grid.getView()
            });
            this.myMask.show();
        }else{
            this.firstLoad=false
        }
        if (this.pregiust){
            this.pregiust.destroy()
        }
        if( this.infopanel.hidden===true){
            this.infopanel.show()
        }

        Ext.Ajax.request({
            method: 'POST',
            params: {seldata: data, ricerca: ricerca, sede: sede},
            url: Backend.REST_VERSION + 'widgets/wpre/gettotali',
            success: function (record) {
                let rec = Ext.decode(record.responseText);
                vm.set('totali', rec)
                me.grid.reconfigure(rec.store, me.columns)
                me.getView().setTitle(Locale.t('wpre.title') + ', <u>' + Locale.t('wpre.aggiornamento') + ' ' + rec.updata+'</u>')
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
    //refresh grid
    onReloadGrid: function () {
        this.loadTotali()
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
        this.loadTotali()
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
            this.loadTotali()
            item.hasSearch = false;
            item.getTrigger('clear').hide();
        }
    },
    onSearchDate: function (item, newval) {
        let vm = this.getViewModel()
        vm.set('data', newval)
        this.loadTotali()
    },


    //apertura finestra giustificativo
    onOpenGiustificativo: function (grid, rowIndex) {
        let vm = this.getViewModel(),
            data = vm.get('data'),
            rec = grid.getStore().getAt(rowIndex);
        if (rec.data['giustificativo'] === '') {
            return;
        }
        //verifico ruolo applicativo
        let widget = this.getView().widget;
        if (this.pregiust){
            this.pregiust.destroy()
        }


        this.pregiust = Ext.create('home.view.dashboard.widgets.wpre.view.giustificativo.Panel', {
            flex:2,
            edit: !this.checkRuoliWidget(['1'], widget),
            datapre: data,
            rec: rec,
            title: rec.data['dipendente']
        });
        this.pregiust.on('close', this.onCloseGiustificativo, this);
        this.infopanel.hide()
        this.mainPanel.add(this.pregiust)
    },
    //apertura in edit giustificativo
    onOpenGiustificativoEdit: function (grid, rowIndex) {
        let vm = this.getViewModel(),
            data = vm.get('data'),
            rec = grid.getStore().getAt(rowIndex);

        let widget = this.getView().widget;
        if (this.pregiust){
            this.pregiust.destroy()
        }

        this.pregiust = Ext.create('home.view.dashboard.widgets.wpre.view.giustificativo.Panel', {
            flex:2,
            edit: !this.checkRuoliWidget(['1'], widget),
            datapre: data,
            rec: rec,
            title: rec.data['dipendente']
        });

        this.pregiust.on('close', this.onCloseGiustificativo, this);
        this.infopanel.hide()
        this.mainPanel.add(this.pregiust)
    },
    onCloseGiustificativo: function () {
        this.infopanel.show()
        this.loadTotali()
    },

    //Apertura finestra note
    onOpenNote: function () {
        let me = this;
        this.wprewinnote = Ext.create('home.view.dashboard.widgets.wpre.view.note.Panel', {
            title: 'Gestione note interne'
            , listeners: {
                close: function () {
                    me.onCloseNote(); //aggiorno vista
                },
                afterrender: function () {me.onLoadNote()}
            }
        });
        this.getView().add(this.wprewinnote)
        this.getView().setActiveItem(this.wprewinnote)
    },
    onLoadNote: function (){
        let vm = this.getViewModel()
        vm.getStore('storeNote').load()
    },
    onCloseNote: function () {
        this.getView().setActiveItem(this.mainPanel)
        this.loadTotali()
    },

    //sede
    onChangeSede: function (rdg, newval) {
        let vm = this.getViewModel()
        vm.set('sede', newval)
        this.loadTotali()
    }
});
