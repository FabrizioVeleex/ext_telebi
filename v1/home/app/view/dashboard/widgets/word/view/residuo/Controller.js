/**
 * Created by luke on 27/08/21.
 */
Ext.define('home.view.dashboard.widgets.word.view.residuo.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.v1-wordresiduo',

    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.Panel',
        'Ext.form.RadioGroup',
        'Ext.layout.container.HBox',
        'Ext.window.Window',
        'home.view.dashboard.widgets.word.view.residuo.Raggruppamento'
    ],

    onAfterRender: function () {
        //creo colonne plugin
        let me = this, vm = me.getViewModel()
        let grid = vm.getStore('storeResiduo')
        //creo radiobutton
        this.raggruppamento =Ext.create('home.view.dashboard.widgets.word.view.residuo.Raggruppamento')
        this.avviso =Ext.create({xtype:'box',html:Locale.t("word.dettaglio.avviso"),hidden:true})
        let toolbar =this.lookupReference('toolbarTop')
        toolbar.add(this.raggruppamento)
        toolbar.add(this.avviso)
        toolbar.add({xtype: 'button', ui:'blue',iconCls: 'x-fas fa-file-excel',text: '',handler: 'onExcel'})
        vm.set('tipogrid',1)
        grid.getProxy().extraParams.colonna=this.view.valori.colonna
        grid.getProxy().extraParams.linea=this.view.valori.linea
        grid.getProxy().extraParams.cdcli=this.view.valori.cdcli
        grid.getProxy().extraParams.tipo='1'
        grid.load()
    },
    onChangeRaggruppamento: function (rdg, newval) {
        let me = this, vm = me.getViewModel()
        let grid = vm.getStore('storeResiduo')
        let colonne= this.getView().getColumns()
        for (let i = 0, l = colonne.length; i < l; i++) {
            if (colonne[i].dataIndex === 'famiglia') {
                if (newval === 2) {
                    colonne[i].show()
                } else {
                    colonne[i].hide()
                }
            }
            if (colonne[i].dataIndex === 'cdart') {
                if (newval === 3) {
                    colonne[i].show()
                } else {
                    colonne[i].hide()
                }
            }
            if (colonne[i].dataIndex === 'cdcom1') {
                if (newval === 3) {
                    colonne[i].show()
                } else {
                    colonne[i].hide()
                }
            }
            if (colonne[i].dataIndex === 'descart') {
                if (newval === 3) {
                    colonne[i].show()
                } else {
                    colonne[i].hide()
                }
            }
            if (colonne[i].dataIndex === 'qta') {
                if (newval === 3) {
                    colonne[i].show()
                } else {
                    colonne[i].hide()
                }
            }
            if (colonne[i].dataIndex === 'codcli') {
                if (newval === 1) {
                    colonne[i].show()
                } else {
                    colonne[i].hide()
                }
            }
            if (colonne[i].dataIndex === 'ragsoc') {
                if (newval === 1) {
                    colonne[i].show()
                } else {
                    colonne[i].hide()
                }
            }
        }
        vm.set('tipogrid',newval)
        vm.set('colonna',this.view.valori.colonna)
        vm.set('linea',this.view.valori.linea)
        vm.set('cliente',this.view.valori.cdcli)
        vm.set('tipogrid',newval)
        //visualizzo la grid scelta
        grid.getProxy().extraParams.colonna=this.view.valori.colonna
        grid.getProxy().extraParams.linea=this.view.valori.linea
        grid.getProxy().extraParams.cdcli=this.view.valori.cdcli
        grid.getProxy().extraParams.tipo=newval
        grid.load()
    },
    onClosePannello: function () {
        this.getView().close()
    },
    onExcel:function() {
        let me = this,vm = me.getViewModel(),hideopzione=true
        let storedettaglio=vm.get('storeResiduoDettaglio')
        let dettaglio =[]
        for (let i = 0; i < storedettaglio.data.items.length; i++) {
            dettaglio.push(storedettaglio.data.items[i].data)
        }
        if (dettaglio.length>0) {
            hideopzione=false
        }
        let funzione= 'widgets/word/esportaresidui'
        if (vm.get('tipogrid')===2) {
            funzione= 'widgets/word/esportaresiduifam'
        }
        if (vm.get('tipogrid')===3) {
            funzione= 'widgets/word/esportaresiduiart'
        }
        let btnX = Ext.create('Ext.Button', {
            text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
                wndw.destroy();
            }
        });
        let btnConfirm = Ext.create('Ext.Button', {
            text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
                let ff = wdwpanel.getForm();
                let opzione = ff.findField('selopz').getValue();
                wndw.destroy();
                me.view.el.mask(Locale.t("global.actions.incorso"));
                Ext.Ajax.request({
                    method: 'PUT',timeout : 900000,
                    params: {colonna:me.view.valori.colonna,linea:me.view.valori.linea,cdcli:me.view.valori.cdcli,dettaglio:Ext.encode(dettaglio),opzione:opzione},
                    url: Backend.REST_VERSION +funzione,
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
        });
        let wdwpanel = Ext.create('Ext.form.Panel', {
            border: false, items: [
                {xtype: 'container', layout: 'hbox', defaults: {margin: 5},
                    hidden: hideopzione, items: [
                        {xtype: 'radiogroup', name: 'selopz',
                            //fieldLabel: Locale.t('wort.esporta.naz'),
                            columns: 2, flex: 1, simpleValue: true,
                            items: [
                                {boxLabel: Locale.t('word.dettaglio.expopzmain'), inputValue: 0, checked: true},
                                {boxLabel: Locale.t('word.dettaglio.expopzdett'), inputValue: 1},
                            ]
                        }
                    ]
                },
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title: Locale.t('word.esportaexcel'),
            width: 550, autoHeight: true, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();
    },
    onDownloadFile: function (token) {
        let me = this
        me.getView().el.mask(Locale.t("global.actions.incorso"));
        Ext.Ajax.request({
            url: Backend.REST_VERSION + 'downloadfile',method:'PUT',binary:true,timeout:900000,
            params: {
                'token': token
            },
            success: function (response) {
                me.getView().el.unmask()
                let headers = response.getAllResponseHeaders()
                let filename=token //default
                //recupero filename dalla risposta
                let disposition = response.getResponseHeader('Content-Disposition');
                if (disposition && disposition.indexOf('attachment') !== -1) {
                    let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                    let matches = filenameRegex.exec(disposition);
                    if (matches != null && matches[1]) {
                        filename = matches[1].replace(/['"]/g, '');
                    }
                }
                let blob = new Blob([response.responseBytes], {type: headers['content-type']})
                //creo area temporale per il download
                let a = document.createElement('a')
                document.body.appendChild(a)
                let url = window.URL.createObjectURL(blob)
                a.href = url
                a.download = filename
                a.click();
                setTimeout(() => {
                    window.URL.revokeObjectURL(url)
                    document.body.removeChild(a)
                }, 0)
            },
            failure: function (response) {
                me.getView().el.unmask()
                let msg = response.getResponseHeader('messaggio');
                if (msg) {
                    Ext.Msg.show({
                        title: Locale.t('global.errore'),
                        msg: 'Error: '+msg,
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            }
        })
    }
});