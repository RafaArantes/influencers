import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdGeneratorService {

  constructor() { }
  
  generateId(){
    return Number((Math.random() * 10000000000).toFixed()) * Number((Math.random() * 10000000000).toFixed())
  }
}
