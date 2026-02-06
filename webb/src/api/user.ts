import { http } from "./http";

//Shape returned by the backend
//Dates arrive as ISO strings

export type User = {
    id: number;
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
};

export const userApi = {
    list(): Promise<User[]> {
        return http<User[]>("/api/users");
    },

    create(input: { email:string; name: string; }): Promise<User> {
        return http<User>("/api/users", {
            method: "POST",
            body: JSON.stringify(input),
        });
    },

    //future work will update user & possibley delete
}
