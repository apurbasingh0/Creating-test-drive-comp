import { LightningElement, track , wire , api } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getProduct from '@salesforce/apex/NewProductRequestClass.getProducts';
import getLeads from '@salesforce/apex/productList.getLeads';
import createlead from '@salesforce/apex/productList.createLead';
import updateLeadBookDate from '@salesforce/apex/productList.updateLeadBookDate';

export default class Testdrive extends LightningElement {

    @track isExistingUser = false;
    @track isNewUser = false;

    handleCheckboxChange(event) {
        this.isExistingUser = event.target.checked;
        this.isNewUser = !this.isExistingUser;
    }

    handleCheckboxChange2(event) {
        this.isNewUser = event.target.checked;
        this.isExistingUser = !this.isNewUser;
    }

    @track firstName = '';
    @track lastName = '';
    @track mobileNumber = '';
    @track email = '';
    @track drivingLicense = '';
    @track selectedDate = '';
    @track otp = '';
    @track selectedDate2 = '';
    @track ShowProductName = false;
    @track ShowProductName2 = false;
    @track Hide = true;
    @track recId;
    @api recordId;
    @track product;


    connectedCallback(){
        console.log('recId::' ,this.recordId);
        getProduct({ProductId:this.recordId})
        .then(result =>{
            console.log('RecordId::::',this.recordId);
            this.product=result;
            console.log('result:::::::',JSON.Stringyfy(result));
        })
        .catch(error=>{
            this.error=error;
        })
        

    }
    @track leadList=[];
    @track leadName='';
    showSearchedValues=false;

   
    handleKeyChange(event)
    {    
         this.leadName = event.target.value;

        console.log("lead name ",this.leadName);
        getLeads({key:this.leadName})
        .then(result=>{
            if(result){
                this.showSearchedValues=true;
                this.leadList=result;
                console.log('leadlist',JSON.stringify(this.leadList));
            }
        })
    }

    get productPrice() {
        return this.product ? this.product.Price__c : '';
    }
    get productcolour() {
        return this.product ? this.product.Colour__c : '';
    }
    get producttopSpeed() {
        return this.product ? this.product.Top_Speed__c : '';
    }
    get productBattery() {
        return this.product ? this.product.Battery__c : '';
    }
    get productName() {
        return this.product ? this.product.Name : '';
    }
    get productHomeBattery() {
        return this.product ? this.product.Home_Charging_Time_100__c : '';
    }

    handleFirstNameChange(event) {
        this.firstName = event.target.value;
    }

    handleLastNameChange(event) {
        this.lastName = event.target.value;
    }

    handleMobileChange(event) {
        this.mobileNumber = event.target.value;
    }

    handleEmailChange(event) {
        this.email = event.target.value;
    }

    handleLicenseChange(event) {
        this.drivingLicense = event.target.value;
    }

    handleDateChange(event) {
        this.selectedDate = event.target.value;
    }

    handleOnchange(event){
        this.otp = event.target.value;
    }

    handleDateChange2(event) {
        this.selectedDate2 = event.target.value;
    }

    @track leadId = '';
    handleParentSelection(event){
        this.leadId=event.currentTarget.dataset.id;
        this.leadName=event.currentTarget.dataset.value;
        console.log('id',this.leadId);
        console.log('name ',this.leadName);
        this.showSearchedValues=false;
    }

    handleSave() {
        const fields = {};
        fields['FirstName'] = this.firstName;
        fields['LastName'] = this.lastName;
        fields['Company'] = this.lastName;
        fields['MobilePhone'] = this.mobileNumber;
        fields['Email'] = this.email;
        fields['Driving_License_Number__c'] = this.drivingLicense;
        fields['Selected_Date__c'] = this.selectedDate;
        fields['Product_Name__c'] = this.product.Name;
        fields['Home_Charging_Time_100__c'] = this.product.Home_Charging_Time_100__c;
        fields['Battery__c'] = this.product.Battery__c;
        fields['Top_Speed__c'] = this.product.Top_Speed__c;
        fields['Colour__c'] = this.product.Colour__c ;
        fields['Price__c'] = this.product.Price__c;
        fields['Status'] = 'Test Drive Started';
        console.log("Fields",fields);

        createlead({ leads: fields })
            .then(() => {
                console.log("Inside created lead");
                this.showToastMessage('Success', 'Lead record created successfully', 'success');
                this.clearForm();
            })
            .catch((error) => {
                console.error(error);
                this.showToastMessage('Error', 'There was an error creating the Lead record', 'Error');
            });
    }

    handleCancel(){
        this.Hide = false;
        this.ShowProductName2 = true;
    }

    clearForm() {
        this.firstName = '';
        this.lastName = '';
        this.mobileNumber = '';
        this.email = '';
        this.drivingLicense = '';
        this.selectedDate = '';
        this.otp = '';
       
    }

    handleSendOTP(){
        this.showToastMessage('Success','OTP 456789.','success');
    }

    @track count=false;
    handleVerifyOTP(){
        this.verifyOTP='';
        this.count=true;
        this.showToastMessage('Success','Mobile Number Verify Succuesfully.','success');
        
    }

    showToastMessage(title,message,variant){
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(evt);
    }

    handleBack(){
        this.Hide = false;
        this.ShowProductName = true;
    }

    handleUpdate() {
        console.log("Inside Update lead");
        updateLeadBookDate({ leadId: this.leadId, bookDate: this.selectedDate2 })
        .then(() => {
            console.log("Inside created lead");
            this.showToastMessage('Success', 'Lead record Updated successfully', 'success');
            this.selectedDate2 = '';
            this.leadName = '';
        })
        .catch((error) => {
            console.error(error);
            this.showToastMessage('Error', 'There was an error updating the Lead record', 'Error');
        });
    }

}