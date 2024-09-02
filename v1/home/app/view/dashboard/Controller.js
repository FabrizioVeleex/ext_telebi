/**
 * Created by fabrizio on 21/07/21.
 */
Ext.define('home.view.dashboard.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard',
    requires: [
        'Ext.button.Button',
        'Ext.layout.container.Border',
        'Ext.layout.container.VBox',
        'Ext.panel.Panel',
        'Ext.util.DelayedTask',
        'home.view.dashboard.notifiche.Avvisi',
        'home.view.dashboard.notifiche.Azioni',
        'home.view.dashboard.widgets.switchuo.Main',
        'home.view.dashboard.widgets.watt.Main',
        'home.view.dashboard.widgets.wcld.Main',
        'home.view.dashboard.widgets.wcon.Main',
        'home.view.dashboard.widgets.word.Main',
        'home.view.dashboard.widgets.worf.Main',
        'home.view.dashboard.widgets.wort.Main',
        'home.view.dashboard.widgets.wpre.Main',
        'home.view.dashboard.widgets.wver.Main',
        'home.view.dashboard.widgets.wvoi.Main'
    ],
    init: function () {
        this.setConfModRun = 0
        this.record = null;
        this.listWidgets = {
            wcon: Ext.create('home.view.dashboard.widgets.wcon.Main', {tag: 'wcon'}),
            word: Ext.create('home.view.dashboard.widgets.word.Main', {tag: 'word'}),
            watt: Ext.create('home.view.dashboard.widgets.watt.Main', {tag: 'watt'}),
            wpre: Ext.create('home.view.dashboard.widgets.wpre.Main', {tag: 'wpre'}),
            wort: Ext.create('home.view.dashboard.widgets.wort.Main', {tag: 'wort'}),
            wver: Ext.create('home.view.dashboard.widgets.wver.Main', {tag: 'wver'}),
            wvoi: Ext.create('home.view.dashboard.widgets.wvoi.Main', {tag: 'wvoi'}),
            worf: Ext.create('home.view.dashboard.widgets.worf.Main', {tag: 'worf'}),
            wcld: Ext.create('home.view.dashboard.widgets.wcld.Main', {tag: 'wcld'})
        }

        this.avvisi = Ext.create('home.view.dashboard.notifiche.Avvisi', {
            flex: 1,
            margin: 5,
            anchor: '100%',
            collapsible: true,
            style: {
                'webkit-border-radius': '15px',
                '-moz-border-radius': '15px',
                'border-radius': '15px !important'
            },
            title: Locale.t('home.notifiche.btn.start.avvisi')
        })
        this.azioni = Ext.create('home.view.dashboard.notifiche.Azioni', {
            flex: 1,
            margin: 5,
            anchor: '100%',
            collapsible: true,
            style: {
                'webkit-border-radius': '15px',
                '-moz-border-radius': '15px',
                'border-radius': '15px !important'
            },
            title: Locale.t('home.notifiche.btn.start.azioni')
        })
    },
    onAfterRender: function () {
        let me = this;
        let widgets = this.getView().widgets;
        let taskbar = this.getView().taskbar;
        if (taskbar.btnNotifiche.visibled === true) {
            this.avvisi.getStore().load();
            this.azioni.getStore().load();
        }
        this.avvisi.getStore().load();
        this.azioni.getStore().load();
        this.itemsWidget = []
        if (!Ext.global.Vars.confMod.widgets || Ext.global.Vars.confMod.widgets.length === 0) {
            Ext.global.Vars.confMod.widgets = {}
            widgets.forEach(function (widget) {
                me.listWidgets[widget['tag']].setTitle(widget['title'])
                me.listWidgets[widget['tag']].widget = widget
                me.listWidgets[widget['tag']].dashboard = me
                me.listWidgets[widget['tag']].collapsed = false
                me.listWidgets[widget['tag']].on('collapse', 'onCollapseExpandWidget')
                me.listWidgets[widget['tag']].on('expand', 'onCollapseExpandWidget')
                me.itemsWidget.push(me.listWidgets[widget['tag']])
                Ext.global.Vars.confMod.widgets[widget['tag']] = {collapsed: false}
            })
            this.setConfMod()
        } else {
            let c
            for (let w in Ext.global.Vars.confMod.widgets) {
                if (Ext.global.Vars.confMod.widgets.hasOwnProperty(w)) {
                    c = widgets.find(x => x.tag === w)
                    if (c) {
                        me.listWidgets[c['tag']].setTitle(c['title'])
                        me.listWidgets[c['tag']].widget = c
                        me.listWidgets[c['tag']].dashboard = me
                        me.listWidgets[c['tag']].collapsed = Ext.global.Vars.confMod.widgets[w].collapsed
                        me.listWidgets[c['tag']].on('collapse', 'onCollapseExpandWidget')
                        me.listWidgets[c['tag']].on('expand', 'onCollapseExpandWidget')
                        me.itemsWidget.push(me.listWidgets[c['tag']])
                    }
                }
            }
            //verificare presenza nuovi widget
            let cl = Ext.global.Vars.confMod.widgets
            for (let w of widgets) {
                if (!Ext.global.Vars.confMod.widgets[w.tag]) {
                    me.listWidgets[w['tag']].setTitle(w['title'])
                    me.listWidgets[w['tag']].widget = w
                    me.listWidgets[w['tag']].dashboard = me
                    me.listWidgets[w['tag']].collapsed = false
                    me.listWidgets[w['tag']].on('collapse', 'onCollapseExpandWidget')
                    me.listWidgets[w['tag']].on('expand', 'onCollapseExpandWidget')
                    me.itemsWidget.push(me.listWidgets[w['tag']])
                    Ext.global.Vars.confMod.widgets[w['tag']] = {collapsed: false}
                    this.setConfMod()
                }
            }
        }
        this.center = Ext.create('Ext.panel.Panel', {
            bodyStyle: {
                'background-color': 'transparent'
            },
            region: 'center',
            scrollable: 'y',
            defaults: {
                margin: 15,
            },
            items: this.itemsWidget
        })

        this.dashboard = Ext.create('Ext.panel.Panel', {
            layout: {
                type: 'border'
            },
            bodyStyle: {
                'background-color': 'transparent'
            },
            items: [
                {
                    xtype: 'switchuo',
                    region: 'north'

                },
                {
                    xtype: 'panel',
                    bodyStyle: {
                        'background-color': 'transparent'
                    },
                    title: Locale.t('home.notifiche.titleapp'),
                    region: 'west',
                    width: 350,
                    hidden: !taskbar.btnNotifiche.visibled,
                    collapsible: true,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    header: {
                        style: {
                            'background-image': '-webkit-linear-gradient(top, rgb(210 210 210), rgb(189, 189, 189 ) 30%, rgb(189, 189, 189 ) 65%, rgb(210 210 210 ))'

                        },
                        itemPosition: 1,
                        items: [{
                            info: {
                                appui: "",
                                datiApertura: null,
                                iconCls: "NTF-16",
                                iconCls32: "NTF-32",
                                iconCls64: "NTF-64",
                                tag: "NTF",
                                target: "frame",
                                text: Locale.t('home.notifiche.titleapp'),
                                tipo: "app6",
                                url: "",
                                windowId: "NTF"
                            },
                            iconCls: "NTF-16",
                            style:{
                                background: 'transparent',
                                'border-color':'#8e8d8d'
                            },
                            xtype: 'button',
                            text: Locale.t('home.notifiche.btn.opennotifiche.text'),
                            tooltip: Locale.t('home.notifiche.btn.opennotifiche.tooltip'),
                            handler: 'onOpenAppNotifiche'
                        }]
                    },
                    items: [
                        this.azioni,
                        this.avvisi,
                    ]
                },
                this.center
            ]
        })
        this.getView().add(this.dashboard)

    },
    onUpdateNotifiche: function (totNotifiche) {
        this.avvisi.setTitle(Locale.t('home.notifiche.btn.start.avvisi') + ' [' + totNotifiche[1] + ']')
        this.azioni.setTitle(Locale.t('home.notifiche.btn.start.azioni') + ' [' + totNotifiche[0] + ']')
    },

    onCollapseExpandWidget: function (pnl) {
        Ext.global.Vars.confMod.widgets[pnl.tag].collapsed = pnl.collapsed
        this.setConfMod()
    },
    onMoveWidget: function (widget) {

        let me = this, newList = {}, next = false, wt, t = null, f = false, lw
        if (widget[1] === 'down') {
            let o = Ext.global.Vars.confMod.widgets
            for (lw in o){}
            if (lw === widget[0].tag) return;
            for (let w in Ext.global.Vars.confMod.widgets) {
                if (Ext.global.Vars.confMod.widgets.hasOwnProperty(w)) {
                    if (w === widget[0].tag) {
                        wt = Ext.global.Vars.confMod.widgets[w];
                        t = w
                    } else {
                        newList[w] = Ext.global.Vars.confMod.widgets[w]
                        if (wt) newList[t] = wt;
                        wt = null

                    }
                }
            }
        } else {
            let i = 0,w
            for (w in Ext.global.Vars.confMod.widgets) {
                if (Ext.global.Vars.confMod.widgets.hasOwnProperty(w)) {
                    if (f === true) {

                        newList[w] = Ext.global.Vars.confMod.widgets[w]
                    } else {
                        if (w === widget[0].tag) {
                            if (i === 0) return
                            newList[w] = Ext.global.Vars.confMod.widgets[w]
                            if (wt) newList[t] = wt;
                            wt = null;
                            t = null;
                            f = true
                        } else {
                            if (wt) newList[t] = wt
                        }
                        if (f === false) {
                            wt = Ext.global.Vars.confMod.widgets[w];
                            t = w
                        }
                    }
                    i++
                }
            }
        }
        Ext.global.Vars.confMod.widgets = newList

        this.center.removeAll(false)

        let widgets = this.getView().widgets, listWidgets
        let c
        for (let w in Ext.global.Vars.confMod.widgets) {
            c = widgets.find(x => x.tag === w)
            if (c) {
                me.itemsWidget.push(me.listWidgets[c['tag']])
            }
        }
        this.center.add(this.itemsWidget)
        this.setConfMod()

    },
    insertWidgets: function () {

    },
    /* ---------------------------------------------------------------------------------
     * GESTIONE NOTIFICHE
     * onLoadDataNotifiche:
     * onOpenAppNotifiche:
     * onClearTriggetSearch:
     * onClearTriggetSearch:
     * onSearchTriggetSearch:
     * onRefreshGridNotifiche:
     * onSpecialkeySearch:
     * onRemoveGridAvvisi:
     * onRemoveGridAvvisiAll:
     * onRemoveGridAvvisiHeader:
     * onOpenRecordNotifica:
     * ---------------------------------------------------------------------------------*/
    onLoadDataNotifiche: function () {
        this.avvisi.getStore().load();
        this.azioni.getStore().load();
    },
    onOpenAppNotifiche: function (btn) {
        this.getView().fireEvent('openNotifica', btn) //avvio funzione controlle main per apertura
    },
    onClearTriggetSearch: function (item) {
        let grid
        if (item.grid === 'avvisi') {
            grid = this.avvisi
        } else {
            grid = this.azioni
        }
        if (!grid) return
        let store = grid.getStore(),
            proxy = store.getProxy();
        if (item.hasSearch) {
            item.setValue('');
            proxy.extraParams.q = '';
            store.load();
            item.hasSearch = false;
            item.getTrigger('clear').hide();
        }
    },
    onSearchTriggetSearch: function (item) {
        let grid
        if (item.grid === 'avvisi') {
            grid = this.avvisi
        } else {
            grid = this.azioni
        }
        if (!grid) return
        let store = grid.getStore(),
            proxy = store.getProxy(),
            value = item.getValue();
        if (value.length < 1) {
            if (item.hasSearch) {
                this.onClearTriggetSearch(item);
            }
            return;
        }
        item.getTrigger('clear').show();
        proxy.extraParams.q = value;
        store.load();
        item.hasSearch = true;
    },

    onRefreshGridAvvisi: function () {
        this.avvisi.store.load();
    },
    onRefreshGridAzioni: function () {
        this.azioni.store.load();
    },
    onSpecialkeySearch: function (item, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearchTriggetSearch(item);
        }
    },
    onRemoveGridAvvisi: function (view, rowIndex, colIndex, item, opt, record) {
        let id = record.data.id;
        Ext.Ajax.request({
            url: Backend.REST_API + 'grids/removeAvviso/' + id,
            method: 'DELETE',
            scope: this,
            success: function (response) {
                let resJson = Ext.decode(response.responseText);
                view.store.load();
            },
            failure(record, esito) {
                try {
                    let rest = esito.error.response.responseJson;
                    Ext.Msg.show({
                        title: Locale.t('global.errore'),
                        msg: rest['msg'],
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                } catch (e) {
                    Ext.Msg.show({
                        title: Locale.t('global.errore'),
                        msg: Locale.t('global.error.server'),
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            }
        });
    },
    onRemoveGridAvvisiAll: function (btn) {
        let grid = btn.up('grid');
        Ext.Msg.show({
            iconCls: 'icon-cancel',
            title: Locale.t('home.notifiche.avvisi.title'),
            msg: Locale.t('home.notifiche.avvisi.alertall') + '</b>?<hr/> ' + Locale.t('home.notifiche.avvisi.msg1') + ':<br/> ' +
                '	- <span style=\"color:green;font-weight:bold\">' + Locale.t('home.notifiche.avvisi.yes') + '</span> ' + Locale.t('home.notifiche.avvisi.msg2') + ' <br/>' +
                '   - <span style=\"color:red;font-weight:bold\">' + Locale.t('home.notifiche.avvisi.no') + '</span> ' + Locale.t('home.notifiche.avvisi.msg3') + '.',
            buttons: Ext.Msg.YESNO,
            buttonText: {
                yes: Locale.t('home.notifiche.avvisi.yes'),
                no: Locale.t('home.notifiche.avvisi.no')
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url: Backend.REST_API + 'grids/removeAvviso/ALL',
                        method: 'DELETE',
                        scope: this,
                        success: function (response) {
                            let resJson = Ext.decode(response.responseText);
                            grid.store.load();
                        },
                        failure(record, esito) {
                            try {
                                let rest = esito.error.response.responseJson;
                                Ext.Msg.show({
                                    title: Locale.t('global.errore'),
                                    msg: rest['msg'],
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.MessageBox.ERROR
                                });
                            } catch (e) {
                                Ext.Msg.show({
                                    title: Locale.t('global.errore'),
                                    msg: Locale.t('global.error.server'),
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.MessageBox.ERROR
                                });
                            }
                        }
                    });
                }
            }
        });
    },
    onRemoveGridAvvisiHeader: function (view, node, group, e) {
        if (bdOverBtnGroupAvvisi === true) {
            let titolo = e.record.data.titolo,
                tag = e.record.data.tag;
            Ext.Msg.show({
                iconCls: 'icon-cancel',
                title: Locale.t('home.notifiche.avvisi.alert') + titolo + '?',
                msg: Locale.t('home.notifiche.avvisi.alert') + titolo + '</b>?<hr/> ' + Locale.t('home.notifiche.avvisi.msg1') + ':<br/> ' +
                    '	- <span style=\"color:green;font-weight:bold\">' + Locale.t('home.notifiche.avvisi.yes') + '</span> ' + Locale.t('home.notifiche.avvisi.msg2') + ' <br/>' +
                    '   - <span style=\"color:red;font-weight:bold\">' + Locale.t('home.notifiche.avvisi.no') + '</span> ' + Locale.t('home.notifiche.avvisi.msg3') + '.',
                buttons: Ext.Msg.YESNO,
                buttonText: {
                    yes: Locale.t('home.notifiche.avvisi.yes'),
                    no: Locale.t('home.notifiche.avvisi.no')
                },
                fn: function (btn) {
                    if (btn === 'yes') {
                        Ext.Ajax.request({
                            url: Backend.REST_API + 'grids/removeAvvisoTag/' + tag,
                            method: 'DELETE',
                            scope: this,

                            success: function (response) {
                                let resJson = Ext.decode(response.responseText);
                                view.store.load();
                            },
                            failure(record, esito) {
                                try {
                                    let rest = esito.error.response.responseJson;
                                    Ext.Msg.show({
                                        title: Locale.t('global.errore'),
                                        msg: rest['msg'],
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.MessageBox.ERROR
                                    });
                                } catch (e) {
                                    Ext.Msg.show({
                                        title: Locale.t('global.errore'),
                                        msg: Locale.t('global.error.server'),
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.MessageBox.ERROR
                                    });
                                }
                            }
                        });
                    }
                }
            });
        }
    },
    onOpenRecordNotifica: function (view, rowIndex, colIndex, item, opt, record) {
        let id = record.data.id;
        if (record.data.tipo === 'AV') {
            Ext.Ajax.request({
                url: Backend.REST_API + 'grids/removeAvviso/' + id,
                method: 'DELETE',
                scope: this,
                success: function (response) {
                    view.store.load();
                },
                failure(record, esito) {
                    try {
                        let rest = esito.error.response.responseJson;
                        Ext.Msg.show({
                            title: Locale.t('global.errore'),
                            msg: rest['msg'],
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    } catch (e) {
                        Ext.Msg.show({
                            title: Locale.t('global.errore'),
                            msg: Locale.t('global.error.server'),
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }
                }
            });
        }
        this.getView().fireEvent('openNotifica', record.data)
        // this.onHandlerMenu(record.data);
    },
    setConfMod: function () {
        this.setConfModRun++;
        let count = this.setConfModRun,
            task = new Ext.util.DelayedTask(function (count) {
                if (count === this.setConfModRun) {
                    Ext.Ajax.request({
                        method: 'POST',
                        params: {
                            'data': Ext.encode(Ext.global.Vars.confMod)
                        },
                        url: Backend.REST_API + 'setconfmod'
                    });
                }
            }, this, [count]);
        task.delay(3000);
    },
});
