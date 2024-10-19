export type User = {
  user_id: string
  email: string
  phone: string
  fullname: string
  nationality: string
  roles: UserRole[]
  last_booking: string
  nights: number
  books: number
  create_at: string
  update_at: string
}

export enum UserRole {
  "super_admin" = "super_admin",
  "administrator" = "administrator",
  "platinum" = "platinum",
  "gold" = "gold",
  "silver" = "silver",
  "bronze" = "bronze",
  "verified_email" = "verified_email",
  "verified_phone" = "verified_phone",
  "banned" = "banned"
}
