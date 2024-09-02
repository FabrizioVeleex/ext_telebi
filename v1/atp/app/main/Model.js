/**
 * Created by fabrizio on 26/11/2023.
 */
Ext.define('atp.main.Model', {
  extend: 'portal.v1.view.main.ViewModel',
  alias: 'viewmodel.v1-atp-main',
  data: {
    name: 'atp',
    tr: LOCALE.default,
    apptitle: Locale.t('atp.apptitle'),
    tag: 'ATP'
  }
});
