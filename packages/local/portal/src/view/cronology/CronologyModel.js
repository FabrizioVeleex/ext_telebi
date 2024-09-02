/**
 * Created by luca on 22/06/16.
 */
Ext.define('portal.view.cronology.CronologyModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.cronology',
    requires: [
        'portal.store.cronology.Cronology'
    ],
    stores: {
        gridCronology:{type:'cronologystore'}
    },
    data: {
        record:{}
    }
});
