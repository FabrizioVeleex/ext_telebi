/**
 * Created by fabrizio on 20/12/23.
 */
Ext.define('spl.global.filtri.descr_trasp.Fieldset', {
  extend: 'Ext.form.FieldSet',
  layout: {
    type: 'hbox'
  },
  title: "[NO-NAME]",
  userCls: "y-filtri-panel-default",
  defaults: {
    width: 180,
  },
  listeners: {
    beforeRender: "filtri_beforeRender_descr_trasp"
  }
});