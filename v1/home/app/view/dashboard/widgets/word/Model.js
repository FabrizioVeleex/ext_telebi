/**
 * Created by luke on 08/09/21.
 */
Ext.define('home.view.dashboard.widgets.word.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.v1-word',

    requires: [
        'home.view.dashboard.widgets.word.store.SearchCli'
    ],
    stores: {
        searchCliStore:{type:'v1-wordsearchcli'}
    },
    data: {
        cdcli:'',
        linea:0,
        tipo:'C',
        title:''
    }
});