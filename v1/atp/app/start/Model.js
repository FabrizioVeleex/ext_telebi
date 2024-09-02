/**
 * Created by fabrizio on 26/11/2023.
 */
Ext.define('atp.start.Model', {
  extend: 'portal.v1.view.main.start.Model',
  alias: 'viewmodel.start',
  data: {
    tag: 'ATP',
    title: Locale.t('atp.apptitle')
  }
});
