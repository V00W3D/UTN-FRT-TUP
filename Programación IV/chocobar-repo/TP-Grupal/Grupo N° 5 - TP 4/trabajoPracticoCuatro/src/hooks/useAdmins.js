// esto permitirá que se muestren los admins disponibles al registrar una nueva auditoria
import { useEffect, useState } from "react";
import { obtenerAdmins } from "../services/admins.services";

export const useAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchAdmins = async () => {
      const data = await obtenerAdmins();
      setAdmins(data);
      setCargando(false);
    };

    fetchAdmins();
  }, []);

  return { admins, cargando };
};
