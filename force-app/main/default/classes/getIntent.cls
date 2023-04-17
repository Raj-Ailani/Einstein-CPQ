public with sharing class getIntent {
    public static Output getIntentOfUser(String document, Id accountId) {
     String token = 'GRMVANCFKFBE6M2IJJIDENKTLBMVKM2NJRHEEN2OGNJEYWKJKZJUOVJVIE3FUSSEIZIFCSSWKVIVSMSDGRFE4WCUK43TENSWIZHTOVCRIQZDKVCDKBGUIRBUGVFVKR2OJZBTEWSRIVEU2TKEKBJUCN2IKRDEWRRTJY2ES7COIE';       
     //Account acct = [SELECT Id, Name FROM Account WHERE Id = :accountId LIMIT 1];


     Http http = new Http();
     HttpRequest req = new HttpRequest();
     HttpResponse res = new HttpResponse();
     req.setMethod('POST');
     req.setHeader('Content-Type', 'application/json');
     req.setEndpoint('https://api.einstein.ai/v2/language/intent');
     String authorizationHeader = 'Bearer '+token;
     req.setHeader('Authorization', authorizationHeader);

     String body = '{"modelId":"3S35F2UFRGKJOVVCUHXYQ5DH74","document":"'+document+'"}';    

     req.setBody(body);
     res = http.send(req);
    

     if(res.getstatusCode() == 200 && res.getbody() != null){
         ResponseBody responseObject = (ResponseBody)JSON.deserialize(res.getbody(), ResponseBody.class);
         List<ListProbability> allProb = new List<ListProbability>();
         ListProbability finalIntent = new ListProbability();
         allProb = responseObject.probabilities;
         finalIntent  = allProb[0];

         for(ListProbability prob: allProb){
             if(Decimal.valueOf(prob.probability) > Decimal.valueOf(finalIntent.probability)){
                 finalIntent = prob;
             }
         }

         Output outs = new Output();
        if(finalIntent.label == 'createOpportunity'){
            Id oppID = createOpportunity.createOpportunityRecord(accountId);
            outs.nextScreen = 'Opportunity';
            outs.id = oppID;

        }else if (finalIntent.label == 'createQuote'){
            Id quoteId = createQuote.createQuoteRecord(accountId);
            outs.nextScreen = 'Quote';
            outs.id = quoteId;

        }else if(finalIntent.label == 'addProducts'){
            outs.nextScreen = 'Cart';
           
        }
        System.debug(outs);
         return outs;
     }   else{
        Output outs = new Output();
        outs.nextScreen = 'Error';

         return outs;
     }
    }

    public class ResponseBody {
        public List<ListProbability> probabilities;
    }

    public class ListProbability{
        public String probability;
        public String label;

    }

    public class OutputWrapper {
        @AuraEnabled
        public String status;
        @AuraEnabled
        public String queuePosition;
    }

    public class Output{
        @AuraEnabled
        public String nextScreen;
        @AuraEnabled
        public String id;
    }
}