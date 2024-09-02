/**
 * Created by fabrizio on 26/06/16.
 */
Ext.define('portal.view.blog.CommentController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.comment',

    requires: [
        'portal.store.blog.Comment',
        'Ext.form.FieldSet',
        'Ext.container.Container',
        'Ext.form.field.HtmlEditor',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.Date',
        'Ext.form.field.Time',
        'Ext.layout.container.HBox',
        'portal.util.Functions',
        'Ext.util.DelayedTask',
        'portal.util.Locale',
        'Ext.toolbar.Fill'
    ],
    onLoadData: function () {
        let me = this;
        this.positionPanel = 0;
        this.dataComment = Ext.create('portal.store.blog.Comment');
        this.dataComment.getProxy().extraParams.id = this.getView().recordId;
        this.dataComment.getProxy().extraParams.tagapp = this.getView().tagapp;
        this.dataComment.load({
            callback: function (records, operation, success) {
                if (success) {
                    let resp = operation._response.responseJson;
                    me.renderFieldSet(records, resp);
                }
            }
        });
    },
    addHtmlEditor: function(){
        let me = this;
        let rdate = new Date();//data default
        //verifico se ha la posta zimbra e può visualizzare schedulazione commento
        let hideSchedulazione=false; //default ha la posta
        if (Backend.docl && Backend.docl.ZIMBRAMAIL==='0') {
            hideSchedulazione=true; //nascondo schedulazione
        }
        let random = bdFunctions.bpRandomString(4);
        if (this.getView()){
            if (this.getView().readOnly===false) {
                this.getView().add({
                    xtype: 'fieldset',
                    style: {
                        'padding': '0px 5px 0px 5px',
                        'margin': 0
                    },
                    reference: 'fsnewcomment',
                    title: Locale.t('comment.inseriscititle'),
                    items: [
                        {
                            xtype: 'htmleditor',
                            height: 150,
                            reference: 'newcomment'
                        },
                        {
                            xtype: 'container',hidden:hideSchedulazione,
                            style: 'padding:0px!important;', layout: 'hbox',
                            items: [
                                {
                                    xtype: 'datefield',
                                    reference: 'datesch' + random,
                                    width: 270,
                                    labelWidth: 150,
                                    fieldLabel: Locale.t('comment.addschedule'),
                                    minValue: rdate,
                                    format: 'd/m/Y',
                                    submitFormat: 'Y-m-d',
                                    listeners: {
                                        change: function () {
                                            //se l'ora non è impostata metto quella attuale più
                                            if (!me.lookupReference('timesch' + random).getValue()) {
                                                let rnow = new Date();//data default
                                                let hr = rnow.getHours() + 1;
                                                let rtime = hr + ':00';
                                                me.lookupReference('timesch' + random).setValue(rtime);
                                            }
                                        }
                                    }
                                },
                                {xtype: 'box', width: 15},
                                {
                                    xtype: 'timefield',
                                    reference: 'timesch' + random,
                                    editable: false,
                                    hideLabel: true,
                                    minValue: '7:00',
                                    maxValue: '22:00',
                                    increment: 15,
                                    width: 120
                                }
                            ]
                        },
                        {
                            xtype: 'toolbar',
                            style: {
                                'background-color': 'transparent'
                            },
                            items: [
                                {
                                    text: Locale.t('comment.aggiunginuovo'),
                                    ui: 'green',
                                    handler: 'onAddText',
                                    toReference: 'newcomment',
                                    toScheduleDate: 'datesch' + random,
                                    toScheduleTime: 'timesch' + random
                                }
                            ]
                        }
                    ]
                });
            }
            if (this.positionPanel!==0) {
                this.getView().body.el.dom.scrollTop = this.positionPanel;// + this.getView().el.dom.offsetHeight;
            } else {
                let d = me.getView().body.dom;
                d.scrollTop = d.scrollHeight - d.offsetHeight
            }
            if (this.getView().readOnly===false) {
                let task = new Ext.util.DelayedTask(function () {
                    if (this.getView()) {
                        let htmleditor = this.getView().lookupReference('newcomment');
                        htmleditor.items.items[1].iframeEl.dom.contentWindow.focus();
                    }
                }, this);
                task.delay(500);
            }
        }
    },
    renderFieldSet: function (records) {
        if (this.getView()) {
            this.addHtmlEditor();
            let me = this, tabs = [], sub = [], title = '', i = 0;
            this.totRecord = 0;
            if (records.length > 0) {
                do {
                    let rec = records[i];
                    let editDel = true;
                    if (rec.data['idrisorsa'] === Backend.docl.ID) {
                        editDel = false;
                    }
                    let dt = Ext.Date.parse(rec.data['creationdate'], "Y-m-d H:i:s")
                    let data = Ext.Date.format(dt, 'd/m/Y H:i')
                    let scadenziario = '';
                    if (rec.data['scadenziario'] && rec.data['idrisorsa'] === Backend.docl.ID) {
                        let datasche = Ext.Date.parse(rec.data['scadenziario'], "Y-m-d H:i:s");
                        let schedulazione = ' (' + Locale.t('comment.titleschedule') + Ext.Date.format(datasche, 'd/m/Y H:i') + ')';
                        scadenziario = '<span style="font-weight: bold;font-size:small;color:red;">' + schedulazione + '</span>';
                    }
                    title = '<span style="font-style:italic;">' + data + '</span> <span style="font-weight: bold;font-size:medium;">' + rec.data['risorsa'] + '</span>' + scadenziario;
                    if (records[i + 1]) {
                        if (rec.data['idrif'] === records[i + 1].data['idrif']) {
                            if (editDel === false) {
                                sub.push(this.addComment(rec, title, null, [editDel, true]));
                            } else {
                                sub.push(this.addComment(rec, title, null, [editDel, false]));
                            }
                        } else {
                            tabs.push(this.addComment(rec, title, sub, [editDel, false]));
                            sub = [];
                            this.totRecord++;
                        }
                    } else {
                        tabs.push(this.addComment(rec, title, sub, [editDel, false]));
                        sub = [];
                        this.totRecord++;
                    }
                    i++;
                } while (i < records.length);
            }
            me.getView().add(tabs);
         }
    },
    addComment: function(rec,title,sub,hidden){
        let hideSub=this.getView().readOnly;
        let hideRemove=false;
        if (Backend.docl.AZIENDA==='CRF') {  //se è Remedy di CRF nascondo la schedulazione e rimuovi commento
            hideSub=true;hideRemove=true;
        } else {
            if (rec.data['idrisorsa']!==Backend.docl.ID) {
                hideRemove=true;
            }
        }
        return {
            xtype: 'fieldset',
            reference: 'DIV' + rec.data['id'],
            style:{
                'padding':'0px 5px 0px 5px',
                'margin':0
            },
            title: title,
            items: [
                {xtype: 'container', html: rec.data['comment']
                },
                {xtype: 'container', items: sub},
                {
                    xtype: 'toolbar',
                    hidden:hideSub, //modifica x CRF
                    style:{
                      'background-color':'transparent'
                    },
                    items: [
                        {xtype:'tbfill'},
                        {iconCls:  'fa fa-plus bd-btn-icon', tooltip: Locale.t('comment.aggiungisub') + '...',
                            ui: 'ocra',
                            hidden:hidden[1],
                            handler: 'onAddSub',
                            idrif: rec.data['id'],
                            toReference: 'DIV' + rec.data['id']
                        },
                        {iconCls:  'fa fa-minus-circle bd-btn-icon', tooltip: Locale.t('comment.remove') + '...',
                            ui: 'red',
                            hidden:hideRemove,
                            handler: 'onDelComment',
                            idrif: rec.data['id'],
                            toReference: 'DIV' + rec.data['id']
                        }
                    ]
                }
            ]
        }

    },
    onAddText: function (btn) {
        let hideRemove = false;
        if (Backend.docl.AZIENDA==='CRF') {  //se è Remedy di CRF nascondo la schedulazione e rimuovi commento
            hideRemove = true;
        }
        let me = this;
        let html = this.lookupReference(btn.toReference).getValue();
        let idrif = null;
        if (btn.idrif) {
            idrif = btn.idrif;
        }
        let htmlCheck = html.replace('&nbsp;', ''); //commento
        let dateSch = this.lookupReference(btn.toScheduleDate).getValue(); //data schedulazione
        let timeSch = this.lookupReference(btn.toScheduleTime).getValue(); //ora schedulazione
        if (htmlCheck.trim() !== '') {
            me.view.el.mask(Locale.t('global.update'));
            Ext.Ajax.request({
                url: Backend.API_GLOBAL + 'Blog.php',
                params: {
                    '_fn': 'setComment',
                    'comment': html,
                    'idrecord': me.getView().recordId,
                    'dateSch': dateSch,
                    'timeSch': timeSch,
                    'idrif': idrif,
                    'tagapp': me.getView().tagapp
                },
                success: function (record) {
                    let rec = Ext.decode(record.responseText);
                    if (rec['success'] === true) {
                        if (rec['exception'] === true) {
                            let header = '<span style="font-style: italic;">' + Locale.t('comment.error01') + '</span><hr><span style="font-weight: bold;">';
                            let footer = '</span><br><span style="font-style: italic;">' + Locale.t('comment.errorfooter') + '</span>';
                            Ext.Msg.show({
                                title: Locale.t('global.errore'),
                                ui: 'orange',
                                msg: header + rec['msg'] + footer,
                                buttons: Ext.Msg.OK,
                                icon: Ext.MessageBox.ERROR
                            });
                        }
                        let editDel=true;
                        if (rec.data['idrisorsa'] === Backend.docl.ID){
                            editDel=false;
                        }
                        let dt = Ext.Date.parse(rec.data['creationdate'], "Y-m-d H:i:s");
                        let data = Ext.Date.format(dt, 'd/m/Y H:m');
                        let scadenziario = '';
                        if (rec.data['scadenziario'] && rec.data['risorsa'] === Backend.docl.COMMON) {
                            let datasche = Ext.Date.parse(rec.data['scadenziario'], "Y-m-d H:i:s");
                            let schedulazione = ' (' + Locale.t('comment.titleschedule') + Ext.Date.format(datasche, 'd/m/Y H:i') + ')';// ;
                            scadenziario = '<span style="font-weight: bold;font-size:small;color:red;">' + schedulazione + '</span>';
                        }
                        let title = '<span style="font-style:italic;font-size:x-small;">' + data + '</span> <span style="font-weight: bold;font-size:small;">' + rec.data['risorsa'] + '</span>' + scadenziario;

                        if (btn.panel) {
                            if (editDel===false) {
                                btn.panel.insert(btn.pos, {
                                    xtype: 'fieldset',
                                    style: {
                                        'padding': '0px 5px 0px 5px',
                                        'margin': 0
                                    },
                                    reference: 'DIV' + rec.data['id'],
                                    title: title,
                                    items: [
                                        {xtype: 'container', html: rec.data['comment']},
                                        {
                                            xtype: 'toolbar',hidden:hideRemove,
                                            style: {
                                                'background-color': 'transparent'
                                            },
                                            items: [
                                                {xtype:'tbfill'},
                                                {iconCls:  'fa fa-minus-circle bd-btn-icon', tooltip: Locale.t('comment.remove') + '...',
                                                    ui: 'red',
                                                    handler: 'onDelComment',
                                                    idrif: rec.data['id'],
                                                    toReference: 'DIV' + rec.data['id']
                                                }
                                            ]
                                        }
                                    ]
                                });
                            }
                            me.onaddSubAnnulla(btn)
                        } else {
                            me.totRecord++;
                            me.getView().insert(1, {
                                reference: 'DIV' + rec.data['id'],
                                xtype: 'fieldset',
                                title: title,
                                items: [
                                    {xtype: 'container', html: rec.data['comment']},
                                    {
                                        xtype: 'toolbar',hidden:hideRemove,
                                        style: {
                                            'background-color': 'transparent'
                                        },
                                        items: [
                                            {xtype:'tbfill'},
                                            {iconCls:  'fa fa-minus-circle bd-btn-icon', tooltip: Locale.t('comment.remove') + '...',
                                                ui: 'red',
                                                handler: 'onDelComment',
                                                idrif: rec.data['id'],
                                                toReference: 'DIV' + rec.data['id']
                                            }
                                        ]
                                    }
                                ]
                            });
                            me.lookupReference(btn.toReference).setValue('');
                            me.lookupReference(btn.toScheduleDate).setValue('');
                            me.lookupReference(btn.toScheduleTime).setValue('');
                        }
                    } else {
                        Ext.Msg.show({
                            title: Locale.t('global.errore'),
                            msg: rec['msg'],
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }
                    me.view.el.unmask();
                }
            })
        }
    },
    onaddSubAnnulla: function (btn) {
        btn.btn.setVisible(true);
        this.lookupReference(btn.toReference).destroy();
        this.lookupReference(btn.toScheduleDate).destroy();
        this.lookupReference(btn.toScheduleTime).destroy();
        this.lookupReference(btn.toReference + 'toolbar').destroy();
    },
    onAddSub: function (btn) {
        let me = this;
        let rdate = new Date();//data default
        //verifico se ha la posta zimbra e può visualizzare schedulazione commento
        let hideSchedulazione=false; //default ha la posta
        if (Backend.docl && Backend.docl.ZIMBRAMAIL==='0') {
            hideSchedulazione=true; //nascondo schedulazione
        }
        this.positionAddSub = me.getView().body.el.dom.scrollTop;
        let panel = this.lookupReference(btn.toReference);
        btn.setVisible(false);
        panel.add(
            {
                xtype: 'htmleditor',
                height: 150,
                reference: 'newcommentsub',
                listeners:{
                    render:function(){
                        me.getView().body.el.dom.scrollTop = me.positionAddSub;
                    }
                }
            },
            {
                xtype: 'container',hidden:hideSchedulazione,
                style: 'padding:0px!important;', layout: 'hbox',
                items: [
                    {
                        xtype: 'datefield',
                        reference: 'dateschsub',
                        width: 270,
                        labelWidth: 150,
                        fieldLabel: Locale.t('comment.addschedule'),
                        minValue: rdate,
                        format: 'd/m/Y',
                        submitFormat: 'Y-m-d'
                        ,
                        listeners: {
                            change: function () {
                                //se l'ora non è impostata metto quella attuale più
                                if (!me.lookupReference('timeschsub').getValue()) {
                                    let rnow = new Date();//data default
                                    let hr = rnow.getHours() + 1;
                                    let rtime = hr + ':00';
                                    me.lookupReference('timeschsub').setValue(rtime);
                                }
                            }
                        }
                    },
                    {xtype: 'box', width: 15},
                    {
                        xtype: 'timefield',
                        reference: 'timeschsub',
                        editable: false,
                        hideLabel: true,
                        minValue: '7:00',
                        maxValue: '22:00',
                        increment: 15,
                        width: 80
                    }
                ]
            },
            {
                xtype: 'toolbar', reference: 'newcommentsubtoolbar', items: [
                {
                    text: Locale.t('global.annulla'),
                    btn: btn,
                    ui: 'ocra',
                    panel: panel,
                    idrif: btn.idrif,
                    handler: 'onaddSubAnnulla',
                    toReference: 'newcommentsub',
                    toScheduleDate: 'dateschsub',
                    toScheduleTime: 'timeschsub'
                },
                {
                    text: Locale.t('comment.aggiunginuovo'),
                    ui: 'green',
                    pos: panel.items.length - 1,
                    panel: panel,
                    btn: btn,
                    idrif: btn.idrif,
                    handler: 'onAddText',
                    toReference: 'newcommentsub',
                    toScheduleDate: 'dateschsub',
                    toScheduleTime: 'timeschsub'
                }
            ]
            }
        );
        if (this.getView().readOnly===false) {
            let task = new Ext.util.DelayedTask(function () {
                let htmleditor = this.getView().lookupReference('newcommentsub');
                htmleditor.items.items[1].iframeEl.dom.contentWindow.focus();
            }, this);
            task.delay(500);
        }
    },
    //rimozione commento
    onDelComment:function(btn) {
        //recupero record
        let me=this;
        Ext.Msg.show({
            title: Locale.t('global.avviso'), iconCls: 'fa fa-minus-circle', msg: Locale.t('comment.remove'),
            buttons: Ext.Msg.YESNO, icon: Ext.MessageBox.QUESTION, fn: function (b) {
                if (b === 'yes') {
                    me.view.el.mask(Locale.t('global.update'));
                    Ext.Ajax.request({
                        params:{'_fn': 'removeComment',id:btn.idrif},
                        url: Backend.API_ADDRESS + '/forms/Attivita.php',
                        success:function(record){
                            let rec = Ext.decode(record.responseText);
                            if (rec['success']===true){
                                me.view.el.unmask();
                                Ext.Msg.show({
                                    title: Locale.t('global.attenzione'),
                                    msg: Locale.t('comment.modificato'),
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.MessageBox.ERROR
                                });
                            }else{
                                me.view.el.unmask();
                                Ext.Msg.show({
                                    title: Locale.t('global.attenzione'),
                                    msg: rec['msg'],
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
});