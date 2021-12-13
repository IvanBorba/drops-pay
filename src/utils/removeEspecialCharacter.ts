const removeEspecialCharacter = (str: string) => {
  return str.replace(/[^a-zA-Z0-9s]/g, '').toLowerCase()
}

export default removeEspecialCharacter
