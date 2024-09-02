/**
 * Created by fabrizio on 26/11/2023.
 */
Ext.define('atp.start.Controller', {
  extend: 'portal.v1.view.main.start.Controller',
  alias: 'controller.start',
  requires: [
    'atp.main.Main'
  ],
  startApplication: function () {
    this.mainPanel = Ext.create('atp.main.Main');

    this.getView().add(this.mainPanel)
    this.getView().setActiveItem(this.mainPanel)
  },
});
