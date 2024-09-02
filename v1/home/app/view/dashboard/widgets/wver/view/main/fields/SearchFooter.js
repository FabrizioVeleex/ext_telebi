/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.wver.view.main.fields.SearchFooter', {
    extend: 'Ext.form.field.Text',
    xtype: 'v1-wver-searchfooter',
    hasSearch : false,
    paramName : 'query',
    hideLabel:true,
    flex:1,
    //emptyText:Locale.t('wort.grid.toolbar.soggetto.empty')+'...',
    config:{
        grid:null
    },
    triggers: {
        clear: {
            cls: 'x-form-clear-trigger',
            hidden:true,
            handler: 'onClearTriggetSearch'
        },
        search: {
            cls: 'x-form-search-trigger',
            handler: 'onSearchTriggetSearch'
        }
    },
    listeners:{
        specialkey:'onSpecialkeySearch'
    }
});
