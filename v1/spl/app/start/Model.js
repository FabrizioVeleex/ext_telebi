/**
 * Created by fabrizio on 08/10/2022.
 */
Ext.define('spl.start.Model', {
    extend: 'portal.v1.view.main.start.Model',
    alias: 'viewmodel.start',
    data: {
        tag: 'SPL',
        title: Locale.t('spl.apptitle')
    }
});
