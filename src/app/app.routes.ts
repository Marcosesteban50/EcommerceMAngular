import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page/landing-page.component';
import { IndiceProductosComponent } from './componentes/productos/indice-productos/indice-productos.component';
import { IndiceCategoriasComponent } from './componentes/categorias/indice-categorias/indice-categorias.component';
import { CrearProductosComponent } from './componentes/productos/crear-productos/crear-productos.component';
import { EditarProductoComponent } from './componentes/productos/editar-producto/editar-producto.component';
import { CrearCategoriasComponent } from './componentes/categorias/crear-categorias/crear-categorias.component';
import { EditarCategoriaComponent } from './componentes/categorias/editar-categoria/editar-categoria.component';
import { FiltroProductoComponent } from './componentes/productos/filtro-producto/filtro-producto.component';
import { SplashComponent } from './compartidos/splash/splash.component';

import { esAdminGuard } from './compartidos/guards/es-admin.guard';
import { LoginComponent } from './seguridad/login/login.component';
import { RegistroComponent } from './seguridad/registro/registro.component';
import { ListaUsuariosComponent } from './seguridad/lista-usuarios/lista-usuarios.component';
import { IndiceProductosPendientesComponent } from './componentes/productos/indice-productos-pendientes/indice-productos-pendientes.component';
import { DetalleProductoComponent } from './componentes/productos/detalle-producto/detalle-producto.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { HistorialProductosComponent } from './componentes/productos/historial-productos/historial-productos.component';
import { DetalleHistorialProductosComponent } from './componentes/productos/detalle-historial-productos/detalle-historial-productos.component';

import { PerfilComponent } from './componentes/perfil/indice-perfil/perfil.component';
import { EditarPerfilComponent } from './componentes/perfil/editar-perfil/editar-perfil.component';
import { esClienteGuard } from './compartidos/guards/es-cliente.guard';
import { EditarOrdenComponent } from './componentes/ordenes/editar-orden/editar-orden.component';
import { IndiceEstadoOrdenComponent } from './componentes/estados/indice-estado-orden/indice-estado-orden.component';
import { CrearEstadoOrdenComponent } from './componentes/estados/crear-estado-orden/crear-estado-orden.component';
import { EditarEstadoOrdenComponent } from './componentes/estados/editar-estado-orden/editar-estado-orden.component';
import { IndiceEstadoPagoComponent } from './componentes/estados/indice-estado-pago/indice-estado-pago.component';
import { CrearEstadoPagoComponent } from './componentes/estados/crear-estado-pago/crear-estado-pago.component';
import { EditarEstadoPagoComponent } from './componentes/estados/editar-estado-pago/editar-estado-pago.component';
import { IndiceOrdenesComponent } from './componentes/ordenes/indice-ordenes/indice-ordenes.component';
import { AdminService } from './servicios/admin.service';
import { AdmindashboardComponent } from './compartidos/admin/admindashboard/admindashboard.component';



export const routes: Routes = [

  { path: '', component: SplashComponent },
  { path: 'landing', component: LandingPageComponent },
 

  { path: 'productos', component: IndiceProductosComponent },
  { path: 'productos/crear', component: CrearProductosComponent, canActivate: [esAdminGuard] },
  { path: 'productos/editar/:id', component: EditarProductoComponent, canActivate: [esAdminGuard] },
  { path: 'productos/pendientes', component: IndiceProductosPendientesComponent, canActivate: [esAdminGuard] },
  { path: 'productos/filtrar', component: FiltroProductoComponent },
  { path: 'productos/filtrarLanding', component: FiltroProductoComponent },
  { path: 'productos/historialProductos', component: HistorialProductosComponent,canActivate: [esAdminGuard] },
  { path: 'productos/:id/historial', component: DetalleHistorialProductosComponent,canActivate: [esAdminGuard] },



  { path: 'productos/:id', component: DetalleProductoComponent },


  { path: 'categorias', component: IndiceCategoriasComponent, canActivate: [esAdminGuard] },
  { path: 'categorias/crear', component: CrearCategoriasComponent, canActivate: [esAdminGuard] },
  { path: 'categorias/editar/:id', component: EditarCategoriaComponent, canActivate: [esAdminGuard] },



  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegistroComponent },
  { path: 'listadoUsuarios', component: ListaUsuariosComponent ,canActivate: [esAdminGuard]},
  { path: 'carrito', component: CarritoComponent },





  /* 📊 ÓRDENES ADMIN */
  { path: 'admin/ordenes', component: IndiceOrdenesComponent, canActivate: [esAdminGuard] },
  { path: 'admin/ordenes/editar/:id', component: EditarOrdenComponent, canActivate: [esAdminGuard] },

  { path: 'estadosOrdenes', component: IndiceEstadoOrdenComponent, canActivate: [esAdminGuard] },
  { path: 'estadosOrdenes/crear', component: CrearEstadoOrdenComponent, canActivate: [esAdminGuard] },
  { path: 'estadosOrdenes/editar/:id', component: EditarEstadoOrdenComponent, canActivate: [esAdminGuard] },


  { path: 'estadosPagos', component: IndiceEstadoPagoComponent, canActivate: [esAdminGuard] },
  { path: 'estadosPagos/crear', component: CrearEstadoPagoComponent, canActivate: [esAdminGuard] },
  { path: 'estadosPagos/editar/:id', component: EditarEstadoPagoComponent, canActivate: [esAdminGuard] },
  { path: 'admin/dashboard', component: AdmindashboardComponent, canActivate: [esAdminGuard] },


  /*Perfil*/
  { path: 'perfil', component: PerfilComponent, canActivate: [esClienteGuard] },
  { path: 'perfil/editar', component: EditarPerfilComponent, canActivate: [esClienteGuard] },











];
