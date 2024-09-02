/**
 * Created by fabrizio on 10/01/22.
 */
Ext.define("orf.global.errorwindow.griderrors", {
  extend: "Ext.grid.Panel",
  alias: "widget.orf-v1-global-errorwindow-griderrors",
  // viewConfig: {
  //   getRowClass: function (record) {
  //     let cls = ''
  //     return (record.get('spool') === 0) ? cls + " bd-deleterow bd-defaultrow" : cls + " bd-defaultrow";
  //   }
  // },
  columns: [
    {
      text: Locale.t('orf.forms.documento.sendmail.columns.totmail'),
      dataIndex: "errorDest",
      minWidth: 100,
      renderer: function (value) {
        return value[0]
      }
    },
    {
      text: Locale.t('orf.forms.documento.sendmail.columns.rag_soc'),
      dataIndex: "errorDest",
      flex: 1,
      minWidth: 100,
      renderer: function (value) {
        if (value[1] === "X")
          return "_Errore nell'invio documento";
        else
          return value[1]
      }
    },
  ],
  listeners: {
    // afterrender: function (grid) {
    // let grid = me.getView().down('griddocumentiinvia')
    // grid.el.mask('Caricamento in corso...')
    // }
  }
});
