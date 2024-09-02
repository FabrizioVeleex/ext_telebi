/**
 * Created by fabrizio on 13/12/2022.
 */
Ext.define('stt.view.grids.obbiettivi.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.v1-stt-obbiettivi',
    requires: [
        'Ext.menu.Menu',
        'stt.view.grids.obbiettivi.Model',
        'stt.view.forms.obbiettivo.Panel'
    ],
    init: function () {
        let me = this,
            vm = this.getViewModel()

        //gestione menu
        this.listBtnTop = [
            { handler: 'reloadGrid', iconCls: ' pictos pictos-refresh' },
        ]

        if (this.checkRuoli(['99', '2'])) {
            this.listBtnTop.push({
                tooltip: Locale.t('stt.grids.obbiettivi.btn.new.tooltip'),
                text: Locale.t('stt.grids.obbiettivi.btn.new.text'),
                ui: 'green',
                iconCls: 'x-fas fa-plus',
                handler: 'onNewTargetCli'
            });
        }

        this.callParent(arguments)
    },


    onNew: function () {
        let view = this.getView().view; //view della grid
        let NewRecord = Ext.create('stt.view.grids.obbiettivi.Model', {
            id: this.randomString(32),
            isnew: 1,
            status: 1
        });
        this.createForm(view, NewRecord, 1);
    },

    createForm: function (view, record, isnew, tipo) {
        let itemId = 'f' + record.data['id'];

        if (this.getView().fireEvent('checkForm', itemId)) {
            return
        }

        this.getView().fireEvent('createTab', Ext.create('stt.view.forms.obbiettivo.Panel', {
            itemId: 'f' + record.data['id'],
            record: record,
            storeForm: view.getStore(),
            valori: {
                id: record.data['id'],
                isnew: isnew,
                tipo: tipo
            }
        }), view)
    },
    onItemContextMenu: function (node, record, item, index, e) {
        e.stopEvent();
    },
    onNewTargetCli: function () {
        let me = this;
        let nodo = this.getView().infoNode;
        if (!nodo) {
            Ext.Msg.show({
                title: Locale.t('global.errore'),
                msg: Locale.t('stt.grids.obbiettivi.btn.new.errorenodo'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return;
        }

        let btnX = Ext.create('Ext.Button', {
            text: Locale.t('stt.grids.obbiettivi.btn.new.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
                wndw.destroy();
            }
        });
        let btnConfirm = Ext.create('Ext.Button', {
            text: Locale.t('stt.grids.obbiettivi.btn.new.avvia'), iconCls: 'x-fas fa-check', handler: function () {
                let ff = wdwpanel.getForm();
                let cd_sogg_fatt = ff.findField('cd_sogg_fat').getValue(); //nome
                let myMask = new Ext.LoadMask({ //maschera attesa
                    msg: Locale.t('stt.grids.obbiettivi.btn.new.generazione'),
                    target: me.cardDashboard
                });
                wndw.hide();
                myMask.show();
                Ext.Ajax.request({
                    method: "POST",
                    jsonData: { cd_sogg_fat: cd_sogg_fatt },
                    url: Backend.REST_API + "forms/obbiettivo/createcliente/",
                    success: function (esito) {
                        myMask.hide();
                        wndw.destroy();
                    },
                    failure: function (a, o) {
                        wndw.destroy();
                        myMask.hide();
                        let rest = o._response.responseJson;
                        Ext.Msg.show({
                            title: Locale.t('stt.grids.obbiettivi.btn.new.errore'),
                            msg: rest['msg'],
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }
                });
            }
        });
        let store = Ext.create('Ext.data.Store', {
            requires: [
                'Ext.data.proxy.Rest',
                'portal.v1.model.forms.combo.GetCompanies'
            ],

            fields: [
                { name: 'id', type: 'string' },
                { name: 'codice', type: 'string' },
                { name: 'ragsoc', type: 'string' },
                { name: 'indirizzo', type: 'string' },
                { name: 'comune', type: 'string' },
                { name: 'cap', type: 'string' },
                { name: 'nazionalita', type: 'string' },
                { name: 'tiposoggetto', type: 'string' }, //flag C/F se cliente/fornitore
                { name: 'tipo', type: 'string' } //descrizione se cliente/fornitore
            ],
            proxy: {
                type: 'rest',
                simpleSortMode: true,
                url: Backend.REST_API + 'getcompanies/',
                extraParams: { tiposoggetto: '' },
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'totalCount'
                }
            }
        })
        let wdwpanel = Ext.create('Ext.form.Panel', {
            border: false, items: [
                {
                    xtype: "combobox",
                    minChars: 3,
                    width: 200,
                    name: 'cd_sogg_fat',
                    matchFieldWidth: false,
                    emptyText: Locale.t('stt.grids.obbiettivi.btn.new.cli'),
                    forceSelection: true,
                    allowBlank: false,
                    store: store,
                    // triggers: {
                    //   clear: {
                    //     cls: "x-form-clear-trigger",
                    //     hidden: true,
                    //     handler: "onClearTriggetCombo",
                    //   },
                    // },
                    valueField: "codice",
                    displayField: "rag_soc",
                    nameColumn: 'cdcli',
                    tpl: Ext.create(
                        "Ext.XTemplate",
                        '<ul class="x-list-plain"><tpl for=".">',
                        '<li role="option" class="x-boundlist-item"><i>{codice}</i> - <b>{rag_soc}</b></li>',
                        "</tpl></ul>"
                    ),
                    listeners: {
                        //select: "onFilterCombo",
                        afterRender: function (combo) {
                            combo.getTrigger("picker").hide();
                        },
                        beforequery: function (qe) {
                            delete qe.combo.lastQuery;
                        },
                    },
                },
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title: Locale.t('controlli.btn.esporta.text'),
            width: 650, autoHeight: true, closable: true,
            bodyStyle: { 'padding': '10px', 'background-color': '#ffffff' },
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();

    },
    onNewTargetCli: function () {
        let me = this;
        let nodo = this.getView().infoNode;
        if (!nodo) {
            Ext.Msg.show({
                title: Locale.t('global.errore'),
                msg: Locale.t('controlli.btn.esporta.errorenodo'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return;
        }

        let btnX = Ext.create('Ext.Button', {
            text: Locale.t('stt.grids.obbiettivi.btn.new.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
                wndw.destroy();
            }
        });
        let btnConfirm = Ext.create('Ext.Button', {
            text: Locale.t('stt.grids.obbiettivi.btn.new.avvia'), iconCls: 'x-fas fa-check', handler: function () {
                let ff = wdwpanel.getForm();
                let cd_sogg_fatt = ff.findField('cd_sogg_fat').getValue(); //nome
                let myMask = new Ext.LoadMask({ //maschera attesa
                    msg: Locale.t('stt.grids.obbiettivi.btn.new.esegui'),
                    target: me.getView()
                });
                wndw.hide();
                myMask.show();
                Ext.Ajax.request({
                    method: "POST",
                    jsonData: { cd_sogg_fat: cd_sogg_fatt },
                    url: Backend.REST_API + "forms/obbiettivo/createcliente/",
                    success: function (esito) {
                        myMask.hide();
                        wndw.destroy();
                    },
                    failure: function (a, o) {
                        wndw.destroy();
                        myMask.hide();
                        let rest = o._response.responseJson;
                        Ext.Msg.show({
                            title: Locale.t('stt.grids.obbiettivi.btn.new.errore'),
                            msg: rest['msg'],
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }
                });
            }
        });
        let store = Ext.create('Ext.data.Store', {
            requires: [
                'Ext.data.proxy.Rest',
                'portal.v1.model.forms.combo.GetCompanies'
            ],

            fields: [
                { name: 'id', type: 'string' },
                { name: 'codice', type: 'string' },
                { name: 'ragsoc', type: 'string' },
                { name: 'indirizzo', type: 'string' },
                { name: 'comune', type: 'string' },
                { name: 'cap', type: 'string' },
                { name: 'nazionalita', type: 'string' },
                { name: 'tiposoggetto', type: 'string' }, //flag C/F se cliente/fornitore
                { name: 'tipo', type: 'string' } //descrizione se cliente/fornitore
            ],
            proxy: {
                type: 'rest',
                simpleSortMode: true,
                url: Backend.REST_API + 'getcompanies/',
                extraParams: { tiposoggetto: '' },
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'totalCount'
                }
            }
        })
        let wdwpanel = Ext.create('Ext.form.Panel', {
            border: false, items: [
                {
                    xtype: "combobox",
                    minChars: 3,
                    width: 200,
                    name: 'cd_sogg_fat',
                    matchFieldWidth: false,
                    emptyText: Locale.t("stt.forms.ritardi.dettaglio.gridandamento.columns.cli") + ": " + Locale.t("global.form.combo.combo"),
                    forceSelection: true,
                    allowBlank: false,
                    store: store,
                    // triggers: {
                    //   clear: {
                    //     cls: "x-form-clear-trigger",
                    //     hidden: true,
                    //     handler: "onClearTriggetCombo",
                    //   },
                    // },
                    valueField: "codice",
                    displayField: "rag_soc",
                    nameColumn: 'cdcli',
                    tpl: Ext.create(
                        "Ext.XTemplate",
                        '<ul class="x-list-plain"><tpl for=".">',
                        '<li role="option" class="x-boundlist-item"><i>{codice}</i> - <b>{rag_soc}</b></li>',
                        "</tpl></ul>"
                    ),
                    listeners: {
                        //select: "onFilterCombo",
                        afterRender: function (combo) {
                            combo.getTrigger("picker").hide();
                        },
                        beforequery: function (qe) {
                            delete qe.combo.lastQuery;
                        },
                    },
                },
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title: Locale.t('stt.grids.obbiettivi.btn.new.text'),
            width: 650, autoHeight: true, closable: true,
            bodyStyle: { 'padding': '10px', 'background-color': '#ffffff' },
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();

    },
});