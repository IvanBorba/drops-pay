const removeEspecialCharacter = (str: string) => {
  return str.replace(/[^a-zA-Zs]/g, '').toLowerCase()
}

export default removeEspecialCharacter
