/**
 * Valida email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida senha forte
 */
export function isStrongPassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Senha deve ter no mínimo 8 caracteres');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Senha deve conter letras minúsculas');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Senha deve conter letras maiúsculas');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Senha deve conter números');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Senha deve conter caracteres especiais');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Valida username
 */
export function isValidUsername(username: string): {
  isValid: boolean;
  error?: string;
} {
  if (username.length < 3) {
    return { isValid: false, error: 'Username deve ter no mínimo 3 caracteres' };
  }
  
  if (username.length > 20) {
    return { isValid: false, error: 'Username deve ter no máximo 20 caracteres' };
  }
  
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { isValid: false, error: 'Username só pode conter letras, números e underscore' };
  }
  
  return { isValid: true };
}

/**
 * Valida tamanho de arquivo
 */
export function isValidFileSize(file: File, maxSizeInMB: number = 10): boolean {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return file.size <= maxSizeInBytes;
}

/**
 * Valida tipo de arquivo de imagem
 */
export function isValidImageType(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  return validTypes.includes(file.type);
}