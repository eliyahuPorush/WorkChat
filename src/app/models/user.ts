export class User {

    constructor(
        public idToken:string, 
        public email: string, 
        public displayName:string, 
        public localId: string, 
        public refreshToken: string, 
        public expiresIn: string , 
        public registered?: boolean,
        public phone?: string,
        public alies?: string,
         ){}
}
