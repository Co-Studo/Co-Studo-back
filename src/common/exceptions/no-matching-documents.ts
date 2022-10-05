class NoMatchingDocuments extends Error {
  constructor(where: string) {
    super(`No matching documents: ${where}`);
  }
}

export default NoMatchingDocuments;
