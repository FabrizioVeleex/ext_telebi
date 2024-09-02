Ext.define('gnc.view.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'gnc.view.main.Main'
    ],
    startApplication: function () {
        this.mainPanel = Ext.create('gnc.view.main.Main');

        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    }
});
