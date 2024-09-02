Ext.define('t40.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        't40.main.Main'
    ],
    startApplication: function () {
        this.mainPanel = Ext.create('t40.main.Main');

        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    },
});
