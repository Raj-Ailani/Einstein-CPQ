public class createChatTranscript {
    @AuraEnabled(cacheable=false)
    public static String createChat(String accountId){

        Chat_Transcript__c chat = new Chat_Transcript__c();
        chat.Account__c = accountId;
        insert chat;

        System.debug(chat.id);
        return 'true';
        // System.debug(accountId);
        // if(accountId == null){
        //     return 'false';
        // }else{
        //     return 'true';
        // }
    }
}