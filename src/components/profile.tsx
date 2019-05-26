import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { UserStore } from "@/mobx/stores";
import { View, Text } from "react-native";

const Profile = observer(() => {
	const user = useContext(UserStore);
	return (
		<View >
			<Text>
				Name: {user && user.name}
			</Text>
		</View>
	);
});

export default Profile;
