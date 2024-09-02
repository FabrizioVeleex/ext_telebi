/**
 * Created by luke on 25/03/22.
 */
Ext.define('vda.view.forms.component.ControllerConcept', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.concept',
    requires: [
        'Ext.layout.container.VBox',
        'Ext.panel.Panel',
        'Ext.window.Window'
    ],
    //gestione immagini
    onResetImg: function (campo, remove) {
        this.cardConcept.down('#'+campo+'_remove').setValue(remove)
        this.cardConcept.down('#'+campo+'_new').setValue('')
    },
    onReturnRequest: function (res,campo) {
        this.cardConcept.down('#'+campo+'_remove').setValue(false)
        if (res['success'] === true) {
            this.cardConcept.down('#'+campo+'_new').setValue(Ext.encode(res['valori']))
        } else {
            this.cardConcept.down('#'+campo+'_new').setValue('')
            Ext.Msg.show({
                title: Locale.t('global.attenzione'),
                msg: res['msg'],
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    },
    onClickImg:function (campo) {
        let me = this, vm = me.getViewModel(), record = vm.get('record');
        let titolo=Locale.t('vda.forms.progetto.concept.fields.imgcon1')
        let fileimg=record.data.imgcon1.split('/').slice(-1)[0]
        if (campo==='imgcon2') {
            titolo=Locale.t('vda.forms.progetto.concept.fields.imgcon2')
            fileimg=record.data.imgcon2.split('/').slice(-1)[0]
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
    obbInoltroConcept: function (btn) {
        let me = this, vm = me.getViewModel(), record = vm.get('record'), error=''
        //controllo nome/data progetto obbligatori all'inizio
        if (!this.obb()) {
            return
        }
        if (record.data.dataprogetto === '' || record.data.dataprogetto === '0000-00-00'){
            error += Locale.t('vda.forms.progetto.concept.fields.dataprogetto')+': '+Locale.t('global.form.inserirevalore')+'<br>';
        }
        if (record.data.dataprototipo === '' || record.data.dataprototipo === '0000-00-00'){
            error += Locale.t('vda.forms.progetto.concept.fields.dataprototipo')+': '+Locale.t('global.form.inserirevalore')+'<br>';
        }
        if (record.data.dataprod === '' || record.data.dataprod === '0000-00-00'){
            error += Locale.t('vda.forms.progetto.concept.fields.dataprod')+': '+Locale.t('global.form.inserirevalore')+'<br>';
        }
        if (record.data.esponente === ''){
            error += Locale.t('vda.forms.progetto.concept.fields.esponente')+': '+Locale.t('global.form.inserirevalore')+'<br>';
        }
        if (record.data.tipo===1) {
            if (record.data.idsoggetto === ''){
                error += Locale.t('vda.forms.progetto.concept.fields.cdcli')+': '+Locale.t('global.form.inserirevalore')+'<br>';
            }
            if (record.data.nporte === ''){
                error += Locale.t('vda.forms.progetto.concept.fields.nporte')+': '+Locale.t('global.form.inserirevalore')+'<br>';
            }
            if (record.data.applicazione === ''){
                error += Locale.t('vda.forms.progetto.concept.fields.applicazione')+': '+Locale.t('global.form.inserirevalore')+'<br>';
            }
            if (record.data.codprod === ''){
                error += Locale.t('vda.forms.progetto.concept.fields.codprod')+': '+Locale.t('global.form.inserirevalore')+'<br>';
            }
            if (record.data.destinazione === ''){
                error += Locale.t('vda.forms.progetto.concept.fields.destinazione')+': '+Locale.t('global.form.inserirevalore')+'<br>';
            }
        } else {
            if (record.data.progassociato === ''){
                error += Locale.t('vda.forms.progetto.concept.fields.progassociato')+': '+Locale.t('global.form.inserirevalore')+'<br>';
            }
            if (record.data.articoli === ''){
                error += Locale.t('vda.forms.progetto.concept.fields.articoli')+': '+Locale.t('global.form.inserirevalore')+'<br>';
            }
            if (record.data.codcomp === ''){
                error += Locale.t('vda.forms.progetto.concept.fields.codcomp')+': '+Locale.t('global.form.inserirevalore')+'<br>';
            }
        }
        if (error!==''){
            Ext.Msg.show({title: Locale.t('global.attenzione'), msg: error, buttons: Ext.Msg.OK, icon: Ext.MessageBox.ERROR});
            return
        }
        if (record.data.idsoggetto==='') {
            record.data.cdcli=''
        }
        //allegati
        let storeallegati = vm.getStore("storeAttachConcept");
        record.data.allegati = [];
        storeallegati.each(function (rec) {
            rec.data.step = record.data.step
            record.data.allegati.push(rec.data);
        })
        this.onInoltra(btn);
    }
});