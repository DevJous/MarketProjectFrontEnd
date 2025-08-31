export default interface ProductoModel {
    idProducto: number;
    nombre: string;
    fechaReg: string;
    idCategoria: number;
    nombreCategoria?: string;
    precio: number;
}