import { decorate, observable, computed } from "mobx";

class User {
	name = "nothing";
}
decorate(User, {
	name: observable
});

export default User;
