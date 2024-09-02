/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('sgv.view.grids.segnalazioni.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.v1-segnalazioni',
    requires: [
        'Ext.button.Button',
        'Ext.form.Panel',
        'Ext.form.RadioGroup',
        'Ext.grid.column.Action',
        'Ext.grid.column.Date',
        'Ext.window.Window',
        'portal.util.Functions',
        'sgv.view.forms.segnalazione.Panel',
        'sgv.view.grids.segnalazioni.component.Model'
    ],
    init: function () {
        this.callParent(arguments)
    },
    //funzione x gestire tasti
    checkColumn: function(griglia) {
        let nodo=this.getView().infoNode;
        if (!nodo) {
            return;
        }
        this.toolbar.removeAll(true)
        this.toolbar.add({handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'})
        if (nodo.itemId==='bozze' && this.checkRuoli(['99','1'])){
            this.toolbar.add({
                tooltip: Locale.t('sgv.grids.segnalazioni.btn.new.tooltip'),
                text: Locale.t('sgv.grids.segnalazioni.btn.new.text'),
                ui: 'green',
                iconCls: 'x-fas fa-plus',
                handler: 'onNew'
            });
        }
        if (this.checkRuoli(['99','2'])){
            this.toolbar.add({
                tooltip: Locale.t('sgv.grids.segnalazioni.btn.esporta.tooltip'),
                text: Locale.t('sgv.grids.segnalazioni.btn.esporta.text'),
                ui: 'blue',
                vista:nodo.itemId,
                iconCls: 'x-fas fa-file-excel',
                handler: 'onEsporta'
            });
        }
        let colonne = griglia.getColumns()
        for (let i = 0, l = colonne.length; i < l; i++) {
            if ((nodo.itemId==='bozze' || nodo.itemId==='inoltrate') && (colonne[i].dataIndex === 'violazione' || colonne[i].dataIndex === 'nominativo' || colonne[i].dataIndex === 'importo')) {
                colonne[i].hide();
            } else {
                colonne[i].show();
            }
        }
    },
    onNew: function () {
        let view = this.getView().view,
            newRecord = Ext.create('sgv.view.grids.segnalazioni.component.Model', {
                id: bdFunctions.bpRandomString(32),
                isnew: 1
            });
        this.createForm(view, newRecord, 1);
    },
    createForm: function (view, record, isnew) {
        let itemId = "f" + record.data["id"];
        if (this.getView().fireEvent("checkForm", itemId)) {
            return;
        }
        this.getView().fireEvent(
            "createTab",
            Ext.create("sgv.view.forms.segnalazione.Panel", {
                itemId: "f" + record.data["id"],
                record: record,
                valori: {
                    id: record.data["id"],
                    isnew: isnew
                }
            }),
            view
        )
    },
    onafterrendergrid: function (grid) {
        grid.myColumns = [
            {xtype: 'actioncolumn', width: 30, menuDisabled: true, resizable: false, dataIndex: 'action1',
                items: [{handler: 'onOpen', iconCls: 'x-fas fa-eye', tooltip: Locale.t('global.btn.open.text')}]
            },
            {text: Locale.t('sgv.grids.segnalazioni.columns.datadoc'), dataIndex: 'datadoc', width: 100, xtype: 'datecolumn', format: 'd/m/Y', filter: {type: 'date',dateFormat: 'Ymd'}},
            {text: Locale.t('sgv.grids.segnalazioni.columns.richiedente'), dataIndex: 'richiedente', width: 180, filter: {type: 'string'}},
            {text: Locale.t('sgv.grids.segnalazioni.columns.filiale'), dataIndex: 'filiale', flex:1, filter: {type: 'string'}},
            {text: Locale.t('sgv.grids.segnalazioni.columns.nominativo'), dataIndex: 'nominativo', width:180, filter: {type: 'string'}},
            {text: Locale.t('sgv.grids.segnalazioni.columns.violazione'), dataIndex: 'violazione',width:400, filter: {type: 'string'}},
            {text: Locale.t('sgv.grids.segnalazioni.columns.importo'), dataIndex: 'importo',width:150, filter: {type: 'number'},
                renderer: function (v) {
                    return Ext.util.Format.currency(v, '€ ', 2);
                }
            },
            {text: Locale.t('sgv.grids.segnalazioni.columns.conflitto'), dataIndex: 'conflitto',width:80, filter: {type: 'string'}}
        ]
        this.callParent(arguments)
    },
    //esportazione
    onEsporta: function (btn) {
        let me = this; //controller
        let step=99 //default chiuse
        switch (btn.vista){
            case 'bozze':
                step=10
                break
            case 'inoltrate':
               step=15
                break
            case 'istruttoria':
                step=20
                break
        }
        //tasti
        let btnX = new Ext.Button({text: Locale.t('global.btn.annulla'), iconCls: 'x-fa fa-ban',
            handler: function () {
                wndw.destroy();
            },
        });
        let btnConfirm = new Ext.Button({text: Locale.t('global.btn.conferma'), iconCls: 'x-fa fa-check',
            handler: function () {
                let ff=wdwpanel.getForm();
                let tipo=ff.findField('tipo').getValue(); //nome evento
                wndw.destroy();
                me.getView().el.mask(Locale.t('sgv.grids.segnalazioni.btn.esporta.esecuzione'));
                Ext.Ajax.request({
                    method: 'PUT', url: Backend.REST_API + 'grids/esporta', binary: true,
                    params: {selezione:tipo,step:step},
                    success: function (response) {
                        me.getView().el.unmask();
                        //imposto un elemento nascosto x fare il download con il nome file che mi arriva
                        let a = document.createElement('a');
                        document.body.appendChild(a);
                        a.style = 'display: none';
                        let headers = response.getAllResponseHeaders();
                        let fileName = response.getResponseHeader('Content-Disposition').split('filename=')[1];
                        if (fileName === '') {
                            //se non ho filename di ritorno (eccezione) do un nome generico
                            fileName = 'Download_file.xlsx';
                        }
                        let blob = new Blob([response.responseBytes], {type: headers['content-type']});
                        let binaryFile = window.URL.createObjectURL(blob);
                        a.href = binaryFile;
                        a.download = fileName;
                        a.click();
                        window.URL.revokeObjectURL(binaryFile);
                    },
                    failure: function (response) {
                        me.getView().el.unmask();
                        let resp = Ext.decode(response.responseText);
                        Ext.Msg.show({
                            title: Locale.t('global.errore'),
                            msg: resp['msg'],
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR,
                        });
                    }
                });
            }
        });
        let wdwpanel = Ext.create('Ext.form.Panel', {
            border: false,
            items: [
                {xtype: 'radiogroup',hideLabel:true,name:'tipo',
                    columns: 2,flex:1,simpleValue: true,
                    items: [
                        {boxLabel:Locale.t('sgv.grids.segnalazioni.btn.esporta.tutte'),inputValue:"T",checked:true},
                        {boxLabel:Locale.t('sgv.grids.segnalazioni.btn.esporta.vista'),inputValue:"V"}
                    ]
                }
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title: Locale.t('sgv.grids.segnalazioni.btn.esporta.text'), width: 650,
            autoHeight: true, closable: true, bodyStyle: {padding: '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();
    }
});