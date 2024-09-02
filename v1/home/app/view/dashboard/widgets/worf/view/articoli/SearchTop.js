/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.worf.view.articoli.SearchTop', {
    extend: 'Ext.form.field.Text',
    xtype: 'v1-worf-searchtop',
    hasSearch : false,
    paramName : 'query',
    hideLabel:true,
    width:700,
    config:{
        grid:null
    },
    triggers: {
        clear: {
            cls: 'x-form-clear-trigger',
            hidden:true,
            handler: 'onClearTriggetSearchArticoli'
        },
        search: {
            cls: 'x-form-search-trigger',
            handler: 'onSearchTriggetSearchArticoli'
        }
    },
    listeners:{
        specialkey:'onSpecialkeySearchArticoli'
    }
});
