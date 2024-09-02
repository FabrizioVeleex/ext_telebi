Ext.define('portal.app.FormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.form',
    requires:[
        'portal.view.cronology.CardCronology',
        'portal.util.Locale',
        'Ext.drag.Target',
        'portal.form.drive.ExecutorDrive',
        'Ext.container.Container',
        'Ext.layout.container.HBox',
        'Ext.panel.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.util.DelayedTask',
        'Ext.util.Cookies'
    ],

    /** ------------------------------------------------------------------
     * gestione panel info su: apertura salvataggio errore
     */
    init:function () {
        this.setConfModRun = 0;
        this.listCard = [];
        this.closeForm = false;
        this.refreshGrid=false;

        this.btnDelete = {
            xtype: 'button',
            ui:'red',
            text: Locale.t('global.btn.delete.text'),
            tooltip:Locale.t('global.btn.delete.tooltip'),
            iconCls: 'x-fa fa-trash',
            handler: 'onDelete'
        };

        this.btnCronology = {
            ui: 'ocra',
            tooltip: Locale.t('cronology.tooltip'),
            iconCls: 'fa fa-history',
            handler: 'onBeforeCronology'
        };
        this.btnSaveClose = {
            ui:'green',
            iconCls:'fa fa-pencil',
            text: Locale.t('global.btn.saveclose.text'),
            handler: 'onSaveClose'
        };
    },

    /* ----------------------------------------------------------------------
     * GESTIONE AZIONI SU FORM
     * - onClickCard: azione si campo card del form
     * - onBeforeSave: azione salvataggio
     * - onBeforeDelete: azione rimozione
     * - onErrorSave: tasto rorna al documento
     * - onAfterRender: card info caricamento
     * - onAfterSave: avvio salvataggio
     * - onAfterSaveFailure: success false
     * - onClose: chiusura documento
     * - onSaveClose: azione salva e chiudi
     * - onActivateCard: gestione attivazione cards
     * - onCronology: card cronologia
     * ----------------------------------------------------------------------*/
    onClickCard: function(btn) {
        var cardselect=this[btn.posizione];
        this.getViewModel().set('posizioneCard',btn.posizione);
        this.form.setActiveItem(cardselect); //attivo card desiderata
    },
    onBeforeLoad:function () {
        var vm = this.getViewModel(),
            consoleInfo = vm.get('consoleInfo');

        consoleInfo += '<h3>'+Locale.t('global.caricamento')+'</h3>';
        vm.set('consoleInfo',consoleInfo);
    },
    onBeforeSave:function () {
        var vm = this.getViewModel();

        if (this.toolBar){
            this.toolBar.disable();
        }

        vm.set('iconInfoStart',false);
        vm.set('iconInfoError', true);
        vm.set('btnInfoErrorLoad', true);
        vm.set('btnInfoErrorSave', true);

        vm.set('consoleInfo','<h3>'+Locale.t('global.salvataggio')+'</h3>');
        this.getView().setActiveItem(this.panelInfo);
    },
    onBeforeDelete:function () {
        var vm = this.getViewModel();

        if (this.toolBar){
            this.toolBar.disable();
        }
        vm.set('iconInfoStart',false);
        vm.set('iconInfoError', true);
        vm.set('btnInfoErrorLoad', true);
        vm.set('btnInfoErrorSave', true);
        vm.set('consoleInfo','<h3>'+Locale.t('global.delete')+'</h3>');
        this.getView().setActiveItem(this.panelInfo);
    },
    onAfterRender:function(){
        var vm = this.getViewModel();

        vm.set('consoleInfo', '<h3>'+Locale.t('global.avvioview')+'</h3>');
        vm.set('iconInfoStart', false);
        vm.set('iconInfoError', true);
        vm.set('btnInfoErrorLoad', true);
        vm.set('btnInfoErrorSave', true);
        this.panelInfo = Ext.create('Ext.Container',{
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'center',
                pack: 'center'
            },
            items: [{
                xtype: 'panel',
                bodyPadding: 10,
                minWidth:200,
                items: [
                    {
                        xtype:'component',
                        bind:{
                            hidden:'{iconInfoStart}'
                        },
                        style:{
                            'text-align':'center'
                        },
                        html:'<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>'
                    },
                    {
                        xtype:'component',
                        bind:{
                            hidden:'{iconInfoError}'
                        },
                        style:{
                            'text-align':'center'
                        },
                        html:'<i class="fa fa-exclamation-trinagle fa-3x"></i>'
                    },
                    {
                        xtype: 'component',
                        anchor: '100%',
                        style: 'font-weight: bold;',
                        userCls: 'wkfmessageerror', //FIXME rimuovi
                        reference: 'wkfmessageerror',
                        bind: {
                            html: '{consoleInfo}'
                        }
                    }
                ],
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    style:{
                        'background-color':'transparent'
                    },
                    items: [
                        {
                            hidden:true,
                            xtype: 'button',
                            text: Locale.t('global.btn.close.text'),
                            bind:{
                                hidden:'{btnInfoErrorLoad}'
                            },
                            handler: 'onClose'
                        },
                        {
                            hidden:true,
                            xtype: 'button',
                            text: Locale.t('global.btn.errorsave.text'),
                            bind:{
                                hidden:'{btnInfoErrorSave}'
                            },
                            handler: 'onErrorSave'
                        }
                    ]
                }]
            }
            ],
            listeners: {
                afterRender: 'loadData'
            }
        });
        this.getView().add( this.panelInfo);
        this.getView().setActiveItem(this.panelInfo);
    },
    onAfterLoad:function(){
        var vm = this.getViewModel();
        vm.set('consoleInfo','');
        this.getView().setActiveItem(this.form);
    },
    onAfterLoadFailure:function(consoleInfo){
        var vm = this.getViewModel();

        vm.set('consoleInfo',consoleInfo);
        vm.set('iconInfoStart',true);
        vm.set('btnInfoErrorLoad',false);
        vm.set('iconInfoError', false);
    },
    onAfterSave:function () {
        var vm = this.getViewModel(),
            consoleInfo = vm.get('consoleInfo');

        if (this.toolBar){
            this.toolBar.enable();
        }
        consoleInfo += '<h3>'+Locale.t('global.salvataggioOk')+'</h3>';
        vm.set('consoleInfo',consoleInfo);
        this.loadData();

    },
    onAfterSaveFailure:function (consoleInfo) {
        var vm = this.getViewModel();
        vm.set('consoleInfo',consoleInfo);
        vm.set('btnInfoErrorLoad',true);
        vm.set('btnInfoErrorSave',false);
    },
    onErrorSave:function () {
        var vm = this.getViewModel();
        vm.set('iconInfoStart',false);
        vm.set('iconInfoError', true);

        if (this.toolBar){
            this.toolBar.enable();
        }
        this.getView().setActiveItem(this.form);
    },
    onClose: function () {
        //lancio evento chisura x controller grid che è in attesa
        if (this.refreshGrid===true) {
            this.getView().fireEvent('closeForm', this);
        }
        this.getView().destroy(); //distruggo panel
    },
    onSaveClose: function(){
        this.closeForm = true;
        this.onSave();
    },
    onActivateCard:function (card) {
        var toolBarCard = this.toolBarCard;
        toolBarCard.items.each(function(item) {
            if (item.posizione===card.posizione){
                item.setStyle({backgroundColor:'LightBlue'});
            }else{
                item.setStyle({backgroundColor:''});
            }

        },this);
    },
    onCronology: function (url,tabella) {
        var me = this,
            record = this.getViewModel().get('record');
        this.toolBar.hide();
        if (this.toolBarCard){
            this.toolBarCard.hide();
        }
        var cardCronology = Ext.create('portal.view.cronology.CardCronology', {
            itemId: 'w' + record.data['id'],
            tabella: tabella,
            recordId: record.data['id'],
            urlRest : Backend.API_ADDRESS + url
        });
        cardCronology.on('closeCardCronology',function(a){
            me.toolBar.show();
            if (me.toolBarCard){
                me.toolBarCard.show();
            }
            me.getView().setActiveItem(me.form);
        });
        me.getView().add(cardCronology);
        me.getView().setActiveItem(cardCronology);
    },
    /* ----------------------------------------------------------------------
     * GESTIONE AZIONI SU APPLICATIVI
     * - onCloseApp: chiusura app
     * - setConfMod:  allineamneto parametri utente
     * - onToggleNav: gestione visualizzazione navigatore di sinistra
     * - onAfterRenderIndex: gestione navigatore e azioni di apertura
     * ----------------------------------------------------------------------*/
    onCloseApp: function () {
        if (typeof(myFrame) !== 'undefined' )
            myFrame.fireEvent('closeMe',myFrame);
    },
    setConfMod : function() {
        this.setConfModRun++;
        var count = this.setConfModRun;
        var task =new Ext.util.DelayedTask(function(count){
            if (count === this.setConfModRun){
                Ext.Ajax.request({params:{'_fn':'setConfMod','data':Ext.encode(Backend.confMod)},url:Backend.API_ADDRESS+'Main.php'});
            }
        },this,[count]);
        task.delay(3000);
    },
    onToggleNav:function (btn) {
        var nav = this.lookupReference('main-west'),
            navHide = this.lookupReference('main-west-hide'),
            collapse = 0;
        if (btn.action===false){
            nav.show();
            navHide.hide();
            collapse =1;
        }else{
            nav.hide();
            navHide.show();
        }
        Backend.confMod.main.west.collapse=collapse;
        this.setConfMod();
    },
    onAfterRenderIndex: function (panel) {
        var west = this.lookupReference('main-west'),
        navHide = this.lookupReference('main-west-hide');

        if (Backend.confMod.main.west.collapse===1){
            west.show();
            navHide.hide();
        }
        if (Backend.confMod.main.west.width)
            west.setWidth( Backend.confMod.main.west.width);

        // gesione azioni su apertura
        if (typeof datiApertura !=="undefined"  && datiApertura !==null){
            this.onRunApertura(datiApertura);
            datiApertura=null;
        }
    },


    /* ----------------------------------------------------------------------
     * GESTIONE LOGIN
     * - onAfterLayoutLogin:
     * - onLoginKey:
     * - onLogin:
     * - onAfterRenderIndex: gestione navigatore e azioni di apertura
     * ----------------------------------------------------------------------*/
    onAfterLayoutLogin: function(pnl){
        if (!this.firstFocusLogin){
            this.firstFocusLogin = true;
            var field = this.lookupReference('loginusername');
            field.focus();
        }
    },
    onLoginKey: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.onLogin();
        }
    },
    onLogin: function(){
        var me = this,
            form = this.lookupReference('loginform');
        if(!form.isValid || form.isValid()){
            //login to the application
            Ext.Ajax.request({
                url: Backend.API_ADDRESS + 'Main.php',
                method: 'POST',
                scope: this,
                params: {
                    _fn:'login',
                    _username: this.lookupReference('loginusername').getValue(),
                    _password: this.lookupReference('loginpassword').getValue()
                },
                success: function(response){
                    var resJson = Ext.decode(response.responseText);
                    if(!Ext.Object.isEmpty(resJson)){
                        if (resJson['success']===true) {
                            var cp = Ext.util.Cookies.get('uid');
                            if (cp){
                                if (cp !== resJson['uid']){
                                    Ext.util.Cookies.clear('uid');
                                    Ext.util.Cookies.set('uid', resJson['uid']);
                                }
                            }else{
                                Ext.util.Cookies.set('uid', resJson['uid']);
                            }
                            location.reload();
                        }else{
                            me.lookupReference('message').update(Locale.t('global.login.'+resJson['msg']));
                        }
                    }
                    else{
                        me.lookupReference('message').update('error!!!');
                    }
                },
                failure: function(){
                    me.lookupReference('message').update('failure!!!');
                }
            });
        }
    },

    /* ----------------------------------------------------------------------
     * GESTIONE UPLOAD FILE
     * - afterRenderDropFile:
     * - onStartUpload:
     * - onChangeBtnUpload:
     * - onUploadFile:
     * - onEndUpload:
     * - onDragEnter:
     * - onDragLeave:
     * - onDrop:
     * ----------------------------------------------------------------------*/
    afterRenderDropFile: function(view) {
        var me = this,
            body = view.body;

        if (window.File && window.FileList && window.FileReader) {
            this.target = new Ext.drag.Target({
                element: body,
                viewDrag:view,
                listeners: {
                    scope:me,
                    dragenter: 'onDragEnter',
                    dragleave: 'onDragLeave',
                    drop: 'onDrop'
                }
            });
        } else {
            body.down('.drag-file-label').setHtml(
                'File dragging is not supported by your browser'
            );
            body.el.addCls('nosupport');
        }
    },
    onStartUpload:function (view,file) {
        //recupero sezione fieldset x identificare sezione (app AMA)
        var fs = view.up('fieldset');
        var sezione='';
        if (fs && fs.sezione) {
            sezione = fs.sezione;
        }

        this.onUploadFile(file,view,sezione,fs.tipo);
    },
    onChangeBtnUpload:function (field, value) {
        if (!value) {
            return; //ho annullato
        }
        var fs = field.up('fieldset'),
            view = fs.down('portal-dragfile'),
            body = view.body,
            icon = body.down('.drag-file-icon');

        body.addCls('dropped');
        icon.addCls('fa-spin');
        //recupero sezione fieldset x identificare sezione (app AMA)
        var sezione='';
        if (fs && fs.sezione) {
            sezione = fs.sezione;
        }

        var files = field.fileInputEl.dom.files;
        var file = files[0];
        this.onUploadFile(file,view,sezione,fs.tipo,fs);
    },
    onUploadFile:function(file,view,sezione,tipo,fs){
        let me = this,
            vm = this.getViewModel(),
            record = vm.get('record'),
            body = view.body,
            icon = body.down('.drag-file-icon'),
            text = body.down('.drag-file-label'),
            fd = new FormData();

        //eccezione x id da posta ufficio
        if (record.data) {
            var id = record.data.id;
        } else {
            var id = record.id;
        }
        fd.append('file', file);
        fd.append('_fn', 'uploadAttach');
        fd.append('id', id);
        fd.append('sezione', sezione);

        Ext.Ajax.request({
            url: Backend.API_ADDRESS + 'Main.php',timeout : 900000, //aumentato timeoout
            rawData: fd,
            headers: {'Content-Type':null}, //to use content type of FormData
            success: function(response){
                var resp = Ext.decode(response.responseText, true);
                if (resp){
                    if (resp['success']===true){
                        icon.removeCls('fa-spin');
                        body.removeCls('red');
                        text.update(Locale.t('upload.dropfile.text'));
                        icon.fadeOut({
                            callback: function() {
                                body.removeCls('dropped');
                                icon.setOpacity(1);
                                icon.show();
                            }
                        });
                        me.onEndUpload(resp,fs);
                    }else{
                        icon.removeCls('fa-spin');
                        body.removeCls('dropped');
                        body.addCls('red');
                        text.update(resp['msg']);
                    }
                }
            },
            faulire: function (response) {
                var resp = Ext.decode(response.responseText, true);
                icon.removeCls('fa-spin');
                body.removeCls('dropped');
                body.addCls('red');
                if (resp){
                    //FIXME completare
                }else{
                    text.update(Locale.t('upload.dropfile.eccezione'));
                }

            }
        });
    },
    onDragEnter: function(target,info,e) {
        target.viewDrag.body.addCls('active');
    },
    onDragLeave: function(target,info,e) {
        target.viewDrag.body.removeCls('active');
    },
    onDrop: function(target, info) {
        var me = this,
            view = target.viewDrag,
            body = view.body,
            icon = body.down('.drag-file-icon'),
            text = body.down('.drag-file-label'),
            files = info.files,
            len = files.length,
            s;
        if (len>1){
            text.update(Locale.t('upload.dropfile.multi'));
            body.removeCls('active');
            body.addCls('red');
            return;
        }
        if (files[0].name && files[0]){
            body.removeCls('active').addCls('dropped');
            icon.addCls('fa-spin');
            try {
                me.onStartUpload(view,files[0]);
            } catch (e) {
                //FIXME completare
            }
        }
    },

    /* ------------------------------------------------------------------
     * Gestione bddrive ->wkf TODO da spostare
     */
    onEditFile: function (view, rowIndex, colIndex, item, event, record) {
        var me = this;
        var editfile = record.data['editfile'];
        // se il record è appena stato inserito impedisco il download
        if (record.get('isnew') !== 0) {
            Ext.Msg.show({
                title: Locale.t('global.avviso'),
                msg: Locale.t('step.gridallegati.savebeforedownload'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return;
        }
        if (record.data.blocco){
            var infoBlocco= Ext.decode(record.get('blocco'));
            if (infoBlocco['iduser']===Backend.docl.ID && infoBlocco['ip']===Backend.docl.IP){
                Ext.Msg.show({title:Locale.t('global.attenzione'),msg:'<h2>'+Locale.t('bddrive.filelock02')+'</h2>',buttons : Ext.Msg.OK,
                    icon : Ext.MessageBox.INFO});
                return;
            }else{
                editfile = '02';
            }
        }
        this.getView().el.mask(Locale.t('_recupero_dati_in_corso'));
        var rec = this.getViewModel().get('record');
        Ext.Ajax.request({
            method: 'GET',
            params: {'_fn': 'editFile',
                'iddoc': record.data.id,
                'idflusso':rec.data['idflusso'],
                'idstep':rec.data['id'],
                'editfile':editfile,
                'typefile':record.data.typefile
            },
            url: Backend.API_ADDRESS + 'forms/Step.php',
            success:function(response){
                var resp = Ext.decode(response.responseText);
                try{
                    me.getView().el.unmask();
                    if (resp['success']===true){
                        if (resp['blocco']!==''){
                            var infoBlocco= Ext.decode(resp['blocco']);
                            var buttonText = {
                                yes : Locale.t('bddrive.file03'),
                                no  : Locale.t('global.annulla')
                            };
                            var oderUser=true;
                            var msg = '<h3>'+Locale.t('bddrive.filelock01')+' '+infoBlocco['user']+'</h3>';
                            if (infoBlocco['iduser']===resp['iduser']){
                                oderUser = false;
                                if (infoBlocco['ip']===resp['localip']){
                                    msg = '<h3>'+Locale.t('bddrive.filelock02')+'</h3><hr>'+Locale.t('bddrive.sblocca01');
                                    buttonText = {
                                        no  : Locale.t('global.annulla'),
                                        cancel:Locale.t('bddrive.file05')
                                    };
                                }else{
                                    msg = '<h3>'+Locale.t('bddrive.filelock04')+' '+resp['ip']+'</h3>';
                                    buttonText = {
                                        yes : Locale.t('bddrive.file03'),
                                        no  : Locale.t('global.annulla'),
                                        cancel:Locale.t('bddrive.file04')
                                    };
                                }
                            }
                            Ext.Msg.show({title:'Attenzione',msg:msg,
                                scope:this,
                                buttonText : buttonText,
                                fn: function(btn){
                                    if (btn==='yes') {
                                        resp['a'] = '02';
                                        me.startDrive(resp,view,record);
                                    }else if(btn==='cancel'){
                                        me.onSbloccaFile(resp['id'],true);
                                    }else if(btn==='no' && oderUser===true){
                                        Ext.Ajax.request({method:'POST',params:{_fn:'removeToken',token:resp['id']}, url:this.url});
                                    }
                                },
                                icon : Ext.MessageBox.INFO});
                        }else {
                            me.startDrive(resp,view,record);
                        }
                    }else{
                        if (resp['id']){
                            me.onSbloccaFile(resp['id']);
                        }
                        Ext.Msg.show({title:'Attenzione',cls:resp['cls'],msg:resp['msg'],buttons : Ext.Msg.OK,icon : Ext.MessageBox.ERROR});
                    }
                }catch(err){
                    me.getView().el.unmask();
                    me.onSbloccaFile(resp['id']);
                    Ext.Msg.show({title:'Attenzione',msg:err,buttons : Ext.Msg.OK,icon : Ext.MessageBox.ERROR});
                }
            },
            failure:function(response){
                me.getView().el.unmask();
                var resp = Ext.decode(response.responseText);
                if (resp){
                    me.onSbloccaFile(resp['id']);
                    Ext.Msg.show({title:'Attenzione',msg:resp['msg'],buttons : Ext.Msg.OK,icon : Ext.MessageBox.ERROR});
                }else{
                    Ext.Msg.show({title:'Attenzione',msg:Locale.t('global.timeout'),buttons : Ext.Msg.OK,icon : Ext.MessageBox.ERROR});
                }
            }
        })

    },

    /**
     * Gestione bddrive -> Documentale
     */
    onGoBackDrive:function () {
        this.getView().setActiveItem(this.activePanelBefore);
    },
    onApriFile :function (record,itemId,action,trash,versione,unlockFileId) {
        var me = this,
            infoRecord = {id:itemId,action:action,version:versione,unlockFileId:unlockFileId};

        this.activePanelBefore = this.getView().getLayout().getActiveItem();
        this.panelMaskDrive = Ext.create('portal.form.drive.ExecutorDrive',{
            infoRecord: infoRecord
        });
        this.panelMaskDrive.on('goBack',this.onGoBackDrive,this); //ritorno a pannello attivo
        this.getView().add(this.panelMaskDrive);
        this.getView().setActiveItem(this.panelMaskDrive);
    }
});