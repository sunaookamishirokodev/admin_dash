export const path = {
  home: "/",
  listBranch: "/branches",
  createBranch: "/branches/create",
  updateBranch: "/branches/edit/:nameId",
  detailBranch: "/branches/detail/:nameId",

  listRoom: "/rooms",
  createRoom: "/rooms/create",
  updateRoom: "/rooms/edit/:nameId",
  detailRoom: "/rooms/detail/:nameId",

  listUser: "/users",
  updateUser: "/users/edit/:nameId",
  detailUser: "/users/detail/:nameId",

  listBooking: "/bookings",
  updateBooking: "/bookings/edit/:nameId",
  detailBooking: "/bookings/detail/:nameId"
} as const
