/**
 * Created by luca on 16/02/2017.
 */
Ext.define('gpr.view.grids.prodotti.Controller', {
    extend: 'portal.v1.view.grids.DefaultController',
    mixins:['portal.v1.global.Util'],
    alias: 'controller.prodotti',

    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.Panel',
        'Ext.form.RadioGroup',
        'Ext.form.field.ComboBox',
        'Ext.grid.column.Action',
        'Ext.window.Window',
        'gpr.view.forms.prodotto.Panel'
    ],
    init: function () {
        //gestione menu
        let me=this,vm = this.getViewModel()
        vm.set('codazienda','ac') //valore default azienda selezionata
        vm.set('infoupdate','') //valore default info azienda attiva
        vm.set('aziendaattiva','')//valore default azienda attiva
        this.listBtnTop = [
            {handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'}
        ]
        if (this.checkRuoli(['99','19'])){
            this.listBtnTop.push(
                {tooltip: Locale.t('gpr.grids.prodotti.btn.esporta.tooltip'),
                    text: Locale.t('gpr.grids.prodotti.btn.esporta.text'),
                    ui:'green',
                    iconCls: 'x-fas fa-file-excel',
                    handler: 'onExport'
                }
            );
            this.listBtnTop.push(
                {tooltip: Locale.t('gpr.grids.prodotti.btn.updateart.tooltip'),
                    text: Locale.t('gpr.grids.prodotti.btn.updateart.text'),
                    ui:'blue',
                    iconCls: 'pictos pictos-refresh',
                    handler: 'onUpdateArticoli'
                }
            );
            this.listBtnTop.push(
                {xtype: 'combo',hideLabel:true, width:300, editable:false,
                    displayField:'ragsoc',valueField:'codifica',value:'ac',
                    queryMode:'remote',
                    forceSelection:true,
                    bind:{
                        store: '{storeAziende}'
                    },
                    listeners:{
                        select: function (combo, rec) {
                            vm.set('codazienda',rec.data.codifica)
                        }
                    }
                }
            );
            this.listBtnTop.push(
                {tooltip: Locale.t('gpr.grids.prodotti.btn.scaricaimg.tooltip'),
                    text: Locale.t('gpr.grids.prodotti.btn.scaricaimg.text'),
                    ui:'blue',
                    iconCls: 'x-fas fa-file-image',
                    handler: 'onScaricaimg'
                }
            );
            this.listBtnTop.push('->');
            this.listBtnTop.push(
                {iconCls: 'x-fas fa-retweet',handler:function() {
                        me.onUpdateInfo()
                    }},
                {xtype:'displayfield',hideLabel:true,
                bind:{value: "{infoupdate}"}}
            );
        }
        this.onUpdateInfo() //aggiorno dati azienda
        this.callParent(arguments)
    },
    createForm: function(view,record,isnew){
        let vm = this.getViewModel(), codazienda = vm.get('codazienda')
        let itemId = 'f' + record.data['id'];
        if (this.getView().fireEvent('checkForm',itemId)){
            return
        }
        this.getView().fireEvent('createTab',Ext.create('gpr.view.forms.prodotto.Panel', {
            itemId: 'f' + record.data['id'],
            record: record,
            valori: {
                id: record.data['id'],
                isnew: isnew,
                codazienda:codazienda
            }
        }),view)
    },
    onafterrendergrid: function (grid) {
        grid.myColumns =[
            {xtype: 'actioncolumn', width: 30, menuDisabled:true, resizable:false,dataIndex:'action1',
                items: [{handler: 'onOpen', iconCls: 'x-fas fa-eye', tooltip: Locale.t('global.btn.open.text')}]
            },
            {text:Locale.t('gpr.grids.prodotti.column.codice'), dataIndex: 'schcdr', width:200, filter: {type: 'string'}},
            {text:Locale.t('gpr.grids.prodotti.column.italiano'), dataIndex: 'italiano', width:200, filter: {type: 'string'}},
            {text:Locale.t('gpr.grids.prodotti.column.inglese'), dataIndex: 'inglese',width:200, filter: {type: 'string'}}
        ]
        this.callParent(arguments)
    },
    //Funzioni vista
    onUpdateInfo:function() {
        let vm=this.getViewModel(),informazioni
        let storeInfo=vm.getStore('storeProdotti')
        storeInfo.load({
                callback : function(records) {
                    informazioni='<b>'+Locale.t('gpr.grids.prodotti.btn.updateart.aziendaattiva')+records[0].data.azienda+' ('+records[0].data.descrizione+': '+ records[0].data.fine+')</b>';
                    vm.set('infoupdate',informazioni)
                    vm.set('aziendaattiva',records[0].data.azienda)
                }
            })
    },
    onExport:function() {
        let me = this,vm = this.getViewModel(),codazienda = vm.get('codazienda'),aziattiva=vm.get('aziendaattiva')
        //verifico se sono stati selezionati articoli
        let articoliSel='';
        let recordsGood = []; //array record selezionati
        let records =this.getView().getSelectionModel().getSelection();
        for (let i = 0, len = records.length; i < len; i++) {
            recordsGood.push(records[i].data);
            if (articoliSel!=='') {articoliSel+=' - ';}
            articoliSel+=records[i].data.schcdr;
        }
        //verifico siano stati selezionati records
        if (recordsGood.length===0) {
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('gpr.grids.prodotti.btn.esporta.selart'),
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
                let ff=wdwpanel.getForm();
                let cdazienda=ff.findField('aziendasel').getValue(); //id azienda
                if (!cdazienda || cdazienda==='') {
                    Ext.Msg.show({
                        title: Locale.t('global.attenzione'),
                        msg: Locale.t('gpr.grids.prodotti.btn.esporta.obbazienda'),
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                    return;
                }
                let formato=ff.findField('formato').getValue();
                wndw.destroy();
                me.getView().el.mask(Locale.t('gpr.grids.prodotti.btn.esporta.esecuzione'))
                Ext.Ajax.request({
                    method: 'PUT',timeout : 900000,
                    jsonData: {data:recordsGood,codazienda:codazienda,formato:formato['formato']},
                    url: Backend.REST_API + 'grids/prodotti/esporta',
                    binary: true,
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
                        Ext.Msg.show({
                            title: Locale.t('global.errore'),
                            msg: response['statusText'],
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR,
                        });
                    }
                })
            }
        });
        let wdwpanel = Ext.create('Ext.form.Panel', {
            border: false, items: [
                {xtype: 'radiogroup', fieldLabel :Locale.t('gpr.grids.prodotti.btn.esporta.formato'),
                    labelWidth:250,name:'formato', columns: 2,width:400,
                    items: [
                        {boxLabel:Locale.t('gpr.grids.prodotti.btn.esporta.xls'),inputValue:'X',checked:true},
                        {boxLabel:Locale.t('gpr.grids.prodotti.btn.esporta.csv'),inputValue:'C'}
                    ]
                },
                {xtype:'displayfield',labelWidth:250,fieldLabel: Locale.t('gpr.grids.prodotti.btn.esporta.cmbazienda'),value:aziattiva,name:'aziendasel'},
                {xtype:'displayfield',labelWidth:250,fieldLabel: Locale.t('gpr.grids.prodotti.btn.esporta.esportati'),value:articoliSel},
                {xtype: 'container',
                    style: {'padding': '5px'},
                    html: '<span style="font-weight:bold;color:blue;font-size:12px;" >'+Locale.t('gpr.grids.prodotti.btn.esporta.msg')+'</span>'
                }
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title: Locale.t('gpr.grids.prodotti.btn.esporta.text'),
            width: 650, autoHeight: true, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();
    },
    onUpdateArticoli:function() {
        //recupero l'azienda selezionata dalla combo
        let vm = this.getViewModel(), codazienda = vm.get('codazienda')
        //chiedo conferma x eseguire l'operazione
        Ext.Msg.show({
            title: Locale.t('gpr.grids.prodotti.btn.updateart.text'), iconCls: 'pictos pictos-refresh', msg: Locale.t('gpr.grids.prodotti.btn.updateart.confirm'),
            buttons: Ext.Msg.YESNO, icon: Ext.MessageBox.QUESTION, fn: function (b) {
                if (b === 'yes') {
                    //lancio l'esecuzione in background
                    Ext.Ajax.request({
                        method: 'PUT',
                        params:{'id':'','codazienda':codazienda},
                        url: Backend.REST_API + 'grids/prodotti/updateprodotti'
                    });
                    //avviso l'utente
                    Ext.Msg.show({
                        title: Locale.t('gpr.grids.prodotti.btn.updateart.text'),
                        msg: Locale.t('gpr.grids.prodotti.btn.updateart.successo'),
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.OK
                    });
                    vm.set('infoupdate',Locale.t('gpr.grids.prodotti.btn.updateart.esecuzione'))
                }
            }
        });
    },
    onScaricaimg:function() {
        let me = this; //controller
        let btnX = new Ext.Button({
            text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
                wndw.destroy();
            }
        });
        let btnConfirm = new Ext.Button({
            text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
                let ff=wdwpanel.getForm();
                let filigrana=ff.findField('filigrana').getValue(); //id azienda
                if (!filigrana) {
                    Ext.Msg.show({
                        title: Locale.t('global.attenzione'),
                        msg: Locale.t('gpr.grids.prodotti.btn.scaricaimg.obbfiligrana'),
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                    return;
                }
                wndw.destroy();
                me.getView().el.mask(Locale.t('gpr.grids.prodotti.btn.scaricaimg.esecuzione'))
                Ext.Ajax.request({
                    method: 'PUT',timeout : 900000,
                    jsonData: {filigrana:filigrana},
                    url: Backend.REST_API + 'grids/prodotti/scaricaimg',
                    success: function (response) {
                        me.getView().el.unmask()
                        let resp = Ext.decode(response.responseText)
                        Ext.Msg.show({
                            title: Locale.t('gpr.grids.prodotti.btn.scaricaimg.esecuzioneok'),
                            msg: resp['msg'],
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.INFO
                        });
                    },
                    failure: function (response) {
                        me.getView().el.unmask();
                        Ext.Msg.show({
                            title: Locale.t('global.errore'),
                            msg: response['statusText'],
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
                    html: '<span style="font-weight:bold;color:blue;font-size:12px;" >'+Locale.t('gpr.grids.prodotti.btn.scaricaimg.msg')+'</span>'
                },
                {xtype: 'radiogroup', hideLabel:true,simpleValue: true,name:'filigrana', columns: 1,
                    items: [
                        {boxLabel:Locale.t('gpr.grids.prodotti.btn.scaricaimg.nofiligrana'),inputValue:'NN'},
                        {boxLabel:Locale.t('gpr.grids.prodotti.btn.scaricaimg.acfiligrana'),inputValue:'AC'},
                        {boxLabel:Locale.t('gpr.grids.prodotti.btn.scaricaimg.scfiligrana'),inputValue:'SC'},
                        {boxLabel:Locale.t('gpr.grids.prodotti.btn.scaricaimg.lffiligrana'),inputValue:'LS'}
                    ]
                }
            ]
        });
        let wndw = Ext.create('Ext.Window', {
            tbar: [btnX, btnConfirm], title: Locale.t('gpr.grids.prodotti.btn.scaricaimg.text'),
            width: 650, autoHeight: true, closable: true,
            bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show();
    }
})