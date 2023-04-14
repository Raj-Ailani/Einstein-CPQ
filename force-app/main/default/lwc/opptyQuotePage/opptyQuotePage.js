import { LightningElement,api,wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import OppQuote_CHANNEL from '@salesforce/messageChannel/OppQuote__c';
import getOpportunity from '@salesforce/apex/opptyQuoteController.getOpportunitydata'
import getQuote from '@salesforce/apex/opptyQuoteController.getQuotedata'

export default class OpptyQuotePage extends LightningElement {
  @wire(MessageContext)
  messageContext;
    opportunityrecord;
    opportunityrecordId;
    quoteRecordId;
    quoteRecord;
    OpportunityFields = ['Name','CloseDate','Description', 'StageName'];
    quoteFields = ['Name','SBQQ__LineItemsGrouped__c', 'SBQQ__LineItemsPrinted__c','SBQQ__Primary__c', 'IsDeleted'];
    opportunityDisplay;
    QuoteDisplay;
   
    @wire(getOpportunity) wiredOppty({data,error}){
        if (data) {
            this.opportunityrecord = data[0];
           this.opportunityrecordId = this.opportunityrecord.Id;
            console.log(this.opportunityrecord.Id); 
            } else if (error) {
            console.log(error);
            }
    }

    @wire(getQuote) wiredQuote({data,error}){
        if (data) {
            this.quoteRecord = data[0];
            this.quoteRecordId = this.quoteRecord.Id;
            console.log(this.quoteRecord.Id); 
            } 
            else if (error) {
            console.log(error);
        }
    }
    handleMessage(message) {
      console.log(message);
        if(message.OpptyOrQoute == 'Opportunity') {
          //this.counter += message.constant;
          this.opportunityDisplay = true;
          this.QuoteDisplay = false;
        }else if(message.OpptyOrQoute == 'Quote') {
          //this.counter -= message.constant;
          this.QuoteDisplay = true;
          this.opportunityDisplay = false;
        } else {
          this.opportunityDisplay = false;
          this.QuoteDisplay = false;
        }
      }
    subscribeToMessageChannel() {
        this.subscription = subscribe(
          this.messageContext,
          OppQuote_CHANNEL,
          (message) => this.handleMessage(message)
        );
    }
    connectedCallback() {
        this.subscribeToMessageChannel();
    }    
    

}