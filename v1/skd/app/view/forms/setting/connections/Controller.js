/**
 * Created by fabrizio on 05/08/21.
 */
Ext.define('skd.view.forms.setting.connections.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    alias: 'controller.connections',
    requires: [
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Text',
        'Ext.layout.container.HBox',
        'Ext.toolbar.Fill',
        'skd.model.forms.connections.Connections'
    ],
    mixins:['portal.v1.global.Util'],
    /**
     * Called when the view is created
     */
    init: function() {
        let vm = this.getViewModel();
        vm.set('isnew', false);
        vm.set('id', '');
        vm.set('record', Ext.create('skd.model.forms.connections.Connections'))

        this.callParent(arguments);
        this.isLoaded = false;

    },
    onActivate: function () {
        if (this.isLoaded===false){
            this.getView().fireEvent('firstRender',this.getView());
            this.isLoaded=true;
        }
    },

    managerView: function(){
        let me = this,
            vm = me.getViewModel(),
            record = vm.get('record'),
            readOnly = true;


        if (this.checkRuoli(['99','31']) ) {
            readOnly = false;
        }
        vm.set('list',record.data.list);
        vm.set('readOnly',readOnly);

        this.cardConnections = Ext.create('Ext.Container',{
            scrollable:'y'
        });
        let list = record.data.list;
        let listObj = [];
        //recupero settaggio connessione utente
        listObj[0] =
            {
                xtype: 'combo',
                minChars:2,
                minWidth:100,
                width:250,
                queryMode: 'remote',
                displayField: 'name',
                valueField: 'id',
                fieldLabel: Locale.t('skd.forms.footer.connection.label'),
                forceSelection:true,
                autoLoadOnValue:true,
                bind: {
                    store: '{storeComboConnections}',
                    value: '{connection}'
                },
                listeners: {
                    select :'onSelectConnection',
                    beforequery: function (qe) {
                        delete qe.combo.lastQuery;
                    }
                }
            };

        for (let i=0;i<list.length;i++){
            let codeModel = 'code_'+i;
            vm.set(codeModel,list[i]);
            listObj[i+1]= Ext.create('Ext.form.FieldSet',{
                bind:{
                    title:'{list.'+i+'.name}'
                },
                userCls:'sql-fieldSet',
                collapsible:true,
                collapsed:true,
                items:[
                    {
                        xtype: 'container',
                        flex: 1,
                        layout: {
                            type: "hbox"
                        },
                        defaults: {
                            msgTarget: 'under',
                            labelAlign: 'top',
                            margin: 5
                        },
                        items: [
                            {
                                xtype:'textfield',
                                flex:1,
                                fieldLabel: Locale.t('skd.forms.cards.connections.fields.sid'),
                                bind: {
                                    readOnly: '{readOnly}',
                                    value: '{list.'+i+'.sid}'
                                }
                            },
                            {
                                xtype:'textfield',
                                fieldLabel: Locale.t('skd.forms.cards.connections.fields.host'),
                                width:150,
                                bind: {
                                    readOnly: '{readOnly}',
                                    value: '{list.'+i+'.host}'
                                }
                            },
                            {
                                xtype:'textfield',
                                width:150,
                                fieldLabel: Locale.t('skd.forms.cards.connections.fields.user'),
                                bind: {
                                    readOnly: '{readOnly}',
                                    value: '{list.'+i+'.user}'
                                }
                            },
                            {
                                xtype:'textfield',
                                width:150,
                                inputType: 'password',
                                fieldLabel: Locale.t('skd.forms.cards.connections.fields.password'),
                                bind: {
                                    readOnly: '{readOnly}',
                                    value: '{list.'+i+'.password}'
                                }
                            }
                            ]
                    },
                    {
                        xtype:'toolbar',
                        items:[
                            '->',
                            {
                                text:Locale.t('skd.forms.cards.sql.btn.save.text'),
                                code:i,
                                ui:'green',
                                iconCls:'fas fa-pencil-alt',
                                handler:'onSaveCode'
                            }
                        ]
                    }
                ]
            });
        }
        this.cardConnections.add(listObj);
        this.form.add(this.cardConnections);

    },
    /* ----------------------------------------------------------------
    * salvataggio singolo record sql
    * ----------------------------------------------------------------*/
    onSaveCode: function (btn) {
        this.onBeforeSave();
        let me=this,
            vm = this.getViewModel(),
            record = this.getViewModel().get('record'),
            code = vm.get('list')[btn.code];

        record.data.code = code;
        record.save({
            success: function (dati,esito) {
                    me.tipsHome.msg(code.name, Locale.t('global.form.salvataggiook'));
                    me.onAfterSave();
            },
            failure: function (a, o) {
                let consoleInfo ;
                try {
                    let rest = Ext.decode(o._response.responseText);
                    consoleInfo ='<h3><span style="color:red">'+rest['msg']+'</span></h3>';
                }catch (e){
                    consoleInfo ='<h3><span style="color:red">'+Locale.t('global.error.generic')+'</span></h3>';
                }
                me.onAfterSaveFailure(consoleInfo);
            }
        });
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
