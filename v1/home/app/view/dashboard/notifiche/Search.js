/**
 * Created by fabrizio on 21/07/21.
 */
Ext.define('home.view.dashboard.notifiche.Search', {
    extend: 'Ext.form.field.Text',
    xtype: 'v1-notifiche-search',
    hasSearch : false,
    paramName : 'query',
    emptyText:Locale.t('home.notifiche.ricerca'),
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
