/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.wort.view.main.fields.SearchSogg', {
    extend: 'Ext.form.field.Text',
    xtype: 'v1-wort-searchsogg',
    hasSearch : false,
    paramName : 'query',
   // fieldLabel: Locale.t('wort.grid.toolbar.soggetto.label'),
    hideLabel:true,
    //width: Ext.global.Vars.infoUser.theme === 'big' ? 200 : 200,
    //labelWidth: Ext.global.Vars.infoUser.theme === 'big' ? 55 : 50,
    //labelAlign: 'right',
    flex:1,
    emptyText:Locale.t('wort.grid.toolbar.soggetto.empty')+'...',
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
