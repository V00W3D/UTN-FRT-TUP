import { ADMINS_URL } from "../endpoints/admin.endpoint";
import api from "./api";

export const login = async () => {
    const res = await api.get(ADMINS_URL)
    return res.data
}