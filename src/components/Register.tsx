import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

export function Register() {
    const { register } = useAuth();
    const { t } = useLanguage();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: { name: "", email: "", password: "" },
        validationSchema: Yup.object({
            name: Yup.string().required(t("nameRequired")),
            email: Yup.string().email(t("invalidEmail")).required(t("emailRequired")),
            password: Yup.string().matches(PASSWORD_REGEX, t("passwordRules")).required(t("passwordRequired")),
        }),
        onSubmit: (values) => {
            register(values.name, values.email, values.password);
            navigate("/");
        },
    });

    return (
        <div className="flex justify-center items-center py-16 px-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-2xl w-full max-w-md transition-colors">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 text-center">{t("register")}</h2>
                <p className="text-slate-500 dark:text-slate-400 text-xs text-center mb-6">{t("welcome")}</p>

                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t("name")}</label>
                        <input
                            type="text"
                            {...formik.getFieldProps("name")}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white py-2.5 px-3.5 rounded-xl text-xs focus:ring-2 focus:ring-violet-500 outline-none"
                        />
                        {formik.touched.name && formik.errors.name && (
                            <p className="text-red-500 text-[10px] mt-1">{formik.errors.name}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t("email")}</label>
                        <input
                            type="email"
                            {...formik.getFieldProps("email")}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white py-2.5 px-3.5 rounded-xl text-xs focus:ring-2 focus:ring-violet-500 outline-none"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500 text-[10px] mt-1">{formik.errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t("password")}</label>
                        <input
                            type="password"
                            {...formik.getFieldProps("password")}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white py-2.5 px-3.5 rounded-xl text-xs focus:ring-2 focus:ring-violet-500 outline-none"
                        />
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-red-500 text-[10px] mt-1">{formik.errors.password}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-linear-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 text-white font-bold py-3 rounded-xl text-xs shadow-lg transition active:scale-[0.98] mt-2"
                    >
                        {t("register")}
                    </button>
                </form>

                <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6">
                    {t("hasAccount")}{" "}
                    <Link to="/login" className="text-violet-600 dark:text-violet-400 font-bold hover:underline">
                        {t("login")}
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;