/**
 * Created by fabrizio on 26/11/2023.
 */
Ext.define('atp.forms.progetti.ViewModel', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-atp-form-progetti',
    requires: [
        "atp.global.mail.tagEmail.Store",
        "atp.global.gridMail.Store",
        "atp.forms.progetti.components.gridAssociazioneRuoli.Store",
        "atp.forms.progetti.components.gridSottoAttivita.Store",
        "atp.forms.progetti.components.gridTodo.Store"
    ],
    stores: {
        storeEmailNew: { type: 'v1-atp-global-mail-tagemaildefault' },
        storeMail: { type: 'v1-atp-global-gridmail' },
        storeConnectedUsers: { type: 'v1-atp-forms-progetti-components-storeAssociazioneRuoli' },
        storeTodo: { type: 'v1-atp-forms-progetti-components-storeTodo' },
        storeSubActivity: { type: 'v1-atp-forms-progetti-components-storeSottoAttivita' },
    },
    data: {
        cardactive: "dashboard",
        email: {
            corpo: "",
            mailto: [],
            mailfrom: "",
            listAttach: [],
        }
    }
});