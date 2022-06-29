import quizzes from "./en-UK/quizzes";
import auth from "./en-UK/auth";
import groups from "./en-UK/groups";
import general from "./en-UK/general";
import dashboard from "./en-UK/dashboard";
import result from "./en-UK/result";
import login from "./en-UK/login";
import howto from "./en-UK/howto";
import error from "./en-UK/error";
import logout from "./en-UK/logout";
import disabled from "./en-UK/disabled";
import language from "./en-UK/language";

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
