/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.wcld.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.v1-wcld',

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
        'home.view.dashboard.widgets.wcld.view.component.espExcel',
        'home.view.dashboard.widgets.wcld.view.filtri.Avanzamento',
        'home.view.dashboard.widgets.wcld.view.filtri.Stato',
        'home.view.dashboard.widgets.wcld.view.filtri.Testo',
        'home.view.dashboard.widgets.wcld.view.main.Grid'
    ],
    mixins: ['portal.v1.global.Util'],
    init: function () {
        let me=this
        this.firstLoad = true
        this.mainPanel = Ext.create('Ext.panel.Panel', {
            layout: {type: "hbox", align: "stretch"},
        })
        this.filtrostato= Ext.create('home.view.dashboard.widgets.wcld.view.filtri.Stato')
        this.filtroavanzamento= Ext.create('home.view.dashboard.widgets.wcld.view.filtri.Avanzamento')
        this.filtrotesto= Ext.create('home.view.dashboard.widgets.wcld.view.filtri.Testo')
        this.espexcel= Ext.create('home.view.dashboard.widgets.wcld.view.component.espExcel')
        this.toolBar = Ext.create('Ext.Toolbar', {
            items: [
                {iconCls: 'pictos pictos-refresh', handler: 'onReloadGrid'},
                me.filtrostato,
                me.filtroavanzamento,
                {xtype: 'button', iconCls: 'fas fa-times',defaultType: 'splitbutton',handler: 'onClearAvanzamento'},
                me.filtrotesto,
                me.espexcel
            ]
        })
        this.columns = [
            {width: 30, align: 'center', sortable: false, hideable: false, menuDisabled: true, draggable: false, groupable: false,
                xtype: 'actioncolumn',
                items: [{
                    getClass: function () {
                        return 'x-fas fa-eye';
                    },
                    handler: 'onOpenRecord'
                }
                ]
            },
            {text: Locale.t('wcld.grid.columns.numero'), width: Ext.global.Vars.infoUser.theme === 'big' ? 90 : 80,
                dataIndex: 'numero',summaryType: 'count', draggable: false,
                summaryRenderer: function (value) {
                    return '<span style=\"font-weight:bold;halign:right;\">' + value + '</span>'
                }
            },
            {text: Locale.t('wcld.grid.columns.fornitore'), width: Ext.global.Vars.infoUser.theme === 'big' ? 150 : 140,
                dataIndex: 'fornitore', draggable: false
            },
            {text: Locale.t('wcld.grid.columns.datadoc'), width: Ext.global.Vars.infoUser.theme === 'big' ? 120 : 100, dataIndex: 'datadoc',draggable: false,
                renderer : function(v,m,r){
                    if (r.data.datadoc) {
                        return Ext.util.Format.date(v,'d/m/y')
                    } else {
                        return ''
                    }
                }
            },
            {text: Locale.t('wcld.grid.columns.marca'), width: Ext.global.Vars.infoUser.theme === 'big' ? 110 : 120,
                dataIndex: 'marca', draggable: false
            },
            {text: Locale.t('wcld.grid.columns.modello'), width: Ext.global.Vars.infoUser.theme === 'big' ? 110 : 120,
                dataIndex: 'modello', draggable: false
            },
            {text: Locale.t('wcld.grid.columns.codacr'), width: Ext.global.Vars.infoUser.theme === 'big' ? 120 : 110,
                dataIndex: 'codacr', draggable: false
            },
            {text: Locale.t('wcld.grid.columns.stato'), width: Ext.global.Vars.infoUser.theme === 'big' ? 120 : 110,
                dataIndex: 'stato', draggable: false,hidden:true
            },
            {text: Locale.t('wcld.grid.columns.completamento'), width: Ext.global.Vars.infoUser.theme === 'big' ? 120 : 110,
                dataIndex: 'completamento', draggable: false,hidden:true,
                renderer: Ext.util.Format.dateRenderer('d/m/Y')
            },
            {text: Locale.t('wcld.grid.columns.studio'), width: Ext.global.Vars.infoUser.theme === 'big' ? 110 : 80,
                dataIndex: 'studio', draggable: false,sortable:false,align:'center', xtype: 'actioncolumn',hideable: false,
                items: [{getClass: function (v) {
                        if (v===1) {
                            return "bd-action-null x-fas fa-check bd-color-green";
                        } else {
                            return "bd-action-null";
                        }
                    }
                }]
            },
            {text: Locale.t('wcld.grid.columns.prodotti'), width: Ext.global.Vars.infoUser.theme === 'big' ? 110 : 80,
                dataIndex: 'prodotti', draggable: false,sortable:false,align:'center', xtype: 'actioncolumn',hideable: false,
                items: [{getClass: function (v) {
                        if (v===1) {
                            return "bd-action-null x-fas fa-check bd-color-green";
                        } else {
                            return "bd-action-null";
                        }
                    }
                }]
            },
            {text: Locale.t('wcld.grid.columns.dispprodotti'), width: Ext.global.Vars.infoUser.theme === 'big' ? 110 : 80,
                dataIndex: 'dispprodotti', draggable: false,sortable:false,align:'center', xtype: 'actioncolumn',hideable: false,
                items: [{getClass: function (v) {
                        if (v===1) {
                            return "bd-action-null x-fas fa-check bd-color-green";
                        } else {
                            return "bd-action-null";
                        }
                    }
                }]
            },
            {text: Locale.t('wcld.grid.columns.definizione'), width: Ext.global.Vars.infoUser.theme === 'big' ? 110 : 80,
                dataIndex: 'definizione', draggable: false,sortable:false,align:'center',xtype: 'actioncolumn',hideable: false,
                items: [{getClass: function (v) {
                        if (v===1) {
                            return "bd-action-null x-fas fa-check bd-color-green";
                        } else {
                            return "bd-action-null";
                        }
                    }
                }]
            },
            {text: Locale.t('wcld.grid.columns.codifica'), width: Ext.global.Vars.infoUser.theme === 'big' ? 110 : 80,
                dataIndex: 'codifica', draggable: false,sortable:false,align:'center', xtype: 'actioncolumn',hideable: false,
                items: [{getClass: function (v) {
                        if (v===1) {
                            return "bd-action-null x-fas fa-check bd-color-green";
                        } else {
                            return "bd-action-null";
                        }
                    }
                }]
            },
            {text: Locale.t('wcld.grid.columns.caratterizzazione'), width: Ext.global.Vars.infoUser.theme === 'big' ? 110 : 80,
                dataIndex: 'caratterizzazione', draggable: false,sortable:false,align:'center', xtype: 'actioncolumn',hideable: false,
                items: [{getClass: function (v) {
                        if (v===1) {
                            return "bd-action-null x-fas fa-check bd-color-green";
                        } else {
                            return "bd-action-null";
                        }
                    }
                }]
            },
            {text: Locale.t('wcld.grid.columns.stabilimento'), width: Ext.global.Vars.infoUser.theme === 'big' ? 110 : 80,
                dataIndex: 'stabilimento', draggable: false,sortable:false,align:'center', xtype: 'actioncolumn',hideable: false,
                items: [{getClass: function (v) {
                        if (v===1) {
                            return "bd-action-null x-fas fa-check bd-color-green";
                        } else {
                            return "bd-action-null";
                        }
                    }
                }]
            },
            {text: Locale.t('wcld.grid.columns.prototipo'), width: Ext.global.Vars.infoUser.theme === 'big' ? 110 : 80,
                dataIndex: 'prototipo', draggable: false,sortable:false,align:'center', xtype: 'actioncolumn',hideable: false,
                items: [{getClass: function (v) {
                        if (v===1) {
                            return "bd-action-null x-fas fa-check bd-color-green";
                        } else {
                            return "bd-action-null";
                        }
                    }
                }]
            },
            {text: Locale.t('wcld.grid.columns.ciclatura'), width: Ext.global.Vars.infoUser.theme === 'big' ? 110 : 80,
                dataIndex: 'ciclatura', draggable: false,sortable:false,align:'center', xtype: 'actioncolumn',hideable: false,
                items: [{getClass: function (v) {
                        if (v===1) {
                            return "bd-action-null x-fas fa-check bd-color-green";
                        } else {
                            return "bd-action-null";
                        }
                    }
                }]
            },
            {text: Locale.t('wcld.grid.columns.ordine'), width: Ext.global.Vars.infoUser.theme === 'big' ? 110 : 80,
                dataIndex: 'ordine', draggable: false,sortable:false,align:'center', xtype: 'actioncolumn',hideable: false,
                items: [{getClass: function (v) {
                        if (v===1) {
                            return "bd-action-null x-fas fa-check bd-color-green";
                        } else {
                            return "bd-action-null";
                        }
                    }
                }]
            },
            {text: Locale.t('wcld.grid.columns.pezzo'), width: Ext.global.Vars.infoUser.theme === 'big' ? 110 : 80,
                dataIndex: 'pezzo', draggable: false,sortable:false,align:'center', xtype: 'actioncolumn',hideable: false,
                items: [{getClass: function (v) {
                        if (v===1) {
                            return "bd-action-null x-fas fa-check bd-color-green";
                        } else {
                            return "bd-action-null";
                        }
                    }
                }]
            },
            {text: Locale.t('wcld.grid.columns.comcli'), width: Ext.global.Vars.infoUser.theme === 'big' ? 110 : 80,
                dataIndex: 'comcli', draggable: false,sortable:false,align:'center', xtype: 'actioncolumn',hideable: false,
                items: [{getClass: function (v) {
                        if (v===1) {
                            return "bd-action-null x-fas fa-check bd-color-green";
                        } else {
                            if (v===-1) {
                                return "bd-action-null x-fas fa-check bd-color-red";
                            }
                            return "bd-action-null";
                        }
                    }
                }]
            },
            {text: Locale.t('wcld.grid.columns.istupdate'), width: Ext.global.Vars.infoUser.theme === 'big' ? 110 : 80,
                dataIndex: 'istupdate', draggable: false,sortable:false,align:'center', xtype: 'actioncolumn',hideable: false,
                items: [{getClass: function (v) {
                        if (v===1) {
                            return "bd-action-null x-fas fa-check bd-color-green";
                        } else {
                            if (v===-1) {
                                return "bd-action-null x-fas fa-check bd-color-red";
                            }
                            return "bd-action-null";
                        }
                    }
                }]
            },
            {text: Locale.t('wcld.grid.columns.lotto'), width: Ext.global.Vars.infoUser.theme === 'big' ? 110 : 80,
                dataIndex: 'lotto', draggable: false,sortable:false,align:'center', xtype: 'actioncolumn',hideable: false,
                items: [{getClass: function (v) {
                        if (v===1) {
                            return "bd-action-null x-fas fa-check bd-color-green";
                        } else {
                            return "bd-action-null";
                        }
                    }
                }]
            },
            /*
            {text: Locale.t('wcld.grid.columns.istruzioni'), width: Ext.global.Vars.infoUser.theme === 'big' ? 110 : 80,
                dataIndex: 'istruzioni', draggable: false,sortable:false,align:'center', xtype: 'actioncolumn',hideable: false,
                items: [{getClass: function (v) {
                        if (v===1) {
                            return "bd-action-null x-fas fa-check bd-color-green";
                        } else {
                            return "bd-action-null";
                        }
                    }
                }]
            },

             */
            {text: Locale.t('wcld.grid.columns.chiusa'), width: Ext.global.Vars.infoUser.theme === 'big' ? 110 : 80,
                dataIndex: 'chiusa', draggable: false,sortable:false,align:'center', xtype: 'actioncolumn',hideable: false,
                items: [{getClass: function (v) {
                        if (v===1) {
                            return "bd-action-null x-fas fa-check bd-color-green";
                        } else {
                            return "bd-action-null";
                        }
                    }
                }]
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
        vm.set('hideexcel', hidexcel)
        //grid principale
        this.grid = Ext.create('home.view.dashboard.widgets.wcld.view.main.Grid', {
            flex: 1,
            bind: {store: '{store}'},
            dockedItems: [this.toolBar,this.toolbarFooter],
            columns: this.columns
        })
        this.mainPanel.add(this.grid)
        this.getView().add(this.mainPanel) //grid principale
        this.onReloadGrid()
    },
    onReloadGrid: function () {
        let vm = this.getViewModel(), store = vm.getStore('store')
        if (store.sorters) {
            store.sorters.clear() //rimuovo eventuali ordinamenti
        }
        store.load()
    },
    //filtri
    onChangeStato:function(rdg, newval) {
        let vm = this.getViewModel(),store = vm.getStore('store')
        store.getProxy().extraParams.stato=newval
        store.load()
    },
    onChangeAvanzamento:function(cmb) {
        let vm = this.getViewModel(),store = vm.getStore('store')
        //disabilito filtro x stato
        this.filtrostato.setValue(1)
        this.filtrostato.disable()
        store.getProxy().extraParams.avanzamento=cmb.getValue()
        store.load()
    },
    onClearAvanzamento:function() {
        let vm = this.getViewModel(),store = vm.getStore('store')
        store.getProxy().extraParams.avanzamento=0
        this.filtrostato.enable() //abilito filtro stato
        this.filtroavanzamento.setValue('')
        store.load()
    },
    onSpecialKeyAvanzamento:function(item, e) {
        let vm = this.getViewModel(),store = vm.getStore('store')
        if (e.getKey() === e.ENTER) {
            if (!item.getValue()) {
                store.getProxy().extraParams.avanzamento=0
                this.filtrostato.enable() //abilito filtro stato
                store.load()
            }
        }
    },
    onSpecialKeyTesto:function(item) {
        let vm = this.getViewModel(),store = vm.getStore('store')
        store.getProxy().extraParams.testo=item.getValue()
        item.getTrigger('clear').show();
        store.load()
    },
    onClearTriggerTesto:function(item) {
        let vm = this.getViewModel(),store = vm.getStore('store')
        item.setValue('');
        store.getProxy().extraParams.testo=''
        item.getTrigger('clear').hide();
        store.load()
    },
    //apertura record
    onOpenRecord: function (grid, rowIndex) {
        let rec = grid.getStore().getAt(rowIndex);
        if (rec.data.accesso===0) {
            Ext.Msg.show({title: Locale.t('global.attenzione'), msg: '404 - FORBIDDEN', buttons: Ext.Msg.OK, icon: Ext.MessageBox.ERROR});
            return
        }
        //verifico se è una scheda (prodotti=1) o ancora uno studio (prodotti=0)
        if (rec.data.app==='CLD') {
            this.getView().dashboard.onOpenAppNotifiche({
                iconCls: 'CLD-16',
                iconCls32: 'CLD-32',
                iconCls64: 'CLD-64',
                tag: 'CLD',
                appui: 'cld',
                target: 'frame',
                text: Locale.t('cld.title'),
                datiApertura: {tabella: 'TBCLDSCH01', id: rec.data.id, idrecord: rec.data.id},
                tipo: 'app6',
                url: '',
                id: rec.data.id,
                idrecord: rec.data.id,
                tabella: 'TBCLDSCH01'
            })
        } else {
            this.getView().dashboard.onOpenAppNotifiche({
                appui: 'blue',
                iconCls: 'SNP-16',
                iconCls32: 'SNP-32',
                iconCls64: 'SNP-64',
                datiApertura: {tabella: 'TBSNPSCH01', id: rec.data.id, idrecord: rec.data.id},
                tag: 'SNP',
                target: 'frame',
                tipo: 'app6',
                versioneApp:'v1',
                url: '',
                id: rec.data.id,
                idrecord: rec.data.id,
                tabella: 'TBSNPSCH01'
            });
        }
    },
    //esportazione
    onEsporta: function () {
        let me = this
        //recupero filtri attuali
        let stato=this.filtrostato.getValue()
        let avanzamento=this.filtroavanzamento.getValue()
        let testo=this.filtrotesto.getValue()
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
                    params: {selezione:selezione,stato:stato,avanzamento:avanzamento,testo:testo},
                    url: Backend.REST_VERSION + 'widgets/wcld/esporta',
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
                {xtype: 'container', layout: 'hbox',defaults: {margin: 5}, items: [
                        {xtype: 'radiogroup', name: 'selezione', hideLabel:true,
                            columns: 2, width:450, simpleValue: true,
                            items: [
                                {boxLabel: Locale.t('wcld.esporta.tutti'), inputValue: 0, checked: true},
                                {boxLabel: Locale.t('wcld.esporta.selezione'), inputValue: 1}
                            ]
                        }
                    ]
                }
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title: Locale.t('wcld.esporta.title'),
            width: 550, autoHeight: true, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();
    }
})
