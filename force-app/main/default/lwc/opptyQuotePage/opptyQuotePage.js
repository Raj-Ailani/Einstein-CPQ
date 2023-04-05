import { LightningElement,wire } from 'lwc';
import getOppty from '@salesforce/apex/opptyQuoteController.getOpptydata'

export default class OpptyQuotePage extends LightningElement {
    @wire(getOppty) wiredOppty;

    fields = ['Name', 'CloseDate', 'Description', 'StageName'];
    objectApiName = 'Opportunity';
    // recordId = this.wiredOppty[0].data.Id;

}