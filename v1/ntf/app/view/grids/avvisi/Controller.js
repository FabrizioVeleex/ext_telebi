/**
 * Created by luke on 26/01/21.
 */
Ext.define('ntf.view.grids.avvisi.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    alias: 'controller.avvisi',
    mixins: ["portal.v1.global.Util"],
    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.Panel',
        'Ext.window.Window'
    ],
    init: function () {
        //richiamo oggetti dal controller principale
        this.callParent(arguments)
    },
    //funzione x nascondere colonne non necessarie
    checkColumn: function(griglia) {
        let nodo=this.getView().infoNode;
        let colonne = griglia.columns;
        if (!nodo) {
            return;
        }
        //costruisco toolbar in base allo stato
        if (this.toolbar) {
            this.toolbar.removeAll();
            this.toolbar.add(
                {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
            )
            if (this.checkRuoli(['99', '10'])) {
                if (nodo['stato']==='N') {
                    this.toolbar.add({
                        tooltip: Locale.t('ntf.grids.avvisi.btn.tooltip'),
                        text: Locale.t('ntf.grids.avvisi.btn.text'),
                        ui:'ocra',
                        iconCls: 'x-fas fa-check-circle',
                        handler: 'onRead'
                    });
                }
            }
            this.toolbar.add({
                iconCls: 'x-fas fa-list',
                text: Locale.t('ntf.grids.motivazione.text'),
                enableToggle: true,
                tooltip:Locale.t('ntf.grids.motivazione.tooltip'),
                pressed: false,
                toggleHandler:'onPress'
            })
        }
        //ciclo le colonne x nascondere/visualizzare cliente
        for (let i = 0, l = colonne.length; i < l; i++) {
            if (colonne[i].dataIndex === 'titolo') {
                if (nodo['tagapp'] === '') {
                    colonne[i].show();
                } else {
                    colonne[i].hide();
                }
            }
            if (colonne[i].dataIndex === 'stato') {
                if (nodo['stato'] === '') {
                    colonne[i].show();
                } else {
                    colonne[i].hide();
                }
            }
        }
    },
    //funzione che visualizza la motivazione
    onPress: function(btn) {
        let grid=this.getView(); //recupero la vista
        grid.getPlugin('avvisiPreview').toggleExpanded(btn.pressed);
    },
    //funzione imposta come letti
    onRead: function() {
        let me = this; //controller
        let recordsGood = []; //array
        let records =this.getView().getSelectionModel().getSelection();
        let i;
        let len = records.length;
        for (i = 0;i < len; i++) {
            recordsGood.push(records[i].data.id); //inserisco record
        }
        //verifico siano stati selezionati records
        if (recordsGood.length===0) {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('ntf.grids.avvisi.btn.errore'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return;
        }
        let btnX = new Ext.Button({
            text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
                wndw.destroy();
            }
        });
        let btnConfirm = new Ext.Button({
            text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
                wndw.destroy();
                me.getView().el.mask(Locale.t('global.actions.incorso'));
                Ext.Ajax.request({
                    method: 'PUT',
                    jsonData:{data:recordsGood},
                    url: Backend.REST_API + 'grids/impostaletti',
                    success: function () {
                        me.getView().el.unmask();
                        me.getView().getStore().load();
                    },
                    failure: function (response) {
                        me.getView().el.unmask();
                        let resp = Ext.decode(response.responseText);
                        Ext.Msg.show({
                            title: Locale.t('global.errore'),
                            msg: resp['msg'],
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }
                })
            }
        });
        let wdwpanel = Ext.create('Ext.form.Panel', {
            border: false, items: [
                {xtype: 'container',
                    style: {'padding': '5px'},
                    html: '<span style="font-weight:bold;color:red;font-size:12px;" >'+Locale.t('ntf.grids.avvisi.btn.messaggio')+'</span>'
                }
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title: Locale.t('ntf.grids.avvisi.btn.text'),
            width: 650, autoHeight: true, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();
    }
});