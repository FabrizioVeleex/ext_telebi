/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wpre.view.main.fields.SearchDip', {
    extend: 'Ext.form.field.Text',
    xtype: 'v1-wpre-searchdip',
    hasSearch : false,
    paramName : 'query',
    emptyText:Locale.t('wpre.searchdip'),
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
