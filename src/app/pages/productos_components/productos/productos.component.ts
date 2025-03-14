import { Component, OnInit } from '@angular/core'; // Importa las clases necesarias de Angular para definir un componente y gestionar su ciclo de vida
import { Router } from '@angular/router'; // Importa Router para manejar la navegación entre vistas
import { Productos } from 'src/app/class/productos_class/productos'; // Importa la clase Productos que representa la estructura de un producto
import { ProductosService } from 'src/app/service/producto_service/productos.service'; // Importa el servicio que interactúa con la API de productos
import { catchError } from 'rxjs/operators'; // Importa catchError para manejar errores en peticiones HTTP
import { throwError } from 'rxjs'; // Importa throwError para lanzar errores en observables
import Swal from 'sweetalert2'; // Importa SweetAlert2 para mostrar alertas en la interfaz

@Component({
  selector: 'app-productos', // Define el selector que se usará en los templates
  templateUrl: './productos.component.html', // Especifica el archivo HTML asociado a este componente
  styleUrls: ['./productos.component.scss'] // Especifica los archivos de estilos CSS para este componente
})
export class ProductosComponent implements OnInit { // Declara la clase del componente e implementa OnInit para ejecutar código en su inicialización

  productos: Productos[] = []; // Declara un array de productos donde se almacenarán los datos obtenidos de la API

  constructor(
    private readonly productosService: ProductosService, // Inyecta el servicio de productos para interactuar con la API
    public router: Router // Inyecta el servicio de Router para manejar la navegación en la aplicación
  ) { }

  ngOnInit() { // Método que se ejecuta cuando el componente se inicializa
    this.obtenerProductos(); // Llama al método para obtener la lista de productos
  }

  private obtenerProductos(): void { // Método privado para obtener productos desde la API
    this.productosService.getProductos().pipe(
      catchError(error => { // Captura errores en la petición HTTP
        console.error('Error al obtener productos:', error); // Muestra el error en la consola
        Swal.fire({ // Muestra una alerta de error en la interfaz
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar la lista de productos. Intenta nuevamente.',
        });
        return throwError(() => error); // Lanza el error para que pueda ser manejado por otros suscriptores
      })
    ).subscribe((response: any) => { // Suscribe al observable para recibir los datos
      if (response && 'productos' in response && Array.isArray(response.productos)) { // Verifica si la respuesta contiene un array válido de productos
        this.productos = response.productos; // Asigna los productos obtenidos al array de productos

        if (this.productos.length > 0) { // Si hay productos, muestra una alerta de éxito
          Swal.fire({
            icon: 'success',
            title: 'Productos cargados',
            text: 'Lista de productos obtenida correctamente.',
            timer: 1500,
            showConfirmButton: false
          });
        } else { // Si no hay productos, muestra una alerta de advertencia
          Swal.fire({
            icon: 'warning',
            title: 'Atención',
            text: 'No hay productos disponibles.',
          });
        }
      } else { // Si la API no devuelve datos válidos, muestra una advertencia
        console.warn('La API no devolvió un array válido:', response);
        Swal.fire({
          icon: 'warning',
          title: 'Atención',
          text: 'La API no devolvió una lista de productos válida.',
        });
      }
    });
  }

  actualizarProducto(id: number) { // Método para actualizar un producto
    console.log('/productosActualizar', id);
    this.router.navigate(['/admin/productosActualizar', id]);
    //this.router.navigate(['admin/productosActualizar', id]); // Redirige a la vista de actualización del producto con el ID proporcionado
  }
  eliminarProducto(id: number) { // Método para eliminar un producto
    Swal.fire({ // Muestra una alerta de confirmación antes de eliminar el producto
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => { // Maneja la respuesta del usuario en la alerta
      if (result.isConfirmed) { // Si el usuario confirma, procede con la eliminación
        this.productosService.eliminarProducto(id).pipe(
          catchError(error => { // Captura errores en la petición HTTP de eliminación
            console.error('Error al eliminar producto:', error);
            Swal.fire({ // Muestra una alerta de error si la eliminación falla
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el producto. Intenta nuevamente.',
            });
            return throwError(() => error); // Lanza el error para que pueda ser manejado por otros suscriptores
          })
        ).subscribe(() => { // Si la eliminación es exitosa:
          Swal.fire({ // Muestra una alerta de éxito
            icon: 'success',
            title: 'Producto eliminado',
            text: 'El producto se eliminó correctamente.',
            timer: 1500,
            showConfirmButton: false
          });
          this.obtenerProductos(); // Recarga la lista de productos para reflejar los cambios
        });
      }
    });
  }
}
