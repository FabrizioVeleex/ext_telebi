/**
 * Created by fabrizio on 17/03/23.
 */
Ext.define('itm.overrides.form.field.HtmlEditor', {
  override: 'Ext.form.field.HtmlEditor',
  getDoc: function () {
    // debugger;
    try {
      return this.iframeEl.dom.contentDocument || this.getWin().document;
    } catch (error) {
      console.log('doc non presente', error)
      null;
    }
  },
});