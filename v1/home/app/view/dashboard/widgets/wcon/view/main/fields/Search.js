/**
 * Created by luke on 26/08/21.
 */
Ext.define('home.view.dashboard.widgets.wcon.view.main.fields.Search', {
    extend: 'Ext.form.field.Text',
    xtype: 'v1-wconsearch',
    hasSearch : false,
    paramName : 'query',
    emptyText:Locale.t('wcon.search'),
    width:200,
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