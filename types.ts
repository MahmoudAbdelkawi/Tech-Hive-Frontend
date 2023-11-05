import { StackNavigationProp } from "@react-navigation/stack"

export default interface UserType 
{
    id: number,
    email: string,
    name: string,
    createdAt: string,
    products: []
}


export interface LoginDto{
    email: string,
    password: string
}

export interface RegisterDto extends LoginDto{
    name: string
    confirmationPassword: string
}

export interface ProductDto{
    title: string
}

export interface ProductType extends ProductDto{
    id: number
    createdAt: string
    updatedAt: string
    published: true,
    authorId: 8
}


export interface Props  {
    navigation: any;
}

export type Ref = any


