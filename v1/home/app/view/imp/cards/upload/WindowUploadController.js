Ext.define('home.view.imp.cards.upload.WindowUploadController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.v1-imp-windowuplad',

    onSave: function(){
        let me = this;
        //verifico presenza nuovo file
        let upload = this.lookupReference('uploadfile'),
            form = upload.getForm(),
            nomefile=form.findField('nomefile').getValue(),
            bpfile = form.findField('bpfile').getValue();

        //controllo presenza file
        if (!bpfile){
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('home.upload.attachpresente'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return;
        }
        //controllo inserimento nome file
        if (this.getView().attachName && nomefile.trim()===''){
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: Locale.t('home.upload.attachname'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return;
        }
        // verifico estensione
        let accept = this.getView().accept;//['jpg','png'];
        if (accept && accept.length>0) {
            let indexofPeriod = bpfile.lastIndexOf("."),
                uploadedExtension = bpfile.substr(indexofPeriod + 1, bpfile.length - indexofPeriod);
            if (!Ext.Array.contains(accept, uploadedExtension)) {
                Ext.Msg.show({
                    title: Locale.t('home.upload.filetype.title'),
                    msg: Locale.t('home.upload.filetype.msg') + ' <b>' + accept.join() + '</b>',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR
                });
                return;
            }
        }


        let fileData = upload.el.down('input[type=file]').dom.files[0];
        let formData = new FormData();
        formData.set("name", nomefile);
        formData.append("file", fileData);


        const oReq = new XMLHttpRequest();

        oReq.responseType = 'json';
        oReq.open("post",'/v1/home/forms/imp/savewallpaper/', true);
        oReq.setRequestHeader("token", Ext.global.Vars.infoUser.token); //autorizzazione chiamata

        oReq.upload.addEventListener("progress",function (e){
            return me.updateProgress(e,me)
        });

        oReq.addEventListener("load",function (e){
            return me.transferComplete(e,me)
        });

        oReq.addEventListener("loadend",function (e){
            return me.transferEnd(e,me)
        })

        oReq.addEventListener("error", this.transferFailed, false);
        oReq.addEventListener("abort", this.transferCanceled, false);


        this.getView().el.mask(Locale.t('global.upload.message.progress')+' 0%');
        oReq.send(formData);

    },
    transferEnd: function (oEvent,me){
        const res = oEvent.currentTarget.response
        me.getView().fireEvent('closeWindowAttach',me.getView(),me.getView().valori);
        me.getView().destroy();
    },
    transferCanceled: function (oEvent){
        me.getViewModel().set('textProgress',Locale.t('global.upload.message.cancel'))
    },
    transferFailed: function (oEvent){
        try {
            const rest = oEvent.currentTarget.response
            Ext.Msg.show({
                title: Locale.t('global.errore'),
                msg: rest['msg'],
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
        } catch (e) {
            Ext.Msg.show({
                title: Locale.t('global.errore'),
                msg: Locale.t('global.upload.message.failure'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    },
    transferComplete: function (oEvent,me){
        me.getViewModel().set('textProgress',Locale.t('global.upload.message.completed'))
    },
    updateProgress: function (oEvent,me){
        if (oEvent.lengthComputable) {
            let percentComplete = oEvent.loaded / oEvent.total;
            let percentView = oEvent.loaded / oEvent.total * 100;
            me.getViewModel().set('progress',percentComplete)
            me.getViewModel().set('textProgress',Locale.t('global.upload.message.progress')+' '+ percentView.toFixed(0))
        } else {
            Ext.Msg.show({
                title: Locale.t('global.errore'),
                msg: Locale.t('global.upload.message.nosize'),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    },

    //chiude la finestra
    onCloseWindow: function () {
        this.getView().fireEvent('closeWindowAttach',this,{});
        this.getView().destroy();
    },
    managerView: function(){
        if (this.getView().attachName){
            this.lookupReference('attachfield').setVisible(true);
        }
    }
});