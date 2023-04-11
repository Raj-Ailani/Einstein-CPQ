public with sharing class getUserName {
    public static String getUserNameFromId(Id userId) {
        User us = [select name from User where Id=:userId LIMIT 1];
        return us.Name;
    }
}