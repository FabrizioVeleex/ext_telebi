Ext.define('sgv.view.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'sgv.view.main.Main'
    ],
    startApplication: function () {
        this.mainPanel = Ext.create('sgv.view.main.Main');

        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    },
});
