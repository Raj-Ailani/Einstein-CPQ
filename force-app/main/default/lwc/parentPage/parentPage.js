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
        console.log('inside parent');
        console.log(event.detail);
        console.log('after log in parent');
        if(event.detail == 'Opportunity'){
            this.welcomeOrRecord = false;
        }
    }

    // subscribeToMessageChannel() {
    //     this.subscription = subscribe(
    //       this.messageContext,
    //       OppQuote_CHANNEL,
    //       (message) => this.handleMessage(message)
    //     );
    // }

    // connectedCallback() {
    //     this.subscribeToMessageChannel();
    // }
    
    // handleMessage(message) {
    //     console.log(message);
    //     if(message.OpptyOrQoute = "Opportunity"){
    //         this.welcomeOrRecord = false;
    //     }
    // }
}