/**
 * Created by luca on 22/06/16.
 */
Ext.define('portal.view.cronology.Cronology', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.util.Format',
        'Ext.ux.PreviewPlugin',
        'portal.util.Locale',
        'portal.view.cronology.CronologyController',
        'portal.view.cronology.CronologyModel'
    ],
    height: 250,
    width:550,
    autoScroll:true,
    controller:'cronology', //controller finestra log
    viewModel: 'cronology', //viewmodel finestra log
    title:'',
    xtype: 'gridcronology',
    viewConfig:{
        emptyText:Locale.t('cronology.emptytext')
    },
    plugins: [{
        pluginId: 'notePreview',
        ptype: 'preview',
        bodyField: 'note',
        previewExpanded: false
    }],
    columns: [
        {text: Locale.t('cronology.datalog'),dataIndex: 'datelog',width: 140,renderer: Ext.util.Format.dateRenderer('d/m/Y H:i')},
        {text: Locale.t('cronology.azionelog'),dataIndex: 'log',flex:1
            ,renderer: function(value,meta,record) {
                return Ext.String.format('<div class="topic"><b>{0}</b> - <span class="author">{1}</span></div>', value, record.data.cognomenome)
            }
        }
    ]

});