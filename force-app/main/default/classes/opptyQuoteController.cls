public with sharing class opptyQuoteController {
    public opptyQuoteController() {
        
    }
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpptydata(){
        return [select id, Name, CloseDate, Description, StageName from Opportunity limit 1];
    }
}