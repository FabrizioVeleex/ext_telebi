Ext.define("sdcpub.view.start.Controller", {
  extend: 'portal.v1.public.start.Controller',
  alias: 'controller.start',
  requires: [
    'sdcpub.view.main.Main'
  ],
  startApplication: function () {
    this.mainPanel = Ext.create('sdcpub.view.main.Main');

    this.getView().add(this.mainPanel)
    this.getView().setActiveItem(this.mainPanel)
  }
});
