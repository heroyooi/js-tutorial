function createSecret(initialValue) {
  let secret = initialValue;

  return {
    getSecret() {
      return secret;
    },
    setSecret(newValue) {
      if (typeof newValue === "string" && newValue.length > 0) {
        secret = newValue;
      }
    },
  };
}

const secretBox = createSecret("init");
console.log(secretBox.getSecret()); // init
secretBox.setSecret("new value");
console.log(secretBox.getSecret()); // new value