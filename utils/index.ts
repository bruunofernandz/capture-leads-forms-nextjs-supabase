export function phoneBrazilMask(src: { value: string }) {
  if (src.value.length <= 11) {
    const mask = '## ####-####';
    const i = src.value.length; // 12
    const saida = mask.substring(0, 1); //#
    const texto = mask.substring(i); //## #####-####
    if (texto.substring(0, 1) != saida) {
      //true
      src.value += texto.substring(0, 1);
    }
  } else if (src.value.length > 11) {
    src.value = src.value.replace(/\-/g, '');
    src.value = [src.value.slice(0, 8), '-', src.value.slice(8)].join('');
  }
}
