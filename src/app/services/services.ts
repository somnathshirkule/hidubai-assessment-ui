import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utility } from '../utility/utility';

@Injectable({
	providedIn: 'root'
})

export class Service{
    constructor(private httpClient: HttpClient, private utility: Utility){

    }
    public login(formdata){
        return this.httpClient.post(this.utility.getUrl('/api/user/login'),formdata);
    }
    public signup(formdata){
        return this.httpClient.post(this.utility.getUrl('/api/user/signup'),formdata);
    }
    public getMetadata(){
        return this.httpClient.get(this.utility.getUrl('/api/application/metadata'));
    }
    public getLabelsData() {
        return this.httpClient.get('assets/labels.json');
    }
    
}