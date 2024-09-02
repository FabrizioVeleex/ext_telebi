/**
 * Created by fabrizio on 05/08/21.
 */
Ext.define('skd.view.forms.setting.dashboard.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    alias: 'controller.dashboard',
    requires:[
        'Ext.util.TaskManager',
        'skd.model.forms.dashboard.Dashboard',
        'skd.view.forms.setting.dashboard.cards.Dashboard'
    ],
    mixins:['portal.v1.global.Util'],
    init: function() {
        let vm = this.getViewModel();
        vm.set('isnew', false);
        vm.set('id', '');
        vm.set('record', Ext.create('skd.model.forms.dashboard.Dashboard'))
        this.callParent(arguments);
        this.job_log ='';
        this.isLoaded=false;

        this.polling = {
            scope: this,
            run: function(){
                this.pollingSetting(this);
            },
            interval: 5000 //5 second
        };
    },

    onActivate: function () {
        let me = this;
        if (this.isLoaded===false) {
            me.getView().fireEvent('firstRender', me.getView());
            me.isLoaded = true;
        }
    },

    managerView: function() {
        let me = this,
            vm = me.getViewModel(),
            record = vm.get('record'),
            readOnly = true;

        Ext.TaskManager.start(this.polling);
        this.cardDasboard = Ext.create('skd.view.forms.setting.dashboard.cards.Dashboard');
        this.form.add(this.cardDasboard);
    },

    /* ----------------------------------------------------------------
     * - onBntSyncAll: msg per avvio allineamento
     * - onSyncAll: allineamento moanuale
     * 1) msg di conferma
     * 2) avvio allinemaneto
     * ----------------------------------------------------------------*/
    onBntSyncAll:function () {
        let me = this;

        Ext.Msg.show({
            title	:Locale.t('skd.forms.cards.dashboard.syncall.btn.msg.title'),
            iconCls:'fas fa-sync',
            msg:Locale.t('skd.forms.cards.dashboard.syncall.btn.msg.msg'),
            buttons: Ext.Msg.YESNO,icon:Ext.MessageBox.QUESTION,fn: function(b){
                if(b==='yes'){
                    me.onSyncAll();
                }
            }
        });
    },

    onSyncAll:function () {
        let me = this;

        Ext.Ajax.request({
            method: 'POST',
            jsonData:{
                step:0
            },
            url: Backend.REST_API + 'forms/dashboard/',
            success:function(response){
                let rest = Ext.decode(response.responseText);
                me.job_log = rest['job_log'];
                me.startSyncAll(rest['job_log']);

            },
            failure:function(record, esito){
                let rest = esito.error.response.responseJson;
                Ext.Msg.show({
                    title: Locale.t('global.errore'),
                    msg: resp['msg'],
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        });
    },

    startSyncAll: function (job_log) {
        let me = this,
            vm = this.getViewModel();

        vm.set('syncDbAll',1); //blocco il tasto
        vm.set('textSyncDbAll','Preparazione operazione');
        Ext.Ajax.setTimeout(60000);
        Ext.Ajax.request({
            method: 'POST',
            jsonData:{
                step:1,
                job_log:job_log
            },
            url: Backend.REST_API + 'forms/dashboard/',
        });
    },
    /* ----------------------------------------------------------------
     * polling servizi
     * - pollingSetting: avvio su render
     * - processPolling: funzione richiamata
     * - onStopPolling: blocco il ponnig su uscita card setting
     * ----------------------------------------------------------------*/
    pollingSetting: function () {
        let me = this;
        Ext.Ajax.request({
            method: 'GET',
            params:{
                _fn:'pollingDb',
                job_log:this.job_log
            },
            url: Backend.REST_API + 'forms/dashboard/polling/',
            success:function(response){
                me.processPolling(response,true);
            },
            failure:function(response){
                me.processPolling(response,false);
            }
        });
    },
    processPolling : function (response,success) {
        let me = this,
            vm = this.getViewModel();
            let resp = Ext.decode(response.responseText);
                vm.set('syncDb',resp['sync']);
                vm.set('syncDbAll',resp['syncAll']);
                if (resp['syncAllData']!==''){
                    vm.set('textSyncDbAll',resp['syncAllData']);
                }

    },
    onStopPolling: function () {
        if (this.isLoaded===true){
            Ext.TaskManager.stop(this.polling);
        }
    }
});
