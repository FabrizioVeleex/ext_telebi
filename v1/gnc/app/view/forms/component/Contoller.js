/**
 * Created by luke on 15/03/22.
 * Utilizzato per azioni/oggetti comuni
 */
Ext.define('gnc.view.forms.component.Contoller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.contoller',

    requires: [
        'Ext.button.Button',
        'Ext.form.Panel',
        'Ext.form.field.TextArea',
        'Ext.window.Window'
    ],
    //sistemo problema timezone campi data
    onSetCampiData:function() {
        let me = this, vm = me.getViewModel(), record = vm.get("record")
        //define
        if (record.data.datadoc && record.data.datadoc!=='') {
            record.data.datadoc.setTime(record.data.datadoc.getTime() + (2 * 60 * 60 * 1000));
        }
        //containment
        if (record.data.driclotto && record.data.driclotto!=='') {
            record.data.driclotto.setTime(record.data.driclotto.getTime() + (2 * 60 * 60 * 1000));
        }
        if (record.data.dcomlotto && record.data.dcomlotto!=='') {
            record.data.dcomlotto.setTime(record.data.dcomlotto.getTime() + (2 * 60 * 60 * 1000));
        }
        if (record.data.dricblocco && record.data.dricblocco!=='') {
            record.data.dricblocco.setTime(record.data.dricblocco.getTime() + (2 * 60 * 60 * 1000));
        }
        if (record.data.dcomblocco && record.data.dcomblocco!=='') {
            record.data.dcomblocco.setTime(record.data.dcomblocco.getTime() + (2 * 60 * 60 * 1000));
        }
        if (record.data.dricstock && record.data.dricstock!=='') {
            record.data.dricstock.setTime(record.data.dricstock.getTime() + (2 * 60 * 60 * 1000));
        }
        if (record.data.dcomstock && record.data.dcomstock!=='') {
            record.data.dcomstock.setTime(record.data.dcomstock.getTime() + (2 * 60 * 60 * 1000));
        }
        if (record.data.dricaltrocont && record.data.dricaltrocont!=='') {
            record.data.dricaltrocont.setTime(record.data.dricaltrocont.getTime() + (2 * 60 * 60 * 1000));
        }
        if (record.data.dcomaltrocont && record.data.dcomaltrocont!=='') {
            record.data.dcomaltrocont.setTime(record.data.dcomaltrocont.getTime() + (2 * 60 * 60 * 1000));
        }
        //cause
        if (record.data.dcausa && record.data.dcausa!=='') {
            record.data.dcausa.setTime(record.data.dcausa.getTime() + (2 * 60 * 60 * 1000));
        }
        //corrective actions
        if (record.data.dricmatca && record.data.dricmatca!=='') {
            record.data.dricmatca.setTime(record.data.dricmatca.getTime() + (2 * 60 * 60 * 1000));
        }
        if (record.data.dcommatca && record.data.dcommatca!=='') {
            record.data.dcommatca.setTime(record.data.dcommatca.getTime() + (2 * 60 * 60 * 1000));
        }
        if (record.data.dricmanca && record.data.dricmanca!=='') {
            record.data.dricmanca.setTime(record.data.dricmanca.getTime() + (2 * 60 * 60 * 1000));
        }
        if (record.data.dcommanca && record.data.dcommanca!=='') {
            record.data.dcommanca.setTime(record.data.dcommanca.getTime() + (2 * 60 * 60 * 1000));
        }
        if (record.data.dricmacca && record.data.dricmacca!=='') {
            record.data.dricmacca.setTime(record.data.dricmacca.getTime() + (2 * 60 * 60 * 1000));
        }
        if (record.data.dcommacca && record.data.dcommacca!=='') {
            record.data.dcommacca.setTime(record.data.dcommacca.getTime() + (2 * 60 * 60 * 1000));
        }
        if (record.data.dricstrca && record.data.dricstrca!=='') {
            record.data.dricstrca.setTime(record.data.dricstrca.getTime() + (2 * 60 * 60 * 1000));
        }
        if (record.data.dcomstrca && record.data.dcomstrca!=='') {
            record.data.dcomstrca.setTime(record.data.dcomstrca.getTime() + (2 * 60 * 60 * 1000));
        }
        if (record.data.dricmetca && record.data.dricmetca!=='') {
            record.data.dricmetca.setTime(record.data.dricmetca.getTime() + (2 * 60 * 60 * 1000));
        }
        if (record.data.dcommetca && record.data.dcommetca!=='') {
            record.data.dcommetca.setTime(record.data.dcommetca.getTime() + (2 * 60 * 60 * 1000));
        }
        if (record.data.dricproca && record.data.dricproca!=='') {
            record.data.dricproca.setTime(record.data.dricproca.getTime() + (2 * 60 * 60 * 1000));
        }
        if (record.data.dcomproca && record.data.dcomproca!=='') {
            record.data.dcomproca.setTime(record.data.dcomproca.getTime() + (2 * 60 * 60 * 1000));
        }
        if (record.data.dricaltca && record.data.dricaltca!=='') {
            record.data.dricaltca.setTime(record.data.dricaltca.getTime() + (2 * 60 * 60 * 1000));
        }
        if (record.data.dcomaltca && record.data.dcomaltca!=='') {
            record.data.dcomaltca.setTime(record.data.dcomaltca.getTime() + (2 * 60 * 60 * 1000));
        }
        //validation
        if (record.data.dricmatval && record.data.dricmatval!=='') {
            record.data.dricmatval.setTime(record.data.dricmatval.getTime() + (2 * 60 * 60 * 1000));
        }
        if (record.data.dcommatval && record.data.dcommatval!=='') {
            record.data.dcommatval.setTime(record.data.dcommatval.getTime() + (2 * 60 * 60 * 1000));
        }
        if (record.data.dricmanval && record.data.dricmanval!=='') {
            record.data.dricmanval.setTime(record.data.dricmanval.getTime() + (2 * 60 * 60 * 1000));
        }
        if (record.data.dcommanval && record.data.dcommanval!=='') {
            record.data.dcommanval.setTime(record.data.dcommanval.getTime() + (2 * 60 * 60 * 1000));
        }
        if (record.data.dricmacval && record.data.dricmacval!=='') {
            record.data.dricmacval.setTime(record.data.dricmacval.getTime() + (2 * 60 * 60 * 1000));
        }
        if (record.data.dcommacval && record.data.dcommacval!=='') {
            record.data.dcommacval.setTime(record.data.dcommacval.getTime() + (2 * 60 * 60 * 1000));
        }
        if (record.data.dricstrval && record.data.dricstrval!=='') {
            record.data.dricstrval.setTime(record.data.dricstrval.getTime() + (2 * 60 * 60 * 1000));
        }
        if (record.data.dcomstrval && record.data.dcomstrval!=='') {
            record.data.dcomstrval.setTime(record.data.dcomstrval.getTime() + (2 * 60 * 60 * 1000));
        }
        if (record.data.dricmetval && record.data.dricmetval!=='') {
            record.data.dricmetval.setTime(record.data.dricmetval.getTime() + (2 * 60 * 60 * 1000));
        }
        if (record.data.dcommetval && record.data.dcommetval!=='') {
            record.data.dcommetval.setTime(record.data.dcommetval.getTime() + (2 * 60 * 60 * 1000));
        }
        if (record.data.dricproval && record.data.dricproval!=='') {
            record.data.dricproval.setTime(record.data.dricproval.getTime() + (2 * 60 * 60 * 1000));
        }
        if (record.data.dcomproval && record.data.dcomproval!=='') {
            record.data.dcomproval.setTime(record.data.dcomproval.getTime() + (2 * 60 * 60 * 1000));
        }
        if (record.data.dricaltval && record.data.dricaltval!=='') {
            record.data.dricaltval.setTime(record.data.dricaltval.getTime() + (2 * 60 * 60 * 1000));
        }
        if (record.data.dcomaltval && record.data.dcomaltval!=='') {
            record.data.dcomaltval.setTime(record.data.dcomaltval.getTime() + (2 * 60 * 60 * 1000));
        }
    },
    onOpenScheda:function(view, rowIndex, colIndex, item, event, record) {
        if (record.data.isnew===1) {return}
        if (typeof parentPortale !="undefined"  && parentPortale !=null){
            if (record.data.idscheda) {
                parentPortale.onHandlerMenu({
                    iconCls:'CLD-16', iconCls32:'CLD-32', iconCls64:'CLD-64',
                    tag:'CLD', appui:'default', target:'frame',
                    text:'',
                    datiApertura:{tabella:'TBCLDSCH01',id:record.data.idscheda,idrecord:record.data.idscheda},
                    tipo:'app6',
                    url:'/bpportal/modules/CLD/libs/Main.php?_fn=open',
                    id:record.data.idscheda,
                    idrecord:record.data.idscheda,
                    tabella:'TBCLDSCH01'
                });
            } else {
                Ext.Msg.show({title:Locale.t('global.attenzione'),msg:'Errore, ID record scheda collaudo non presente',buttons : Ext.Msg.OK,icon : Ext.MessageBox.ERROR});
            }
        }else{
            let err='Errore lettura portale, impossibile eseguire l\'operazione...';
            Ext.Msg.show({title:Locale.t('global.attenzione'),msg:err,buttons : Ext.Msg.OK,icon : Ext.MessageBox.ERROR});
        }
    },
    onOpenCorso:function(view, rowIndex, colIndex, item, event, record) {
        if (record.data.isnew===1) {return}
        if (typeof parentPortale !="undefined"  && parentPortale !=null){
            if (record.data.idcorso) {
                parentPortale.onHandlerMenu({
                    iconCls:'FMC-16', iconCls32:'FMC-32', iconCls64:'FMC-64',
                    tag:'FMC', theme:'default', target:'frame',
                    text:'',
                    datiApertura:{tabella:'TBFMCCOR01',id:record.data.idcorso,idrecord:record.data.idcorso},
                    version: 'v1',
                    url: '/app/v1/default/fmc/',
                    id:record.data.idcorso,
                    idrecord:record.data.idcorso,
                    tabella:'TBFMCCOR01'
                });
            } else {
                Ext.Msg.show({title:Locale.t('global.attenzione'),msg:'Errore, ID record corso formazione non presente',buttons : Ext.Msg.OK,icon : Ext.MessageBox.ERROR});
            }
        }else{
            let err='Errore lettura portale, impossibile eseguire l\'operazione...';
            Ext.Msg.show({title:Locale.t('global.attenzione'),msg:err,buttons : Ext.Msg.OK,icon : Ext.MessageBox.ERROR});
        }
    },
    onOpenMonitoraggio:function(view, rowIndex, colIndex, item, event, record) {
        if (record.data.isnew===1) {return}
        if (typeof parentPortale !="undefined"  && parentPortale !=null){
            if (record.data.idmonitoraggio) {
                parentPortale.onHandlerMenu({
                    iconCls:'VMS-16', iconCls32:'VMS-32', iconCls64:'VMS-64',
                    tag:'VMS', appui:'default', target:'frame',
                    text:'',
                    datiApertura:{tabella:'TBVMSSCH01',id:record.data.idmonitoraggio,idrecord:record.data.idmonitoraggio},
                    version: 'v1',
                    url: '',
                    id:record.data.idmonitoraggio,
                    idrecord:record.data.idmonitoraggio,
                    tabella:'TBVMSSCH01'
                });
            } else {
                Ext.Msg.show({title:Locale.t('global.attenzione'),msg:'Errore, ID record corso formazione non presente',buttons : Ext.Msg.OK,icon : Ext.MessageBox.ERROR});
            }
        }else{
            let err='Errore lettura portale, impossibile eseguire l\'operazione...';
            Ext.Msg.show({title:Locale.t('global.attenzione'),msg:err,buttons : Ext.Msg.OK,icon : Ext.MessageBox.ERROR});
        }
    },
    //inoltro nelle varie fasi
    onInoltra:function(btn) {
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
                    jsonData: {data: record.data,azione:0,note:note}, //come azione imposto 0=tutti gli steps
                    url: Backend.REST_API + "forms/scheda/flusso", //azione flusso
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
                {xtype: "textarea", fieldLabel:  Locale.t("gnc.forms.scheda.btn.note"), scrollable: true, overflow: "auto", padding: "0 0 10 0",
                    anchor: "90%",labelWidth: 80, height: 200, value: "", name: "note"
                }
            ]
        });
        let wndw = Ext.create("Ext.Window", {
            tbar: [btnX, btnConfirm], title:btn.text, height: 350,
            scrollable: true, width: 600, closable: true, bodyStyle: { padding: "10px", "background-color": "#ffffff" },
            modal: true, border: false, resizable: false, draggable: false,
            items: [wdwpanel]
        });
        wndw.show()
    },
    onAnnulla:function(btn) {
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
                    jsonData: {data: record.data,azione:97,note:note},
                    url: Backend.REST_API + "forms/scheda/flusso", //azione flusso
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
                {xtype: "textarea", fieldLabel:  Locale.t("gnc.forms.scheda.btn.note"), scrollable: true, overflow: "auto", padding: "0 0 10 0",
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
    },
    onStampaPdf:function() {
        let me = this, record = this.getViewModel().get('record');
        me.getView().el.mask(Locale.t("global.actions.incorso"));
        Ext.Ajax.request({
            method: "POST",
            params: {id: record.data.id},
            url: Backend.REST_API + "forms/scheda/stampapdf",
            success: function (resp) {
                let rest = Ext.decode(resp.responseText);
                me.view.el.unmask()
                me.onDownloadFile(rest['token'])
            },
            failure: function (response) {
                me.getView().el.unmask();
                let resp = Ext.decode(response.responseText);
                Ext.Msg.show({
                    title: Locale.t("global.errore"),
                    msg: resp["msg"],
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR
                })
            }
        })
    }
});