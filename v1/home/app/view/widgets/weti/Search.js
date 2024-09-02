/**
 * Created by fabrizio on 18/08/16.
 */
Ext.define('home.view.widgets.weti.Search', {
    extend: 'Ext.form.field.Text',
    xtype: 'weti-search',
    hasSearch : false,
    paramName : 'query',
    emptyText:Locale.t('home.notifiche.ricerca'),
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