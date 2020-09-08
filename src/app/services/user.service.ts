import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../constants/user';

@Injectable({
    providedIn:'root'
})
export class UserService{
    private BASE_URL='http://localhost:8080/api/createNewAccount';
    constructor(private http: HttpClient){

    }
    getUser(){
        return this.http.get<User[]>(`${this.BASE_URL}`)
    }

    getUserbyId(id){
        return this.http.get<User>(`${this.BASE_URL}/${id}`)
    }

    editUserbyId(id,user){
        return this.http.put<User>(`${this.BASE_URL}/${id}`,user)
    }

    deleteUserbyId(id){
        return this.http.delete<User>(`${this.BASE_URL}/${id}`)
    }

    addUser(user){
        return this.http.post<User[]>(`${this.BASE_URL}`, user)
    }

    
}