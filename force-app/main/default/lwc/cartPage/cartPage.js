import { LightningElement, api, wire } from 'lwc';
import getQuoteLinesData from '@salesforce/apex/getQuoteLineDetails.getQuoteLinesData'

const quoteLineFields = [{ label: 'Name', fieldName: 'Name' }, { label: 'Number', fieldName: 'SBQQ__Number__c' }, 
    { label: 'Product', fieldName: 'SBQQ__ProductName__c' }, { label: 'Quantity', fieldName: 'SBQQ__Quantity__c', editable: true },
    { label: 'List Unit Price', fieldName: 'SBQQ__ListPrice__c' }, { label: 'Regular Unit Price', fieldName: 'SBQQ__RegularPrice__c' }, 
    { label: 'Customer Unit Price', fieldName: 'SBQQ__CustomerPrice__c' }, { label: 'Net Unit Price', fieldName: 'SBQQ__NetPrice__c' }, 
    { label: 'Net Total', fieldName: 'SBQQ__NetTotal__c' }];

export default class CartPage extends LightningElement {
    error;
    quoteLineFields = quoteLineFields;

    @wire(getQuoteLinesData)
    quoteLines;
}