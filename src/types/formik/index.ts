import { useFormik } from "formik";
import { Role } from "../roles";

export type FormikHook = ReturnType<typeof useFormik<{
    name: string,
    roleClaims: string[]
}>>