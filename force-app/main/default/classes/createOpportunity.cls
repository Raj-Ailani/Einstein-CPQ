public class createOpportunity {
    public static void createOpportunityRecord(Id accountId) {
        Account acct = [SELECT Id, Name FROM Account WHERE Id = :accountId LIMIT 1];

        Opportunity opp = new Opportunity();
        opp.Name = acct.Name + '-' + String.valueOf(DateTime.now().getTime());
        opp.AccountId = acct.Id;
        opp.CloseDate = Date.today().addYears(1);
        opp.StageName = 'Prospecting';
        opp.Amount = 0.0;

        insert opp;
    }
}