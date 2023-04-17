import { LightningElement, api, wire } from 'lwc';
import getQuoteLinesData from '@salesforce/apex/getQuoteLineDetails.getQuoteLinesData'

export default class CartPage extends LightningElement {
    quoteLineRecord;
    quoteLineRecordId;
    quoteLineFields = ['Name', 'SBQQ__Number__c', 'SBQQ__Product__c', 'SBQQ__Quantity__c', 
        'SBQQ__ListPrice__c', 'SBQQ__RegularPrice__c', 'SBQQ__CustomerPrice__c', 'SBQQ__NetPrice__c',
        'SBQQ__NetTotal__c'];
    quoteLineDisplay;

    @wire(getQuoteLinesData) wiredQuote({ data, error }) {
        if(data) {
            this.quoteLineRecord = data[0];
            this.quoteLineRecordId = this.quoteLineRecord.Id;
            console.log(this.quoteLineRecord.Id);
        } else if (error) {
            console.log(error);
        }
    }
}