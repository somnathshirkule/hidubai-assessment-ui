import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Service } from "../services/services";

@Injectable({
	providedIn: 'root'
})
export class Utility{
    private metadata : any;
    labels: Object;
    flag  = 0;
    public getUrl(endpoint){
        return environment.baseUrl + environment.applicationContext + endpoint;
    }

    public getFormData(formname){
        for(let i = 0; i < this.metadata.length; i++){
            if(this.metadata[i][formname] != null){
                return this.metadata[i][formname];
            }
        }
        return undefined;
    }

    public setMetadata(metadata){
        this.metadata = metadata;
    }

    isEnabled(data: string){
        let values = data.split('.');
        let formName = values[0];
        let fieldName = values[1];
        let formData : any[] = this.getFormData(formName);
        let attributes = formData[fieldName];
        if(attributes != null){
            if(attributes['ENABLED'] == 'Y')
                return true; 
        }
        return false;
    }

    public validateField(data: string, value){
        let values = data.split('.');
        let formName = values[0];
        let fieldName = values[1];

        let formData : any[] = this.getFormData(formName);
        let attributes = formData[fieldName];
        if(attributes != null){
            if(attributes['ENABLED'] == 'Y' && attributes['MANDATORY'] == 'Y'){
                if(attributes['MANDATORY']){
                    let val = attributes['MANDATORY'];
                    if(val == 'Y' && (value == undefined || value == '')){
                        this.flag = 1;
                        return 'This field is required.';
                    }
                }
                if(attributes['MIN_LENGTH']){
                    let val = attributes['MIN_LENGTH'];
                    if(!value || value.length < Number(val)){
                        this.flag = 1;
                        return 'Minimum length should be ' + val;
                    }
                }
                if(attributes['MAX_LENGTH']){
                    let val = attributes['MAX_LENGTH'];
                    if(!value || value.length > Number(val)){
                        this.flag = 1;
                        return 'Maximum length should be ' + val;
                    }
                }
                if(attributes['REGEX']){
                    let expression: RegExp = new RegExp(String(attributes['REGEX']).split('%5C').join('\\'));
                    const result: boolean = expression.test(value); 
                    if(!result){
                        this.flag = 1;
                        return 'Please enter valid data';
                    }
                }
            }
        }
    }
    getLabel(key){
        return this.labels[key] ? this.labels[key] : key;
    }
}