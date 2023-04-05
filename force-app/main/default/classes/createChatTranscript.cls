public class createChatTranscript {
    @AuraEnabled(cacheable=false)
    public static String createChat(String accountId){
        List<Chat_Transcript__c> allChats = [SELECT id,Account__c from Chat_Transcript__c];
        Boolean isMatch = false;
        for(Chat_Transcript__c ch : allChats){
            if(accountId == ch.Account__c){
                isMatch = true;
            }
        }
        if(isMatch == true){
            return 'Chat Transcript is already created';
        } 
        else{
            Chat_Transcript__c chat = new Chat_Transcript__c();
            chat.Account__c = accountId;
            insert chat;
            return 'Created New Chat Transcript';
        }
      
    }
}