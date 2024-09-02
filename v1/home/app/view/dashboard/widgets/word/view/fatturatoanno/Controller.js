/**
 * Created by luke on 27/08/21.
 */
Ext.define('home.view.dashboard.widgets.word.view.fatturatoanno.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.v1-wordfatturatoanno',

    onAfterRender:function() {
        let me = this, vm = me.getViewModel()
        let grid = vm.getStore('storeFatturatoAnno')
        grid.getProxy().extraParams.colonna=this.view.valori.colonna
        grid.getProxy().extraParams.linea=this.view.valori.linea
        grid.getProxy().extraParams.cdcli=this.view.valori.cdcli
        grid.load()
    },
    onClosePannello: function() {
        this.getView().close()
    },
    onExcel:function() {
        let me = this
        Ext.Msg.show({
            title: Locale.t('word.esportaexcel'), iconCls: 'x-fas fa-check-circle', msg: Locale.t('word.confermaesporta'),
            buttons: Ext.Msg.YESNO, icon: Ext.MessageBox.QUESTION, fn: function (b) {
                if (b === 'yes') {
                    Ext.Ajax.request({
                        method: 'PUT',timeout : 900000,
                        params: {colonna:me.view.valori.colonna,linea:me.view.valori.linea,cdcli:me.view.valori.cdcli},
                        url: Backend.REST_VERSION + 'widgets/word/esportafatturatoanno',
                        success: function (response) {
                            me.view.el.unmask()
                            let rest = Ext.decode(response.responseText);
                            me.onDownloadFile(rest['token'])
                        },
                        failure: function (a) {
                            me.view.el.unmask()
                            let rest = Ext.decode(a.responseText);
                            Ext.Msg.show({
                                title: Locale.t('global.errore'),
                                msg: rest['msg'],
                                buttons: Ext.Msg.OK,
                                icon: Ext.MessageBox.ERROR
                            });
                        }
                    })
                }
            }
        })
    },
    onDownloadFile: function (token) {
        let me = this
        me.getView().el.mask(Locale.t("global.actions.incorso"));
        Ext.Ajax.request({
            url: Backend.REST_VERSION + 'downloadfile',method:'PUT',binary:true,timeout:900000,
            params: {
                'token': token
            },
            success: function (response) {
                me.getView().el.unmask()
                let headers = response.getAllResponseHeaders()
                let filename=token //default
                //recupero filename dalla risposta
                let disposition = response.getResponseHeader('Content-Disposition');
                if (disposition && disposition.indexOf('attachment') !== -1) {
                    let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                    let matches = filenameRegex.exec(disposition);
                    if (matches != null && matches[1]) {
                        filename = matches[1].replace(/['"]/g, '');
                    }
                }
                let blob = new Blob([response.responseBytes], {type: headers['content-type']})
                //creo area temporale per il download
                let a = document.createElement('a')
                document.body.appendChild(a)
                let url = window.URL.createObjectURL(blob)
                a.href = url
                a.download = filename
                a.click();
                setTimeout(() => {
                    window.URL.revokeObjectURL(url)
                    document.body.removeChild(a)
                }, 0)
            },
            failure: function (response) {
                me.getView().el.unmask()
                let msg = response.getResponseHeader('messaggio');
                if (msg) {
                    Ext.Msg.show({
                        title: Locale.t('global.errore'),
                        msg: 'Error: '+msg,
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            }
        })
    }
});