/**
 * Created by fabrizio on 20/10/17.
 */
Ext.define('portal.view.cronology.CardCronology', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.util.Format',
        'Ext.ux.PreviewPlugin',
        'portal.util.Locale',
        'portal.view.cronology.CardCronologyController',
        'portal.view.cronology.CardCronologyModel'
    ],
    autoScroll:true,
    controller:'card-cronology', //controller finestra log
    viewModel: 'card-cronology', //viewmodel finestra log
    title:'',
    viewConfig:{
        emptyText:Locale.t('cronology.emptytext')
    },
    bind:{
      store:'{gridCronology}'
    },
    plugins: [{
        pluginId: 'notePreview',
        ptype: 'preview',
        bodyField: 'note',
        previewExpanded: false
    }],
    dockedItems: [{
        xtype: 'toolbar', dock: 'top', items: [
            {
                text: Locale.t('global.btn.chiudicronologia.text'),
                iconCls: 'x-fa fa-arrow-left bd-color-blue',
                ui:'ocra',
                handler: 'onCloseCardCronology'
            },
            {
                iconCls: 'x-fa fa-list',
                text: Locale.t('cronology.dettagliotext'),
                enableToggle: true,
                tooltip:Locale.t('cronology.dettagliotooltip'),
                pressed: false,
                toggleHandler:'onPress'
            }
        ]
    }],
    columns: [
        {text: Locale.t('cronology.datalog'),dataIndex: 'datelog',width: 160,renderer: Ext.util.Format.dateRenderer('d/m/Y H:i')},
        {text: Locale.t('cronology.autore'),dataIndex: 'cognomenome',minWidth: 140, flex:1},
        {text: Locale.t('cronology.azionelog'),dataIndex: 'log',minWidth: 140,flex:1
        //     ,renderer: function(value,meta,record) {
        //     return Ext.String.format('<div class="topic"><b>{0}</b> - <span class="author">{1}</span></div>', value, record.data.cognomenome)
        // }
        }
    ],
    listeners:{
        afterRender:'onAfterRender'
    }
});