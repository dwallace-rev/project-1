

export interface Employee{
    id: string
    username: string
    fname: string
    lname: string
    requests: string[]
    isManager: boolean
}

export interface Request{
    id: string
    reason: string
    amount: number // store as a whole number of cents.
    requestDate: number // unix epoch time
    isApproved: boolean
}