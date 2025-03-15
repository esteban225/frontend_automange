export class Productos {
    id?: number; // <-- Asegúrate de que esta propiedad existe
    nombre!: string;
    descripcion!: string;
    imagen?: string;
    precio!: number;
    cantidad!: number;
}
