/**
 * Created by fabrizio on 06/08/21.
 */
Ext.define('skd.view.forms.footer.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.console',
    mixins:['portal.v1.global.Util'],
    /**
     * Called when the view is created
     */
    init: function() {
        this.btnGestione = {
            scope:this,
            iconCls:'fas fa-cog',

            tooltip:Locale.t('skd.top.btn.setting.tooltip'),
            handler:'onCreateFormSetting'
        };
    },

    onAfterRender:function () {
        let vm = this.getViewModel();
        if (this.checkRuoli(['99'])){
            vm.set('disabledUser',false);
        }else{
            vm.set('disabledUser',true);
        }
    },
    onCreateFormSetting:function () {
        this.getView().fireEvent('openSetting',this);
    },
    /* ------------------------------------------------------------------------
     * su selezione combo connessioni:
     * Presento conferma attivazione nuova connessione e ricarico lo schedulatote
     * ------------------------------------------------------------------------*/
    onSelectConnection:function (combo,rec) {
        let me=this,
            record=this.getViewModel().get('record');

        Ext.Msg.show({
            title	:Locale.t('skd.forms.footer.connection.title'),
            iconCls:'fas fa-server',
            msg:Locale.t('skd.forms.footer.connection.msg')+'<br><b>'+ rec.data['name']+'</b><hr><span style="font-style:italic; ">'+Locale.t('skd.forms.footer.connection.msginfo')+'</span>',
            buttons: Ext.Msg.YESNO,icon:Ext.MessageBox.QUESTION,fn: function(b){if(b==='yes'){
                me.changeConnection(rec.data);
            }}
        });
    },
    changeConnection:function (record) {
        let me=this;

        Ext.global.Vars.confMod.main.connection =record.id
        Ext.Ajax.request({
            method:'POST',
            params:{
                'data':Ext.encode(Ext.global.Vars.confMod)
            },
            url:Backend.REST_API+'setconfmod',
            success:function(response){
                window.location.reload();
            },
            failure:function(response){
                let consoleInfo ;
                try {
                    let rest = Ext.decode(o._response.responseText);
                    consoleInfo ='<h3><span style="color:red">'+rest['msg']+'</span></h3>';
                }catch (e){
                    consoleInfo ='<h3><span style="color:red">'+Locale.t('global.error connection')+'</span></h3>';
                }
                me.errorConnection(consoleInfo);
            }
        });
    },
    errorConnection: function () {
        Ext.Msg.show({
            title	:Locale.t('skd.forms.footer.connection.title'),
            iconCls:'fas fa-server',
            msg:Locale.t('skd.forms.footer.connection.msgfailure'),
            buttons: Ext.Msg.OK,icon:Ext.MessageBox.ERROR
        });

    }
});
