document.addEventListener('DOMContentLoaded', () => {
    const formAgregarProducto = document.getElementById('form-agregar-producto');
    const formActualizarInventario = document.getElementById('form-actualizar-inventario');
    const formEditarProducto = document.getElementById('form-editar-producto');
    const formEliminarProducto = document.getElementById('form-eliminar-producto');
    const buscarInput = document.getElementById('buscar');
    const filtroPrecio = document.getElementById('filtro-precio');
    const filtroCantidad = document.getElementById('filtro-cantidad');
    const listaProductos = document.getElementById('lista-productos');
    const productos = []; // Arreglo para almacenar los productos

    // Función para agregar un nuevo producto
    formAgregarProducto.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const descripcion = document.getElementById('descripcion').value;
        const precio = parseFloat(document.getElementById('precio').value);
        const cantidad = parseInt(document.getElementById('cantidad').value);

        const nuevoProducto = {
            id: Date.now(),
            nombre,
            descripcion,
            precio,
            cantidad
        };

        productos.push(nuevoProducto);
        mostrarProductos();
        cargarProductosSelect();
        formAgregarProducto.reset();
    });

    // Función para mostrar los productos en la tabla
    function mostrarProductos() {
        listaProductos.innerHTML = ''; // Limpiar la lista actual

        productos.forEach((producto) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${producto.nombre}</td>
                <td>${producto.descripcion}</td>
                <td>${producto.precio}</td>
                <td>${producto.cantidad}</td>
            `;
            listaProductos.appendChild(tr);
        });
    }

    // Función para filtrar productos por nombre, precio o cantidad
    buscarInput.addEventListener('input', () => {
        filtrarProductos();
    });

    filtroPrecio.addEventListener('change', () => {
        filtrarProductos();
    });

    filtroCantidad.addEventListener('change', () => {
        filtrarProductos();
    });

    function filtrarProductos() {
        let productosFiltrados = productos;

        // Filtrar por nombre
        const busqueda = buscarInput.value.toLowerCase();
        if (busqueda) {
            productosFiltrados = productosFiltrados.filter(producto =>
                producto.nombre.toLowerCase().includes(busqueda)
            );
        }

        // Filtrar por precio
        if (filtroPrecio.value) {
            const ordenPrecio = filtroPrecio.value === 'asc' ? 1 : -1;
            productosFiltrados.sort((a, b) => (a.precio - b.precio) * ordenPrecio);
        }

        // Filtrar por cantidad
        if (filtroCantidad.value) {
            const ordenCantidad = filtroCantidad.value === 'asc' ? 1 : -1;
            productosFiltrados.sort((a, b) => (a.cantidad - b.cantidad) * ordenCantidad);
        }

        // Mostrar los productos filtrados
        listaProductos.innerHTML = '';
        productosFiltrados.forEach((producto) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${producto.nombre}</td>
                <td>${producto.descripcion}</td>
                <td>${producto.precio}</td>
                <td>${producto.cantidad}</td>
            `;
            listaProductos.appendChild(tr);
        });
    }

    // Función para actualizar inventario
    formActualizarInventario.addEventListener('submit', (e) => {
        e.preventDefault();

        const productoSeleccionado = document.getElementById('producto-inventario').value;
        const cantidadEntrada = parseInt(document.getElementById('cantidad-entrada').value) || 0;
        const cantidadSalida = parseInt(document.getElementById('cantidad-salida').value) || 0;

        const producto = productos.find(p => p.id === parseInt(productoSeleccionado));
        if (producto) {
            producto.cantidad += cantidadEntrada - cantidadSalida;
            mostrarProductos();
        }

        formActualizarInventario.reset();
    });

    // Función para editar un producto
    formEditarProducto.addEventListener('submit', (e) => {
        e.preventDefault();

        const productoSeleccionado = document.getElementById('producto-editar').value;
        const nuevoNombre = document.getElementById('nuevo-nombre').value;
        const nuevaDescripcion = document.getElementById('nueva-descripcion').value;
        const nuevoPrecio = parseFloat(document.getElementById('nuevo-precio').value);

        const producto = productos.find(p => p.id === parseInt(productoSeleccionado));
        if (producto) {
            producto.nombre = nuevoNombre || producto.nombre;
            producto.descripcion = nuevaDescripcion || producto.descripcion;
            producto.precio = nuevoPrecio || producto.precio;
            mostrarProductos();
            cargarProductosSelect(); // Actualizar los formularios con los productos actualizados
        }

        formEditarProducto.reset();
    });

    // Función para eliminar un producto
    formEliminarProducto.addEventListener('submit', (e) => {
        e.preventDefault();

        const productoSeleccionado = document.getElementById('producto-eliminar').value;
        const index = productos.findIndex(p => p.id === parseInt(productoSeleccionado));

        if (index !== -1) {
            productos.splice(index, 1);
            mostrarProductos();
            cargarProductosSelect(); // Actualizar los formularios con los productos eliminados
        }

        formEliminarProducto.reset();
    });

    // Función para cargar los productos en las listas de selección
    function cargarProductosSelect() {
        const selectActualizar = document.getElementById('producto-inventario');
        const selectEditar = document.getElementById('producto-editar');
        const selectEliminar = document.getElementById('producto-eliminar');

        selectActualizar.innerHTML = '';
        selectEditar.innerHTML = '';
        selectEliminar.innerHTML = '';

        productos.forEach((producto) => {
            const option = document.createElement('option');
            option.value = producto.id;
            option.textContent = producto.nombre;
            selectActualizar.appendChild(option);
            selectEditar.appendChild(option.cloneNode(true));
            selectEliminar.appendChild(option.cloneNode(true));
        });
    }

    // Inicializar la lista de productos y las listas de selección
    mostrarProductos();
    cargarProductosSelect();
});


