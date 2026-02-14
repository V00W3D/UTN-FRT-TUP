//esto es solo para seleccionar los admins cuando se presiona en el registrar una nueva auditoria

import { ADMINS_URL } from "../endpoints/admin.endpoint";
import api from "./api";

export const obtenerAdmins = async () => {
    const res = await api.get(ADMINS_URL)
    console.log(res);
    return res.data
}