/* 
   Universidad Nacional Abierta y a Distancia (UNAD)
   Curso: Big Data
   Tarea 4: Almacenamiento y Consultas en MongoDB
   Dataset: Amazon Sales Dataset
*/

// ==========================================
// 1. CONSULTAS BÁSICAS (CRUD)
// ==========================================

// Crear un producto de prueba
use amazon_store
db.products.insertOne({
    product_id: "PRUEBA001",
    product_name: "Mouse Gamer UNAD RGB",
    category: "Computers|Accessories",
    discounted_price: 50.00,
    actual_price: 100.00,
    rating: 5.0,
    rating_count: 10
})

// Leer el producto creado
db.products.find({ product_id: "PRUEBA001" })

// Actualizar el precio
db.products.updateOne(
    { product_id: "PRUEBA001" },
    { $set: { discounted_price: 45.00 } }
)

// Eliminar el producto
db.products.deleteOne({ product_id: "PRUEBA001" })


// ==========================================
// 2. CONSULTAS CON FILTROS
// ==========================================

// Productos baratos (menor a 500) con buen rating (mayor a 4.0)
db.products.find({
    discounted_price: { $lt: 500 },
    rating: { $gte: 4.0 }
}).limit(5)

// Top 5 productos más costosos (Proyección y Ordenamiento)
db.products.find(
    {}, 
    { product_name: 1, discounted_price: 1, _id: 0 }
).sort({ discounted_price: -1 }).limit(5)


// ==========================================
// 3. AGREGACIONES (ESTADÍSTICAS)
// ==========================================

// Precio promedio por categoría
db.products.aggregate([
    {
        $group: {
            _id: "$category",
            precio_promedio: { $avg: "$discounted_price" },
            total_productos: { $sum: 1 }
        }
    },
    { $sort: { total_productos: -1 } },
    { $limit: 5 }
])

// Categorías con mejor reputación (Rating promedio)
db.products.aggregate([
    {
        $group: {
            _id: "$category",
            calificacion_promedio: { $avg: "$rating" }
        }
    },
    { $sort: { calificacion_promedio: -1 } },
    { $limit: 5 }
])