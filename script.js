let carrito = [];
const PRECIO_KILO_EJEMPLO = 2000;
const RECARGO_CREDITO = 0.15;

// Lógica de cálculo bidireccional
function actualizarPorCantidad(id, cant) {
    let subtotal = cant * PRECIO_KILO_EJEMPLO;
    document.getElementById(`subtotal-${id}`).innerText = subtotal.toFixed(2);
    recalcularTotal();
}

function actualizarPorImporte(id, importe) {
    let cant = importe / PRECIO_KILO_EJEMPLO;
    document.getElementById(`cant-${id}`).value = cant.toFixed(2);
    recalcularTotal();
}

function recalcularTotal() {
    let subtotalGral = 0;
    // (Aquí iría el bucle que suma todos los productos del carrito)
    // Para el ejemplo, supongamos que solo hay uno:
    let descuento = parseFloat(document.getElementById('descuento').value) || 0;
    let total = subtotalGral - descuento;
    document.getElementById('total-final').innerText = total.toFixed(2);
}

// Función para el recargo de tarjeta
function calcularPago(monto, metodo) {
    if (metodo === 'credito') {
        return monto * (1 + RECARGO_CREDITO);
    }
    return monto;
}

// Detección de Internet (Para modo Offline)
window.addEventListener('online', () => {
    document.getElementById('status-internet').innerText = "Conectado";
    document.getElementById('status-internet').style.background = "green";
    // Aquí dispararíamos la sincronización automática
});

window.addEventListener('offline', () => {
    document.getElementById('status-internet').innerText = "Trabajando Offline";
    document.getElementById('status-internet').style.background = "orange";
});

// Guardado en "Libreta Digital" (LocalStorage)
function guardarVentaLocal(venta) {
    let ventasPendientes = JSON.parse(localStorage.getItem('ventas_offline')) || [];
    ventasPendientes.push(venta);
    localStorage.setItem('ventas_offline', JSON.stringify(ventasPendientes));
}
