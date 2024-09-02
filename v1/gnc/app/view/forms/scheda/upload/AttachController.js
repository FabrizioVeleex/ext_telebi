/**
 * Created by luke on 16/09/22.
 */
Ext.define('gnc.view.forms.scheda.upload.AttachController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.v1-attachgnc',


    requires: [
        'Ext.drag.Target'
    ],

    init: function () {

    },
    onChangeBtnUpload: function (field, value) {
        this.filefield = field;
        if (!value) {
            return; //ho annullato
        }
        let me = this
        let files = this.filefield.fileInputEl.dom.files;
        this.file = files[0];
        this.getView().down('form').reset()
        if (files[0].name && files[0]){
            if (me.checkTypeFile(files[0].name)) {
                this.uploadFile()
            }else{
                alert(me.fileError)
            }
        }
    },
    uploadFile: function () {
        let me = this, formData = new FormData();

        formData.append('file', this.file);
        this.oReq = new XMLHttpRequest();
        this.oReq.responseType = 'json';
        this.oReq.open("post", Backend.REST_VERSION + '/uploadfile/', true);
        this.oReq.setRequestHeader("token", Ext.global.Vars.infoUser.token); //autorizzazione chiamata

        this.oReq.upload.addEventListener("progress", function (e) {
            //return me.updateProgress(e, me)
        });
        this.oReq.addEventListener("loadend", function (e) {
            return me.transferEnd(e, me)
        })
        this.oReq.send(formData);
    },
    transferEnd: function (oEvent, me) {
        const res = oEvent.currentTarget.response
        if (res) {
            me.getView().fireEvent('returnRequest', res)
        }
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
    //controllo estensione
    checkTypeFile: function (file) {
        //al momento accett tutto
        return true
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