export type TypeBranch = {
  branch_id?: string
  name: string
  trademark: string
  description: string[]
  url: string
  province: string
  ward: string
  best_comforts: string[]
  location: string
  images?: string[]
}

export type TypeRoom = {
  room_id?: string // ID của phòng
  branch_id: string // ID của chi nhánh mà phòng thuộc về
  price_per_night: number // Giá mỗi đêm
  price_per_month: number // Giá mỗi tháng
  name: string // Tên phòng
  description: string[] // Mô tả phòng (mảng các chuỗi)
  comforts: string[] // Danh sách các tiện nghi (mảng các chuỗi)
  bed_type: string // Loại giường
  booking_turn: number // Số lần đặt phòng
  stock: number // Số lượng phòng còn lại
  acreage: number // Diện tích phòng (m2)
  available_from: string // Thời gian có sẵn (ISO 8601)
  available_to: string // Thời gian không còn sẵn (ISO 8601)
  max_adults: number // Số người lớn tối đa
  max_children: number // Số trẻ em tối đa
  max_babies: number // Số trẻ sơ sinh tối đa
  images?: string[] // Danh sách đường dẫn hình ảnh (mảng các chuỗi)
}

export type TypeUser = {
  user_id?: string
  email: string
  phone: string
  fullname: string
  nationality: string
  last_booking: string | null
  nights: number
  books: number
  create_at: string
  update_at: string
  roles: string[]
}

export type TypeBooking = {
  booking_id?: string
  adults: number
  children: number
  babies: number
  checkin: string
  checkout: string
  fullname_order: string
  email_order: string
  phone_order: string
  fullname_customer?: string
  email_customer?: string
  phone_customer?: string
  type: BookingType
  range: Range
  room_id: string
  note: string
}

export enum BookingStatus {
  "paid" = "paid",
  "pending" = "pending",
  "done" = "done",
  "cancelled" = "cancelled"
}

export enum BookingRange {
  "nights" = "nights",
  "months" = "months"
}

export enum BedType {
  "king" = "king",
  "single" = "single"
}

export enum Range {
  "nights" = "nights",
  "months" = "months"
}

export enum BookingType {
  "my_set" = "my_set",
  "help_set" = "help_set"
}
