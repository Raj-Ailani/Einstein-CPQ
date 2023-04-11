import { LightningElement,api,wire } from 'lwc';
import getOpportunity from '@salesforce/apex/opptyQuoteController.getOpportunitydata'
import getQuote from '@salesforce/apex/opptyQuoteController.getQuotedata'

export default class OpptyQuotePage extends LightningElement {
    opportunityrecord;
    opportunityrecordId;
    quoteRecord;
    OpportunityFields = ['Name','CloseDate','Description', 'StageName'];
    quoteFields = ['Name','SBQQ__LineItemsGrouped__c', 'SBQQ__LineItemsPrinted__c','SBQQ__Primary__c', 'IsDeleted'];
    opportunityDisplay = true;
    QuoteDisplay = false;
   
    @wire(getOpportunity) wiredOppty({data,error}){
        if (data) {
            this.opportunityrecord = data[0];
            // this.OpportunityFields = [
            //     { label: 'Name', fieldName: 'Name' },
            //     { label: 'Close Date', fieldName: 'CloseDate'}
            // ];
            // this.Opportunity = data;
           // this.opportunityrecordId = 
            console.log(this.opportunityrecord.Id); 
            } else if (error) {
            console.log(error);
            }
    }

    @wire(getQuote) wiredQuote({data,error}){
        if (data) {
            this.quoteRecord = data[0];
            console.log(this.quoteRecord.Id); 
            } else if (error) {
            console.log(error);
            }
    }

    //@wire(getQuote) wiredqoute;
    // _oportunity = true;
    // _quote = false;

    // if(_oportunity)
    // {
    //     fields = ['Name', 'CloseDate', 'Description', 'StageName'];
    //     objectApiName = 'Opportunity';
    //     console.log(fields);
    // }
    // if(_quote)
    // {
    // fields = ['Name','SBQQ__LineItemsGrouped__c', 'SBQQ__LineItemsPrinted__c', 'SBQQ__Primary__c', 'IsDeleted'];
    // objectApiName = 'SBQQ__Quote__c';
    // console.log(fields);
    // }
    


}