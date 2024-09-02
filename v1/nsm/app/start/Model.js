/**
 * Created by fabrizio on 11/02/21.
 */
Ext.define('nsm.view.start.Model', {
    extend: 'portal.v1.view.main.start.Model',
    alias: 'viewmodel.start',
    data: {
        tag:'NSM',
        title:Locale.t('nsm.apptitle')
    }
});
