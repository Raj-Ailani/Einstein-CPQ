import { LightningElement,api,wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import createChat from '@salesforce/apex/createChatTranscript.createChat'

export default class ParentPage extends LightningElement {
    @api accountId;

    connectedCallback() {
        createChat({accountId:this.accountId}).then(result => {
            if(result){
                console.log(result);
            }
        })
    }
    @wire(CurrentPageReference)
    getPageReferenceParameters(currentPageReference) {
        if (currentPageReference) {
            let states = currentPageReference.state;
            this.accountId = states.c__accountId
        }
     }
}