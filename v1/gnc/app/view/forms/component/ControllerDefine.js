/**
 * Created by luke on 25/03/22.
 */
Ext.define('gnc.view.forms.component.ControllerDefine', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.define',

    requires: [
        'Ext.layout.container.VBox',
        'Ext.panel.Panel',
        'Ext.window.Window',
        'gnc.view.forms.scheda.attach.define.GridAttachDefine',
        'portal.v1.view.main.global.upload.Attach',
        'portal.v1.view.main.global.upload.CardAttach',
        'portal.v1.view.main.global.upload.GridAttachModel',
        'portal.v1.view.main.global.upload.Image'
    ],
    //immagini
    onAddImagesKo:function(record,readOnlyDefine) {
        if (!this.imgko) {
            this.imgko = Ext.create('portal.v1.view.main.global.upload.Image')
                .on('returnRequest', 'onReturnRequestDefine').on('onResetImg', 'onResetImgDefine').on('onClickImg', 'onClickImgDefine')
        }
        this.cardDefine.down("#imgko").add(this.imgko);
        this.imgko.fireEvent('updateInfo', {
            url: record.data['imgko'], src: '', thumb: true, descrizione: '', readOnly: readOnlyDefine,
            updimage: true, rif: 'imgko', type: ['jpg', 'jpeg', 'png']
        })
    },
    onAddImagesOk:function(record,readOnlyDefine) {
        if (!this.imgok) {
            this.imgok = Ext.create('portal.v1.view.main.global.upload.Image')
                .on('returnRequest', 'onReturnRequestDefine').on('onResetImg', 'onResetImgDefine').on('onClickImg', 'onClickImgDefine')
        }
        this.cardDefine.down("#imgok").add(this.imgok);
        this.imgok.fireEvent('updateInfo', {
            url: record.data['imgok'], src: '', thumb: true, descrizione: '', readOnly: readOnlyDefine,
            updimage: true, rif: 'imgok', type: ['jpg', 'jpeg', 'png']
        })
    },
    onAddImagesAltro:function(record,readOnlyDefine) {
        if (!this.imgaltro) {
            this.imgaltro = Ext.create('portal.v1.view.main.global.upload.Image')
                .on('returnRequest', 'onReturnRequestDefine').on('onResetImg', 'onResetImgDefine').on('onClickImg', 'onClickImgDefine')
        }
        this.cardDefine.down("#imgaltro").add(this.imgaltro);
        this.imgaltro.fireEvent('updateInfo', {
            url: record.data['imgaltro'], src: '', thumb: true, descrizione: '', readOnly: readOnlyDefine,
            updimage: true, rif: 'imgaltro', type: ['jpg', 'jpeg', 'png']
        })
    },
    onReturnRequestDefine:function(res,campo) {
        this.cardDefine.down('#'+campo+'_remove').setValue(false)
        if (res['success'] === true) {
            this.cardDefine.down('#'+campo+'_new').setValue(Ext.encode(res['valori']))
        } else {
            this.cardDefine.down('#'+campo+'_new').setValue('')
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: res['msg'],
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    },
    onResetImgDefine: function (campo, remove) {
       this.cardDefine.down('#'+campo+'_remove').setValue(remove)
       this.cardDefine.down('#'+campo+'_new').setValue('')
    },
    onClickImgDefine:function(campo) {
        let me = this, vm = me.getViewModel(), record = vm.get('record');
        let titolo=Locale.t('gnc.forms.scheda.define.fields.imgko')
        let fileimg=record.data.imgko.split('/').slice(-1)[0]
        if (campo==='imgok') {
            titolo=Locale.t('gnc.forms.scheda.define.fields.imgok')
            fileimg=record.data.imgok.split('/').slice(-1)[0]
        }
        if (campo==='imgaltro') {
            titolo=Locale.t('gnc.forms.scheda.define.fields.imgaltro')
            fileimg=record.data.imgaltro.split('/').slice(-1)[0]
        }
        if (fileimg==='') {return}//immagine vuota
        let immagine='/v1/showimage/app&gnc&images&'+fileimg+'?dc=' + new Date().getTime();
        this.winImage = Ext.create('Ext.Window',{
            scope:me, title: titolo+' <b>', closeToolText:'Chiudi immagine',width:600,height:500, //maximized:true,
            scrollable:true,modal:true,
            layout: {type: 'vbox', align: 'center', pack: 'center'},
            items:[
                {xtype:'panel', cls:'srcImage', width:'100%', height:'100%', bodyStyle:{
                        'background-image':'url('+immagine+')', 'background-repeat': 'no-repeat',
                        'background-size':'contain'}
                }
            ]
        }).show();
    },
    //allegati
    onCreateAttachDefine:function(record,readOnlyDefine) {
        this.cardAttachDefine = Ext.create("portal.v1.view.main.global.upload.CardAttach")
        if (readOnlyDefine === false) {
            if (!this.uploadfileDefine) {
                this.uploadfileDefine = Ext.create("portal.v1.view.main.global.upload.Attach").on("returnRequest", "onReturnRequestAttachDefine");
            }
            this.cardAttachDefine.down("#updfile").add(this.uploadfileDefine);
            this.uploadfileDefine.fireEvent("updateInfo", {
                url: "", src: "", thumb: false, descrizione: "", readOnly: false, updimage: false, rif: "define", type: [],
            })
        }
        this.gridAttachDefine = Ext.create("gnc.view.forms.scheda.attach.define.GridAttachDefine")
        let store = this.gridAttachDefine.getStore()
        store.loadData(record.data.allegati.filter(obj=>obj.campo==='define'))
        this.cardAttachDefine.down("#updgrid").add(this.gridAttachDefine);
        this.cardDefine.down("#definefld").add(this.cardAttachDefine);
    },
    //ritorno caricamento allegato
    onReturnRequestAttachDefine: function (res) {
        let me = this, vm = me.getViewModel(), record = vm.get('record')
        let store = this.gridAttachDefine.getStore()
        res.valori.idautore = Ext.global.Vars.infoUser.id //imposto autore frontend
        res.valori.autore = Ext.global.Vars.infoUser.cognomenome //imposto autore frontend
        res.valori.hideDownload = "true" //il nuovo non lo posso scaricare
        let newrec=Ext.create("portal.v1.view.main.global.upload.GridAttachModel", res.valori) //creo oggetto
        store.add(newrec) //aggiungo nello store front-end
        newrec.data.campo=res.valori.rif //imposto campo
        record.data.allegati.push(newrec.data) //lo metto nel record backend
    },
    obbInoltroDefine: function (btn) {
        let me = this, vm = me.getViewModel(), record = vm.get('record'), error=''
        if (record.data.datadoc === '' || record.data.datadoc === '0000-00-00'){
            error += Locale.t('gnc.forms.scheda.define.fields.datadoc')+': '+Locale.t('global.form.inserirevalore')+'<br>';
        }
        if (record.data.rilevato === ''){
            error += Locale.t('gnc.forms.scheda.define.fields.rilevato')+': '+Locale.t('global.form.inserirevalore')+'<br>';
        } else if (record.data.rilevato.length>250){
            error +=Locale.t('gnc.forms.scheda.define.fields.rilevato')+': '+Locale.t('global.form.lunghezzamassima')+' 250<br>';
        }
        if (record.data.qta === 0){
            error += Locale.t('gnc.forms.scheda.define.fields.qta')+': '+Locale.t('global.form.inserirevalore')+'<br>';
        }
        if (record.data.cdart === ''){
            error += Locale.t('gnc.forms.scheda.define.fields.cdart')+': '+Locale.t('global.form.inserirevalore')+'<br>';
        }
        if (record.data.idstabilimento === ''){
            error += Locale.t('gnc.forms.scheda.define.fields.idstabilimento')+': '+Locale.t('global.form.inserirevalore')+'<br>';
        }
        if (record.data.tipo === 1 && record.data.idfornitore === ''){
            error += Locale.t('gnc.forms.scheda.define.fields.idfornitore')+': '+Locale.t('global.form.inserirevalore')+'<br>';
        }
        if (!record.data.descrizione || record.data.descrizione === ''){
            error += Locale.t('gnc.forms.scheda.define.fields.descrizione')+': '+Locale.t('global.form.inserirevalore')+'<br>';
        }
        if (!record.data.notedefine || record.data.notedefine === ''){
            error += Locale.t('gnc.forms.scheda.define.fields.notedefine')+': '+Locale.t('global.form.inserirevalore')+'<br>';
        }
        if (error!==''){
            Ext.Msg.show({title: Locale.t('global.attenzione'), msg: error, buttons: Ext.Msg.OK, icon: Ext.MessageBox.ERROR});
            return
        }
        this.onInoltra(btn);
    }
});