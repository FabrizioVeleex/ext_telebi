Ext.define('home.view.imp.cards.InfoUser', {
    extend: 'Ext.form.Panel',

    width:500,
    requires:[
        'Ext.container.Container',
        'Ext.form.field.Display',
        'Ext.layout.container.Column',
        'Ext.layout.container.HBox'
    ],
    layout:'column',
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        layout:{
            pack: 'center'
        },
        style:{'background-color':'transparent'},
        items: [
            {
                scale:'large', text: Locale.t('home.impostazioni.btn.password.text'),
                cls:'bd-btn-radius',
                iconCls: 'x-fas fa-key fa-size-32',
                ui:'ocra',
                handler:'goToChangePassword'
            },
            {
                scale:'large',
                text: Locale.t('home.impostazioni.sfondo'),
                cls:'bd-btn-radius',
                iconCls: 'x-fas fa-image',
                ui:'ocra',
                handler:'goToImages'
            }
        ]
    }],
    items: [{
        title: Locale.t('home.infoprofilo.utente'),
        dockedItems: [{
            flex: 1,
            layout: {
                type: "hbox",
                align: 'center'
            },
            xtype:'component',
            autoEl:{
                tag:'div',
                html:'<div style="background-position: center;" class="defaultLogo"></div><hr>'
            }
        }],
        width: 500,

        items:[
            {
                xtype:'container',
                bodyPadding: 15,
                items:[
                    {xtype: 'displayfield',fieldLabel:Locale.t('home.infoprofilo.nominativo'),
                        bind:{
                            value:'{nominativo}'
                        }
                    },
                    {xtype: 'displayfield',fieldLabel:Locale.t('home.infoprofilo.user'),
                        bind:{
                            value:'{userlogin}'
                        }
                    },
                    {xtype: 'displayfield',fieldLabel:Locale.t('home.infoprofilo.ubicazione'),
                        bind:{
                            value:'{ubicazione}'
                        }
                    }
                ]
            }
        ]

    },{
        title: Locale.t('home.infoprofilo.uo'),
        columnWidth: .60,
        items:[
            {xtype: 'displayfield',hideLabel:true,value:''}

        ]
    },{
        title: Locale.t('home.infoprofilo.ruolifunz'),
        columnWidth: .35,
        items:[
            {xtype: 'displayfield',hideLabel:true,value:''}
        ]
    }]
});