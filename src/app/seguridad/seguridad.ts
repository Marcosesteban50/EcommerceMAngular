// seguridad.ts - Agrega estas interfaces
export interface CredencialesUsuarioDTO {
  email: string;
  password: string;
}

export interface RespuestaAutenticationDTO {
  token: string;
  expiracion: string;
  usuario?: {
    email: string;
    name: string;
    picture: string;
  };
}

export interface UsuarioDTO {
  email: string;
  roles?: string[];
}

// ===== INTERFACES NUEVAS PARA GOOGLE LOGIN =====
export interface GoogleLoginRequestDTO {
  token: string;
}

export interface RespuestaAutenticacionCompletaDTO extends RespuestaAutenticationDTO {
  usuario: {
    email: string;
    name: string;
    picture: string;
    googleId?: string;
  };
}

export interface UserInfo {
  email: string;
  name: string;
  picture: string;
  roles: string[];
}