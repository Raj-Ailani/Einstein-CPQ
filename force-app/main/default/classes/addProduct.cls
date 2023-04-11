public class addProduct {
    @AuraEnabled(Cacheable=true)
    public static void addSelectedProducts(Id productId) {
        SBQQ__Quote__c quote = [SELECT Id, SBQQ__PricebookId__c from SBQQ__Quote__c ORDER BY CreatedDate DESC LIMIT 1];
        PricebookEntry pbe = [SELECT Id, Pricebook2Id, Product2Id, UnitPrice FROM PricebookEntry WHERE Product2Id =:productId AND Pricebook2Id =:quote.SBQQ__PricebookId__c];
        
        SBQQ__QuoteLine__c qli = new SBQQ__QuoteLine__c();
        qli.SBQQ__Quote__c = quoteId;
        qli.SBQQ__PricebookEntryId__c = pbe.Id;
        qli.SBQQ__Quantity__c = 1;
        qli.SBQQ__ListPrice__c = pbe.UnitPrice;

        insert qli;
    }
}