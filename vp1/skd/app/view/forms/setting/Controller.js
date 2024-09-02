/**
 * Created by fabrizio on 05/08/21.
 * TODO
 * gestire chiusura e rimozione polling
 * inserire tasti sto servizio
 */
Ext.define('skd.view.forms.setting.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cards',
    requires:[
        'skd.view.forms.setting.sql.Panel',
        'skd.view.forms.setting.connections.Panel',
        'skd.view.forms.setting.dashboard.Panel',

        'Ext.Container',
        'Ext.toolbar.Toolbar',
        'Ext.layout.container.Card',
        'Ext.button.Button'
    ],
    mixins:['portal.v1.global.Util'],
    /**
     * Called when the view is created
     */
    init: function() {
        this.btnCardBack = {
            xtype:'button',
            text: Locale.t('skd.forms.cards.btn_close'),
            style: {backgroundColor: 'LightBlue'},
            iconCls:'fas fa-arrow-left',
            handler:'onCloseCard'
        };
        this.btnCardDashbord = {
            xtype:'button',
            text: Locale.t('skd.forms.cards.dashboard.title'),
            style: {backgroundColor: 'LightBlue'},
            posizione:'dashboard',
            iconCls:'fas fa-tachometer-alt',
            handler:'onClickCard'
        };

        this.btnCardConnections = {
            xtype:'button',
            text: Locale.t('skd.forms.cards.connections.title'),
            style: {backgroundColor: 'LightBlue'},
            posizione:'connections',
            iconCls:'fas fa-server',
            handler:'onClickCard'
        };
        this.btnCardSql = {
            xtype:'button',
            text: Locale.t('skd.forms.cards.sql.title'),
            style: {backgroundColor: 'LightBlue'},
            posizione:'sql',
            iconCls:'fas fa-code',
            handler:'onClickCard'
        };

        this.toolBarCard =  Ext.create('Ext.toolbar.Toolbar',{
            dock: 'top',
            bind:{
                hidden:'{hiddenToolbar}'
            }
        });

        this.toolBar =  Ext.create('Ext.toolbar.Toolbar',{
            dock: 'top'
        });

        this.getView().addDocked(this.toolBar,1);
        this.getView().addDocked(this.toolBarCard,2);

        this.dashboard = Ext.create('skd.view.forms.setting.dashboard.Panel',{
            posizione : 'dashboard'
        });

        this.connections = Ext.create('skd.view.forms.setting.connections.Panel',{
            posizione : 'connections'
        });
        this.sql = Ext.create('skd.view.forms.setting.sql.Panel',{
            posizione : 'sql'
        });

        this.form = Ext.create('Ext.Container',{
            defaults:{
                bodyPadding: 15,
                listeners:{
                    activate:'onActivateCard'
                }
            },
            layout :{
                type:'card'
            },
            items:[
                this.dashboard,
                this.connections,
                this.sql
            ]
        });

    },

    onAferRender:function () {
        let vm = this.getViewModel();
        this.connections.getViewModel().set('connection',vm.get('connection'));

        this.listCard = [this.btnCardBack,this.btnCardDashbord,this.btnCardConnections,this.btnCardSql];
        this.toolBarCard.add(this.listCard);
        this.getView().add(this.form);

    },

    /* ---------------------------------------------------------------------------------------------------------
     * gestione azioni cards
     * - onClickCard: campo card
     * - onActivateCard: azioni su attivazione card
     * - onCloseCard: handler tasto chiusura pannello
     * ---------------------------------------------------------------------------------------------------------*/
    onClickCard: function(btn) {
        let cardselect=this[btn.posizione];
        this.getViewModel().set('posizioneCard',btn.posizione);
        this.form.setActiveItem(cardselect); //attivo card desiderata
    },
    onActivateCard:function (card) {
        let toolBarCard = this.toolBarCard;
        toolBarCard.items.each(function(item) {
            if (item.posizione===card.posizione){
                item.setStyle({backgroundColor:'LightBlue'});
            }else{
                item.setStyle({backgroundColor:''});
            }

        },this);
    },
    onCloseCard:function () {
        this.getView().fireEvent('onCloseSetting',this);
        this.dashboard.fireEvent('stopPolling');
    }
});
