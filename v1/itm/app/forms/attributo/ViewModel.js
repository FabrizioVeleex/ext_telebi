/**
 * Created by luca on 16/07/2018.
 */
Ext.define('itm.forms.attributo.ViewModel', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-attributo',
    requires: [
        'itm.forms.attributo.storeArticoli'
    ],
    stores: {
        storeArticoli: { type: 'v1-itm-forms-attributo-storearticoli' }
    }
})