// Devuelve el campo de texto que expone el backend.
// Ejemplo de respuesta: { id: 4, description: "Cocina" }
export default function getCategoryLabel(cat) {
  return (
    cat?.description ||       
    cat?.name        ||       
    cat?.nombre      || 
    `ID ${cat?.id ?? "?"}`
  );
}
