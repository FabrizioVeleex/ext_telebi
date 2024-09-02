Ext.define('ana.view.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'ana.view.main.Main'
    ],
    startApplication: function () {
        this.mainPanel = Ext.create('ana.view.main.Main');

        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    },
});
