/**
 * Created by luca on 22/06/16.
 */
Ext.define('portal.view.cronology.CardCronologyModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.card-cronology',
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
