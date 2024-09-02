/**
 * Created by fabrizio on 02/10/16.
 */
Ext.define('home.view.widgets.weti.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.widgetetichette',
    requires: [
        'Ext.toolbar.Toolbar',
        'Ext.panel.Panel',
        'home.view.widgets.weti.Search',
        'Ext.layout.container.Absolute',
        'Ext.container.Container',
        'Ext.layout.container.HBox',
        'Ext.window.Window',
        'Ext.button.Button'
    ],
    init: function () {
        this.getViewModel().set('consoleInfo', '<h3>' + Locale.t('widgeeti.search') + '</h3>');
        Ext.Loader.loadScript(Backend.ROOT_ADDRESS + 'js/JsBarcode/dist/JsBarcode.all.js');
        Ext.Loader.loadScript(Backend.ROOT_ADDRESS + 'js/qrcodejs/qrcode.js');
        this.panel11X7 = Ext.create('Ext.panel.Panel', {
            width: 415,
            height: 275,
            hidden: true,
            layout: 'absolute',
            frame: true,
            items: []
        });
        this.panelInfo = Ext.create('Ext.Container', {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'center',
                pack: 'center'
            },
            items: [{
                xtype: 'panel',
                bodyPadding: 10,
                items: [
                    {
                        xtype: 'component',
                        hidden: true,
                        reference: 'weti_iconInfoStart',
                        style: {
                            'text-align': 'center'
                        },
                        html: '<i class="fas fa-spinner fa-pulse fa-3x fa-fw"></i>'
                    },
                    {
                        xtype: 'component',
                        reference: 'weti_iconInfoError',
                        style: {
                            'text-align': 'center'
                        },
                        html: '<i class="fas fa-exclamation-trinagle fa-3x"></i>'
                    },
                    {
                        xtype: 'component',
                        anchor: '100%',
                        style: 'font-weight: bold;',
                        reference: 'weti_wkfmessageerror',
                        bind: {
                            html: '{consoleInfo}'
                        }
                    }
                ]
            }]
        });
    },
    onAfterRender: function () {
        let widget = this.getView().widget;
        this.getViewModel().set('widget', widget);

        this.panel = Ext.create('Ext.panel.Panel', {
            flex: 1,
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    { xtype: 'weti-search', reference: 'wetisearchpng' },
                    {
                        xtype: 'button',
                        reference: 'weti_btn_print',
                        iconCls: 'fas fa-file-pdf',
                        text: Locale.t('home.widgeeti.scarica'),
                        hidden: true,
                        handler: 'generateCode'
                    }
                ]
            }],
            items: [this.panelInfo, this.panel11X7]
        });
        this.getView().add(this.panel);

    },

    getBodyWidthp: function () {
        return Ext.getBody().getViewSize().width
    },
    generateCode: function () {
        let item = this.lookupReference('wetisearchpng');
        Ext.create('Ext.Window', {
            width: 500,
            height: 450,
            modal: true,
            frame: true,
            items: {
                xtype: 'component',
                autoEl: {
                    tag: 'iframe',
                    style: 'height: 100%; width: 100%; border: none',
                    src: Backend.API_WIDGET + 'WETI/Main.php?_fn=getPrintCodePdf&item=' + item.getValue()
                }
            }
        }).show();
    },
    printCode: function () {
        this.panel11X7_print = Ext.create('Ext.panel.Panel', {
            width: this.getBodyWidthp(),
            height: Ext.getBody().getViewSize().height,
            x: 0,
            y: 0,
            // controller:'widgetetichette',
            layout: 'absolute',
            renderTo: Ext.getBody(),
            style: {
                'z-index': 1000
            },
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                scope: this,
                items: [
                    {
                        xtype: 'button',
                        iconCls: 'fas fa-print',
                        scope: this,
                        cls: 'no-print',
                        text: '_chiudi',
                        handler: function () {
                            this.panel11X7_print.hide()
                        }
                    },
                    {
                        xtype: 'button',
                        iconCls: 'fas fa-print',
                        scope: this,
                        cls: 'no-print',
                        text: '_stampa',
                        handler: function () {
                            window.print();
                        }
                    }
                ]
            }],
            listeners: {
                afterRender: function () {
                    setTimeout(function () { window.print(); }, 500);
                }
            }
        });
        this.generate11x7(this.panel11X7_print);
    },

    generateForm: function () {
        this.panelInfo.hide();
        this.panel11X7.show();
        this.lookupReference('weti_btn_print').show();

        //TODO gestione caricamento cartellini differenti
        // per adess carico solo generate11x7
        this.generate11x7(this.panel11X7);
    },
    generate11x7: function (panel) {
        panel.removeAll();
        panel.add({
            xtype: 'container',
            x: 13,
            y: 35,
            html: '<img id="barcode11x70128"  alt="" src=""/>'
        },
            {
                xtype: 'container',
                x: 245,
                y: 120,
                html: '<img id="barcode11x7ean"  alt="" src=""/>'
            },
            // {
            //     xtype:'container',
            //     x: 13,
            //     y: 226,
            //     html: '<img id="barcode11x701281" />'
            // },
            {
                xtype: 'container',
                x: 20,
                y: 20,
                html: '<span style="font-family:Helvetica, Arial, sans-serif;font-weight:bold;font-size:32px;">' + this.record.code + '</span>'
            },
            {
                xtype: 'container',
                x: 20,
                y: 74,
                html: '<span style="font-family:Helvetica, Arial, sans-serif;font-size:16px;">' + this.record.descrizione1 + '</span>'
            },
            {
                xtype: 'container',
                x: 20,
                y: 86,
                html: '<span style="font-family:Helvetica, Arial, sans-serif;font-size:12px;">' + this.record.descrizione2 + '</span>'
            },
            {
                xtype: 'container',
                x: 20,
                y: 100,
                html: '<span style="font-family:Helvetica, Arial, sans-serif;font-size:12px;">' + this.record.descrizione3 + '</span>'
            },
            {
                xtype: 'container',
                x: 283,
                y: 235,
                html: '<span style="font-family:Arial, sans-serif;font-size:8px;">' + this.record.data + '</span>'
            },
            {
                xtype: 'container',
                x: 283,
                y: 248,
                html: '<span style="font-family:Arial, sans-serif;font-weight:bold;font-size:12px;">' + this.record.num + '</span>'
            },
            {
                xtype: 'container',
                x: 125,
                y: 165,
                hidden: !this.record.youtube,
                html: '<img src="/images/marketing/youtube.jpg" style="width:80px"  alt=""/>'
            },
            {
                xtype: 'container',
                x: 370,
                y: 240,
                html: '<span style="font-family:Arial, sans-serif;font-size:8px;">' + this.record.num1 + '</span>'
            },
            {
                xtype: 'container',
                x: 115,
                y: 211,
                html: '<span style="font-family:Helvetica,Arial, sans-serif;font-weight:bold;font-size:9px;">' + this.record.info + '</span>'
            },
            {
                xtype: 'container',
                x: 20,
                y: 150,
                html: '<div id="qrcode" style="width:80px; height:80px;"></div>'
            });

        this.setBarcode();
        this.setQrcode();
    },

    setBarcode: function () {
        JsBarcode("#barcode11x70128", this.record.code, {
            format: "CODE128",
            displayValue: false,
            height: 25,
            width: 1
        });
        JsBarcode("#barcode11x7ean", this.record.ean, {
            format: "EAN13",
            displayValue: true,
            height: 25,
            width: 1
        });
        // JsBarcode("#barcode11x701281", this.record.code, {
        //     format:"CODE128",
        //     displayValue:false,
        //     height:30,
        //     width:2
        // });
    },
    setQrcode: function () {
        let qrcode = new QRCode(document.getElementById("qrcode"), {
            width: 80,
            height: 80
        });
        qrcode.makeCode(this.record.qrcode);
    },

    /**
     * gestione rasto ricerca
     * @param item
     */
    onSearchTriggetSearch: function (item) {
        let me = this,
            value = item.getValue(),
            consoleInfo = this.getViewModel().get('consoleInfo');
        if (value.length < 1) {
            if (item.hasSearch) {
                this.onClearTriggetSearch(item);
            }
            return;
        }
        consoleInfo = '<h3>' + Locale.t('home.widgeeti.recupero_codice') + '</h3>';
        this.getViewModel().set('consoleInfo', consoleInfo);

        this.lookupReference('weti_btn_print').hide();
        this.panelInfo.show();
        this.panel11X7.hide();
        this.lookupReference('weti_iconInfoStart').show();

        item.getTrigger('clear').show();
        item.hasSearch = true;
        Ext.Ajax.request({
            method: 'GET',
            params: {
                '_fn': 'getCode',
                'item': item.getValue()
            },
            url: Backend.API_WIDGET + 'WETI/Main.php',
            success: function (record) {
                let rest = Ext.decode(record.responseText);
                if (rest['success'] === true) {
                    me.record = rest;
                    me.generateForm();
                } else {
                    consoleInfo = '<h3>' + rest['msg'] + '</h3>';
                    me.lookupReference('weti_iconInfoStart').hide();
                    me.getViewModel().set('consoleInfo', consoleInfo);
                }
            }
            ,
            failure: function () {
                me.lookupReference('weti_iconInfoStart').hide();
                consoleInfo = '<h3>' + rest['msg'] + '</h3>';
                me.getViewModel().set('consoleInfo', consoleInfo);
            }
        });

    },
    onSpecialkeySearch: function (item, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearchTriggetSearch(item);
        }
    },
    onClearTriggetSearch: function (item) {
        if (item.hasSearch) {
            item.setValue('');
            item.hasSearch = false;
            item.getTrigger('clear').hide();
            this.lookupReference('weti_btn_print').hide();

            this.getViewModel().set('consoleInfo', '<h3>' + Locale.t('home.widgeeti.search') + '</h3>');
            this.lookupReference('weti_iconInfoStart').hide();
            this.panelInfo.show();
            this.panel11X7.hide();
        }
    }
});