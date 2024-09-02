/**
 * Created by luke on 25/03/22.
 */
Ext.define('vda.view.forms.component.ControllerPfmea', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pfmea',

    requires: [
        'Ext.button.Button',
        'Ext.form.Panel',
        'Ext.form.field.TextArea',
        'Ext.layout.container.VBox',
        'Ext.panel.Panel',
        'Ext.window.Window'
    ],
    //immagini
    onResetImgDis: function (campo, remove) {
        this.cardPfmea.down('#'+campo+'_remove').setValue(remove)
        this.cardPfmea.down('#'+campo+'_new').setValue('')
    },
    onReturnRequestDis: function (res,campo) {
        this.cardPfmea.down('#'+campo+'_remove').setValue(false)
        if (res['success'] === true) {
            this.cardPfmea.down('#'+campo+'_new').setValue(Ext.encode(res['valori']))
        } else {
            this.cardPfmea.down('#'+campo+'_new').setValue('')
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: res['msg'],
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    },
    onClickDis:function (campo) {
        let me = this, vm = me.getViewModel(), record = vm.get('record');
        let titolo=Locale.t('vda.forms.progetto.pfmea.disegni')
        let fileimg=record.data.imgdis1.split('/').slice(-1)[0]
        switch (campo) {
            case 'imgdis2':
                fileimg=record.data.imgdis2.split('/').slice(-1)[0]
                break
            case 'imgdis3':
                fileimg=record.data.imgdis3.split('/').slice(-1)[0]
                break
            case 'imgdis4':
                fileimg=record.data.imgdis4.split('/').slice(-1)[0]
                break
            case 'imgdis5':
                fileimg=record.data.imgdis5.split('/').slice(-1)[0]
                break
        }
        if (fileimg==='') {return}//immagine vuota
        let immagine='/v1/showimage/app&vda&images&'+fileimg+'?dc=' + new Date().getTime();
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
    obbInoltroPfmea: function (btn) {
        let me = this, vm = me.getViewModel(), record = vm.get('record'), error=''
        //controllo nome/data progetto obbligatori all'inizio
        if (!this.obb()) {
            return
        }
        if (record.data.idscheda === ''){
            error += Locale.t('vda.forms.progetto.pfmea.fields.idscheda')+': '+Locale.t('global.form.inserirevalore')+'<br>';
        }
        if (record.data.imgdis1 === '' && record.data.imgdis2 === '' && record.data.imgdis3 === '' && record.data.imgdis4 === '' && record.data.imgdis5 === ''){
            error += Locale.t('vda.forms.progetto.pfmea.obbimmagine')+'<br>';
        }
        if (error!==''){
            Ext.Msg.show({title: Locale.t('global.attenzione'), msg: error, buttons: Ext.Msg.OK, icon: Ext.MessageBox.ERROR});
            return
        }
        //allegati
        let storeallegati = vm.getStore("storeAttachPfmea");
        record.data.allegati = [];
        storeallegati.each(function (rec) {
            rec.data.step = record.data.step
            record.data.allegati.push(rec.data);
        })
        this.onInoltra(btn);
    },
    onInoltraPpap:function(btn) {
        let me = this, vm = me.getViewModel(), record = vm.get("record");
        let btnX = new Ext.Button({
            text: Locale.t("global.btn.annulla"), iconCls: "x-fas fa-ban",
            handler: function () {
                wndw.destroy();
            }
        });
        let btnConfirm = Ext.create("Ext.Button", {
            text: Locale.t("global.btn.conferma"), iconCls: "x-fas fa-check",
            handler: function () {
                let ff = wdwpanel.getForm();
                let note = ff.findField("note").getValue();
                wndw.destroy();
                me.getView().el.mask(Locale.t("global.actions.incorso"));
                Ext.Ajax.request({
                    method: "POST",
                    jsonData: {data: record.data,azione:25,note:note},
                    url: Backend.REST_API + "forms/progetto/flusso", //azione flusso
                    success: function () {
                        me.getView().el.unmask()
                        me.refreshGrid = true
                        me.onClose()
                    },
                    failure: function (response) {
                        me.getView().el.unmask();
                        let resp = Ext.decode(response.responseText);
                        Ext.Msg.show({
                            title: Locale.t("global.errore"),
                            msg: resp["msg"],
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }
                });
            }
        });
        let wdwpanel = Ext.create("Ext.form.Panel", {border: false,
            items: [
                {xtype: "textarea", fieldLabel:  Locale.t("vda.forms.progetto.btn.note"), scrollable: true, overflow: "auto", padding: "0 0 10 0",
                    anchor: "90%",labelWidth: 80, height: 200, value: "", name: "note"
                }
            ]
        });
        let wndw = Ext.create("Ext.Window", {
            tbar: [btnX, btnConfirm], title:  btn.text, height: 350,
            scrollable: true, width: 600, closable: true, bodyStyle: { padding: "10px", "background-color": "#ffffff" },
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show()
    }
});