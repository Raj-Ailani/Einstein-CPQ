public with sharing class opptyQuoteController {
    public opptyQuoteController() {
        
    }
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpptyQuotedata(){
        boolean Opportunity = true;
        boolean quote = false;
        if (Opportunity) {
            return [select id, Name, CloseDate, Description, StageName from Opportunity limit 1];
            
        }
        else {
            return [select id, Name, CloseDate, Description, StageName from Opportunity limit 1];
            
        }
       
    }
}