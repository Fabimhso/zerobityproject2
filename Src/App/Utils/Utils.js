class Utils {
  /**
   * Retorna o 'slug' de uma string
   *
   * @param {string} text texto
   * @returns {string} texto em slug
   *
   * @example
   * console.log(Text2Slug("TEXto quãl-Quer")); // "texto-qualquer"
   */
  Text2Slug(text) {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
  }

  /**
   * Retorna a porcentagem entre dois valores inteiros
   *
   * @param {number} p porção
   * @param {number} t total
   * @returns {number} porcentagDem entre 'p' e 't'
   *
   * @example
   * console.log(Percentage(4, 3) + "%"); // "75%""
   */
  Percentage(p, t) {
    return (p * 100) / t;
  }
}

module.exports = new Utils();
