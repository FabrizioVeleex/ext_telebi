/**
 * Created by fabrizio on 09/10/17.
 */
Ext.define('portal.view.mail.PanelEmail', {
    requires:[
        'portal.view.mail.ViewEmail'
    ],
    flex: 1,
    layout: {
        type: "hbox"
    },
    defaults: {
        msgTarget: 'under',
            labelAlign: 'top',
            margin:5
    },
    items: [
        {
            xtype:'container',
            width:100,
            html:'To:'
        },
        {
            xtype:'panel',
            flex:1,
            items:[
                Ext.create('portal.view.mail.ViewEmail',{
                    insertNewEmail :true,
                    storeCombo:Ext.create('Ext.data.Store', {
                        fields: ['name', 'email'],
                        data : [
                            { name:'Fabrizio Ponzio', email:'fponzio@gmail.com'},
                            { name:'Silvia Avaro', email:'sponzio@gmail.com' },
                            { name:'Camilla', email:'camilla.ponzio@gmail.com' }
                        ]
                    }),
                    // store:Ext.create('portal.store.email.Email', {
                    //     data : [
                    //         { name:'', email:'',isnew:1,action:1 },
                    //         { name:'Fabrizio Ponzio', email:'fponzio@gmail.com'},
                    //         { name:'Silvia Avaro', email:'sponzio@gmail.com' },
                    //         { name:'Camilla', email:'camilla.ponzio@gmail.com' }
                    //     ]
                    // }),
                    bind:{
                        store:'{storeEmail}',
                        readOnly:'{readOnlyTest}'
                    }
                })
            ]
        }
    ]
});