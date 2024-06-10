export enum RouteName {
  ROOT = "/",
  LOGIN = "/login",
  SIGNUP = "/signup",
  VERIFY_EMAIL = "/verify-email",

  ADMIN_DASHBOARD = "/admin/dashboard",
  // ADMIN_PROFILE = "/admin/profile/:tournamentId?",
  ADMIN_MAIN_DASHBOARD = "/hs/home",
  ADMIN_PROFILE = "/hs/profile/:userId?",
  USER_PROFILE = "/hs/user-profile/:userId?",
}
