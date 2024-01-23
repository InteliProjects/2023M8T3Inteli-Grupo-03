export type TEmail = {email:string}
export type TName = {name:string}
export type TPassword = {password:string}

export type TUser = TEmail & TName & TPassword
export type TLogin = TEmail & TPassword