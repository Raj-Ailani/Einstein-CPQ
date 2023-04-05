public class createQuote {
    public static void createQuoteRecord() {
        Opportunity latestOpp = [SELECT Id, AccountId, CloseDate, StageName, Amount, Pricebook2Id FROM Opportunity ORDER BY CreatedDate DESC LIMIT 1];

        SBQQ__Quote__c newQuote = new SBQQ__Quote__c();
        newQuote.SBQQ__Opportunity2__c = latestOpp.Id;
        newQuote.SBQQ__EndDate__c = latestOpp.CloseDate;
        newQuote.SBQQ__PriceBook__c = latestOpp.Pricebook2Id;
        newQuote.SBQQ__Status__c = 'Draft';
        newQuote.SBQQ__Primary__c = true;

        insert newQuote;
    }
}