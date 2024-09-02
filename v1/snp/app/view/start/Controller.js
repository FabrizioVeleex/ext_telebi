Ext.define('snp.view.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'snp.view.main.Main'
    ],
    startApplication: function () {
        this.mainPanel = Ext.create('snp.view.main.Main');

        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    }
});
