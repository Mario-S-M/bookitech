export type LibroElemento = {
  Titulo: string;
  Cantidad: number;
};

export type Libro = {
  Id: number;
  Titulo: string;
  Precio: number;
  Descuento: number;
  Unidades: number;
  Seleccion: string;
  Paquete: boolean;
  Digital: boolean;
  Elementos: LibroElemento[];
};

export type Lista = {
  Id: number;
  Grupo: string;
  Grado: string;
  Desde: string;
  Hasta: string;
  Observacion: string;
  Libros: Libro[];
};

export type EscuelaInfo = {
  Id: number;
  Nombre: string;
  Logo: string;
  Tipo_Logo: string;
  Activo: boolean;
  R_fedex: boolean;
  R_Sucursal: boolean;
  Costo_Fedex: number;
  Costo_Local: number;
  Observacion: string;
  Entrega_Mixta: boolean;
  Entrega_Escuela: boolean;
  Obs_Escuela: string;
  Entrega_Sucursal: boolean;
  Obs_Sucursal: string;
  Matricula: boolean;
  M_Obligatoria: boolean;
  Listas: Lista[];
};
