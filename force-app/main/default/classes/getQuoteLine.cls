public with sharing class getQuoteLines {
    @AuraEnabled(cacheable=true)
    public static List<SBQQ__QuoteLine__c> getQuoteLinesData(Id QuoteId){
        return [Select Id, Name, SBQQ__Number__c, SBQQ__Product__c, SBQQ__Quantity__c, SBQQ__ListPrice__c,
                SBQQ__RegularPrice__c, SBQQ__CustomerPrice__c, SBQQ__NetPrice__c, SBQQ__NetTotal__c from
                SBQQ__QuoteLine__c where SBQQ__Quote__c=:QuoteId];
    }
}