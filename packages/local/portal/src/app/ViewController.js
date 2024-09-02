/**
 * Created by fabrizio on 16/10/16.
 */
Ext.define('portal.app.ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.view',
    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.drag.Target',
        'Ext.layout.container.HBox',
        'Ext.panel.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.util.Cookies',
        'Ext.util.DelayedTask',
        'portal.form.drive.ExecutorDrive',
        'portal.util.Locale',
        'portal.view.login.Login'
    ],

    /** ------------------------------------------------------------------
     * gestione panel info su: apertura salvataggio errore
     */
    init:function () {
        this.panelForm = this.lookupReference('panelForm');
        this.attesaDrive=0;
        this.setConfModRun = 0;
    },
    statics: {
        DRIVE_FILE_LOCK_USER:-4,
        DRIVE_FILE_LOCK_ME_IP:-3,
        DRIVE_FILE_LOCK_ME:-2,
        DRIVE_ERROR:-1,
        DRIVE_ATTESA:0,
        DRIVE_DOWNLOAD:1,
        DRIVE_FILE_LOCK:11,
        DRIVE_DOWNLOAD_ATTESA:2,
        DRIVE_END:3
    },

    onCloseApp: function () {
        if (typeof(myFrame) !== 'undefined' )
            myFrame.fireEvent('closeMe',myFrame);
    },

    setConfMod : function() {
        this.setConfModRun++;
        let count = this.setConfModRun,
            task =new Ext.util.DelayedTask(function(count){
            if (count === this.setConfModRun){
                Ext.Ajax.request({params:{'_fn':'setConfMod','data':Ext.encode(Backend.confMod)},url:Backend.API_ADDRESS+'Main.php'});
            }
        },this,[count]);
        task.delay(3000);
    },

    onAfterRender:function(){
        this.getViewModel().set('consoleInfo', '<h3>'+Locale.t('global.avvioview')+'</h3>');
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
                items: [
                    {
                        xtype:'component',
                        reference:'iconInfoStart',
                        style:{
                            'text-align':'center'
                        },
                        html:'<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>'
                    },
                    {
                        xtype:'component',
                        reference:'iconInfoError',
                        style:{
                            'text-align':'center'
                        },
                        html:'<i class="fa fa-exclamation-trinagle fa-3x"></i>'
                    },
                    {
                        xtype: 'component',
                        anchor: '100%',
                        style: 'font-weight: bold;',
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
                    items: [{
                        reference:'btnInfoErrorLoad',
                        hidden:true,
                        xtype: 'button',
                        text: Locale.t('global.btn.close.text'),
                        handler: 'onClose'
                    },{
                        reference:'btnInfoErrorSave',
                        hidden:true,
                        xtype: 'button',
                        text: Locale.t('global.btn.errorsave.text'),
                        handler: 'onErrorSave'
                    }]
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
    onAfterRenderIndex: function (panel) {
        if (Backend.confMod.main.west.collapse===1){
            if (this.west) {
                this.west.show();
            }
            if (this.westClose) {
                this.westClose.hide();
            }
        }
        if (Backend.confMod.main.west.width){
            this.west.setWidth( Backend.confMod.main.west.width);
        }

        // gesione azioni su apertura
        if (typeof datiApertura !=="undefined"  && datiApertura !==null){
            this.onRunApertura(datiApertura);
            datiApertura=null;
        }
    },

    onToggleNav:function (btn) {
        let nav = this.lookupReference('main-west'),
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

    onErrorSave:function () {
        // this.form.show();
        // this.panelInfo.hide();
        this.getView().setActiveItem(this.form);
        this.getViewModel().set('consoleInfo', '');
        this.lookupReference('iconInfoStart').hide();
        this.lookupReference('iconInfoError').show();
        if (this.lookupReference('toolbarForm')){
            this.lookupReference('toolbarForm').enable();
        }
        if (this.toolBar){
            this.toolBar.enable();
        }
    },
    onAfterSave:function () {
        var consoleInfo = this.getViewModel().get('consoleInfo');
        consoleInfo += '<h3>'+Locale.t('global.salvataggioOk')+'</h3>';
        this.getViewModel().set('consoleInfo',consoleInfo);
        this.loadData();

    },
    onBeforeSave:function () {
        if (this.lookupReference('toolbarForm')){
            this.lookupReference('toolbarForm').disable();
        }
        if (this.toolBar){
            this.toolBar.disable();
        }
        this.lookupReference('iconInfoStart').show();
        this.lookupReference('iconInfoError').hide();
        this.lookupReference('btnInfoErrorLoad').hide();
        this.lookupReference('btnInfoErrorSave').hide();
        this.getViewModel().set('consoleInfo','<h3>'+Locale.t('global.salvataggio')+'</h3>');
        this.getView().setActiveItem(this.panelInfo);
    },
    onBeforeDelete:function () {
        if (this.lookupReference('toolbarForm')){
            this.lookupReference('toolbarForm').disable();
        }
        if (this.toolBar){
            this.toolBar.disable();
        }
        this.lookupReference('iconInfoStart').show();
        this.lookupReference('iconInfoError').hide();
        this.lookupReference('btnInfoErrorLoad').hide();
        this.lookupReference('btnInfoErrorSave').hide();
        this.getViewModel().set('consoleInfo','<h3>'+Locale.t('global.delete')+'</h3>');
        this.getView().setActiveItem(this.panelInfo);
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


    /* ----------------------------------------------------------------------
     * GESTIONE CARDS
     * - onActivateCard: gestione colore attivo
     * ----------------------------------------------------------------------*/
    onActivateCard:function (card) {
        let toolBarCard = this.toolBarCard;
        toolBarCard.items.each(function(item) {
            if (item.posizione===card.posizione){
                item.setStyle({backgroundColor:'LightBlue'});
            }else{
                item.setStyle({backgroundColor:''});
            }

        },this);
    },

    /* ----------------------------------------------------------------------
     * TREEMENU
     * - onExpandWest
     * - onCollapseWest
     * - onResizeWest
     * - onRenderTree
     * ----------------------------------------------------------------------*/
    isFirstResize : true,
    onExpandWest:function () {
        if (Backend.cfgPer) {
            Backend.cfgPer.G_WEST = 1;
            this.setCfgPer();
        }else{
            Backend.confMod.main.west.collapse=1;
            this.setConfMod();
        }
    },
    onCollapseWest:function () {
        if (Backend.cfgPer) {
            Backend.cfgPer.G_WEST = 0;
            this.setCfgPer();
        }else{
            Backend.confMod.main.west.collapse=0;
            this.setConfMod();
        }
    },
    onResizeWest:function(panel){
        if (this.isFirstResize){
            this.isFirstResize=false;
        }else{
            if (Backend.cfgPer) {
                Backend.cfgPer.G_WEST_WIDTH = panel.width;
                this.setCfgPer();
            }else{
                Backend.confMod.main.west.width = panel.width;
                this.setConfMod();
            }
        }
    },
    onRenderTree: function(pnl){
        if(Backend.start===2) {
            pnl.getStore().load({
                scope: this,
                callback: function (records) {
                    let me = this;
                    if (records.length > 0) {
                        let treeNode = pnl.getRootNode(),
                            node = null,
                            child = '';

                        child = Backend.confMod.main.tabActive;
                        if (child !== '') {
                            node = treeNode.findChild('itemId', child, true);
                        }
                        if (node) {
                            pnl.getSelectionModel().select(node, false);
                            me.onitemclick(pnl, node);
                        }else{
                            pnl.getSelectionModel().select(treeNode.firstChild, false);
                            me.onitemclick(pnl, treeNode.firstChild);
                        }
                    }
                }
            });
        }
    },

    onCheckDati:function(){
        if (datiApertura) {
            this.onRunApertura(datiApertura);
        }
    },

    /** ------------------------------------------------------------------
     * Gestione bddrive ->wkf TODO da spostare
     * @param view
     * @param rowIndex
     * @param colIndex
     * @param item
     * @param event
     * @param record
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
        this.onUploadFile(file,view);
    },
    onChangeBtnUpload:function (field, value) {
        var fs = field.up('fieldset'),
            view = fs.down('portal-dragfile'),
            body = view.body,
            icon = body.down('.drag-file-icon');

        body.addCls('dropped');
        icon.addCls('fa-spin');

        var files = field.fileInputEl.dom.files;
        var file = files[0];

        this.onUploadFile(file,view,view.idRecord);
    },
    onUploadFile:function(file,view){
        var me = this,
            vm = this.getViewModel(),
            record = vm.get('record'),
            id = record.data.id,
            body = view.body,
            icon = body.down('.drag-file-icon'),
            text = body.down('.drag-file-label'),
            fd = new FormData();
        fd.append('file', file);
        fd.append('_fn', 'uploadAttach');
        fd.append('id', id);

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
                        me.onEndUpload(resp);
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
    }
});