Ext.define('fmc.view.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'fmc.view.main.Main'
    ],
    startApplication: function () {
        this.mainPanel = Ext.create('fmc.view.main.Main');

        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    }
});
