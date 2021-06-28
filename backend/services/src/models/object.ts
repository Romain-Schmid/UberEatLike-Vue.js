export type user = {
    email : string,
    username: string
    role: string,
    password? : string
};

export type findOrder = {
    email_customer? : string,
    id_restaurant? : string
    status? : string,
};