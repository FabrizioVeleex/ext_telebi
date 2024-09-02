/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 *
 */
Ext.define('home.view.main.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',
    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.direct.Manager',
        'Ext.direct.PollingProvider',
        'Ext.layout.container.Card',
        'Ext.layout.container.Fit',
        'Ext.panel.Panel',
        'Ext.toolbar.Fill',
        'Ext.toolbar.Spacer',
        'home.view.dashboard.Panel',
        'home.view.imp.Panel',
        'home.view.login.Logout',
        'home.view.main.Index',
        'home.view.main.TaskBar',
        'portal.util.Functions',
        'portal.util.IFrame'
    ],

    init: function () {
        this.callParent(arguments);
        this.setConfModRun = 0;
        this.qtaAvvisi = 0;
        this.qtaAzioni = 0;
    },

    onAfterRender: function () {
        let me = this;
        this.center = Ext.create('Ext.panel.Panel', {
            region: 'center',
            layout: {
                type: 'card'
            },
            bodyStyle: {
                'background-color': 'transparent'
            },
            items: [
                { xtype: 'container', html: '&nbsp;' },
            ]
        })



        this.desktop = Ext.create('home.view.main.Index', {
            items: [
                this.center
            ]
        });

        this.getView().add(this.desktop);



        this.getView().setActiveItem(this.desktop)

        this.logout = Ext.create('home.view.login.Logout');
        this.getView().add(this.logout)

        me.getView().setBodyStyle({
            'background': 'url(/images/v1/default-wallpaper.jpg)',
            'background-size': 'cover'
        });
        if (Ext.global.Vars.infoApp && Ext.global.Vars.infoApp.idsfondo !== '' && Ext.global.Vars.infoApp.idsfondo !== 'NULL') {
            Ext.Ajax.request({
                url: Backend.REST_API + 'forms/imp/getwallpaper/' + Ext.global.Vars.infoApp.idsfondo,
                method: 'GET',
                binary: true,
                success: function (response, o) {
                    let headers = response.getAllResponseHeaders()
                    let blob = new Blob([response.responseBytes], { type: headers['content-type'] }),
                        url = window.URL.createObjectURL(blob)

                    me.getView().setBodyStyle({
                        'background': 'url(' + url + ')',
                        'background-size': 'cover'
                    });

                },
                failure: function () {

                }
            })
        }
    },

    afterrenderDesktop: function () {
        let me = this;
        me.polling = {
            data: '',
            checkfirstpolling: 0,
            post: function (a) {
                if (a.name === 'polling') {
                    let items = a;
                    me.polling.data = a.data;
                    if (me.polling.checkfirstpolling === 0) {
                        me.polling.checkfirstpolling = 1;
                        let msg = '';
                        if (items.azioni.countTot > 0) {
                            msg += items.azioni.first.result + '<br>';
                        }
                        if (items.avvisi.countTot > 0) {
                            msg += items.avvisi.first.result;
                        }
                        bdFunctions.bdTips.msg(Locale.t('home.notifiche.title'), msg, 'fas fa-home fa-size-64');
                    }
                    me.onRenderBtnNotifiche(items);
                    me.firstNotifiche = false;
                }
            },
            exception: function (a, b) {
                if (a.xhr.status === 403) {
                    this.pollingFn.disconnect()
                }
            }
        };


        this.pollingFn = new Ext.direct.PollingProvider({
            id: 'polling',
            type: 'polling',
            url: Backend.REST_API + 'polling/',
            timeout: 3500,
            interval: 35000
        });

        Ext.Ajax.request({
            url: Backend.REST_API + 'main/getDesktop/',
            method: 'POST',
            scope: this,
            success: function (response) { //TODO
                let resJson = Ext.decode(response.responseText);
                me.buildDesktop(resJson);
            },
            failure: function () {
                this.errorBuildHome();
            }
        });

    },

    errorBuildHome: function (msg) {
        if (!msg) {
            msg = Locale.t('global.error.server');
        }

        Ext.Msg.show({
            iconCls: 'icon-cancel',
            title: msg,
            msg: '',
            buttons: Ext.Msg.OK,
            fn: function (btn) {

            }
        });
    },
    buildDesktop: function (resJson) {
        let me = this
        if (resJson.polling === true) {
            Ext.Direct.addProvider(this.pollingFn);
            Ext.Direct.on('event', this.polling.post, this);
            Ext.Direct.on('exception', this.polling.exception, this);
        }


        if (resJson['visibled'] === true) {
            this.taskbar = Ext.create('home.view.main.TaskBar');
            this.taskbar.add(this.configTaskbar(resJson));
            this.south = {
                xtype: 'panel',
                reference: 'taskbar',
                region: 'south',
                height: 44,
                collapsible: false,
                dockedItems: [this.taskbar]
            };
            this.desktop.add(this.south);
        }

        this.dashboard = Ext.create('home.view.dashboard.Panel', {
            widgets: resJson['widgets'],
            taskbar: resJson['taskbar']

        })
        this.dashboard.on('openNotifica', 'onHandlerMenu')
        this.center.add({
            xtype: 'panel',
            items: [
                this.dashboard
            ]
        });

        this.center.setActiveItem(this.dashboard);

    },

    onHandlerImp: function () {
        if (!this.imp) {
            this.imp = Ext.create('home.view.imp.Panel', {
                reference: 'panelimp',
                bodyStyle: {
                    'overflow': 'scroll',
                    'background-color': 'transparent'
                }
            });
            this.imp.on('close', this.closePanelImp, this);
            this.imp.on('setImageImp', this.setImageImp, this);
        }
        this.lastPanel = this.center.getLayout().getActiveItem();
        this.center.add(this.imp);
        this.center.setActiveItem(this.imp);
        this.imp.fireEvent('clearAll')

    },
    setImageImp: function (id) {
        let me = this;
        Ext.global.Vars.infoApp.idsfondo = id;
        if (Ext.global.Vars.infoApp.idsfondo === 'NULL') {
            me.getView().setBodyStyle({
                'background': 'url(/images/v1/default-wallpaper.jpg)',
                'background-size': 'cover'
            });
        } else {
            Ext.Ajax.request({
                url: Backend.REST_API + 'forms/imp/getwallpaper/' + Ext.global.Vars.infoApp.idsfondo,
                method: 'GET',
                binary: true,
                success: function (response, o) {
                    let headers = response.getAllResponseHeaders()
                    let blob = new Blob([response.responseBytes], { type: headers['content-type'] }),
                        url = window.URL.createObjectURL(blob)

                    me.getView().setBodyStyle({
                        'background': 'url(' + url + ')',
                        'background-size': 'cover'
                    });

                },
                failure: function () {

                }
            })
        }
    },
    closePanelImp: function () {
        if (this.lastPanel && this.lastPanel.reference !== "panelimp") {
            this.center.setActiveItem(this.lastPanel);
        } else {
            this.center.setActiveItem(this.dashboard);
        }
    },
    onCloseParentApp: function (parent) {
        let panel = this.lookupReference('panel' + parent.tag),
            frame = panel.down('bdiframe');
        frame.destroy();
        panel.fireEvent('close', panel);
        Ext.Function.defer(function () {
            panel.destroy();
        }, 1000, panel);

    },
    onHandlerMenu: function (btn) {
        if (btn.info) {
            btn = btn.info
        }
        let datiApertura = null;
        if (btn.xtype === undefined) {
            datiApertura = btn;
        }
        if (btn.datiApertura) {
            datiApertura = btn.datiApertura;
        }

        let me = this;
        if (btn.tag === 'HOME') {
            this.center.setActiveItem(this.dashboard);
            return false;
        }
        let frame = null
        if (btn.
            target === 'frame') {
            frame = this.lookupReference('panel' + btn.tag);
            if (!frame) {
                me.onBeforeOpenApp(btn)
            } else {
                frame.datiApertura = datiApertura;
            }
        } else {
            window.open(btn.url, btn.target);
        }
        if (frame)
            this.center.setActiveItem(frame);
    },
    onBeforeOpenApp: function (btn) {
        let me = this
        Ext.Ajax.request({
            url: Backend.REST_VERSION + 'openapp/' + btn.tag + '/' + Ext.global.Vars.developer,
            method: 'GET',
            success: function (response, o) {
                let resJson = Ext.decode(response.responseText);
                btn.url = resJson['url']
                btn.theme = resJson['theme']
                me.onAfterOpenApp(btn)
            },
            failure: function () {
                alert('FORBIDDEN')
            }
        });
    },
    onAfterOpenApp: function (btn) {
        let me = this
        let datiApertura = null;
        if (btn.xtype === undefined) {
            datiApertura = btn;
        }
        if (btn.datiApertura) {
            datiApertura = btn.datiApertura;
        }
        let frame = Ext.create('Ext.panel.Panel', {
            layout: 'fit',
            appui: btn.appui,
            tag: btn.tag,
            closable: false,
            tipo: btn.tipo,
            datiApertura: datiApertura,
            items: [
                {
                    xtype: 'bdiframe',
                    style: {
                        'overflow': 'hidden'
                    },
                    src: btn.url,
                    reference: 'frame' + btn.tag,
                    id: 'frame' + btn.tag,
                    listeners: {
                        load: function (iframeComponent) {
                            let iframe = iframeComponent.getWin();
                            iframe.token = Ext.global.Vars.infoUser
                            iframe.datiApertura = datiApertura;
                            iframe.myFrame = frame;
                            iframe.parentPortale = me;
                            iframe.themeApp = btn.theme;
                        }
                    }
                }
            ],
            listeners: {
                beforeRender: 'onRenderApp',
                close: 'onCloseApp',
                show: 'onShowApp'
            },
            reference: 'panel' + btn.tag
        });
        frame.on('closeMe', this.onCloseParentApp, this);
        this.center.add(frame);
        me.taskbar.fireEvent('addBtnTaskBar', btn);
        this.center.setActiveItem(frame);
    },
    onRenderApp: function (pnl) {
        if (pnl.appui && pnl.appui !== '') {
            pnl.setUI(pnl.appui);
        }
    },
    onShowApp: function (pnl) {
        if (pnl.tag && pnl.datiApertura) {
            let frame = this.lookupReference('frame' + pnl.tag);
            if (frame) {
                let iframe = frame.getWin();
                if (iframe) {
                    iframe.datiApertura = pnl.datiApertura;
                    let app = iframe[pnl.tag.toLowerCase()];
                    if (app) {
                        let main = app.getApplication().getMainView();
                        if (main) {
                            main.fireEvent('checkDati');
                        }
                    }
                }
            }
        }
    },
    onCloseApp: function (pnl) {
        this.taskbar.fireEvent('removeBtnTaskBar', pnl);
    },
    onRemoveBtnTaskBar: function (pnl) {
        let btn = this.lookupReference('btn' + pnl.tag);
        if (btn && !btn.permanent) {
            this.taskbar.remove(btn);
        }
        this.center.setActiveItem(this.dashboard);

    },
    onAddBtnTaskBar: function (info) {
        let end = this.lookupReference('endbtntoolbar'),
            index = this.taskbar.items.indexOf(end),
            check = this.lookupReference('btn' + info.tag);
        if (!check) {
            let btn = Ext.create('Ext.button.Button', {
                tag: info.tag,
                info: info,
                reference: 'btn' + info.tag,
                cls: 'bp-btnTaskBar bp-btnTaskbar-shadow',
                ui: 'default',
                overCls: "bp-btnTaskbar-over bp-btnTaskbar-shadow",
                iconCls: info.iconCls32,
                tooltip: {
                    text: info.text,
                    mouseOffset: [0, -60],
                    width: 130
                },
                handler: 'onHandlerMenu'
            });
            this.taskbar.insert(index, btn);
        }
    },
    configTaskbar: function (resJson) {
        let me = this,
            btn = [{ xtype: 'tbspacer', width: 1 }],
            taskbar = resJson.taskbar;
        if (taskbar.btnMenu['visibled'] === true) {
            btn.push({
                region: this.west,
                xtype: "button",
                cls: 'bp-btnTaskBar',
                ui: 'default',
                overCls: "bp-btnTaskbar-over bp-btnTaskbar-shadow",
                iconCls: "fas fa-bars fa-size-32",
                tooltip: {
                    text: Locale.t('home.taskbar.menu'),
                    mouseOffset: [0, -60],
                    width: 120
                },
                arrowVisible: false,
                menu: taskbar.btnMenu['menu']
            });
        }

        if (taskbar['btnHome'] === true) {
            btn.push({
                xtype: "button",
                cls: 'bp-btnTaskBar',
                tag: 'HOME',
                ui: 'default',
                overCls: "bp-btnTaskbar-over bp-btnTaskbar-shadow",
                iconCls: "fas fa-home fa-size-32",
                tooltip: {
                    text: Locale.t('home.taskbar.home'),
                    mouseOffset: [0, -60],
                    width: 130
                },
                handler: 'onHandlerMenu'
            })
        }

        if (taskbar['btnPosta'] === true) {
            btn.push({
                xtype: "button",
                cls: 'bp-btnTaskBar',
                overCls: "bp-btnTaskbar-over bp-btnTaskbar-shadow",
                iconCls: "MAIL-32",
                ui: 'default',
                tooltip: {
                    text: Locale.t('home.taskbar.posta'),
                    mouseOffset: [0, -60],
                    width: 130
                },
                handler: 'onBtnPostaOpen'
            })
        }

        Ext.each(taskbar.btnDefault, function (item) {
            btn.push({
                xtype: "button",
                cls: 'bp-btnTaskBar',
                tag: item.tag,
                ui: 'default',
                info: item,
                permanent: true,
                reference: 'btn' + item.tag,
                overCls: "bp-btnTaskbar-over bp-btnTaskbar-shadow",
                iconCls: item['iconCls32'],
                tooltip: {
                    text: item['text'],
                    mouseOffset: [0, -60]
                },
                handler: 'onHandlerMenu'
            })
        });

        btn.push({ xtype: "tbfill", reference: 'endbtntoolbar' });
        if (taskbar.btnImp['visibled'] === true) {
            btn.push({
                xtype: "button",
                cls: 'bp-btnTaskBar',
                tag: taskbar.btnImp.info['tag'],
                info: taskbar.btnImp.info,
                ui: 'default',
                permanent: true,
                reference: 'btn' + taskbar.btnImp.info['tag'],
                overCls: "bp-btnTaskbar-over bp-btnTaskbar-shadow",
                iconCls: "fas fa-user fa-size-32",
                tooltip: {
                    text: '<span style="white-space: nowrap;">' + Ext.global.Vars.infoUser.titolo + ' ' + Ext.global.Vars.infoUser.cognomenome,
                    mouseOffset: [0, -80]
                },
                handler: 'onHandlerImp'
            });
        }
        btn.push({
            xtype: "button",
            cls: 'bp-btnTaskBar',
            overCls: "bp-btnTaskbar-over bp-btnTaskbar-shadow",
            iconCls: "fas fa-sign-out-alt fa-size-32",
            ui: 'default',
            tooltip: {
                text: Locale.t('home.taskbar.logout'),
                mouseOffset: [0, -60]
            },
            handler: 'onBtnLogout'
        });
        if (taskbar.btnNotifiche['visibled'] === true) {
            btn.push({
                region: this.east,
                xtype: "button",
                reference: 'btnNotifiche',
                cls: 'bp-btnTaskBar',
                overCls: "bp-btnTaskbar-shadow",
                // iconCls: "fas fa-list fa-size-32",
                tag: 'NOTIFICHE',
                ui: 'default',
                tooltip: {
                    text: Locale.t('home.taskbar.notifiche'),
                    mouseOffset: [0, -60]
                },
                text: '<table style="border-spacing:0;">' +
                    '   <tr>' +
                    '       <td style="line-height:7px;font-size:x-small;width: 30px;color:black;">' + Locale.t('home.notifiche.btn.start.azioni') + '</td>' +
                    '       <td style="line-height:7px;font-size:x-small;width: 30px;color:black;">' + Locale.t('home.notifiche.btn.start.avvisi') + '</td>' +
                    '   </tr>' +
                    '   <tr>' +
                    '       <td style="line-height:7px;font-size:x-small;color:black;text-align: center">-</td>' +
                    '       <td style="line-height:7px;font-size:x-small;color:black;">-</td>' +
                    '   </tr>' +
                    '</table>',
                handler: 'onOpenNotifiche'
            });
            Ext.Ajax.request({
                scope: me,
                url: Backend.REST_API + 'polling/',
                success: function (r) { //TODO
                    if (r.responseText) {
                        let req = new Array(''); //aggiunto x errore portale
                        req['name'] = 'polling';
                        req['data'] = Ext.decode(r.responseText);
                        me.polling.post(req.data);
                    }

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
                    Ext.Direct.removeProvider(me.pollingFn)
                }
            });
        }
        return btn;
    },
    onBtnPostaOpen: function () {
        Ext.Ajax.request({
            method: 'POST',
            jsonData: { email: Ext.global.Vars.infoUser.email },
            url: Backend.API_MAIL,
            success: function (r) {
                let url = Ext.decode(r.responseText);
                eval(url['msg'])
            },
            failure(r) {
                let msg = Ext.decode(r.responseText);
                Ext.Msg.show({
                    title: Locale.t('global.errore'),
                    msg: msg['msg'],
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        });
    },
    /* ---------------------------------------------------------------------------------
     * GESTIONE NOTIFICHE
     * onOpenAppNotifiche:
     * onOpenNotifiche:
     * onCloseNotifiche:
     * ---------------------------------------------------------------------------------*/
    onRenderBtnNotifiche: function (items) {
        let avvisi = items.avvisi,
            azioni = items.azioni,
            appui = 'default';
        if (this.firstNotifiche === false) {
            if (this.qtaAvvisi < avvisi.countTot) {
                appui = 'red';
            }
            if (this.qtaAzioni < azioni.countTot) {
                appui = 'red';
            }
        }

        this.dashboard.fireEvent('updateNotifiche', [azioni.countTot, avvisi.countTot])
        this.qtaAzioni = azioni.countTot;
        this.qtaAvvisi = avvisi.countTot;
        if (this.qtaAzioni === 0 && this.qtaAzioni === 0) {
            appui = 'green';
        }
        let text = '<table class ="bd-btn-notifiche" style="border-spacing:0">' +
            '   <tr>' +
            '       <td>' + Locale.t('home.notifiche.btn.start.azioni') + '</td>' +
            '       <td>' + Locale.t('home.notifiche.btn.start.avvisi') + '</td>' +
            '   </tr>' +
            '   <tr>' +
            '       <td style="line-height:7px;font-size:x-small;color:black;text-align: center">' + azioni.countTot + '</td>' +
            '       <td style="line-height:7px;font-size:x-small;color:black;text-align: center">' + avvisi.countTot + '</td>' +
            '   </tr>' +
            '</table>';
        let btnNotifice = this.lookupReference('btnNotifiche');
        if (btnNotifice) {
            btnNotifice.setText(text);
            btnNotifice.setUI(appui);
        }
    },
    onOpenAppNotifiche: function (btn) {
        this.onHandlerMenu({
            //appui:'att',
            iconCls: 'NTF-16',
            iconCls32: 'NTF-32',
            iconCls64: 'NTF-64',
            tag: 'NTF',
            target: 'frame',
            text: Locale.t('home.notifiche.titleapp'),
            tipo: 'app6',
            url: ''
        });
    },
    onOpenNotifiche: function (btn) {
        btn.setUI('default');
        this.lastPanel = this.center.getLayout().getActiveItem();

        this.center.setActiveItem(this.dashboard);
        // this.center.setActiveItem(this.notifiche);
        // this.notifiche.fireEvent('loadDataNotifiche');
    },
    onCloseNotifiche: function () {
        if (this.lastPanel && this.lastPanel.reference !== "panelnotifiche") {
            this.center.setActiveItem(this.lastPanel);
        } else {
            this.center.setActiveItem(this.dashboard);
        }
        this.lastPanel = null;

    },


    /* ---------------------------------------------------------------------------------
     * GESTIONE LOGOUT
     * onBtnLogout: caricamento card logout
     * onLogout: azioni da card logout
     * ---------------------------------------------------------------------------------*/

    onBtnLogout: function () {
        this.getView().setActiveItem(this.logout);
    },
    onLogout: function (btn) {
        if (btn.action === 'OUT') {
            Ext.global.Vars.logout = true
            window.localStorage.removeItem('_expire');
            window.localStorage.removeItem('_token');
            Ext.Ajax.request({
                url: '/logout/',
                method: 'GET',
                success: function () {
                    location.reload();
                },
                failure(record, esito) {
                    location.reload();
                }
            });
        } else {
            this.getView().setActiveItem(this.desktop);
        }
    }
});
