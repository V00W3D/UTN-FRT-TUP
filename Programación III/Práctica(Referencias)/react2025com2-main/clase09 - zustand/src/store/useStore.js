import {create} from "zustand"

const useStore = create((set)=>({
//propiedades
nombre:"",
apellido:"",
telefono:"",
contador:0,
color:false,
//metodos
cambiarNombre: (newName)=>set({nombre:newName}),
cambiarApellido:(newApe)=>set({apellido:newApe}),
cambiarTelefono:(newTel)=>set({telefono:newTel}),
incrementar:()=>set((state)=>({contador:state.contador+1})),
decrementar:()=>set((state)=>({contador:state.contador-1})),
cambiarColor:()=>set((state)=>({color:!state.color})),

}))

export default useStore