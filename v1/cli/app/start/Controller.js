Ext.define('cli.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'cli.main.Main'
    ],
    startApplication: function () {
        this.mainPanel = Ext.create('cli.main.Main');

        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    },
});
