export interface Estudiante{
    cedula: string,
    nombre: string,
    apellido: string,
    porcentajeAsistencia?: number;
    nota1?: number;
    nota2?: number;
    promedio?: number;
    asistencia?: number;
    mensaje?: string; 
    promedioGlobal?: number;
}