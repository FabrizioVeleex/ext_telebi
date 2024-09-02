
Ext.define('pak.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'pak.main.Main'
    ],
    startApplication: function () {
        this.mainPanel = Ext.create('pak.main.Main');

        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    },
});
