public with sharing class opptyQuoteController {
    public opptyQuoteController() {
        
    }
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunitydata(){
        
        return [select id, Name,CloseDate, Description, StageName  from Opportunity limit 1];
    }
    @AuraEnabled(cacheable=true)
    public static List<SBQQ__Quote__c> getQuotedata(){
        
        return [select id, Name,SBQQ__LineItemsGrouped__c, SBQQ__LineItemsPrinted__c, SBQQ__Primary__c , IsDeleted from SBQQ__Quote__c limit 1];
    }
   
}