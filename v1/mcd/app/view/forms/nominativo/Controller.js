/**
 * Created by luke on 13/03/21.
 */
Ext.define('mcd.view.forms.nominativo.Controller', {
    extend: 'portal.v1.view.forms.mainCard.Controller',
    mixins: ['portal.v1.global.Util'],
    alias: 'controller.v1-nominativo',

    requires: [
        'Ext.layout.container.Fit',
        'mcd.model.forms.nominativo.Model'
    ],

    /**
     * Called when the view is created
     */
    init: function() {
        let vm = this.getViewModel();
        //tasti personalizzati
        vm.set('id', this.getView().valori.id);
        vm.set('record', Ext.create('mcd.model.forms.nominativo.Model', {
            id: this.getView().valori.id,
            isnew: this.getView().valori.isnew
        }))
        this.callParent(arguments)
    },
    managerView: function () {
        this.callParent(arguments)
        let me = this,
            vm = me.getViewModel(),
            record = vm.get('record')

        vm.set('btn.close', true);
        //gestione tasti default
        vm.set('title',record.data['dip_nome'] || 'n.d.')
        vm.set('label',Locale.t('mcd.forms.modulo.title'))
        //carico pdf
        Ext.Ajax.request({
            url: Backend.REST_API + 'forms/nominativo/getpdf/', method: 'POST', binary:true,
            params: {
                'id': record.data['id'],
                'dip_id': record.data['dip_id'],//dipendente da ciclare
                'nomefile': record.data['dip_nome']//nome file da caricare
            },
            success: function (response) {
                let headers = response.getAllResponseHeaders()
                let blob = new Blob([response.responseBytes], {type: headers['content-type']})
                let binarypdf = window.URL.createObjectURL(blob)
                let docpdf=Ext.create(
                    {xtype: 'component',layout:'fit',
                        autoEl: {
                            tag: 'iframe',
                            style: 'border: none',
                            src:binarypdf
                        }}
                )
                me.form.add(docpdf);
            },
            failure: function (response) {
                let errore = Locale.t('mcd.forms.modulo.pdf.errore')+': '+response.statusText
                let errorpdf=Ext.create(
                    {xtype: 'box',html:errore}
                )
                me.form.add(errorpdf);
            }
        })
        this.getView().setActiveItem(this.form);
    }
});