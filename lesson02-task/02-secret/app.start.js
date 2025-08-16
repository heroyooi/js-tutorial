// TODO: 외부에서 직접 secret 값에 접근할 수 없고
// getSecret / setSecret 메서드로만 접근 가능하도록 구현
function createSecret(initialValue) {}

const secretBox = createSecret("init");
console.log(secretBox.getSecret()); // "init"
secretBox.setSecret("new value");
console.log(secretBox.getSecret()); // "new value"