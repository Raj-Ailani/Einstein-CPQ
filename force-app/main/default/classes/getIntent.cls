public with sharing class getIntent {
    public static String getIntentOfUser(String document) {
     String token = 'GRMVANCFKFBE6M2IJJIDENKTLBMVKM2NJRHEEN2OGNJEYWKJKZJUOVJVIE3FUSSEIZIFCSSWKVIVSMSDGRFE4WCUK43TENSWIZHTOVCRIQZDKVCDKBGUIRBUGVFVKR2OJZBTEWSRIVEU2TKEKBJUCN2IKRDEWRRTJY2ES7COIE';       


     Http http = new Http();
     HttpRequest req = new HttpRequest();
     HttpResponse res = new HttpResponse();
     req.setMethod('POST');
     req.setHeader('Content-Type', 'application/json');
     req.setEndpoint('https://api.einstein.ai/v2/language/intent');
     String authorizationHeader = 'Bearer '+token;
     req.setHeader('Authorization', authorizationHeader);

     String body = '{"modelId":"JZAVWEZDLAKQHM6LL724D4VZKQ","document":"'+document+'"}';    

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
                 System.debug('Testing if inside');
                 finalIntent = prob;
             }
         }
         System.debug(finalIntent);
         String finalLabel = finalIntent.label;
         return finalLabel;
     }   else{
         return 'Error in getting response. Please look into your API';
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
}