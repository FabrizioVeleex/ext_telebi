/**
 * Created by fabrizio on 20/12/23.
 */
Ext.define('portal.v1.view.filtri.text.Fieldset', {
  extend: 'Ext.form.FieldSet',
  requires: [
    "portal.v1.view.filtri.text.Grid"
  ],
  layout: {
    type: 'hbox'
  },
  title: "[NO-NAME]",
  userCls: "y-filtri-panel-default",
  defaults: {
    width: 180,
  },
  listeners: {
    beforeRender: "filtri_beforeRender"
  }
});