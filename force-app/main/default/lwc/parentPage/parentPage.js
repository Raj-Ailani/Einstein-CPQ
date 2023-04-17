import { LightningElement,api,wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import createChat from '@salesforce/apex/createChatTranscript.createChat'


export default class ParentPage extends LightningElement {
    @api accountId;
    welcomeOrRecord = true;
    // @wire(MessageContext)
    //     messageContext;
    @wire(CurrentPageReference)
    getPageReferenceParameters(currentPageReference) {
        if (currentPageReference) {
            let states = currentPageReference.state;
            this.accountId = states.c__accountId
        }
    }

    handleComponant(event){
        console.log(event.detail);
        if(event.detail == 'Opportunity'){
            this.welcomeOrRecord = false;
        }
    }
}