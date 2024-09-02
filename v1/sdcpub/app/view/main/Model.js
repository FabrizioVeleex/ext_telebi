Ext.define("sdcpub.view.main.Model", {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.main',

  requires: [
    'sdcpub.store.Documenti'
  ],
  data: {
    name: 'sdcpub',
    consoleInfo:'',
    apptitle:Locale.t('sdcpub.apptitle'),
    tag:'SDC'
  },
  stores: {
    gridDocumenti: {type: 'documenti'}
  }
});
