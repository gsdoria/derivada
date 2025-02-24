# derivada
Método recursivo para geração de equações e derivadas.

Utilizando dos conceitos de recursividade e herança, desenvolvi um sistema que é capaz de gerar funções simples (funções que apenas contenham as operações de soma, subtração, multiplicação e divisão, bem como exponenciação e as funções trigonométricas seno e cosseno) porém de uma forma facilmente expansível e manipulável.  

Também estava trabalhando num sistema que permitisse a entrada de funções como input de texto de forma mais simples (exemplo: `equation("2x+1")` ao invés de `new sum( new pro( new con(2), new x ), new con(1) )`), com a intenção de diminuir verbosidade e facilitar a criação e modificação de expressões.  

Estava pensando na criação de uma função `eval(valor)` para o cálculo das variáveis `x` para um valor fixo, essencialmente tornando-as constantes e permitindo extrair um valor único da função.