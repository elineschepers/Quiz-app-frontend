import quizzes from "./nl-BE/quizzes";
import auth from "./nl-BE/auth";
import groups from "./nl-BE/groups";
import general from "./nl-BE/general";
import dashboard from "./nl-BE/dashboard";
import result from "./nl-BE/result";
import login from "./nl-BE/login";
import howto from "./nl-BE/howto";
import error from "./nl-BE/error";
import logout from "./nl-BE/logout";
import disabled from "./nl-BE/disabled";
import language from "./nl-BE/language";

export default async (context, locale) => {
  return await Promise.resolve({
    quizzes,
    auth,
    groups,
    general,
    dashboard,
    result,
    login,
    howto,
    error,
    logout,
    disabled,
    language
  });
}
