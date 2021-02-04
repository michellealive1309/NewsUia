export interface Group {
    id: string
    name: string
    description: string
    public: boolean
    owner: string
    moderator: string[]
    subscriber: string[]
    isSubscribe: boolean
    password: string
    created: Date
    setremove: Date
}
