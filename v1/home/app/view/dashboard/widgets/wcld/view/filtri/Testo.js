/**
 * Created by luke on 26/08/21.
 */
Ext.define('home.view.dashboard.widgets.wcld.view.filtri.Testo', {
    extend: 'Ext.form.field.Text',
    hasSearch : false,
    emptyText:Locale.t('wcld.filtri.testo'),
    flex:1,
    triggers: {
        clear: {
            cls: 'x-form-clear-trigger',
            hidden:true,
            handler: 'onClearTriggerTesto'
        }
    },
    listeners:{
        specialkey:'onSpecialKeyTesto'
    }
});