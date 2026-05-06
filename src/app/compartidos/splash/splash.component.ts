import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  imports: [],
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.css'
})
export class SplashComponent implements OnInit{

   router = inject(Router);


 ngOnInit(): void {


  //duramos 3 segundos mostrando la animacion
  setTimeout(() => {
    document.querySelector('.splash')?.classList.add('fade-out');

//Enviamos AL landing despues de 0.9 segundos 
    setTimeout(() => {
      this.router.navigate(['landing']);
    }, 500);


  }, 800);
}


}
