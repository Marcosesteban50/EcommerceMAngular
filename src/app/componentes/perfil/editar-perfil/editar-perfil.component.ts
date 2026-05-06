import { Component, inject, Input, OnInit } from '@angular/core';
import { FormularioPerfilComponent } from '../formulario-perfil/formulario-perfil.component';
import { PerfilUsuario } from '../../../modelos/PerfilModelos/PerfilUsuario';
import { PerfilService } from '../../../servicios/perfil.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-perfil',
  imports: [FormularioPerfilComponent],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css'
})
export class EditarPerfilComponent implements OnInit {


  ngOnInit(): void {

  this.perfilService.obtenerMiPerfil().subscribe({
    next: perfilX =>{
      this.perfil = perfilX;
    },
    error:err =>{
      console.log(err);
    }
  })


  }



  router = inject(Router);

  @Input()
 
  perfil?: PerfilUsuario;
  perfilService = inject(PerfilService);
  


  
    guardarCambios(perfil: PerfilUsuario) {
      //Cuando enviamos la peticion ahi es donde actualizamos:D
      this.perfilService.actualizar(perfil).subscribe({
        next: () => {
  
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
  
          Toast.fire({
            icon: "success",
            title: "Perfil editado"
          });
  
          console.log('editando perfil', perfil);
          this.router.navigate(['perfil'])
        },
        error: err => {
          console.log('Error al editar perfil', err);
  
  
          Swal.fire({
            title: "Error",
            text: "Ocurrió un problema al editar el perfil.",
            icon: "error",
            confirmButtonText: "Aceptar"
          });
        }
      })
    }


}
