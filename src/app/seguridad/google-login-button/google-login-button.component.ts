import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SeguridadService } from '../seguridad.service';

declare global {
  interface Window {
    
  }
}

@Component({
  selector: 'app-google-login-button',

  imports: [CommonModule],
  templateUrl: './google-login-button.component.html',
  styleUrls: ['./google-login-button.component.css']
})
export class GoogleLoginButtonComponent implements OnInit, AfterViewInit, OnDestroy {
  private router = inject(Router);
  private seguridadService = inject(SeguridadService);
  //Actualizacion de la vista 
  private cdRef = inject(ChangeDetectorRef);
  
  @ViewChild('googleButton') googleButton!: ElementRef;
  
  cargando = false;
  error = '';
  private googleInitialized = false;
  private readonly GOOGLE_CLIENT_ID = '739327326392-gnbf96nb20mq2s5he43gqrl143or4avm.apps.googleusercontent.com';

  ngOnInit(): void {
    this.cargarGoogleScript();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (!this.googleInitialized && typeof window.google !== 'undefined') {
        this.initializeGoogle();
      }
    }, 500);
  }

  ngOnDestroy(): void {
    // Cleanup
  }

  triggerGoogleLogin(): void {
    if (this.cargando) return;
    
    if (typeof window.google !== 'undefined' && window.google.accounts && window.google.accounts.id) {
      this.cargando = true;
      this.error = '';
      this.cdRef.detectChanges();
      
      // Usar Google One Tap
      window.google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Si One Tap no se muestra, usar el selector normal
          this.mostrarSelectorGoogle();
        }
      });
    } else {
      this.error = 'Google Login no está disponible. Recarga la página.';
      this.cdRef.detectChanges();
    }
  }

  private mostrarSelectorGoogle(): void {
    if (this.googleButton?.nativeElement) {
      window.google.accounts.id.renderButton(
        this.googleButton.nativeElement,
        {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          text: 'signin_with',
          shape: 'rectangular',
          width: 250
        }
      );
      
      setTimeout(() => {
        const googleBtn = this.googleButton.nativeElement.querySelector('div[role="button"]');
        if (googleBtn) {
          googleBtn.click();
        } else {
          this.cargando = false;
          this.error = 'No se pudo cargar el botón de Google';
          this.cdRef.detectChanges();
        }
      }, 100);
    }
  }

  private cargarGoogleScript(): void {


    if (typeof window.google !== 'undefined') {
      this.initializeGoogle();
      return;
    }

    //Creando etiqueta dinamicamente en tiempo de ejecucion No HTML -> 
    const script = document.createElement('script');
    //cargamos esta libreria de google
    script.src = 'https://accounts.google.com/gsi/client';
    //Asyncrona descarga y ejecuccion insta
    script.async = true;
    //Espera antes  de ejecutar hasta despues del parsing
    script.defer = true;
    //cuando carga pues llamamos a InitializeGoogle
    script.onload = () => {
      console.log('✅ Google Identity Services cargado');
      this.initializeGoogle();
    };
    //Error si no carga
    script.onerror = (error: any) => {
      console.error('❌ Error cargando Google:', error);
      this.error = 'Error cargando Google Login';
      //forzamos detencion de la carga 
      this.cdRef.detectChanges();
    };
    
    //anadimos el script de arriba al DOM luegoi hacemos la peticion al URL con esa ruta
    document.head.appendChild(script);
  }




  private initializeGoogle(): void {
    //Guard para no inicializar 2 veces
    if (this.googleInitialized) return;

    try {
      //Opciones para inicializacion del Google Login
      window.google.accounts.id.initialize({
        client_id: this.GOOGLE_CLIENT_ID,
        callback: (response: any) => this.handleCredentialResponse(response),
        auto_select: false,
        cancel_on_tap_outside: true,
        context: 'signin',
        ux_mode: 'popup',
        itp_support: true
      });

      //Inicializando 
      this.googleInitialized = true;
      console.log('✅ Google Identity inicializado');
      
    } catch (error: any) {
      console.error('❌ Error inicializando Google:', error);
      this.error = 'Error configurando Google Login';
      this.cdRef.detectChanges();
    }
  }

  private handleCredentialResponse(response: any): void {
    console.log('🔑 Respuesta de Google recibida');
    
    if (!response.credential) {
      this.error = 'No se recibió credencial de Google';
      this.cargando = false;
      this.cdRef.detectChanges();
      return;
    }

    //logeando a google
    this.seguridadService.loginConGoogle(response.credential).subscribe({
      next: () => {
        this.cargando = false;
        console.log('✅ Login con Google exitoso');
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        this.cargando = false;
        console.error('❌ Error en login:', error);
        
        let mensajeError = 'Error al iniciar sesión';
        
        if (error.status === 401) {
          mensajeError = 'Token inválido o expirado';
        } else if (error.status === 400) {
          mensajeError = 'Error en la solicitud';
        } else if (error.status === 0) {
          mensajeError = 'No se pudo conectar con el servidor';
        } else if (error.error) {
          mensajeError = error.error.message || error.error;
        }
        
        this.error = mensajeError;
        this.cdRef.detectChanges();
      }
    });
  }

  reintentar(): void {
    this.error = '';
    this.cargando = false;
    this.cdRef.detectChanges();
    
    if (typeof window.google === 'undefined') {
      this.cargarGoogleScript();
    }
  }
}