Ext.define('gpr.view.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'gpr.view.main.Main'
    ],
    startApplication: function () {
        this.mainPanel = Ext.create('gpr.view.main.Main');

        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    }
});
