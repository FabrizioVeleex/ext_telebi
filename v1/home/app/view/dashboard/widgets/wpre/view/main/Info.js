/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wpre.view.main.Info', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.FieldSet',
    ],
    style: {
        'webkit-border-radius': '15px',
        '-moz-border-radius': '15px',
        'border-radius': '15px !important'
    },
    padding:'5px 15px !important',
    items: [
        {
            xtype: 'fieldset',
            cls:'fls-presenze',
            bodyStyle:{
                height:'67px'
            },
            bind: {
                title: 'Acrolcar Ufficio =<b>{totali.totUffAC} dip</b>',
                hidden:'{hideSede}'
            },
            defaults: {
                margin: 0,
                bodyStyle: {
                    'padding': 0
                },
            },
            items: [{
                xtype: 'container',
                bind: {
                    html: '<div style="color:green">'+Locale.t('wpre.info.presenti')+'= {totali.totInAC} </div><div style="color:red">'+Locale.t('wpre.info.assenti')+'={totali.totUffAC-totali.totInAC}</div><div style="color:blue">'+Locale.t('wpre.info.usciti')+'= {totali.totPauseAC}</div>'
                }
            }
            ]
        },
        {
            xtype: 'fieldset',
            cls:'fls-presenze',
            bodyStyle:{
                height:'67px'
            },
            bind: {
                title: Locale.t('wpre.info.magac')+' =<b>{totali.totMagAC} dip</b>',
                hidden:'{hideMagazzino}'
            },
            defaults: {
                margin: 0,
                bodyStyle: {
                    'padding': 0
                },
            },
            items: [{
                xtype: 'container',
                bind: {
                    html: '<div style="color:green">'+Locale.t('wpre.info.presenti')+' ={totali.totInMagAC}</div><div style="color:red">'+Locale.t('wpre.info.assenti')+' ={totali.totMagAC-totali.totInMagAC}</div><div style="color:blue">'+Locale.t('wpre.info.usciti')+'= {totali.totPauseMagAC}</div>'
                }
            }
            ]
        },
        {
            xtype: 'fieldset',
            bodyStyle:{
                height:'67px'
            },
            cls:'fls-presenze',
            bind: {
                title: 'Cicagna =<b>{totali.totUffCIC} dip</b>',
                hidden:'{hideCicagna}'
            },
            defaults: {
                margin: 0,
                bodyStyle: {
                    height:60,
                    'padding': 0
                },
            },
            items: [{
                xtype: 'container',
                bind: {
                    html: '<div style="color:green">'+Locale.t('wpre.info.presenti')+' = {totali.totInCIC} ('+
                        Locale.t('wpre.info.diretti')+'={totali.totInDirCIC})</div>' +
                        '<div style="color:red">' +Locale.t('wpre.info.assenti')+' ={totali.totUffCIC-totali.totInCIC} (' +
                        Locale.t('wpre.info.diretti')+' = {totali.totDirCIC-totali.totInDirCIC})</div>' +
                        '<div style="color:blue">'+Locale.t('wpre.info.usciti')+'= {totali.totPauseCIC}</div>'
                }
            }
            ]
        },
        {
            xtype: 'fieldset',
            bodyStyle:{
                height:'67px'
            },
            cls:'fls-presenze',
            bind: {
                title: 'Tunisia =<b>{totali.totUffTUN} dip</b>',
                hidden:'{hideTunisia}'
            },
            defaults: {
                margin: 0,
                bodyStyle: {
                    height:60,
                    'padding': 0
                },
            },
            items: [{
                xtype: 'container',
                bind: {
                    html: '<div style="color:green">'+Locale.t('wpre.info.presenti')+' = {totali.totInTUN} ('+
                        Locale.t('wpre.info.diretti')+'={totali.totInDirTUN})</div>' +
                        '<div style="color:red">' +Locale.t('wpre.info.assenti')+' ={totali.totUffTUN-totali.totInTUN} (' +
                        Locale.t('wpre.info.diretti')+' = {totali.totDirTUN-totali.totInDirTUN})</div>' +
                        '<div style="color:blue">'+Locale.t('wpre.info.usciti')+'= {totali.totPauseTUN}</div>'
                }
            }
            ]
        }
    ]
});
