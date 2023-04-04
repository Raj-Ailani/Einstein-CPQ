import { LightningElement,api,wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import createChat from '@salesforce/apex/createChatTranscript.createChat'

export default class ParentPage extends LightningElement {
    @api accountId;
    @wire(CurrentPageReference)
    getPageReferenceParameters(currentPageReference) {
        if (currentPageReference) {
            let states = currentPageReference.state;
            this.accountId = states.c__accountId
        }
     }
}