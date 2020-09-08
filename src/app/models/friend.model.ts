import { Message } from './message.model';

export class Friend{
    

    constructor(
        public name:string,
        public email:string,
        public messages?: Message[]
        ){}
}