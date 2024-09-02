Ext.define('cde.view.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'cde.view.main.Main'
    ],
    startApplication: function () {
        this.mainPanel = Ext.create('cde.view.main.Main');

        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    },
});
