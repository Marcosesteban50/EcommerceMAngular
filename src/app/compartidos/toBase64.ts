export function toBase64(file:File): Promise<string>{
    //Promesa es como Programacion Asyncrona
    return new Promise((resolve,reject) =>{
        const lector = new FileReader();
        //leyendo el archivo
        lector.readAsDataURL(file);

        //Cuando termine de leer el File = cuando sea exitoso devolvemos resultado como string
        lector.onload = () => resolve(lector.result as string);

        lector.onerror = (error) => reject(error);
    })
}