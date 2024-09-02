Ext.define('portal.v1.public.main.global.upload.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.v1-public-uploadfile',

    requires: [
        'Ext.drag.Target',
        'portal.util.Locale'
    ],
    init: function () {

    },
    loadImagesBinary: function(url,obj){
        let me = this
        try{
            Ext.Ajax.request({
                url: url, method: 'GET', binary:true,
                success: function (response,o) {
                    let headers = response.getAllResponseHeaders()
                    let blob = new Blob([response.responseBytes], {type: headers['content-type']})
                    this.binaryImg = window.URL.createObjectURL(blob)
                    me.getView().down('#image').setSrc(this.binaryImg)
                },
                failure: function () {
                    //TODO gestire immagine vuota
                }
            })
        }catch (err){
            //console.log(err)
        }
    },
    updateInfo: function (f) {
        let me = this, vm = this.getViewModel()
        if (f.url!==''){
            this.loadImagesBinary(f.url,this.imgBynary);
            this.imgOld =f.src
        }
        if (f.readOnly === true){
            f.hideBbtnDel = true
            f.hideBtnAdd = true
            f.hideBtnUndo = true
            f.hideBtnCanc = true
        } else {
            f.hideBtnCanc = false
            if (f.url === '') {
                if (f.updimage === true) {
                    me.getView().down('#image').setSrc('/images/picture-add.png')
                }
                f.hideBbtnDel = true
                f.hideBtnAdd = false
                f.hideBtnUndo = true
                vm.set('hideDrop', false);

            } else {
                f.hideBbtnDel = false
                f.hideBtnAdd = true
                f.hideBtnUndo = true
                vm.set('hideDrop', true);
            }
        }
        this.getViewModel().set('fl', f)
    },
    onChangeBtnUpload: function (field, value) {
        this.filefield = field;
        if (!value) {
            return; //ho annullato
        }
        let me = this,
            vm = me.getViewModel(),
            type = vm.get('fl.type'),
            body = this.getView().body;
        let files = this.filefield.fileInputEl.dom.files;
        this.file = files[0];
        this.getView().down('form').reset()


        if (files[0].name && files[0]){
            if (me.checkTypeFile(files[0].name)) {
                this.uploadFile()
            }else{
                this.target.viewDrag.body.down('.drag-label').setHtml(me.fileError)
            }
        }
    },
    updateBtn: function (result) {
        let me = this,
            vm = me.getViewModel()

        me.target.viewDrag.body.down('.drag-label').setHtml(Locale.t('global.upload.dropfile.text'))
        me.target.viewDrag.body.down('.drag-div').setCls('drag-div')
        me.target.viewDrag.body.down('.drag-icon').setCls('drag-icon')
        if (result === true) {
            vm.set('hideDrop', true);
            vm.set('fl.hideBbtnDel', true)
            vm.set('fl.hideBtnAdd', true)
            vm.set('fl.hideBtnUndo', false)
        }
    },
    onResetImg: function () {
        let me = this,
            vm = me.getViewModel()

        vm.set('fl.hideBbtnDel', true)
        vm.set('fl.hideBtnAdd', false)
        vm.set('fl.hideBtnUndo', true)
        vm.set('hideDrop', false);
        me.getView().down('#image').setSrc('/images/picture-add.png')
        me.getView().fireEvent('onResetImg', vm.get('fl.rif'), true)
        me.target.viewDrag.body.down('.drag-label').setHtml(Locale.t('global.upload.dropfile.text'))
        me.target.viewDrag.body.down('.drag-div').setCls('drag-div')
        me.target.viewDrag.body.down('.drag-icon').setCls('drag-icon')
    },
    onUndoImg: function () {
        let me = this,
            vm = me.getViewModel()
        //verifico se devo settare vuoto o vecchia immagine
        if (!this.imgOld || this.imgOld === '') {
            vm.set('fl.hideBbtnDel', true)
            vm.set('fl.hideBtnAdd', false)
            vm.set('fl.hideBtnUndo', true)
            me.getView().down('#image').setSrc('/images/picture-add.png')
            vm.set('hideDrop', false);
            me.getView().fireEvent('onResetImg', vm.get('fl.rif'), true)
        } else {
            vm.set('fl.hideBbtnDel', false)
            vm.set('fl.hideBtnAdd', true)
            vm.set('fl.hideBtnUndo', true)
            me.getView().down('#image').setSrc(me.binaryImg)
            vm.set('hideDrop', true);
            me.getView().fireEvent('onResetImg', vm.get('fl.rif'), true)
        }
        me.target.viewDrag.body.down('.drag-label').setHtml(Locale.t('global.upload.dropfile.text'))
        me.target.viewDrag.body.down('.drag-icon').setCls('drag-icon')
        me.target.viewDrag.body.down('.drag-div').setCls('drag-div')
    },
    onClickImg: function () {
        let me = this,  vm = me.getViewModel()
        me.getView().fireEvent('onClickImg',vm.get('fl.rif'))
    },
    uploadFile: function () {
        let me = this,
            vm = me.getViewModel(),
            formData = new FormData();

        vm.set('hideProgress', false);
        formData.append('file', this.file);
        formData.append('thumb', vm.get('fl.thumb'));
        formData.append('descrizione', vm.get('fl.descrizione'));
        formData.append('rif', vm.get('fl.rif'))

        this.oReq = new XMLHttpRequest();
        this.oReq.responseType = 'json';
        this.oReq.open("post",  '/api/v1/'+vm.get('fl.percorso'), true); //passo il percorso che arriva dall'app
        this.oReq.setRequestHeader("token", vm.get('fl.token')) //aggiungo token pagina
        this.oReq.upload.addEventListener("progress", function (e) {
            return me.updateProgress(e, me)
        });
        this.oReq.addEventListener("loadend", function (e) {
            return me.transferEnd(e, me)
        })
        this.oReq.addEventListener("error", function (e) {
            return me.transferFailed(e, me);
        })
        this.oReq.send(formData);
    },
    transferEnd: function (oEvent, me) {
        let vm = this.getViewModel()

        vm.set('hideProgress', true);
        let rifimg='' //riferimento immagine x campi multipli nel form
        if (vm.get('fl.rif')) {
            rifimg=vm.get('fl.rif')
        }
        const res = oEvent.currentTarget.response
        if (res) {
            me.getView().fireEvent('returnRequest', res,rifimg)
            me.updateBtn(res['success'])
            if (vm.get('fl.thumb') && res['success'] === true) {
              me.getThumb(res)
            }
        }
    },
    transferCanceled: function () {
        let me = this,
            vm = me.getViewModel()

        vm.set('hideProgress', true);
        me.oReq.abort()
        me.updateBtn(false)
    },
    transferFailed: function (oEvent, me) {
        let vm = me.getViewModel()
        vm.set('hideProgress', true);
        //TODO presentare messaggio errore
        me.updateBtn(false)
    },

    //gestione progressivo
    updateProgress: function (oEvent, me) {
        if (oEvent.lengthComputable) {
            let progress = oEvent.loaded / oEvent.total
            let textProgress = oEvent.loaded / oEvent.total * 100
            me.getViewModel().set('progress', oEvent.loaded / oEvent.total)
            me.getViewModel().set('textProgress', Locale.t('global.upload.message.progress') + ' ' + textProgress.toFixed(0))
        } else {
            //TODO
            //console.log('Impossibile elaborare il progresso perche\' non si conosce la grandezza totale')
        }
    },
    //gestione drag&drop
    afterRenderDropFile: function (view) {
        let me = this,
            body = view.body;
        if (window.File && window.FileList && window.FileReader) {
            this.target = new Ext.drag.Target({
                element: body,
                viewDrag: view,
                listeners: {
                    dragenter: this.onDragEnter,
                    dragleave: this.onDragLeave,
                    scope: me,
                    drop: 'onDrop'
                }
            });
        } else {
            body.down('.drag-label').setHtml('File dragging is not supported by your browser');
        }
    },

    onDragEnter: function (){
        this.target.viewDrag.body.addCls('active')
        // this.target.viewDrag.body.down('.drag-file-ct').addCls('active')
    },
    onDragLeave: function() {
        this.target.viewDrag.body.removeCls('active')
        // this.target.viewDrag.body.down('.drag-file-ct').removeCls('active')
    },
    onDrop: function (target, info) {
        let me = this,
            vm = me.getViewModel(),
            type = vm.get('type'),
            view = target.viewDrag,
            body = view.body,
            icon = body.down('.drag-icon'),
            text = body.down('.drag-label'),
            div = body.down('.drag-div'),
            files = info.files,
            len = files.length,
            s;
        if (len > 1) {
            text.update(Locale.t('upload.dropfile.multi'));
            body.removeCls('active');
            body.addCls('red');
            return;
        }
        this.target.viewDrag.body.removeCls('active')
        if (files[0].name && files[0]) {
            if (me.checkTypeFile(files[0].name)) {
                me.file = files[0];
                me.uploadFile();
            } else {
                text.setHtml(me.fileError);
                icon.setCls('drag-icon fas fa-exclamation-triangle fa-3x')
                div.setCls('drag-div drag-red')
            }
        }
    },

    //controllo estensione
    checkTypeFile: function (file) {
        let me = this,
            vm = me.getViewModel(),
            type = vm.get('fl.type')
        //se array estensioni è vuoto restituisco ok
        if (type.length===0) {
            return true
        }
        const re = /(?:\.([^.]+))?$/;
        const ext = re.exec(file)[1];
        me.fileError = ''
        if (ext === undefined) {
            me.fileError = 'File non definito'
            return false
        } else {
            if (type.indexOf(ext) > -1) {
                return true
            } else {
                me.fileError = 'File non valido'
                return false
            }
        }
    }
});