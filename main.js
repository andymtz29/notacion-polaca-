const convertir = () => {
  const expresion = document.getElementById('expresion').value; 
  if (!expresion) {
    Swal.fire({
      icon: 'warning',
      title: 'Advertencia',
      text: 'Por favor, llena este campo.',
      confirmButtonText: 'OK'
    });
    return;
  }

  const expresionValida = /^[\d\s\+\-\*\/]+$/; 
  if (!expresionValida.test(expresion)) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'La expresión contiene caracteres no válidos. Solo se permiten números y operadores.',
      confirmButtonText: 'OK'
    });
    return; 
  }
  
  const resultado = calcularNotacionPolacaPrefija(expresion); 
  if (resultado) {
    Swal.fire({
      icon: 'success',
      title: 'Resultado',
      html: '<p>Expresión normal: ' + resultado.expresion + '</p>' +
            '<p>Resultado de la expresión: ' + resultado.valor + '</p>',
      confirmButtonText: 'OK'
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Expresión inválida o faltan operandos',
      confirmButtonText: 'OK'
    });
  }
};

const calcularNotacionPolacaPrefija = (expresion) => {
  const pila = [];
  const elementos = expresion.split(' ').reverse();

  const operaciones = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b
  };

  for (let i = 0; i < elementos.length; i++) {
    const elemento = elementos[i];
    if (!isNaN(elemento)) {
      pila.push({ expresion: elemento, valor: parseFloat(elemento) });
    } else {
      const a = pila.pop();
      const b = pila.pop();

      if (!a || !b) {
        return null; 
      }

      let expresionNormal = '(' + a.expresion + ' ' + elemento + ' ' + b.expresion + ')';
      let resultado = operaciones[elemento](a.valor, b.valor); 
      pila.push({ expresion: expresionNormal, valor: resultado });
    }
  }
  if (pila.length !== 1) {
    return null; 
  }
  return pila.pop();  
};
