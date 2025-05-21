public class TestDriveHelper {
    public static void createTestDrive(List<Lead> leads) {
        List<Test_Drive__c> testDrives = new List<Test_Drive__c>();
        for (Lead lead : leads) {
            if (lead.Selected_Date__c != null) {
                Test_Drive__c testDrive = new Test_Drive__c();
                testDrive.Lead__c = lead.Id;
                testDrive.Driving_License_Number__c = lead.Driving_License_Number__c;
                testDrive.Select_Date__c = lead.Selected_Date__c;
                testDrive.Email__c = lead.Email;
                testDrive.Mobile_Number__c = lead.MobilePhone;
                testDrives.add(testDrive);
            }
        }
        if (testDrives.size() > 0) {
            insert testDrives;
        }
    }

}