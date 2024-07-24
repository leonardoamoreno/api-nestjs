export class CreateUserDto {
    id: number
    name: string    
    username: string
    phone: string
    email: string | null
    password: string
    token: string
    create_date: Date | null
}
